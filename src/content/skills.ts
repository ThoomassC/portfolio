import type { SkillGroup } from "./types";

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "experience-professionnelle",
    title: "Expérience professionnelle",
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
      "Claude Code",
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
    items: ["Next.js", "NestJS", "Docker", "Codex", "Gemini"],
  },
];
