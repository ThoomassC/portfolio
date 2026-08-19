import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { setPrefersColorScheme, setPrefersReducedMotion } from "./test/setup";

function timeElements(): HTMLTimeElement[] {
  return Array.from(document.querySelectorAll("time"));
}

function describeTime(element: HTMLTimeElement): string {
  return `«${element.textContent}» → dateTime="${element.dateTime}"`;
}

/** La section qui porte le titre de niveau 1, c'est-à-dire le hero. */
function getHero(): HTMLElement {
  const heading = screen.getByRole("heading", { level: 1 });
  const hero = heading.closest("section");

  if (!hero) {
    throw new Error("le titre de niveau 1 n'est pas contenu dans une <section>");
  }

  return hero;
}

beforeEach(() => {
  setPrefersColorScheme("light");
  setPrefersReducedMotion(true);
});

describe("structure de la page", () => {
  it("devrait exposer un landmark banner situé en dehors du contenu principal", () => {
    render(<App />);

    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");

    expect(main).not.toContainElement(header);
  });

  it("devrait placer la navigation principale dans l'en-tête et non dans le contenu principal", () => {
    render(<App />);

    const navigation = screen.getByRole("navigation", {
      name: /navigation principale/i,
    });

    expect(screen.getByRole("banner")).toContainElement(navigation);
    expect(screen.getByRole("main")).not.toContainElement(navigation);
  });

  it("devrait donner au contenu principal la cible du lien d'évitement", () => {
    render(<App />);

    const skipLink = screen.getByRole("link", {
      name: /aller au contenu principal/i,
    });

    expect(screen.getByRole("main")).toHaveAttribute("id", "contenu-principal");
    expect(skipLink).toHaveAttribute("href", "#contenu-principal");
  });

  it("devrait ne comporter qu'un seul titre de niveau 1", () => {
    render(<App />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("devrait titrer l'encart Formation au niveau 3", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /apprendre pour mieux construire/i,
      }),
    ).toBeInTheDocument();
  });
});

describe("parcours", () => {
  it("devrait présenter la mission Blue Soft en premier dans la timeline", () => {
    render(<App />);
    const timeline = screen.getByRole("list", {
      name: /expériences professionnelles/i,
    });

    const [firstExperience] = within(timeline)
      .getAllByRole("listitem")
      .filter((item) => item.parentElement === timeline);

    expect(firstExperience).toHaveTextContent(/blue soft/i);
    expect(firstExperience).not.toHaveTextContent(/linkt/i);
  });
});

describe("dates", () => {
  it("devrait renseigner un dateTime sur chaque élément <time>", () => {
    render(<App />);

    const sansDateTime = timeElements()
      .filter((element) => element.dateTime.trim() === "")
      .map(describeTime);

    expect(timeElements().length).toBeGreaterThan(0);
    expect(sansDateTime).toEqual([]);
  });

  it("devrait décrire une plage de dates avec deux éléments <time> distincts", () => {
    render(<App />);

    const plagesDansUnSeulTime = timeElements()
      .filter((element) => /[—–]/.test(element.textContent ?? ""))
      .map(describeTime);

    expect(plagesDansUnSeulTime).toEqual([]);
  });

  it("devrait faire correspondre le dateTime de chaque <time> à l'année qu'il affiche", () => {
    render(<App />);

    const incoherents = timeElements()
      .filter(
        (element) =>
          !(element.textContent ?? "").includes(element.dateTime.slice(0, 4)),
      )
      .map(describeTime);

    expect(incoherents).toEqual([]);
  });
});

describe("hero", () => {
  it("devrait proposer un lien GitHub et un lien LinkedIn", () => {
    render(<App />);
    const hero = getHero();

    expect(
      within(hero).getByRole("link", { name: /github/i }).getAttribute("href"),
    ).toMatch(/github\.com/i);
    expect(
      within(hero).getByRole("link", { name: /linkedin/i }).getAttribute("href"),
    ).toMatch(/linkedin\.com/i);
  });

  it("devrait annoncer la disponibilité", () => {
    render(<App />);

    expect(
      within(getHero()).getByText(
        /Disponible à partir d’octobre 2027 — CDI ou freelance/i,
      ),
    ).toBeInTheDocument();
  });
});

describe("mentions retirées", () => {
  it("devrait ne plus afficher les qualités auto-déclarées du hero", () => {
    render(<App />);

    expect(screen.queryByText(/Motivation\s*-\s*Curiosité/i)).toBeNull();
  });

  it("devrait ne plus revendiquer un audit d'accessibilité non vérifiable", () => {
    render(<App />);

    expect(screen.queryByText(/audit technique réalisé/i)).toBeNull();
  });
});

describe("téléchargement du CV", () => {
  it("devrait proposer un nom de fichier de téléchargement explicite", () => {
    render(<App />);

    const cvLink = screen.getByRole("link", { name: /télécharger mon cv/i });

    expect(cvLink.getAttribute("download")).toMatch(/Thomas-Caron/);
  });

  it("devrait annoncer le format du fichier dans le libellé du lien", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: /télécharger mon cv.*pdf/i }),
    ).toBeInTheDocument();
  });
});

describe("contact", () => {
  it("devrait donner au lien Google Maps un nom accessible contenant le texte visible", () => {
    render(<App />);

    const mapsLink = screen.getByRole("link", {
      name: /Mont-Saint-Aignan, France/i,
    });

    expect(mapsLink.getAttribute("href")).toMatch(/google\.[a-z.]+\/maps/i);
  });

  it("devrait exposer les réseaux professionnels sous forme de liste", () => {
    render(<App />);

    const socials = screen.getByRole("list", {
      name: /réseaux professionnels/i,
    });

    expect(
      within(socials).getAllByRole("listitem").length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      within(socials).getByRole("link", { name: /linkedin/i }).closest("li"),
    ).not.toBeNull();
  });
});
