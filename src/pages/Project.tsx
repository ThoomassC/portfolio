import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Group,
  Button,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconDeviceGamepad2,
  IconCode,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    date: "Janvier 2024",
  },
  {
    title: "Portfolio Personnel",
    description:
      "Création d'un portfolio personnel pour présenter mes projets et compétences.",
    date: "2025",
  },
];

const Project = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeSlideProject {
        0% { opacity: 0; transform: translateY(30px) scale(0.92); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      .fade-animated-proj { animation: fadeSlideProject 1s ease-out forwards; opacity: 0; }
      .fade-proj-1 { animation-delay: 0.1s; }
      .fade-proj-2 { animation-delay: 0.2s; }
      .fade-proj-3 { animation-delay: 0.3s; }
      .fade-proj-4 { animation-delay: 0.4s; }
      .fade-proj-5 { animation-delay: 0.5s; }
      .fade-proj-6 { animation-delay: 0.6s; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <Container
      size="md"
      py="xl"
      style={{ marginTop: "3.5rem", marginBottom: "3.5rem" }}
    >
      <Title
        order={2}
        ta="center"
        mb="xl"
        className="fade-animated-proj fade-proj-1"
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

      <Stack gap="md">
        {projects.map((project, index) => (
          <Paper
            key={index}
            withBorder
            radius="md"
            p="md"
            className={`fade-animated-proj fade-proj-${index + 2}`}
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
            <Group align="center" gap={8} mb="xs">
              {(project.title.includes("Game") && (
                <IconDeviceGamepad2 size={20} />
              )) || <IconCode size={20} />}
              <Text fw={500}>{project.title}</Text>
            </Group>
            <Text size="xs" c="dimmed" mb={4}>
              {project.date}
            </Text>
            <Text size="sm">{project.description}</Text>
          </Paper>
        ))}
      </Stack>

      <Stack align="center" mt="xl">
        <Button
          variant="light"
          color="indigo"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate("/")}
          className={`fade-animated-proj fade-proj-${projects.length + 2}`}
          style={{
            borderRadius: 24,
            border: "2px solid #1e3a8a",
            paddingInline: 24,
          }}
        >
          Retour à l’accueil
        </Button>
      </Stack>
    </Container>
  );
};

export default Project;
