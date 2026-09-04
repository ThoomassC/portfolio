import { useLayoutEffect } from "react";

import { useMediaQuery } from "./useMediaQuery";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const REVEAL_SELECTOR = "[data-reveal]";
const VISIBLE_CLASS = "is-visible";
const ENABLED_CLASS = "reveal-enabled";

/**
 * Révèle les blocs `[data-reveal]` à leur première entrée dans le viewport.
 *
 * Deux règles non négociables :
 * - la classe `is-visible` n'est jamais retirée, un contenu déjà lu ne doit pas
 *   redevenir invisible quand on remonte la page ;
 * - aucune lecture de layout au scroll : c'est l'`IntersectionObserver` qui
 *   décide, et chaque élément est `unobserve` dès qu'il est révélé.
 *
 * Si l'utilisateur demande la réduction des animations, la classe
 * `reveal-enabled` n'est pas posée : le CSS ne masque alors plus rien.
 */
export function useScrollReveal(): void {
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const root = document.documentElement;
    root.classList.add(ENABLED_CLASS);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(VISIBLE_CLASS);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.02 }
    );

    document
      .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
      .forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      // `is-visible` reste en place : le contenu déjà révélé ne se remasque pas.
      root.classList.remove(ENABLED_CLASS);
    };
  }, [prefersReducedMotion]);
}
