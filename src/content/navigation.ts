import type { NavigationItem } from "./types";

export const navigationItems: readonly NavigationItem[] = [
  { id: "parcours", label: "Parcours" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "accessibilite", label: "Accessibilité" },
  { id: "contact", label: "Contact" },
];

/**
 * Référence stable : elle sert de dépendance à l'observateur de section active,
 * qui ne doit pas se réabonner à chaque rendu.
 */
export const navigationSectionIds: readonly string[] = navigationItems.map((item) => item.id);
