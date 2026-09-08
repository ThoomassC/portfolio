import { StrictMode } from "react";
import { act, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";
import { describeElement, firstRevealTarget, revealTargets } from "../test/dom";
import {
  emitMediaChange,
  notifyIntersection,
  observeCountFor,
  setPrefersColorScheme,
  setPrefersReducedMotion,
  unobserveCountFor,
} from "../test/setup";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * `reveal-enabled` sur <html> est l'interrupteur qui masque les éléments
 * `[data-reveal]` en attendant leur révélation : son absence signifie « rien
 * n'est masqué ».
 */
function isRevealMaskingActive(): boolean {
  return document.documentElement.classList.contains("reveal-enabled");
}

describe("révélation au scroll", () => {
  describe("mouvement autorisé", () => {
    it("devrait masquer le contenu à révéler tant qu'il n'est pas entré dans le viewport", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(false);

      render(<App />);

      expect(isRevealMaskingActive()).toBe(true);
      expect(firstRevealTarget()).not.toHaveClass("is-visible");
    });

    it("devrait révéler un élément qui entre dans le viewport", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(false);
      render(<App />);
      const target = firstRevealTarget();

      act(() => notifyIntersection(target, true));

      expect(target).toHaveClass("is-visible");
    });

    /**
     * Régression : la version précédente faisait un classList.toggle() à chaque
     * frame de scroll, donc un contenu déjà lu repassait à opacity 0 dès qu'il
     * sortait du viewport.
     */
    it("devrait conserver un élément révélé quand il ressort du viewport", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(false);
      render(<App />);
      const target = firstRevealTarget();
      act(() => notifyIntersection(target, true));
      expect(target).toHaveClass("is-visible");

      act(() => notifyIntersection(target, false));

      expect(target).toHaveClass("is-visible");
    });

    it("devrait observer chaque élément à révéler avec IntersectionObserver", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(false);

      render(<App />);

      const targets = revealTargets();
      const unobservedTargets = targets
        .filter((target) => observeCountFor(target) === 0)
        .map(describeElement);
      expect(targets.length).toBeGreaterThan(0);
      expect(unobservedTargets).toEqual([]);
    });

    // main.tsx monte l'application dans StrictMode : le double montage ne doit
    // pas laisser le contenu masqué sans observateur pour le révéler.
    it("devrait rester capable de révéler le contenu sous StrictMode", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(false);
      render(
        <StrictMode>
          <App />
        </StrictMode>,
      );
      expect(isRevealMaskingActive()).toBe(true);
      const target = firstRevealTarget();

      act(() => notifyIntersection(target, true));

      expect(target).toHaveClass("is-visible");
    });

    it("devrait cesser d'observer un élément une fois révélé", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(false);
      render(<App />);
      const target = firstRevealTarget();

      act(() => notifyIntersection(target, true));

      expect(unobserveCountFor(target)).toBeGreaterThan(0);
    });
  });

  describe("mouvement réduit", () => {
    it("devrait ne rien masquer quand l'utilisateur demande moins d'animations", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);

      render(<App />);

      expect(isRevealMaskingActive()).toBe(false);
    });

    it("devrait démasquer le contenu quand la préférence passe à « mouvement réduit » en cours de session", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(false);
      render(<App />);
      expect(isRevealMaskingActive()).toBe(true);

      act(() => emitMediaChange(REDUCED_MOTION_QUERY, true));

      expect(isRevealMaskingActive()).toBe(false);
    });

    it("devrait réactiver les animations quand la préférence quitte « mouvement réduit » en cours de session", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      render(<App />);
      expect(isRevealMaskingActive()).toBe(false);

      act(() => emitMediaChange(REDUCED_MOTION_QUERY, false));

      expect(isRevealMaskingActive()).toBe(true);
    });
  });
});
