import type { NavigationItem } from "./types";

/** Dans l'ordre de la page : la navigation verticale suit la lecture. */
export const navigationItems: readonly NavigationItem[] = [
  { id: "competences", label: "Compétences" },
  { id: "parcours", label: "Parcours" },
  { id: "formations", label: "Formations" },
  { id: "projets", label: "Projets" },
  { id: "passions", label: "Passions" },
  { id: "contact", label: "Contact" },
];

/**
 * Référence stable : elle sert de dépendance à l'observateur de section active,
 * qui ne doit pas se réabonner à chaque rendu.
 */
export const navigationSectionIds: readonly string[] = navigationItems.map((item) => item.id);
