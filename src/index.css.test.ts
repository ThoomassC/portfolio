import { describe, expect, it } from "vitest";
import stylesheet from "./index.css?raw";
import { contrastRatio, MID_GREY_LUMINANCE, relativeLuminance } from "./test/color";

/** Mesure les surfaces réellement utilisées par la refonte, depuis le CSS livré. */
function tokensFor(selector: string): Map<string, string> {
  const css = stylesheet.replace(/\/\*[\s\S]*?\*\//g, "");
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`Thème absent : ${selector}`);
  const block = css.slice(start, css.indexOf("}", start));
  return new Map(
    Array.from(block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g), (match) => [match[1], match[2].trim()])
  );
}

const light = tokensFor(":root");
const dark = new Map([...light, ...tokensFor(':root[data-theme="dark"]')]);
const themes = [
  { name: "clair", tokens: light },
  { name: "sombre", tokens: dark },
];
function value(tokens: Map<string, string>, name: string) {
  const result = tokens.get(name);
  if (!result) throw new Error(`Token absent : ${name}`);
  return result;
}

const surfaces = ["--site-background", "--surface", "--hero-surface"];
const inks = ["--text-strong", "--text-body", "--text-muted"];

describe.each(themes)("contrastes du thème $name", ({ tokens }) => {
  it.each(surfaces.flatMap((surface) => inks.map((ink) => ({ ink, surface }))))(
    "$ink reste lisible sur $surface",
    ({ ink, surface }) => {
      expect(contrastRatio(value(tokens, ink), value(tokens, surface))).toBeGreaterThanOrEqual(4.5);
    }
  );
  it.each(["--inverse-text", "--inverse-muted"])(
    "%s reste lisible dans les sections sombres",
    (ink) => {
      expect(
        contrastRatio(value(tokens, ink), value(tokens, "--inverse-surface"))
      ).toBeGreaterThanOrEqual(4.5);
    }
  );
  it.each(["positive", "info", "warning"])("le statut %s reste lisible sur son fond", (status) => {
    expect(
      contrastRatio(value(tokens, `--${status}-ink`), value(tokens, `--${status}-surface`))
    ).toBeGreaterThanOrEqual(4.5);
  });
  it.each(surfaces)("le focus se distingue sur %s", (surface) => {
    expect(contrastRatio(value(tokens, "--focus"), value(tokens, surface))).toBeGreaterThanOrEqual(
      3
    );
  });
  it.each(surfaces)("la bordure des contrôles se distingue sur %s", (surface) => {
    expect(
      contrastRatio(value(tokens, "--control-border"), value(tokens, surface))
    ).toBeGreaterThanOrEqual(3);
  });
  it("l’accent reste lisible sur les sections sombres", () => {
    expect(
      contrastRatio(value(tokens, "--inverse-accent"), value(tokens, "--inverse-surface"))
    ).toBeGreaterThanOrEqual(4.5);
  });
  it.each([
    { ink: "--accent-ink", surface: "--accent" },
    { ink: "--inverse-accent-ink", surface: "--inverse-accent" },
    { ink: "--contact-ink", surface: "--contact-surface" },
    { ink: "--text-body", surface: "--soft-surface" },
    { ink: "--inverse-muted", surface: "--inverse-soft-surface" },
  ])("$ink reste lisible sur $surface", ({ ink, surface }) => {
    expect(contrastRatio(value(tokens, ink), value(tokens, surface))).toBeGreaterThanOrEqual(4.5);
  });
});

describe("sensibilité des mesures", () => {
  it("détecte une encre rapprochée de son fond", () => {
    const mutated = new Map(light);
    mutated.set("--text-muted", value(light, "--hero-surface"));
    expect(
      contrastRatio(value(mutated, "--text-muted"), value(mutated, "--hero-surface"))
    ).toBeLessThan(4.5);
  });
  it("conserve un vrai thème clair et un vrai thème sombre", () => {
    expect(relativeLuminance(value(light, "--site-background"))).toBeGreaterThan(
      MID_GREY_LUMINANCE
    );
    expect(relativeLuminance(value(dark, "--site-background"))).toBeLessThan(MID_GREY_LUMINANCE);
  });
});
