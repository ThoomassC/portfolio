import { useEffect, useState } from "react";

/**
 * Suit une media query pour toute la durée de vie du composant : la préférence
 * système peut changer en cours de session (bascule clair/sombre de l'OS,
 * activation de la réduction des animations) et l'interface doit suivre.
 *
 * La valeur est relue via `matchMedia` à chaque événement plutôt que prise dans
 * `event.matches` : c'est la seule lecture qui reste juste si plusieurs media
 * queries partagent un même émetteur.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(window.matchMedia(query).matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
