import type { Formation, Language } from "./types";

export const formations: readonly Formation[] = [
  {
    title: "Mastère Spécialisé® Manager de Portefeuille de Projets – Transition Numérique",
    level: "Bac +6",
    range: { start: { label: "2027", dateTime: "2027" }, end: { label: "2028", dateTime: "2028" } },
    status: "À venir",
    statusType: "upcoming",
  },
  {
    title: "Manager en architectures et applications logicielles des SI",
    highlight: "Scrum Master d’un projet de groupe de 4 personnes",
    level: "Bac +5",
    range: { start: { label: "2025", dateTime: "2025" }, end: { label: "2027", dateTime: "2027" } },
    status: "En cours",
    statusType: "in-progress",
  },
  {
    title: "Concepteur développeur d’applications",
    level: "Bac +3",
    range: { start: { label: "2024", dateTime: "2024" }, end: { label: "2025", dateTime: "2025" } },
    status: "Obtenu",
    statusType: "completed",
  },
  {
    title: "Développeur informatique",
    level: "Bac +2",
    range: { start: { label: "2022", dateTime: "2022" }, end: { label: "2024", dateTime: "2024" } },
    status: "Obtenu",
    statusType: "completed",
  },
];

export const languages: readonly Language[] = [
  { label: "Anglais", level: "B1" },
  { label: "Espagnol", level: "A2" },
];

/** PSC1 : premiers secours, prérequis utile au projet de formation SNSM. */
export const certifications: readonly string[] = ["PSC1", "Permis B"];
