import { IconBriefcase, IconCode } from "@tabler/icons-react";

import type { Experience } from "./types";

/** Timeline inversée : la mission en cours ouvre le parcours. */
export const experiences: readonly Experience[] = [
  {
    company: "Blue Soft",
    title: "Développeur Full Stack",
    range: {
      start: { label: "Octobre 2025", dateTime: "2025-10" },
      end: { label: "Septembre 2027", dateTime: "2027-09" },
    },
    description:
      "Quatre missions successives couvrant la maintenance applicative, le développement mobile, l’automatisation des tests, puis l’infrastructure et le développement d’une plateforme de transport de colis.",
    icon: IconBriefcase,
    stack: [],
    missions: [
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
        title: "Infrastructure et développement — plateforme de transport de colis",
        range: {
          start: { label: "Août 2026", dateTime: "2026-08" },
          // Mission en cours : pas de borne de fin.
        },
        description:
          "Conception de l’infrastructure d’une application de transport de colis et développement de la plateforme, du provisionnement jusqu’aux écrans.",
        stack: ["Terraform", "Ansible", "Spring Boot", "React", "PostgreSQL", "Claude Code"],
      },
    ],
  },
  {
    company: "Linkt",
    title: "Développeur informatique en alternance",
    range: {
      start: { label: "Septembre 2022", dateTime: "2022-09" },
      end: { label: "Septembre 2025", dateTime: "2025-09" },
    },
    description:
      "Participation au développement et à l’évolution d’un outil de production : amélioration de la maintenabilité, mises en production, correction d’anomalies et développement de fonctionnalités.",
    icon: IconCode,
    stack: ["C#", "SQL", "Git"],
    missions: [],
  },
];
