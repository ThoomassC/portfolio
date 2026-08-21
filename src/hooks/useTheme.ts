import { useCallback, useEffect, useState } from "react";

import { useMediaQuery } from "./useMediaQuery";

export type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";
const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

/**
 * Doit rester aligné sur le script inline de `index.html`.
 *
 * Une seule valeur par thème, égale à `--site-background` de `index.css` : le header
 * est un îlot flottant (`--header-offset`), donc c'est bien le fond de page que le
 * navigateur borde en haut de l'écran. Trois valeurs contradictoires cohabitaient
 * auparavant entre ce fichier et `index.html`, et la barre d'adresse mobile
 * n'annonçait la couleur d'aucune des deux.
 */
const THEME_COLORS: Record<Theme, string> = {
  light: "#e9ecf7",
  dark: "#15171e",
};

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

/** Le choix explicite de l'utilisateur, ou `null` s'il n'en a jamais fait. */
function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export type UseThemeResult = {
  readonly theme: Theme;
  readonly isDarkTheme: boolean;
  readonly toggleTheme: () => void;
};

/**
 * Le thème appliqué est dérivé : choix explicite mémorisé s'il existe, sinon
 * préférence du système. `localStorage` n'est écrit qu'au clic, jamais au
 * montage : tant que l'utilisateur n'a rien choisi, son OS reste la référence.
 */
export function useTheme(): UseThemeResult {
  const [storedTheme, setStoredTheme] = useState<Theme | null>(readStoredTheme);
  const prefersDarkScheme = useMediaQuery(DARK_SCHEME_QUERY);

  const theme: Theme = storedTheme ?? (prefersDarkScheme ? "dark" : "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[theme]);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Le thème reste utilisable même si le stockage local est indisponible.
    }

    setStoredTheme(nextTheme);
  }, [theme]);

  return { theme, isDarkTheme: theme === "dark", toggleTheme };
}
