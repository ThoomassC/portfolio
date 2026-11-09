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
    // Ordre : langages et frameworks, données, infrastructure et outillage, qualité.
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
      "PostgreSQL",
      "MySQL",
      "MariaDB",
      "MongoDB",
      "SQL",
      "Redis",
      "Kafka",
      "Keycloak",
      "Docker",
      "Terraform",
      "Ansible",
      "Azure DevOps",
      "Git",
      "SonarQube",
      "Figma",
      "Selenium",
      "Cucumber",
      "Jest",
      "Tests automatisés",
      "Tests fonctionnels",
    ],
  },
  {
    id: "projets-personnels",
    title: "Projets personnels",
    // Vidé le 2026-11-09 : la technique est passée dans l'expérience professionnelle.
    // Accueillera les compétences de gestion de projet tenues sur les projets perso ;
    // un groupe vide n'est pas affiché.
    items: [],
  },
  {
    id: "en-apprentissage",
    title: "En apprentissage",
    items: ["IA générative (Claude Code, Codex, Gemini)"],
  },
];
