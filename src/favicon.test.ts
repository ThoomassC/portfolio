import { describe, expect, it } from "vitest";
import indexHtml from "../index.html?raw";
import { THEME_ICONS } from "./hooks/useTheme";

const publicFavicons = new Set(
  Object.keys(import.meta.glob("../public/assets/favicon*")).map((path) =>
    path.replace("../public", "")
  )
);
const iconPaths = Object.values(THEME_ICONS).flatMap(({ svg, ico }) => [svg, ico]);
const htmlIconPaths = Array.from(
  indexHtml.matchAll(/["'](\/assets\/favicon[^"']*)["']/g),
  (match) => match[1]
);

/**
 * `vercel.json` sert `/assets/*` en `immutable` pendant un an : un favicon modifié
 * sous le même nom resterait l'ancien dans les navigateurs. Le nom porte donc une
 * version, à incrémenter à chaque changement de logo.
 */
describe("favicons", () => {
  it.each(iconPaths)("%s existe dans public/", (path) => {
    expect(publicFavicons.has(path)).toBe(true);
  });

  it.each(iconPaths)("%s porte une version dans son nom", (path) => {
    expect(path).toMatch(/\/favicon-v\d+/);
  });

  it("index.html ne référence que les favicons du thème", () => {
    expect(htmlIconPaths.length).toBeGreaterThan(0);
    expect(new Set(htmlIconPaths)).toEqual(new Set(iconPaths));
  });
});
