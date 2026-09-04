import { StrictMode } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "../App";
import { MID_GREY_LUMINANCE, relativeLuminance } from "../test/color";
import {
  installThemeColorMeta,
  removeThemeColorMeta,
  themeColorContent,
} from "../test/dom";
import {
  emitMediaChange,
  setPrefersColorScheme,
  setPrefersReducedMotion,
} from "../test/setup";

const STORAGE_KEY = "portfolio-theme";
const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function getThemeToggle(): HTMLElement {
  return screen.getByRole("button", { name: /thème sombre/i });
}

function currentTheme(): string | undefined {
  return document.documentElement.dataset.theme;
}

afterEach(() => {
  removeThemeColorMeta();
});

describe("thème", () => {
  describe("initialisation", () => {
    it("devrait appliquer le thème sombre quand le système le préfère et qu'aucun choix n'est mémorisé", () => {
      setPrefersColorScheme("dark");
      setPrefersReducedMotion(true);

      render(<App />);

      expect(currentTheme()).toBe("dark");
    });

    it("devrait appliquer le thème clair quand le système le préfère et qu'aucun choix n'est mémorisé", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);

      render(<App />);

      expect(currentTheme()).toBe("light");
    });

    it("devrait faire gagner le choix mémorisé clair sur un système en sombre", () => {
      window.localStorage.setItem(STORAGE_KEY, "light");
      setPrefersColorScheme("dark");
      setPrefersReducedMotion(true);

      render(<App />);

      expect(currentTheme()).toBe("light");
    });

    it("devrait faire gagner le choix mémorisé sombre sur un système en clair", () => {
      window.localStorage.setItem(STORAGE_KEY, "dark");
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);

      render(<App />);

      expect(currentTheme()).toBe("dark");
    });

    it("devrait ignorer une valeur mémorisée invalide et retomber sur la préférence système", () => {
      window.localStorage.setItem(STORAGE_KEY, "bleu-canard");
      setPrefersColorScheme("dark");
      setPrefersReducedMotion(true);

      render(<App />);

      expect(currentTheme()).toBe("dark");
    });

    /**
     * Régression : le montage écrivait "light" dans localStorage, ce qui écrasait
     * définitivement la préférence système dès la première visite.
     */
    it("devrait laisser localStorage vide après le montage sans interaction", () => {
      setPrefersColorScheme("dark");
      setPrefersReducedMotion(true);

      render(<App />);

      expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    // main.tsx monte l'application dans StrictMode : les effets sont joués deux fois.
    it("devrait laisser localStorage vide et le thème correct sous StrictMode", () => {
      setPrefersColorScheme("dark");
      setPrefersReducedMotion(true);

      render(
        <StrictMode>
          <App />
        </StrictMode>,
      );

      expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
      expect(currentTheme()).toBe("dark");
    });
  });

  describe("bouton de bascule", () => {
    it("devrait inverser le thème et mémoriser le choix au clic", async () => {
      const user = userEvent.setup();
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      render(<App />);

      await user.click(getThemeToggle());

      expect(currentTheme()).toBe("dark");
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("dark");
    });

    it("devrait revenir au thème clair et le mémoriser au second clic", async () => {
      const user = userEvent.setup();
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      render(<App />);

      await user.click(getThemeToggle());
      await user.click(getThemeToggle());

      expect(currentTheme()).toBe("light");
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("light");
    });

    it("devrait refléter l'état du thème dans aria-pressed", async () => {
      const user = userEvent.setup();
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      render(<App />);
      const toggle = getThemeToggle();

      expect(toggle).toHaveAttribute("aria-pressed", "false");

      await user.click(toggle);

      expect(toggle).toHaveAttribute("aria-pressed", "true");
    });

    it("devrait annoncer aria-pressed à true au montage quand le thème sombre est déjà actif", () => {
      setPrefersColorScheme("dark");
      setPrefersReducedMotion(true);

      render(<App />);

      expect(getThemeToggle()).toHaveAttribute("aria-pressed", "true");
    });

    it("devrait tirer son nom accessible de son texte visible, sans aria-label", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      render(<App />);

      const toggle = getThemeToggle();

      expect(toggle).not.toHaveAttribute("aria-label");
      expect(toggle).toHaveTextContent(/thème sombre/i);
    });

    it("devrait garder le libellé « Thème sombre » une fois le thème sombre activé", async () => {
      const user = userEvent.setup();
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      render(<App />);

      await user.click(getThemeToggle());

      // Patron « toggle button » : l'état passe par aria-pressed, pas par le libellé.
      expect(getThemeToggle()).toHaveTextContent(/thème sombre/i);
    });
  });

  describe("suivi de la préférence système", () => {
    it("devrait basculer en cours de session quand aucun choix n'est mémorisé", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      render(<App />);

      act(() => emitMediaChange(DARK_SCHEME_QUERY, true));

      expect(currentTheme()).toBe("dark");
    });

    it("devrait ignorer le changement système quand un choix est mémorisé", () => {
      window.localStorage.setItem(STORAGE_KEY, "light");
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      render(<App />);

      act(() => emitMediaChange(DARK_SCHEME_QUERY, true));

      expect(currentTheme()).toBe("light");
    });

    it("devrait ignorer le changement système après un clic sur le bouton", async () => {
      const user = userEvent.setup();
      setPrefersColorScheme("dark");
      setPrefersReducedMotion(true);
      render(<App />);

      await user.click(getThemeToggle());
      act(() => emitMediaChange(DARK_SCHEME_QUERY, true));

      expect(currentTheme()).toBe("light");
    });
  });

  describe("meta theme-color", () => {
    it("devrait annoncer une couleur sombre dès le montage en thème sombre", () => {
      setPrefersColorScheme("dark");
      setPrefersReducedMotion(true);
      installThemeColorMeta();

      render(<App />);

      expect(relativeLuminance(themeColorContent())).toBeLessThan(
        MID_GREY_LUMINANCE,
      );
    });

    it("devrait annoncer une couleur claire dès le montage en thème clair", () => {
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      installThemeColorMeta("#000000");

      render(<App />);

      expect(relativeLuminance(themeColorContent())).toBeGreaterThan(
        MID_GREY_LUMINANCE,
      );
    });

    it("devrait suivre le thème au clic sur le bouton", async () => {
      const user = userEvent.setup();
      setPrefersColorScheme("light");
      setPrefersReducedMotion(true);
      installThemeColorMeta();
      render(<App />);

      await user.click(getThemeToggle());

      expect(relativeLuminance(themeColorContent())).toBeLessThan(
        MID_GREY_LUMINANCE,
      );
    });
  });
});
