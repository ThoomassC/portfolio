import { describe, expect, it } from "vitest";
import { parseCssColor, toneForColor } from "./backdropTone";

describe("lecture d'une couleur CSS calculée", () => {
  it("devrait lire rgb() et rgba()", () => {
    expect(parseCssColor("rgb(35, 47, 82)")).toEqual({ r: 35, g: 47, b: 82, a: 1 });
    expect(parseCssColor("rgba(245, 245, 244, 0.5)")).toEqual({ r: 245, g: 245, b: 244, a: 0.5 });
  });

  it("devrait lire la syntaxe à espaces", () => {
    expect(parseCssColor("rgb(25 33 57 / 0.25)")).toEqual({ r: 25, g: 33, b: 57, a: 0.25 });
  });

  it("devrait rendre null pour une valeur illisible ou transparente", () => {
    expect(parseCssColor("transparent")).toBeNull();
    expect(parseCssColor("")).toBeNull();
  });
});

describe("ton du fond derrière un lien", () => {
  it("devrait juger foncés le marine du thème et la chemise", () => {
    expect(toneForColor({ r: 25, g: 33, b: 57, a: 1 })).toBe("dark");
    expect(toneForColor({ r: 42, g: 53, b: 80, a: 1 })).toBe("dark");
  });

  it("devrait juger clairs le fond beige et la peau", () => {
    expect(toneForColor({ r: 245, g: 245, b: 244, a: 1 })).toBe("light");
    expect(toneForColor({ r: 232, g: 190, b: 165, a: 1 })).toBe("light");
  });

  it("devrait choisir l'encre la plus contrastée au point de bascule", () => {
    // Un gris moyen : l'encre beige ou marine retenue doit être celle qui contraste le plus.
    expect(toneForColor({ r: 128, g: 128, b: 128, a: 1 })).toBe("dark");
    expect(toneForColor({ r: 160, g: 160, b: 160, a: 1 })).toBe("light");
  });
});
