import type { SkillGroup } from "./types";

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "experience-professionnelle",
    title: "Expérience professionnelle",
    // Gestion de projet en tête, reprise du CV : c'est le cap visé par le Mastère.
    featured: {
      label: "Gestion de projet",
      items: ["Scrum / Agile", "Jira", "Planification", "Animation d’équipe", "Recette / tests QA"],
    },
    families: [
      {
        label: "Langages et frameworks",
        items: [
          "C#",
          "Java",
          "Spring Boot",
          "Quarkus",
          "PHP",
          "Symfony",
          "Python",
          "JavaScript",
          "TypeScript",
          "Node.js",
          "Express",
          "NestJS",
          "Angular",
          "React",
          "Next.js",
          "Vue.js",
          "Swift",
          "HTML",
          "CSS",
          "REST API",
          "Swagger",
        ],
      },
      {
        label: "Données",
        items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "SQL", "Redis", "Kafka"],
      },
      {
        label: "Infrastructure et outils",
        items: [
          "Keycloak",
          "Docker",
          "Terraform",
          "Ansible",
          "Azure DevOps",
          "Git",
          "SonarQube",
          "Figma",
        ],
      },
      {
        label: "Qualité",
        items: ["Selenium", "Cucumber", "Jest", "Tests automatisés", "Tests fonctionnels"],
      },
    ],
    items: [],
  },
  {
    id: "projets-personnels",
    title: "Projets personnels",
    // Gestion de projet tenue seul sur les projets perso, chaque point visible dans
    // un projet du portfolio (choix de Thomas le 2026-11-09). La technique de ces
    // projets est rangée dans l'expérience professionnelle.
    featured: {
      label: "Gestion de projet",
      items: [
        "Cadrage et expression du besoin",
        "Roadmap et gestion des versions",
        "Priorisation et MVP",
        "Mise en production continue",
        "Recette et assurance qualité",
        "Accessibilité (WCAG / RGAA)",
        "Documentation et notes de version",
        "Suivi d’activité et reporting",
      ],
    },
    items: [],
  },
  {
    id: "en-apprentissage",
    title: "En apprentissage",
    items: ["IA générative (Claude Code, Codex, Gemini)"],
  },
];
