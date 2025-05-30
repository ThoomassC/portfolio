// src/pages/Projects.tsx
import {
  Container,
  Title,
  SimpleGrid,
  Paper,
  Text,
  Stack,
} from "@mantine/core";

const projects = [
  {
    title: "Application de gestion d'argent",
    description:
      "Application en cours de développement pour gérer son budget personnel, avec architecture hexagonale.",
    date: "2024",
  },
  {
    title: "Sites Web & APIs",
    description:
      "Création de plusieurs sites web dynamiques avec React et Node.js, en respectant les principes Clean Architecture.",
    date: "2022–2024",
  },
  {
    title: "GameJam Rouen Métropole",
    description:
      "Participation à la GameJam 2024 avec création d’un mini-jeu vidéo en équipe, sur un thème imposé en 48h.",
    date: "Mars 2024",
  },
];

const Project = () => {
  return (
    <Container size="md" py="xl">
      <Title
        order={2}
        ta="center"
        mb="xl"
        className="fade-animated-skill fade-delay-1"
        style={{
          background: "linear-gradient(90deg, #1e3a8a, #9333ea)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
          fontSize: "2rem",
        }}
      >
        Mes Projets
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {projects.map((project, index) => (
          <Paper
            key={index}
            withBorder
            radius="md"
            p="md"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
            }}
          >
            <Stack gap="xs">
              <Title order={4} style={{ color: "#1e3a8a" }}>
                {project.title}
              </Title>
              <Text size="xs" c="dimmed">
                {project.date}
              </Text>
              <Text size="sm">{project.description}</Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Project;
