/**
 * Petits accès DOM partagés par les tests. Le but est de garder les tests sans
 * logique : pas de `if`, pas de boucle, pas d'assertion non nulle à la main.
 */

/** Les éléments animés à la révélation. `[data-reveal]` fait partie du contrat CSS. */
export function revealTargets(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
}

export function firstRevealTarget(): HTMLElement {
  const [first] = revealTargets();

  if (!first) {
    throw new Error(
      "aucun élément [data-reveal] dans le document : la révélation au scroll n'a rien à animer",
    );
  }

  return first;
}

/** Description courte et lisible d'un élément, pour les messages d'échec. */
export function describeElement(element: Element): string {
  const reveal = element.getAttribute("data-reveal") ?? "";

  return `<${element.tagName.toLowerCase()} class="${element.className}" data-reveal="${reveal}">`;
}

const THEME_COLOR_SELECTOR = 'meta[name="theme-color"]';

/**
 * index.html porte le meta theme-color, mais le document jsdom des tests est
 * vierge : on l'installe explicitement pour pouvoir observer sa mise à jour.
 */
export function installThemeColorMeta(initialContent = "#ffffff"): HTMLMetaElement {
  removeThemeColorMeta();

  const meta = document.createElement("meta");
  meta.setAttribute("name", "theme-color");
  meta.setAttribute("content", initialContent);
  document.head.append(meta);

  return meta;
}

export function removeThemeColorMeta() {
  document.querySelector(THEME_COLOR_SELECTOR)?.remove();
}

export function themeColorContent(): string {
  const meta = document.querySelector<HTMLMetaElement>(THEME_COLOR_SELECTOR);

  if (!meta) {
    throw new Error(`aucun ${THEME_COLOR_SELECTOR} dans le document`);
  }

  return meta.getAttribute("content") ?? "";
}
