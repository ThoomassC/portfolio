import { describe, expect, it } from "vitest";
import {
  compositeLayers,
  compositeOver,
  contrastRatio,
  MID_GREY_LUMINANCE,
  oklchHueDistance,
  parseRgba,
  relativeLuminance,
  withAlpha,
} from "./color";

/**
 * Contrat de l'outil de mesure lui-même.
 *
 * Ce fichier manquait, et c'est lui qui porte la crédibilité de `index.css.test.ts` :
 * 52 assertions de contraste ne valent rien si la fonction qui les calcule se trompe.
 * Le trou trouvé en relecture le montre — `parseColor` jetait l'alpha en silence, donc
 * `contrastRatio` mesurait le ratio contre le BLANC PUR au lieu du voile blanc réel,
 * et rendait un chiffre faux et rassurant.
 */

/** Le fond de page du thème clair, sol de toutes les piles de cette feuille. */
const PAGE_BACKGROUND = "#daecf0";
/** `--glass-fill` du thème clair : le remplissage de verre des cartes. */
const GLASS_FILL = "rgba(255, 255, 255, 0.4)";
/** `--text-body` du thème clair. */
const BODY_INK = "#2c464b";

describe("relativeLuminance", () => {
  // Le garde-fou d'alpha est délibérément ABSENT de cette fonction : `theme.test.tsx`
  // en dépend, et sa signature comme son comportement sont un contrat existant.
  it("devrait rendre 0 pour le noir et 1 pour le blanc", () => {
    expect(relativeLuminance("#000000")).toBe(0);
    expect(relativeLuminance("#ffffff")).toBe(1);
  });

  it("devrait placer le gris moyen entre les deux extrêmes", () => {
    expect(MID_GREY_LUMINANCE).toBeGreaterThan(0);
    expect(MID_GREY_LUMINANCE).toBeLessThan(1);
    expect(MID_GREY_LUMINANCE).toBeCloseTo(0.2159, 4);
  });

  it("devrait lire #rgb et #rrggbb équivalents comme la même couleur", () => {
    expect(relativeLuminance("#abc")).toBe(relativeLuminance("#aabbcc"));
    expect(relativeLuminance("#fff")).toBe(relativeLuminance("#ffffff"));
  });

  it("devrait accepter rgb() en pourcentages comme la notation en octets", () => {
    expect(relativeLuminance("rgb(100%, 100%, 100%)")).toBe(relativeLuminance("#ffffff"));
    expect(relativeLuminance("rgb(0%, 0%, 0%)")).toBe(relativeLuminance("#000000"));
  });
});

describe("parseRgba", () => {
  it("devrait rendre un alpha de 1 pour toute notation qui n'en porte pas", () => {
    expect(parseRgba("#abc")).toEqual({ red: 170, green: 187, blue: 204, alpha: 1 });
    expect(parseRgba("rgb(1, 2, 3)")).toEqual({
      red: 1,
      green: 2,
      blue: 3,
      alpha: 1,
    });
  });

  it("devrait rendre l'alpha de rgba() plutôt que de le jeter", () => {
    expect(parseRgba("rgba(255, 255, 255, 0.4)").alpha).toBe(0.4);
  });

  it("devrait lire la syntaxe à espaces et barre oblique avec un alpha en pourcentage", () => {
    expect(parseRgba("rgb(255 255 255 / 40%)")).toEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 0.4,
    });
  });

  it("devrait lire l'alpha des hexadécimaux à 4 et 8 chiffres", () => {
    // Sans cela un token écrit `#rrggbbaa` passerait le garde-fou de `contrastRatio`
    // déguisé en couleur opaque : exactement le trou d'origine, sous une autre forme.
    expect(parseRgba("#ffffff66").alpha).toBeCloseTo(102 / 255, 10);
    expect(parseRgba("#fff8")).toEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 136 / 255,
    });
  });

  it.each([
    { input: "chartreuse" },
    { input: "#12345" },
    { input: "rgb(1, 2)" },
    { input: "rgba(1, 2, 3, 4, 5)" },
    { input: "" },
    { input: "linear-gradient(142deg, #fff 0%, #000 100%)" },
  ])("devrait jeter sur l'entrée invalide $input", ({ input }) => {
    expect(() => parseRgba(input)).toThrow(/couleur CSS attendue/);
  });
});

describe("contrastRatio", () => {
  it("devrait rendre 21:1 entre le noir et le blanc", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 10);
  });

  it("devrait rendre 1:1 pour une couleur contre elle-même", () => {
    expect(contrastRatio(BODY_INK, BODY_INK)).toBe(1);
    expect(contrastRatio("#ffffff", "#fff")).toBe(1);
  });

  it("devrait rendre le même ratio quel que soit l'ordre des arguments", () => {
    expect(contrastRatio(BODY_INK, PAGE_BACKGROUND)).toBe(contrastRatio(PAGE_BACKGROUND, BODY_INK));
  });

  it("devrait refuser une couleur translucide en seconde position", () => {
    // Le bug reproduit : sans garde-fou, cet appel rendait le ratio contre le blanc
    // PUR (10.07:1) là où le composite réel sur le fond de page vaut 8.96:1. Un
    // chiffre faux et rassurant est la pire sortie possible pour un test d'a11y.
    expect(() => contrastRatio(BODY_INK, GLASS_FILL)).toThrow(
      /seconde couleur translucide.*alpha de 0\.4/s
    );
  });

  it("devrait refuser une couleur translucide en première position", () => {
    expect(() => contrastRatio(GLASS_FILL, BODY_INK)).toThrow(/première couleur translucide/);
  });

  it("devrait refuser un hexadécimal à 8 chiffres translucide", () => {
    expect(() => contrastRatio(BODY_INK, "#ffffff66")).toThrow(/alpha/);
  });

  it("devrait dire quoi faire dans le message de refus", () => {
    expect(() => contrastRatio(BODY_INK, GLASS_FILL)).toThrow(/compositeLayers/);
  });

  it("devrait mesurer le composite, plus sévère que la couleur du dessus seule", () => {
    const composed = compositeOver(GLASS_FILL, PAGE_BACKGROUND);

    expect(contrastRatio(BODY_INK, composed)).toBeCloseTo(8.9607, 4);
    // La valeur que rendait l'ancien code, alpha jeté : optimiste de plus d'un point.
    expect(contrastRatio(BODY_INK, "#ffffff")).toBeCloseTo(10.0731, 4);
  });
});

describe("compositeOver", () => {
  it("devrait composer en source-over sRGB non linéaire sur les octets", () => {
    // Calcul à la main : out = a·top + (1 − a)·bottom, canal par canal.
    // 0.5 × 0 + 0.5 × 255 = 127.5 sur les trois canaux.
    expect(compositeOver("rgba(0, 0, 0, 0.5)", "#ffffff")).toBe("rgb(127.5, 127.5, 127.5)");
  });

  it("devrait composer le remplissage de verre sur le fond de page", () => {
    // #daecf0 = (218, 236, 240), blanc à 0.40 :
    //   0.4 × 255 + 0.6 × 218 = 232.8
    //   0.4 × 255 + 0.6 × 236 = 243.6
    //   0.4 × 255 + 0.6 × 240 = 246
    expect(compositeOver(GLASS_FILL, PAGE_BACKGROUND)).toBe("rgb(232.8, 243.6, 246)");
  });

  it("devrait rendre le dessus inchangé quand il est opaque", () => {
    expect(compositeOver("#123456", "#ffffff")).toBe("rgb(18, 52, 86)");
  });

  it("devrait rendre le dessous inchangé quand le dessus est complètement transparent", () => {
    expect(compositeOver("rgba(255, 0, 0, 0)", "#123456")).toBe("rgb(18, 52, 86)");
  });

  it("devrait refuser un substrat translucide au lieu de rendre un résultat translucide", () => {
    expect(() => compositeOver("#ffffff", GLASS_FILL)).toThrow(
      /substrat translucide.*compositeLayers/s
    );
  });
});

describe("withAlpha", () => {
  it("devrait traduire une opacity CSS en alpha de composition", () => {
    // `.liquid-bubble` : `background: var(--halo-tint); opacity: var(--halo-opacity)`.
    expect(withAlpha("#7eccdb", 0.9)).toBe("rgba(126, 204, 219, 0.9)");
  });

  it("devrait MULTIPLIER l'alpha existant au lieu de le remplacer", () => {
    // C'est ce que fait le navigateur : une `opacity` sur un élément au fond déjà
    // translucide ne réinitialise pas cet alpha, elle l'atténue encore.
    expect(withAlpha("rgba(0, 0, 0, 0.5)", 0.5)).toBe("rgba(0, 0, 0, 0.25)");
  });

  it("devrait rendre une couleur opaque pour un facteur de 1", () => {
    expect(withAlpha("#7eccdb", 1)).toBe("rgb(126, 204, 219)");
  });

  it.each([{ factor: -0.1 }, { factor: 1.5 }, { factor: Number.NaN }])(
    "devrait jeter sur le facteur d'opacité hors de [0, 1] $factor",
    ({ factor }) => {
      expect(() => withAlpha("#7eccdb", factor)).toThrow(/facteur d'opacité/);
    }
  );
});

describe("compositeLayers", () => {
  it("devrait empiler le fond de page, le halo et le verre dans l'ordre de peinture", () => {
    // Le sol réel du texte d'une carte posée sur un halo froid, thème clair :
    //   #daecf0 → #7eccdb à 0.9 → rgb(135.2, 207.2, 221.1) → blanc à 0.40
    expect(compositeLayers([PAGE_BACKGROUND, withAlpha("#7eccdb", 0.9), GLASS_FILL])).toBe(
      "rgb(183.12, 226.32, 234.66)"
    );
  });

  it("devrait rendre la couche unique telle quelle quand elle est déjà opaque", () => {
    expect(compositeLayers([PAGE_BACKGROUND])).toBe(PAGE_BACKGROUND);
  });

  it("devrait refuser une pile dont la couche la plus basse est translucide", () => {
    expect(() => compositeLayers([GLASS_FILL, "#ffffff"])).toThrow(
      /la plus basse doit être opaque/
    );
  });

  it("devrait refuser une pile vide", () => {
    expect(() => compositeLayers([])).toThrow(/au moins une couche/);
  });

  it("devrait rendre un aplat mesurable par contrastRatio", () => {
    const floor = compositeLayers([PAGE_BACKGROUND, GLASS_FILL]);

    expect(() => contrastRatio(BODY_INK, floor)).not.toThrow();
  });
});

describe("oklchHueDistance", () => {
  it("devrait mesurer le plus court chemin angulaire au passage par 0 deg", () => {
    // #884466 est à 350.29 deg, #994455 à 9.68 deg : 20 deg d'écart, pas 340.
    const distance = oklchHueDistance("#884466", "#994455");

    expect(distance).toBeCloseTo(19.4, 1);
    expect(distance).toBeLessThan(180);
  });

  it("devrait rendre 0 pour une couleur contre elle-même", () => {
    expect(oklchHueDistance("#884466", "#884466")).toBe(0);
  });

  it("devrait être symétrique", () => {
    expect(oklchHueDistance("#884466", "#994455")).toBe(oklchHueDistance("#994455", "#884466"));
  });

  it("devrait refuser une couleur translucide, dont la teinte serait celle d'un aplat invisible", () => {
    expect(() => oklchHueDistance(GLASS_FILL, "#884466")).toThrow(/alpha/);
  });
});
