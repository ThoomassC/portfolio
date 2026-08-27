import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
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

function getBrandLink(): HTMLElement {
  // Plusieurs liens de la page portent le nom : on reste dans le landmark d'en-tête.
  return within(screen.getByRole("banner")).getByRole("link", { name: profile.name });
}

describe("portrait de l'en-tête", () => {
  it("devrait afficher le portrait à côté du nom", () => {
    render(<App />);

    const portrait = within(getBrandLink()).getByRole("presentation", { hidden: true });

    expect(portrait).toHaveAttribute("src", profile.portrait.src);
  });

  /**
   * Le portrait du hero porte une alternative descriptive : il y est seul et porte
   * l'identité. Dans l'en-tête il vit DANS le lien qui affiche déjà le nom, donc une
   * alternative descriptive ferait annoncer « Thomas Caron Thomas Caron, souriant, en
   * chemise bleu marine… ». Le nom accessible du lien doit rester son texte visible.
   */
  it("devrait laisser le nom accessible du lien égal à son texte visible", () => {
    render(<App />);

    const brand = getBrandLink();

    expect(brand).toHaveAccessibleName(profile.name);
    expect(within(brand).getByRole("presentation", { hidden: true })).toHaveAttribute("alt", "");
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
    act(() => toggle.blur());
    expect(document.body).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
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
