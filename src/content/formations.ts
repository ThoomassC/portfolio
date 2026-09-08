import type { Formation } from "./types";

export const formations: readonly Formation[] = [
  {
    title: "Mastère Spécialisé",
    level: "Bac +6",
    status: "À venir",
    statusType: "upcoming",
  },
  {
    title: "Manager en architectures et applications logicielles des SI",
    level: "Bac +5",
    status: "En cours",
    statusType: "in-progress",
  },
  {
    title: "Concepteur développeur d’applications",
    level: "Bac +3",
    status: "Obtenu",
    statusType: "completed",
  },
  {
    title: "Développeur informatique",
    level: "Bac +2",
    status: "Obtenu",
    statusType: "completed",
  },
];
