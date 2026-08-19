const HEX_COLOR = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Luminance relative WCAG d'une couleur hexadécimale.
 *
 * Les tests comparent des luminances plutôt que des codes couleur : la palette
 * exacte appartient à la refonte graphique, mais « le thème sombre annonce une
 * couleur sombre au navigateur » est un comportement durable.
 */
export function relativeLuminance(color: string): number {
  const trimmed = color.trim();

  if (!HEX_COLOR.test(trimmed)) {
    throw new Error(`couleur hexadécimale attendue, reçu "${color}"`);
  }

  const hex = trimmed.replace("#", "");
  const expanded =
    hex.length === 3
      ? hex
          .split("")
          .map((channel) => channel + channel)
          .join("")
      : hex;

  const [red, green, blue] = [0, 2, 4]
    .map((offset) => Number.parseInt(expanded.slice(offset, offset + 2), 16) / 255)
    .map((channel) =>
      channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/** Seuil de référence : le gris moyen. Au-dessus c'est clair, en dessous c'est sombre. */
export const MID_GREY_LUMINANCE = relativeLuminance("#808080");
