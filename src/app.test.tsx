import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { profile } from "./content/profile";
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
  it("devrait identifier chaque rubrique du menu dans son titre accessible", () => {
    render(<App />);

    const navigation = screen.getByRole("navigation", { name: /navigation principale/i });
    for (const link of within(navigation).getAllByRole("link")) {
      const target = document.querySelector(link.getAttribute("href")!);
      expect(target).not.toBeNull();
      const heading = within(target as HTMLElement).getByRole("heading", { level: 2 });
      expect(heading).toHaveAccessibleName(new RegExp(link.textContent!, "i"));
    }
  });

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

  it("devrait lister les missions de chaque poste de la plus récente à la plus ancienne", () => {
    render(<App />);
    const missionLists = screen.getAllByRole("list", { name: /missions réalisées chez/i });

    for (const list of missionLists) {
      // Clé de tri : fin de mission (une mission en cours passe devant), puis début.
      const keys = within(list)
        .getAllByRole("listitem")
        .filter((item) => item.parentElement === list)
        .map((item) => {
          const [start, end] = Array.from(item.querySelectorAll(".mission-date time"));
          return `${end?.getAttribute("datetime") ?? "9999"}|${start.getAttribute("datetime")}`;
        });

      expect(keys).toEqual([...keys].sort().reverse());
    }
  });

  it("ne devrait plus résumer les missions Blue Soft en un paragraphe", () => {
    render(<App />);

    expect(screen.queryByText(/cinq missions successives/i)).not.toBeInTheDocument();
  });

  it("devrait intituler les deux postes en alternance", () => {
    render(<App />);
    const timeline = screen.getByRole("list", { name: /expériences professionnelles/i });
    const titles = within(timeline)
      .getAllByRole("heading", { level: 3 })
      .map((title) => title.textContent);

    expect(titles).toEqual([
      "Développeur Full Stack & QA en alternance",
      "Développeur et chef de projet en alternance",
    ]);
  });

  it("devrait mettre en avant le rôle de Scrum Master dans la formation MAALSI en cours", () => {
    render(<App />);
    const maalsi = screen
      .getByText(/manager en architectures et applications logicielles/i)
      .closest("li");

    expect(maalsi).toHaveTextContent(/scrum master/i);
    expect(maalsi).toHaveTextContent(/projet de groupe de 4 personnes/i);
  });

  it("devrait détailler chez Linkt le poste de développeur et deux postes de chef de projet annexe", () => {
    render(<App />);
    const missions = screen.getByRole("list", { name: /missions réalisées chez linkt/i });
    const posts = within(missions).getAllByRole("heading", { level: 4 });

    expect(posts).toHaveLength(3);
    expect(posts[0]).toHaveTextContent(/développeur/i);
    expect(posts[1]).toHaveTextContent(/chef de projet annexe.*documentation/i);
    expect(posts[2]).toHaveTextContent(/chef de projet annexe.*documentation/i);
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
      .filter((element) => !(element.textContent ?? "").includes(element.dateTime.slice(0, 4)))
      .map(describeTime);

    expect(incoherents).toEqual([]);
  });
});

describe("hero", () => {
  it("devrait laisser le bas de l'image sans liens", () => {
    render(<App />);

    expect(within(getHero()).queryAllByRole("link")).toHaveLength(0);
  });

  it("devrait annoncer le projet de Mastère Spécialisé au CESI", () => {
    render(<App />);

    expect(
      within(getHero()).getByText(
        /Mastère Spécialisé® Manager de Portefeuille de Projets – Transition Numérique/
      )
    ).toBeInTheDocument();
  });

  it("devrait ne plus annoncer de disponibilité en CDI ni de mobilité à Paris", () => {
    render(<App />);

    expect(screen.queryByText(/Disponible à partir d’octobre 2027/i)).toBeNull();
    expect(within(getHero()).queryByText(/mobile Paris/i)).toBeNull();
  });

  /**
   * Rendu à 390 px, la ligne de rôles se coupait sur le trait d'union de
   * « Full-stack » : « FULL- / STACK » sur la toute première ligne de la page.
   * jsdom ne calcule pas de mise en page, donc la coupure elle-même est
   * invérifiable ici — ce test garde la seule chose qui la rend impossible : que
   * chaque rôle soit un élément à lui, sur lequel `.eyebrow-roles > span` peut
   * poser `white-space: nowrap`. Écrit en une seule chaîne, il n'y a plus rien à
   * styler.
   */
  it("devrait porter chaque rôle du chapeau dans son propre élément", () => {
    render(<App />);

    const eyebrow = getHero().querySelector(".eyebrow-roles");

    // `throw` plutôt qu'un `expect` : lui seul restreint le type pour la suite du
    // test, et l'échec reste aussi lisible qu'une assertion.
    if (eyebrow === null) {
      throw new Error("chapeau de rôles introuvable dans le hero");
    }

    expect(Array.from(eyebrow.querySelectorAll("span"), (role) => role.textContent)).toEqual([
      "Responsable portefeuille projets",
      "Management",
      "Chefferie de projet",
    ]);
    expect(eyebrow).toHaveTextContent(
      "Responsable portefeuille projets · Management · Chefferie de projet"
    );
  });

  it("devrait annoncer la recherche d'alternance à partir d'octobre 2027", () => {
    render(<App />);

    expect(getHero()).toHaveTextContent("Je recherche une alternance à partir d’octobre 2027");
  });

  it("devrait proposer une version courte de chaque texte du hero pour le mobile", () => {
    render(<App />);
    const hero = getHero();
    const short = Array.from(hero.querySelectorAll(".text-mobile"), (el) => el.textContent);

    expect(short).toEqual([
      "Alternant full stack chez Blue Soft",
      "Basé à Rouen",
      "Alternance dès octobre 2027",
      "Objectif : Mastère Spécialisé® au CESI",
    ]);
    // Chaque version courte double une version longue, gardée pour l'écran large.
    expect(hero.querySelectorAll(".text-desktop")).toHaveLength(short.length);
  });

  it("devrait présenter le poste actuel comme une alternance", () => {
    render(<App />);

    expect(getHero()).toHaveTextContent(
      "Actuellement alternant développeur full stack chez Blue Soft"
    );
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

  it("devrait avoir retiré la section Accessibilité, sa navigation et son lien de pied de page", () => {
    render(<App />);

    expect(document.getElementById("accessibilite")).toBeNull();
    expect(screen.queryByRole("region", { name: /accessibilité/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /^accessibilité$/i })).toBeNull();
  });
});

describe("téléchargement du CV", () => {
  function getCvLink(): HTMLElement {
    return within(screen.getByRole("banner")).getByRole("link", { name: /^cv/i });
  }

  it("devrait proposer un nom de fichier de téléchargement explicite", () => {
    render(<App />);

    expect(getCvLink().getAttribute("download")).toMatch(/Thomas-Caron/);
  });

  it("devrait annoncer le format du fichier dans le libellé du lien", () => {
    render(<App />);

    expect(getCvLink()).toHaveAccessibleName(/^cv.*pdf/i);
  });
});

describe("section À propos retirée", () => {
  it("devrait ne plus afficher la section ni sa citation", () => {
    render(<App />);

    expect(document.getElementById("apropos")).toBeNull();
    expect(screen.queryByText(/je construis des applications/i)).toBeNull();
  });
});

describe("passions", () => {
  it("devrait rendre la section avec son titre accessible", () => {
    render(<App />);

    const section = screen.getByRole("region", { name: /^passions$/i });

    expect(section).toHaveAttribute("id", "passions");
  });

  it("devrait présenter les quatre passions dans l'ordre", () => {
    render(<App />);
    const liste = screen.getByRole("list", { name: /pratiques personnelles/i });

    const titres = within(liste)
      .getAllByRole("heading", { level: 3 })
      .map((titre) => titre.textContent);

    expect(titres).toEqual(["Natation", "Sauvetage en mer", "Projets personnels", "Anglais"]);
  });

  it("ne devrait plus numéroter les passions (01, 02…)", () => {
    render(<App />);
    const liste = screen.getByRole("list", { name: /pratiques personnelles/i });

    expect(within(liste).queryByText(/^0\d$/)).not.toBeInTheDocument();
  });

  /**
   * Le SEUL endroit du site où une reformulation malheureuse deviendrait un mensonge :
   * la formation SNSM n'est pas commencée. Ce test verrouille les deux sens — la
   * préparation doit être dite, et aucun vocabulaire de qualification acquise ne doit
   * apparaître dans la carte.
   */
  it("devrait formuler la SNSM comme un projet en cours et non comme une qualification acquise", () => {
    render(<App />);
    const liste = screen.getByRole("list", { name: /pratiques personnelles/i });

    const carte = within(liste)
      .getByRole("heading", { level: 3, name: /sauvetage en mer/i })
      .closest("li");

    expect(carte).not.toBeNull();
    expect(carte).toHaveTextContent(/je prépare mon entrée en formation à la SNSM/i);
    expect(carte).not.toHaveTextContent(/\b(sauveteur|dipl[ôo]m|certifi|breveté|formé|membre)\w*/i);
  });

  it("devrait ouvrir le lien GitHub dans un nouvel onglet, sans exposer l'opener", () => {
    render(<App />);
    const liste = screen.getByRole("list", { name: /pratiques personnelles/i });

    const lien = within(liste).getByRole("link", { name: /github.*nouvelle fenêtre/i });

    expect(lien).toHaveAttribute("href", profile.gitHubUrl);
    expect(lien).toHaveAttribute("target", "_blank");
    expect(lien.getAttribute("rel")).toMatch(/noopener/);
  });

  it("devrait proposer une entrée de navigation « Passions » pointant sur la section", () => {
    render(<App />);
    const navigation = screen.getByRole("navigation", {
      name: /navigation principale/i,
    });

    const lien = within(navigation).getByRole("link", { name: "Passions" });

    expect(lien).toHaveAttribute("href", "#passions");
    expect(document.getElementById("passions")).not.toBeNull();
  });
});

describe("contact", () => {
  it("devrait intituler la section « Contact »", () => {
    render(<App />);

    expect(screen.getByRole("region", { name: /^contact$/i })).toHaveAttribute("id", "contact");
    expect(screen.queryByRole("heading", { name: /me contacter/i })).toBeNull();
  });

  it("devrait accrocher par « Parlons-en. », l'invitation en sous-titre, sans répéter le Mastère", () => {
    render(<App />);
    const section = screen.getByRole("region", { name: /^contact$/i });

    expect(section.querySelector(".contact-statement")).toHaveTextContent(/^Parlons-en\.$/);
    expect(section.querySelector(".contact-invite")).toHaveTextContent(
      /^Une opportunité, une idée ou l’envie de faire connaissance\s?\?$/
    );
    expect(section).not.toHaveTextContent(/mastère spécialisé/i);
  });

  it("devrait garder l'e-mail et le téléphone dans le panneau", () => {
    render(<App />);
    const section = screen.getByRole("region", { name: /^contact$/i });

    expect(within(section).getByRole("link", { name: profile.email })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`
    );
    expect(within(section).getByRole("link", { name: profile.phone.label })).toHaveAttribute(
      "href",
      profile.phone.href
    );
  });

  it("devrait donner au lien Google Maps un nom accessible contenant le texte visible", () => {
    render(<App />);

    const mapsLink = screen.getByRole("link", {
      name: /Mont-Saint-Aignan, France/i,
    });

    expect(mapsLink.getAttribute("href")).toMatch(/google\.[a-z.]+\/maps/i);
  });

  it("ne devrait plus répéter les réseaux déjà présents dans l'en-tête", () => {
    render(<App />);

    expect(screen.queryByText(/ou retrouvez-moi/i)).toBeNull();
    expect(screen.queryByRole("list", { name: /réseaux professionnels/i })).toBeNull();
  });
});

describe("projets personnels", () => {
  function getProjectsSection(): HTMLElement {
    const section = document.getElementById("projets");
    if (!section) throw new Error("section #projets absente");
    return section;
  }

  function getProjectCard(title: RegExp): HTMLElement {
    const heading = within(getProjectsSection()).getByRole("heading", { level: 3, name: title });
    const card = heading.closest("article");
    if (!card) throw new Error(`carte absente pour ${title}`);
    return card;
  }

  it("devrait présenter les projets dans l'ordre éditorial, du plus récent au plus ancien", () => {
    render(<App />);

    const titres = within(getProjectsSection())
      .getAllByRole("heading", { level: 3 })
      .map((titre) => titre.textContent);

    expect(titres).toEqual([
      "Astrologie",
      "Astronomie",
      "Grand Oral Studio",
      "Opale",
      "Board",
      "Travels in World",
      "Portfolio personnel",
      "GameJam Rouen Métropole",
    ]);
  });

  it.each([
    {
      title: /^astrologie$/i,
      site: "https://astrologie-pi.vercel.app",
      code: "https://github.com/ThoomassC/astrologie",
    },
    {
      title: /^astronomie$/i,
      site: "https://astronomie.vercel.app",
      code: "https://github.com/ThoomassC/astronomie",
    },
    {
      title: /^grand oral studio$/i,
      site: "https://grand-oral-studio.vercel.app",
      code: "https://github.com/ThoomassC/grand-oral-studio",
    },
    {
      title: /^opale$/i,
      site: "https://ui-commune.vercel.app",
      code: "https://github.com/ThoomassC/opale-ui",
    },
  ])("devrait relier $title à son site en ligne et à son code", ({ title, site, code }) => {
    render(<App />);
    const card = getProjectCard(title);

    const siteLink = within(card).getByRole("link", { name: /voir le site/i });
    const codeLink = within(card).getByRole("link", { name: /code source/i });

    expect(siteLink).toHaveAttribute("href", site);
    expect(codeLink).toHaveAttribute("href", code);
  });

  it.each([
    { title: /^board$/i, code: "https://github.com/ThoomassC/board" },
    { title: /^travels in world$/i, code: "https://github.com/ThoomassC/travels_in_world" },
  ])("devrait relier $title à son seul code, faute de version en ligne", ({ title, code }) => {
    render(<App />);
    const card = getProjectCard(title);

    expect(within(card).queryByRole("link", { name: /voir le site/i })).toBeNull();
    expect(within(card).getByRole("link", { name: /code source/i })).toHaveAttribute("href", code);
  });

  it.each([/^astrologie$/i, /^astronomie$/i, /^grand oral studio$/i, /^opale$/i])(
    "devrait montrer un aperçu du site en ligne pour %s",
    (title) => {
      render(<App />);
      const preview = getProjectCard(title).querySelector<HTMLImageElement>(
        ".project-card__preview img"
      );

      expect(preview).not.toBeNull();
      expect(preview?.getAttribute("src")).toMatch(/^\/assets\/projects\/.+\.webp$/);
      expect(preview).toHaveAttribute("loading", "lazy");
    }
  );

  it("devrait ranger la description derrière un bouton d'information fermé par défaut", () => {
    render(<App />);
    const card = getProjectCard(/^astrologie$/i);
    const toggle = within(card).getByRole("button", { name: /description du projet astrologie/i });
    const description = within(card).getByText(/site pédagogique bilingue/i);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(description).not.toBeVisible();

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(description).toBeVisible();
  });

  it("devrait refermer la description avec Échap et rendre le focus au bouton", () => {
    render(<App />);
    const card = getProjectCard(/^opale$/i);
    const toggle = within(card).getByRole("button", { name: /description du projet opale/i });

    fireEvent.click(toggle);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("devrait refermer la description au clic en dehors", () => {
    render(<App />);
    const toggle = within(getProjectCard(/^board$/i)).getByRole("button", {
      name: /description du projet board/i,
    });

    fireEvent.click(toggle);
    fireEvent.pointerDown(document.body);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("devrait indiquer 20 h pour la GameJam, dans le badge comme dans le texte", () => {
    render(<App />);
    const card = getProjectCard(/^gamejam rouen métropole$/i);

    expect(within(card).getByText("20 h — Janvier")).toBeVisible();
    expect(card).toHaveTextContent(/20 heures/);
    expect(card).not.toHaveTextContent(/48/);
  });

  it("ne devrait montrer aucun aperçu pour un projet sans version en ligne", () => {
    render(<App />);

    for (const title of [/^board$/i, /^travels in world$/i, /^gamejam rouen métropole$/i]) {
      expect(getProjectCard(title).querySelector(".project-card__preview")).toBeNull();
    }
  });

  it("devrait ouvrir chaque lien de projet dans un nouvel onglet, sans exposer l'opener", () => {
    render(<App />);

    const liens = within(getProjectsSection()).getAllByRole("link");

    expect(liens.length).toBeGreaterThan(0);
    for (const lien of liens) {
      expect(lien).toHaveAttribute("target", "_blank");
      expect(lien).toHaveAttribute("rel", "noopener noreferrer");
      expect(lien).toHaveAccessibleName(/nouvelle fenêtre/i);
    }
  });

  it("ne devrait jamais lier astrologie.vercel.app, qui appartient à un tiers", () => {
    render(<App />);

    const hrefs = within(getProjectsSection())
      .getAllByRole("link")
      .map((lien) => lien.getAttribute("href"));

    expect(hrefs.some((href) => href?.startsWith("https://astrologie.vercel.app"))).toBe(false);
  });
});

describe("sous-titres des compétences", () => {
  it("devrait annoncer chaque groupe avec son nombre de compétences", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /^Expérience professionnelle,\s*21\s*compétences$/,
      })
    ).toBeInTheDocument();
  });
});

describe("pied de page", () => {
  it("devrait indiquer seulement Rouen comme ville", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveTextContent(/rouen/i);
    expect(footer).not.toHaveTextContent(/paris/i);
  });
});

describe("formations", () => {
  function getFormationSection(): HTMLElement {
    return screen.getByRole("region", { name: /^formations$/i });
  }

  it("devrait être une section à part entière, titrée « Formations » comme les autres", () => {
    render(<App />);
    const section = getFormationSection();

    expect(section).toHaveAttribute("id", "formations");
    expect(within(section).getByRole("heading", { level: 2, name: /^formations$/i })).toBeVisible();
    expect(screen.queryByText(/apprendre pour mieux construire/i)).toBeNull();
  });

  it("devrait figurer au sommaire, juste après le parcours", () => {
    render(<App />);
    const navigation = screen.getByRole("navigation", { name: /navigation principale/i });
    const labels = within(navigation)
      .getAllByRole("link")
      .map((link) => link.textContent);

    expect(labels.indexOf("Formations")).toBe(labels.indexOf("Parcours") + 1);
  });

  it.each([
    [/^bac \+6$/i, "2027", "2028"],
    [/^bac \+5$/i, "2025", "2027"],
    [/^bac \+3$/i, "2024", "2025"],
    [/^bac \+2$/i, "2022", "2024"],
  ])("devrait dater %s de %s à %s", (level, start, end) => {
    render(<App />);
    const row = within(getFormationSection()).getByText(level).closest("li");
    const years = Array.from(row?.querySelectorAll("time") ?? [], (time) => time.dateTime);

    expect(years).toEqual([start, end]);
  });

  it("devrait afficher les langues avec leur niveau, le PSC1 et le permis B", () => {
    render(<App />);
    const section = getFormationSection();

    expect(section).toHaveTextContent(/anglais\s*B1/i);
    expect(section).toHaveTextContent(/espagnol\s*A2/i);
    expect(section).toHaveTextContent(/PSC1/);
    expect(section).toHaveTextContent(/permis B/i);
  });
});

describe("compétences en apprentissage", () => {
  it("devrait regrouper les outils d'IA sous « IA générative »", () => {
    render(<App />);
    const group = screen.getByRole("list", { name: /^compétences en apprentissage$/i });

    expect(within(group).getByText("IA générative (Claude Code, Codex, Gemini)")).toBeVisible();
    expect(within(group).queryByText(/^codex$/i)).toBeNull();
    expect(within(group).queryByText(/^gemini$/i)).toBeNull();
  });
});
