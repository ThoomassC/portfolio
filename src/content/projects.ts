import type { Project } from "./types";

/**
 * Triés du plus récent au plus ancien. Seuls les dépôts réellement publiables
 * sont liés : les autres n'ont pas encore de contenu exploitable.
 */
export const projects: readonly Project[] = [
  {
    id: "portfolio",
    date: "2026",
    title: "Portfolio personnel",
    status: "En ligne",
    statusType: "completed",
    description:
      "Conception de ce portfolio responsive en React et TypeScript, avec un design liquid glass, un thème sombre et une attention portée au RGAA.",
    stack: ["React 19", "TypeScript", "Vite", "RGAA"],
    links: [{ label: "Code source", href: "https://github.com/ThoomassC/portfolio" }],
  },
  {
    id: "gestion-de-budget",
    date: "2024",
    title: "Application de gestion de budget",
    status: "Actif",
    statusType: "in-progress",
    description:
      "Application en cours de développement pour piloter un budget personnel, conçue avec une architecture hexagonale.",
    stack: ["TypeScript", "React", "Architecture hexagonale"],
    links: [],
  },
  {
    id: "sites-web-et-apis",
    date: "2022 — 2024",
    title: "Sites web & APIs",
    status: "Livré 2024",
    statusType: "completed",
    description:
      "Création de sites dynamiques et d’APIs avec React et Node.js, en appliquant les principes de Clean Architecture.",
    stack: ["React", "Node.js", "Express"],
    links: [],
  },
  {
    id: "gamejam",
    date: "Janvier 2024",
    title: "GameJam Rouen Métropole",
    status: "48 h — janvier 2024",
    statusType: "completed",
    description:
      "Conception en équipe d’un mini-jeu vidéo lors d’une GameJam de 48 heures, à partir d’un thème imposé.",
    stack: ["Svelte", "TypeScript"],
    links: [],
  },
];
