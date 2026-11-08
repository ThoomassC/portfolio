/**
 * Ton du fond qui passe derrière un élément fixe, pour choisir son encre :
 * beige sur fond foncé, marine sur fond clair.
 */
export type Rgba = {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
};
export type BackdropTone = "dark" | "light";

/** Encres de l'en-tête, à garder alignées sur `index.css`. */
const NAVY_INK: Rgba = { r: 0x23, g: 0x2f, b: 0x52, a: 1 };
const BEIGE_INK: Rgba = { r: 0xf7, g: 0xf4, b: 0xea, a: 1 };

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance({ r, g, b }: Rgba): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: Rgba, b: Rgba): number {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

/** Lit une couleur calculée `rgb()` / `rgba()` ; null si illisible ou transparente. */
export function parseCssColor(value: string): Rgba | null {
  const match = value.match(
    /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/
  );
  if (!match) return null;
  const [, r, g, b, alpha] = match;
  const a =
    alpha === undefined ? 1 : alpha.endsWith("%") ? parseFloat(alpha) / 100 : parseFloat(alpha);
  if (a === 0) return null;
  return { r: Number(r), g: Number(g), b: Number(b), a };
}

/** Le fond est « foncé » quand l'encre beige y contraste plus que l'encre marine. */
export function toneForColor(color: Rgba): BackdropTone {
  return contrast(color, BEIGE_INK) > contrast(color, NAVY_INK) ? "dark" : "light";
}

let samplingCanvas: HTMLCanvasElement | null = null;

/** Pixel d'une image affichée sous le point (x, y) de l'écran, ou null s'il est transparent. */
function samplePixel(image: HTMLImageElement, x: number, y: number): Rgba | null {
  if (!image.complete || image.naturalWidth === 0) return null;
  const rect = image.getBoundingClientRect();
  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null;

  samplingCanvas ??= document.createElement("canvas");
  samplingCanvas.width = 1;
  samplingCanvas.height = 1;
  const context = samplingCanvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;

  const sourceX = ((x - rect.left) / rect.width) * image.naturalWidth;
  const sourceY = ((y - rect.top) / rect.height) * image.naturalHeight;
  context.clearRect(0, 0, 1, 1);
  context.drawImage(image, sourceX, sourceY, 1, 1, 0, 0, 1, 1);
  const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
  return a < 128 ? null : { r, g, b, a: a / 255 };
}

/**
 * Couleur réellement visible sous le point, en ignorant `ignore` (l'en-tête lui-même) :
 * le pixel d'une image opaque, sinon le premier fond plein rencontré.
 */
export function backdropColorAt(x: number, y: number, ignore: Element): Rgba | null {
  if (typeof document.elementsFromPoint !== "function") return null;

  for (const element of document.elementsFromPoint(x, y)) {
    if (ignore.contains(element)) continue;
    if (element instanceof HTMLImageElement) {
      const pixel = samplePixel(element, x, y);
      if (pixel) return pixel;
      continue;
    }
    const background = parseCssColor(getComputedStyle(element).backgroundColor);
    if (background && background.a >= 0.5) return background;
  }
  return parseCssColor(getComputedStyle(document.body).backgroundColor);
}
