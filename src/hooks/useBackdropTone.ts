import { type RefObject, useEffect } from "react";
import { backdropColorAt, toneForColor } from "./backdropTone";

/** Durée de l'entrée animée du portrait du hero, après laquelle on relit les fonds. */
const INTRO_SETTLE_DELAY = 1700;

/**
 * Pose `data-backdrop="dark|light"` sur chaque élément de `selector` contenu dans
 * `containerRef`, selon ce qui passe derrière son centre : la page défile sous
 * l'en-tête fixe, le ton est relu à chaque image d'animation où elle a bougé.
 */
export function useBackdropTone(containerRef: RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      for (const element of container.querySelectorAll<HTMLElement>(selector)) {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const color = backdropColorAt(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          container
        );
        if (color) element.dataset.backdrop = toneForColor(color);
      }
    };
    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    const themeObserver = new MutationObserver(schedule);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    const settleTimer = window.setTimeout(schedule, INTRO_SETTLE_DELAY);
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      themeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, [containerRef, selector]);
}
