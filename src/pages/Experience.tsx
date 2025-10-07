import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Group,
  Divider,
  Badge,
  Button,
  Box,
} from "@mantine/core";
import { IconBriefcase, IconSchool, IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

const Experience = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "experience-styles";
    style.innerHTML = `
      @keyframes fadeSlideExp {
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

      .fade-animated-exp {
        animation: fadeSlideExp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }

      .exp-glass-card {
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
      }

      .exp-glass-card:hover {
        transform: translateY(-6px) scale(1.02) !important;
        box-shadow: 
          0 20px 60px rgba(99, 102, 241, 0.25),
          inset 0 1px 2px rgba(255, 255, 255, 0.95),
          inset 0 -1px 2px rgba(0, 0, 0, 0.05) !important;
      }

      .exp-icon {
        transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .exp-glass-card:hover .exp-icon {
        transform: rotate(360deg) scale(1.15);
      }

      .floating-orb {
        animation: float 8s ease-in-out infinite;
      }

      .floating-bubble {
        animation: bubble 6s ease-in-out infinite;
      }

      .fade-exp-1 { animation-delay: 0.1s; }
      .fade-exp-2 { animation-delay: 0.25s; }
      .fade-exp-3 { animation-delay: 0.4s; }
      .fade-exp-4 { animation-delay: 0.55s; }
      .fade-exp-5 { animation-delay: 0.7s; }
      .fade-exp-6 { animation-delay: 0.85s; }
      .fade-exp-7 { animation-delay: 1s; }
      .fade-exp-8 { animation-delay: 1.15s; }
      .fade-exp-9 { animation-delay: 1.3s; }
      .fade-exp-10 { animation-delay: 1.45s; }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById("experience-styles");
      if (styleToRemove) {
        document.head.removeChild(styleToRemove);
      }
    };
  }, []);

  const experiences = [
    {
      title: "Alternant Développeur Informatique — Linkt",
      date: "Septembre 2022 — Septembre 2025",
      description:
        "Participation au développement d'un outil de production. Maintenabilité de l'application, évolution, mise en production, résolution de bugs et développement de nouvelles fonctionnalités.",
    },
    {
      title: "Chef de projet annexe — Linkt",
      date: "Septembre 2022 — Septembre 2024",
      description: (
        <ul style={{ margin: 0, paddingLeft: "1.2em", textAlign: "left" }}>
          <li>
            Gestion de deux projets annexes en tant que Chef de Projet. Organisation des tâches,
            suivi de l'avancement, gestion des ressources et communication avec les parties
            prenantes.
          </li>
          <li>Gestion d'une équipe de 5 alternants avec 2 référents de projets non alternants.</li>
        </ul>
      ),
    },
  ];

  const formations = [
    {
      label: "BAC +2 Développeur Informatique",
      badge: "Obtenu",
      badgeColor: "teal",
      description: "École CESI",
    },
    {
      label: "BAC +3 Concepteur Développeur d'Applications",
      badge: "Obtenu",
      badgeColor: "teal",
      description: "École CESI",
    },
    {
      label:
        "BAC +5 Manager en Architectures et Applications Logicielles des Systèmes d'Information",
      badge: "En cours d'obtention",
      badgeColor: "orange",
      description: "École CESI",
    },
    {
      label: "OpenClassRoom & Udemy",
      badge: "Suivi",
      badgeColor: "blue",
      description: "Formations complémentaires en ligne",
    },
  ];

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
          top: "10%",
          right: "8%",
          width: "350px",
          height: "350px",
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
          bottom: "15%",
          left: "10%",
          width: "400px",
          height: "400px",
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
      <Box
        className="floating-bubble"
        style={{
          position: "absolute",
          top: "50%",
          right: "15%",
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
          animationDelay: "1.5s",
          opacity: 0.5,
        }}
      />

      <Stack gap="xl" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Title
          order={1}
          ta="center"
          className="fade-animated-exp fade-exp-1"
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
          Mon Parcours
        </Title>

        {isDesktop ? (
          <Group align="flex-start" gap="xl" style={{ alignItems: "stretch" }}>
            <Stack style={{ flex: 1 }}>
              <Title
                order={3}
                ta="center"
                mb="md"
                className="fade-animated-exp fade-exp-2"
                style={{
                  background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Expériences
              </Title>
              {experiences.map((exp, index) => (
                <Paper
                  key={index}
                  withBorder
                  radius="xl"
                  p="lg"
                  className={`exp-glass-card fade-animated-exp fade-exp-${index + 3}`}
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
                  <Group align="flex-start" gap="md" wrap="nowrap">
                    <Box
                      className="exp-icon"
                      style={{
                        background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                        borderRadius: "12px",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
                        flexShrink: 0,
                      }}
                    >
                      <IconBriefcase size={24} color="white" />
                    </Box>
                    <div style={{ flex: 1 }}>
                      <Text
                        fw={700}
                        size="md"
                        mb={4}
                        style={{
                          background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {exp.title}
                      </Text>
                      <Text size="xs" c="dimmed" fw={600} mb={8}>
                        {exp.date}
                      </Text>
                      <Text size="sm" c="dimmed" fw={500}>
                        {exp.description}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </Stack>

            <Divider
              orientation="vertical"
              className="fade-animated-exp fade-exp-2"
              style={{
                height: "auto",
                alignSelf: "stretch",
                borderColor: "#7c3aed",
                opacity: 0.3,
                borderWidth: 2,
              }}
            />

            <Stack style={{ flex: 1 }}>
              <Title
                order={3}
                ta="center"
                mb="md"
                className="fade-animated-exp fade-exp-2"
                style={{
                  background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Formations
              </Title>
              {formations.map((formation, index) => (
                <Paper
                  key={index}
                  withBorder
                  radius="xl"
                  p="lg"
                  className={`exp-glass-card fade-animated-exp fade-exp-${index + 5}`}
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
                  <Group align="flex-start" gap="md" wrap="nowrap">
                    <Box
                      className="exp-icon"
                      style={{
                        background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                        borderRadius: "12px",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
                        flexShrink: 0,
                      }}
                    >
                      <IconSchool size={24} color="white" />
                    </Box>
                    <div style={{ flex: 1 }}>
                      <Text
                        fw={700}
                        size="md"
                        mb={8}
                        style={{
                          background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {formation.label}
                      </Text>
                      <Badge color={formation.badgeColor} variant="light" size="sm" mb={8}>
                        {formation.badge}
                      </Badge>
                      <Text size="sm" c="dimmed" fw={500}>
                        {formation.description}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Group>
        ) : (
          <>
            <Title
              order={3}
              ta="center"
              mb="md"
              className="fade-animated-exp fade-exp-2"
              style={{
                background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Expériences
            </Title>
            <Stack gap="md">
              {experiences.map((exp, index) => (
                <Paper
                  key={index}
                  withBorder
                  radius="xl"
                  p="lg"
                  className={`exp-glass-card fade-animated-exp fade-exp-${index + 3}`}
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
                  <Group align="flex-start" gap="md" wrap="nowrap">
                    <Box
                      className="exp-icon"
                      style={{
                        background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                        borderRadius: "12px",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
                        flexShrink: 0,
                      }}
                    >
                      <IconBriefcase size={24} color="white" />
                    </Box>
                    <div style={{ flex: 1 }}>
                      <Text
                        fw={700}
                        size="md"
                        mb={4}
                        style={{
                          background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {exp.title}
                      </Text>
                      <Text size="xs" c="dimmed" fw={600} mb={8}>
                        {exp.date}
                      </Text>
                      <Text size="sm" c="dimmed" fw={500}>
                        {exp.description}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </Stack>

            <Divider
              my="xl"
              className="fade-animated-exp fade-exp-5"
              style={{
                borderColor: "#7c3aed",
                opacity: 0.3,
                borderWidth: 2,
              }}
            />

            <Title
              order={3}
              ta="center"
              mb="md"
              className="fade-animated-exp fade-exp-6"
              style={{
                background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Formations
            </Title>
            <Stack gap="md">
              {formations.map((formation, index) => (
                <Paper
                  key={index}
                  withBorder
                  radius="xl"
                  p="lg"
                  className={`exp-glass-card fade-animated-exp fade-exp-${index + 7}`}
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
                  <Group align="flex-start" gap="md" wrap="nowrap">
                    <Box
                      className="exp-icon"
                      style={{
                        background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                        borderRadius: "12px",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
                        flexShrink: 0,
                      }}
                    >
                      <IconSchool size={24} color="white" />
                    </Box>
                    <div style={{ flex: 1 }}>
                      <Text
                        fw={700}
                        size="md"
                        mb={8}
                        style={{
                          background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {formation.label}
                      </Text>
                      <Badge color={formation.badgeColor} variant="light" size="sm" mb={8}>
                        {formation.badge}
                      </Badge>
                      <Text size="sm" c="dimmed" fw={500}>
                        {formation.description}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </>
        )}

        <Stack align="center" mt="lg">
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 135 }}
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => navigate("/")}
            className="fade-animated-exp fade-exp-10"
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

export default Experience;
