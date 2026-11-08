import { describe, expect, it } from "vitest";
import indexHtml from "../index.html?raw";

const publicAssets = new Set(
  Object.keys(import.meta.glob("../public/assets/og-*")).map((path) =>
    path.replace("../public", "")
  )
);

function meta(attribute: "name" | "property", key: string): string | undefined {
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="([^"]*)"`);
  return indexHtml.match(pattern)?.[1];
}

/**
 * Le titre de l'onglet, l'aperçu de partage (LinkedIn, mail…) et les données
 * structurées doivent dire la même chose que le hero : « Chef de projet ».
 */
describe("métadonnées de la page", () => {
  it("devrait titrer la page « Chef de projet »", () => {
    expect(indexHtml).toMatch(/<title>Thomas Caron — Chef de projet<\/title>/);
    expect(meta("property", "og:title")).toBe("Thomas Caron — Chef de projet");
  });

  it("ne devrait plus présenter Thomas comme développeur logiciel", () => {
    expect(indexHtml).not.toMatch(/développeur logiciel/i);
  });

  it("devrait décrire le cap gestion de projet dans la description et l'aperçu", () => {
    for (const description of [meta("name", "description"), meta("property", "og:description")]) {
      expect(description).toMatch(/chef de projet/i);
      expect(description).toMatch(/portefeuille/i);
    }
  });

  it("devrait servir une image de partage versionnée et présente dans public/", () => {
    const image = meta("property", "og:image")?.replace("%VITE_SITE_URL%", "");

    expect(image).toMatch(/^\/assets\/og-[a-z-]+-v\d+\.jpg$/);
    expect(publicAssets.has(image ?? "")).toBe(true);
    expect(meta("name", "twitter:image")).toBe(meta("property", "og:image"));
  });

  it("devrait aligner le poste des données structurées", () => {
    expect(indexHtml).toMatch(/"jobTitle":\s*"Chef de projet/);
  });
});
