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
    items: [
      "C#",
      "Angular",
      "Java",
      "Spring Boot",
      "React",
      "Swift",
      "Terraform",
      "Ansible",
      "PostgreSQL",
      "SQL",
      "Git",
      "Selenium",
      "Cucumber",
      "Tests automatisés",
      "Tests fonctionnels",
    ],
  },
  {
    id: "projets-personnels",
    title: "Projets personnels",
    items: [
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express",
      "HTML",
      "CSS",
      "REST API",
      "Jest",
      "MySQL",
      "MongoDB",
      "Swagger",
      "Figma",
    ],
  },
  {
    id: "en-apprentissage",
    title: "En apprentissage",
    items: ["Next.js", "NestJS", "Docker", "IA générative (Claude Code, Codex, Gemini)"],
  },
];
