import { IconBriefcase, IconCode } from "@tabler/icons-react";

import type { Experience } from "./types";

/**
 * Timeline inversée à tous les niveaux : le poste le plus récent ouvre le parcours,
 * et dans chaque poste la mission la plus récente ouvre la frise.
 */
export const experiences: readonly Experience[] = [
  {
    company: "Blue Soft",
    title: "Développeur Full Stack & QA en alternance",
    range: {
      start: { label: "Octobre 2025", dateTime: "2025-10" },
      end: { label: "Septembre 2027", dateTime: "2027-09" },
    },
    icon: IconBriefcase,
    stack: [],
    missions: [
      {
        title: "Développement et TMA — plateforme de radiologie médicale",
        range: {
          start: { label: "Septembre 2026", dateTime: "2026-09" },
          // Mission en cours : pas de borne de fin.
        },
        description:
          "Participation au développement d’une plateforme de radiologie médicale et maintenance applicative (TMA).",
        stack: [],
      },
      {
        title: "Infrastructure et développement — plateforme de transport de colis",
        range: {
          start: { label: "Août 2026", dateTime: "2026-08" },
          end: { label: "Septembre 2026", dateTime: "2026-09" },
        },
        description:
          "Conception de l’infrastructure d’une application de transport de colis et développement de la plateforme, du provisionnement jusqu’aux écrans.",
        stack: ["Terraform", "Ansible", "Spring Boot", "React", "PostgreSQL", "Claude Code"],
      },
      {
        title: "QA et tests automatisés — Java",
        range: {
          start: { label: "Février 2026", dateTime: "2026-02" },
          end: { label: "Août 2026", dateTime: "2026-08" },
        },
        description:
          "Conception et maintenance de tests avec Selenium et Cucumber sur deux projets.",
        stack: ["Java", "Selenium", "Cucumber", "CI"],
      },
      {
        title: "Développement iOS — Swift",
        range: {
          start: { label: "Décembre 2025", dateTime: "2025-12" },
          end: { label: "Février 2026", dateTime: "2026-02" },
        },
        description: "Développement au sein d’une cellule de sprint pour une application iOS.",
        stack: ["Swift", "Xcode"],
      },
      {
        title: "TMA full-stack — C# et Angular",
        range: {
          start: { label: "Octobre 2025", dateTime: "2025-10" },
          end: { label: "Décembre 2025", dateTime: "2025-12" },
        },
        description:
          "Résolution de bugs sur une application en microservices, côté back-end et front-end.",
        stack: ["C#", ".NET", "Angular", "Microservices"],
      },
    ],
  },
  {
    company: "Linkt",
    title: "Développeur et chef de projet en alternance",
    range: {
      start: { label: "Septembre 2022", dateTime: "2022-09" },
      end: { label: "Septembre 2025", dateTime: "2025-09" },
    },
    icon: IconCode,
    stack: [],
    missions: [
      {
        title: "Développeur informatique en alternance — outil de production",
        range: {
          start: { label: "Septembre 2022", dateTime: "2022-09" },
          end: { label: "Septembre 2025", dateTime: "2025-09" },
        },
        description:
          "Participation au développement et à l’évolution d’un outil de production : amélioration de la maintenabilité, mises en production, correction d’anomalies et développement de fonctionnalités.",
        stack: ["React", "JavaScript", "SQL", "Git", "Architecture hexagonale"],
      },
      {
        title: "Chef de projet annexe — documentation d’un second outil interne",
        range: {
          start: { label: "2023", dateTime: "2023" },
          end: { label: "2024", dateTime: "2024" },
        },
        description:
          "Même démarche sur un autre outil interne : pilotage d’un projet d’amélioration de sa documentation.",
        stack: [],
      },
      {
        title: "Chef de projet annexe — documentation de l’outil de production",
        range: {
          start: { label: "2022", dateTime: "2022" },
          end: { label: "2023", dateTime: "2023" },
        },
        description:
          "En parallèle du développement, pilotage d’un projet interne d’amélioration de la documentation de l’outil de production sur lequel je développais.",
        stack: [],
      },
    ],
  },
];
