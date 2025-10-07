import { Container, Title, Paper, Stack, Text, Group, Button, Box } from "@mantine/core";
import { IconArrowLeft, IconDeviceGamepad2, IconCode } from "@tabler/icons-react";
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
      "Participation à la GameJam 2024 avec création d'un mini-jeu vidéo en équipe, sur un thème imposé en 48h.",
    date: "Janvier 2024",
  },
  {
    title: "Portfolio Personnel",
    description: "Création d'un portfolio personnel pour présenter mes projets et compétences.",
    date: "2025",
  },
];

const Project = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "project-styles";
    style.innerHTML = `
      @keyframes fadeSlideProject {
        0% { 
          opacity: 0; 
          transform: translateY(30px) scale(0.98);
        }
        100% { 
          opacity: 1; 
          transform: translateY(0) scale(1);
        }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }

      @keyframes bubble {
        0%, 100% {
          transform: translateY(0) scale(1);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-20px) scale(1.05);
          opacity: 0.8;
        }
      }

      .fade-animated-proj {
        animation: fadeSlideProject 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }

      .project-glass-card {
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
      }

      .project-glass-card:hover {
        transform: translateY(-8px) scale(1.02) !important;
        box-shadow: 
          0 20px 60px rgba(99, 102, 241, 0.25),
          inset 0 1px 2px rgba(255, 255, 255, 0.95),
          inset 0 -1px 2px rgba(0, 0, 0, 0.05) !important;
      }

      .project-icon {
        transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .project-glass-card:hover .project-icon {
        transform: rotate(360deg) scale(1.15);
      }

      .floating-orb {
        animation: float 8s ease-in-out infinite;
      }

      .floating-bubble {
        animation: bubble 6s ease-in-out infinite;
      }

      .fade-proj-1 { animation-delay: 0.1s; }
      .fade-proj-2 { animation-delay: 0.25s; }
      .fade-proj-3 { animation-delay: 0.4s; }
      .fade-proj-4 { animation-delay: 0.55s; }
      .fade-proj-5 { animation-delay: 0.7s; }
      .fade-proj-6 { animation-delay: 0.85s; }
      .fade-proj-7 { animation-delay: 1s; }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById("project-styles");
      if (styleToRemove) {
        document.head.removeChild(styleToRemove);
      }
    };
  }, []);

  return (
    <Container
      size="lg"
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "2rem 1rem",
      }}
    >
      <Box
        className="floating-orb floating-bubble"
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 70%)",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.7,
        }}
      />
      <Box
        className="floating-orb floating-bubble"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "8%",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.1) 40%, transparent 70%)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
          animationDelay: "3s",
          opacity: 0.7,
        }}
      />

      <Stack gap="xl" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Title
          order={1}
          ta="center"
          className="fade-animated-proj fade-proj-1"
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            background: "linear-gradient(135deg, #1e3a8a 0%, #9333ea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          Mes Projets
        </Title>

        <Stack gap="lg">
          {projects.map((project, index) => (
            <Paper
              key={index}
              withBorder
              radius="xl"
              p="xl"
              className={`project-glass-card fade-animated-proj fade-proj-${index + 2}`}
              style={{
                opacity: 0,
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(20px) saturate(150%)",
                WebkitBackdropFilter: "blur(20px) saturate(150%)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
                boxShadow: `
                  0 8px 32px rgba(99, 102, 241, 0.12),
                  inset 0 1px 1px rgba(255, 255, 255, 0.9),
                  inset 0 -1px 1px rgba(0, 0, 0, 0.05)
                `,
              }}
            >
              <Group align="flex-start" gap="lg" wrap="nowrap">
                <Box
                  className="project-icon"
                  style={{
                    background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                    borderRadius: "12px",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
                    flexShrink: 0,
                  }}
                >
                  {project.title.includes("Game") ? (
                    <IconDeviceGamepad2 size={28} color="white" />
                  ) : (
                    <IconCode size={28} color="white" />
                  )}
                </Box>
                <div style={{ flex: 1 }}>
                  <Text
                    fw={700}
                    size="lg"
                    mb={4}
                    style={{
                      background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {project.title}
                  </Text>
                  <Text size="xs" c="dimmed" fw={600} mb={8}>
                    {project.date}
                  </Text>
                  <Text size="sm" c="dimmed" fw={500}>
                    {project.description}
                  </Text>
                </div>
              </Group>
            </Paper>
          ))}
        </Stack>

        <Stack align="center" mt="lg">
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 135 }}
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => navigate("/")}
            className={`fade-animated-proj fade-proj-${projects.length + 2}`}
            size="md"
            radius="xl"
            style={{
              boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
            }}
          >
            Retour à l'accueil
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Project;
