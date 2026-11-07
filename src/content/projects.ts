import type { Project } from "./types";

/**
 * Triés du plus récent au plus ancien. Seuls les dépôts réellement publiables
 * sont liés : les autres n'ont pas encore de contenu exploitable.
 */
export const projects: readonly Project[] = [
  {
    id: "astrologie",
    date: "Novembre 2026",
    title: "Astrologie",
    status: "En ligne",
    statusType: "completed",
    description:
      "Site pédagogique bilingue qui présente l’astrologie comme une tradition symbolique : signes, planètes, maisons, histoire et regard de la science. Le thème natal est calculé dans le navigateur, sans que les données de naissance quittent l’appareil.",
    stack: ["Next.js", "TypeScript", "Astronomy Engine", "i18n"],
    links: [
      { label: "Voir le site", href: "https://astrologie-pi.vercel.app" },
      { label: "Code source", href: "https://github.com/ThoomassC/astrologie" },
    ],
  },
  {
    id: "astronomie",
    date: "Octobre 2026",
    title: "Astronomie",
    status: "En ligne",
    statusType: "completed",
    description:
      "Site pédagogique en trois langues sur l’espace : les planètes à leur position du jour, un voyage 3D au défilement du Soleil jusqu’à l’hypothèse du multivers et une comparaison des étoiles à la même échelle, chiffres sourcés.",
    stack: ["Next.js", "TypeScript", "Three.js", "i18n"],
    links: [
      { label: "Voir le site", href: "https://astronomie.vercel.app" },
      { label: "Code source", href: "https://github.com/ThoomassC/astronomie" },
    ],
  },
  {
    id: "grand-oral-studio",
    date: "Octobre 2026",
    title: "Grand Oral Studio",
    status: "En ligne",
    statusType: "completed",
    description:
      "Application de préparation au grand oral : apparence et trame des diapositives définies sans IA, puis, le jour J, un diaporama complet avec notes d’orateur rédigé depuis la problématique tirée. Export .pptx et répétition chronométrée.",
    stack: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "Playwright"],
    links: [
      { label: "Voir le site", href: "https://grand-oral-studio.vercel.app" },
      { label: "Code source", href: "https://github.com/ThoomassC/grand-oral-studio" },
    ],
  },
  {
    id: "opale",
    date: "Septembre 2026",
    title: "Opale",
    status: "En ligne",
    statusType: "completed",
    description:
      "Système de design React partagé entre mes projets : une soixantaine de composants, deux thèmes et un contrat de couleur exécutable qui recalcule chaque ratio de contraste (seuil 4,5:1) en intégration continue. Il habille aussi ce portfolio.",
    stack: ["React 19", "TypeScript", "Vite", "Design system", "WCAG"],
    links: [
      { label: "Voir le site", href: "https://ui-commune.vercel.app" },
      { label: "Code source", href: "https://github.com/ThoomassC/opale-ui" },
    ],
  },
  {
    id: "board",
    date: "Septembre 2026",
    title: "Board",
    status: "Outil local",
    statusType: "completed",
    description:
      "Tableau de bord local qui regroupe mes sessions de développement assisté par IA par projet, alimenté en direct par des hooks. Serveur Python sans dépendance, flux SSE et thèmes clair et sombre.",
    stack: ["Python", "SSE", "JavaScript", "Tests unitaires"],
    links: [{ label: "Code source", href: "https://github.com/ThoomassC/board" }],
  },
  {
    id: "travels-in-world",
    date: "Août 2026",
    title: "Travels in World",
    status: "En cours",
    statusType: "in-progress",
    description:
      "Journal de voyages : une carte du monde semée de balises, où chaque voyage se raconte en frise chronologique. La carte SVG est rendue côté serveur.",
    stack: ["Next.js", "TypeScript", "SVG", "Playwright"],
    links: [{ label: "Code source", href: "https://github.com/ThoomassC/travels_in_world" }],
  },
  {
    id: "portfolio",
    date: "2026",
    title: "Portfolio personnel",
    status: "En ligne",
    statusType: "completed",
    description:
      "Conception et développement de ce portfolio en React et TypeScript : une direction visuelle éditoriale, un thème sombre et une attention portée au RGAA.",
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
