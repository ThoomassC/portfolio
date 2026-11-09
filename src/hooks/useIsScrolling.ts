import { useEffect, useState } from "react";

/**
 * Vrai tant que la page défile, puis faux une fois qu'elle est immobile depuis
 * `idleDelay` millisecondes. Chaque nouvel événement de défilement relance le délai.
 */
export function useIsScrolling(idleDelay = 700): boolean {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let idleTimer: number | undefined;

    const handleScroll = () => {
      setIsScrolling(true);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setIsScrolling(false), idleDelay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(idleTimer);
    };
  }, [idleDelay]);

  return isScrolling;
}
