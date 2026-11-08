import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { profile } from "../content/profile";
import { setPrefersColorScheme, setPrefersReducedMotion } from "../test/setup";

const NAVIGATION_PANEL_ID = "navigation-principale";

function getMenuToggle(): HTMLElement {
  return screen.getByRole("button", { name: /menu/i });
}

function getMainNavigation(): HTMLElement {
  return screen.getByRole("navigation", { name: /navigation principale/i });
}

async function openMenu(user: ReturnType<typeof userEvent.setup>) {
  const toggle = getMenuToggle();
  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");

  return toggle;
}

beforeEach(() => {
  setPrefersColorScheme("light");
  setPrefersReducedMotion(true);
});

describe("en-tête épuré", () => {
  it("devrait ne plus afficher le nom ni le portrait", () => {
    render(<App />);
    const banner = screen.getByRole("banner");

    expect(within(banner).queryByRole("link", { name: profile.name })).toBeNull();
    expect(banner.querySelector("img")).toBeNull();
  });
});

describe("menu mobile de l'en-tête", () => {
  it("devrait annoncer le menu fermé au premier rendu", () => {
    render(<App />);

    expect(getMenuToggle()).toHaveAttribute("aria-expanded", "false");
  });

  it("devrait lier le bouton au panneau de navigation avec aria-controls", () => {
    render(<App />);

    expect(getMenuToggle()).toHaveAttribute("aria-controls", NAVIGATION_PANEL_ID);
    expect(document.getElementById(NAVIGATION_PANEL_ID)).not.toBeNull();
  });

  it("devrait refermer le menu au second clic sur le bouton", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = await openMenu(user);

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  /**
   * Régression : le handler Escape était porté par le <nav>, donc la touche
   * n'était captée que si le focus se trouvait déjà dans la navigation.
   */
  it("devrait fermer le menu avec Escape même quand le focus est sur le body", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = await openMenu(user);
    act(() => (document.activeElement as HTMLElement | null)?.blur());
    expect(document.body).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  /**
   * Le panneau ouvert couvre tout l'écran : sans cela, Tab partait dans le contenu
   * principal masqué derrière lui, et le lecteur d'écran le parcourait encore.
   */
  it("devrait amener le focus dans le panneau et rendre la page inerte tant qu'il est ouvert", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = await openMenu(user);

    expect(within(getMainNavigation()).getAllByRole("link")[0]).toHaveFocus();
    expect(screen.getByRole("main", { hidden: true })).toHaveProperty("inert", true);

    await user.click(toggle);

    expect(screen.getByRole("main")).toHaveProperty("inert", false);
  });

  it("devrait redonner le focus au bouton après une fermeture par Escape", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = await openMenu(user);
    act(() => toggle.blur());

    await user.keyboard("{Escape}");

    expect(toggle).toHaveFocus();
  });

  it("devrait fermer le menu lors d'un pointerdown en dehors du menu", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = await openMenu(user);

    await user.click(screen.getByRole("heading", { level: 1 }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("devrait laisser le menu ouvert lors d'un pointerdown à l'intérieur de la navigation", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = await openMenu(user);

    await user.pointer({ target: getMainNavigation(), keys: "[MouseLeft>]" });

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("devrait fermer le menu au clic sur un lien d'ancre", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = await openMenu(user);

    await user.click(within(getMainNavigation()).getByRole("link", { name: "Projets" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

describe("liens directs de l'en-tête", () => {
  it("devrait proposer l'e-mail, le CV, GitHub et LinkedIn", () => {
    render(<App />);
    const links = within(screen.getByRole("list", { name: /liens directs/i }));

    expect(links.getByRole("link", { name: /e-mail/i })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`
    );
    expect(links.getByRole("link", { name: /^cv/i })).toHaveAttribute(
      "download",
      profile.cv.fileName
    );
    expect(links.getByRole("link", { name: /github/i })).toHaveAttribute("href", profile.gitHubUrl);
    expect(links.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      profile.linkedInUrl
    );
  });
});

/**
 * La colonne de navigation s'efface pendant le défilement, pour laisser la lecture
 * libre, et revient dès que la page s'immobilise.
 */
describe("navigation pendant le défilement", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("devrait masquer la navigation pendant le défilement et la réafficher à l'arrêt", () => {
    vi.useFakeTimers();
    render(<App />);
    const panel = document.getElementById(NAVIGATION_PANEL_ID);

    expect(panel).not.toHaveClass("is-scrolling");

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(panel).toHaveClass("is-scrolling");

    act(() => {
      vi.advanceTimersByTime(300);
      window.dispatchEvent(new Event("scroll"));
      vi.advanceTimersByTime(300);
    });
    expect(panel).toHaveClass("is-scrolling");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(panel).not.toHaveClass("is-scrolling");
  });
});

describe("encre des liens selon le fond", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(document, "elementsFromPoint");
  });

  function mockBackdrop(color: string) {
    const backdrop = document.createElement("div");
    backdrop.style.backgroundColor = color;
    Object.defineProperty(document, "elementsFromPoint", {
      configurable: true,
      value: () => [backdrop],
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ x: 10, y: 10, width: 60, height: 24 })
    );
  }

  it.each([
    { color: "rgb(25, 33, 57)", tone: "dark" },
    { color: "rgb(245, 245, 244)", tone: "light" },
  ])("devrait marquer le fond $tone derrière les liens", async ({ color, tone }) => {
    mockBackdrop(color);
    render(<App />);
    const email = within(screen.getByRole("list", { name: /liens directs/i })).getByRole("link", {
      name: /e-mail/i,
    });

    await waitFor(() => expect(email).toHaveAttribute("data-backdrop", tone));
  });
});
