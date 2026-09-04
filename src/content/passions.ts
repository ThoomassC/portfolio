import { IconCode, IconLanguage, IconLifebuoy, IconSwimming } from "@tabler/icons-react";

import { profile } from "./profile";
import type { Passion } from "./types";

/**
 * L'ORDRE PORTE LE SENS et ne doit pas être trié : la natation ouvre, le sauvetage la
 * suit immédiatement parce que la première nourrit le second. Ce sont des pratiques
 * régulières orientées vers un objectif, pas une liste de loisirs.
 */
export const passions: readonly Passion[] = [
  {
    id: "natation",
    title: "Natation",
    description: "Je nage beaucoup, et régulièrement. C’est la pratique qui tient tout le reste.",
    icon: IconSwimming,
    links: [],
  },
  {
    id: "sauvetage-en-mer",
    title: "Sauvetage en mer",
    /**
     * PROJET EN COURS, JAMAIS UNE QUALIFICATION ACQUISE. La formation SNSM n'est pas
     * commencée : toute reformulation qui laisserait entendre « sauveteur », « formé »
     * ou « bénévole à la SNSM » serait un mensonge, et sur un sujet où il engage la
     * sécurité de tiers. `src/app.test.tsx` verrouille ce point.
     */
    description:
      "Je prépare mon entrée en formation à la SNSM, pour mettre cette pratique au service de quelque chose.",
    icon: IconLifebuoy,
    links: [],
  },
  {
    id: "projets-personnels",
    title: "Projets personnels",
    description:
      "Ce portfolio, et d’autres projets que je construis pour apprendre ce que le travail quotidien ne m’apprend pas.",
    icon: IconCode,
    links: [{ label: "Mes dépôts sur GitHub", href: profile.gitHubUrl }],
  },
  {
    id: "anglais",
    title: "Anglais",
    description:
      "Duolingo au quotidien, des cours particuliers, et des voyages pour la pratique réelle.",
    icon: IconLanguage,
    links: [],
  },
];
