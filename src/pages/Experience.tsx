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
} from "@mantine/core";
import { IconBriefcase, IconSchool, IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

const Experience = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // CSS animations Apple-style
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeSlideExp {
        0% { opacity: 0; transform: translateY(30px) scale(0.92);}
        100% { opacity: 1; transform: translateY(0) scale(1);}
      }

      .fade-animated-exp {
        animation: fadeSlideExp 1s ease-out forwards;
        opacity: 0;
      }

      .fade-exp-1 { animation-delay: 0.2s; }
      .fade-exp-2 { animation-delay: 0.4s; }
      .fade-exp-3 { animation-delay: 0.6s; }
      .fade-exp-4 { animation-delay: 0.8s; }
      .fade-exp-5 { animation-delay: 1s; }
      .fade-exp-6 { animation-delay: 1.2s; }
      .fade-exp-7 { animation-delay: 1.4s; }
    `;
    document.head.appendChild(style);
  }, []);

  const experiences = [
    {
      title: "Alternant Développeur Informatique — Linkt",
      date: "Septembre 2022 — Septembre 2025",
      description:
        "Participation au développement d’un outil de production et gestion de deux projets annexes en tant que Chef de Projet.",
    },
    {
      title: "Projets personnels",
      date: "Depuis 2022",
      description:
        "Création de sites web, APIs (architecture hexagonale), application de gestion d’argent, participation à la GameJam Rouen Métropole 2024.",
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
      size="md"
      py="xl"
      style={{ marginTop: "3.5rem", marginBottom: "3.5rem" }}
    >
      <Title
        order={2}
        mb="xl"
        style={{ color: "#1e3a8a", textAlign: "center" }}
        className="fade-animated-exp fade-exp-1"
      >
        Mon parcours
      </Title>

      {isDesktop ? (
        <Group
          align="flex-start"
          gap="xl"
          mt="xl"
          style={{ alignItems: "stretch" }}
        >
          {/* Expériences */}
          <Stack style={{ flex: 1.6 }} className="fade-animated-exp fade-exp-2">
            <Title order={3} style={{ color: "#1e3a8a", textAlign: "center" }}>
              Expériences
            </Title>
            {experiences.map((exp, index) => (
              <Paper
                key={index}
                withBorder
                p="md"
                radius="md"
                className={`fade-animated-exp fade-exp-${index + 3}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <Group align="center" gap={8} wrap="nowrap" mb="xs">
                  <IconBriefcase size={20} />
                  <Text fw={500}>{exp.title}</Text>
                </Group>
                <Text size="xs" c="dimmed" mb="xs">
                  {exp.date}
                </Text>
                <Text size="sm">{exp.description}</Text>
              </Paper>
            ))}
          </Stack>

          {/* Divider vertical */}
          <Divider
            orientation="vertical"
            style={{
              height: "auto",
              alignSelf: "stretch",
              borderColor: "#1e3a8a",
              opacity: 0.3,
              borderWidth: 2,
            }}
          />

          {/* Formations */}
          <Stack style={{ flex: 1.6 }} className="fade-animated-exp fade-exp-2">
            <Title order={3} style={{ color: "#1e3a8a", textAlign: "center" }}>
              Formations
            </Title>
            {formations.map((formation, index) => (
              <Paper
                key={index}
                withBorder
                p="md"
                radius="md"
                className={`fade-animated-exp fade-exp-${index + 5}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <Group
                  justify="space-between"
                  align="center"
                  mb="md"
                  wrap="wrap"
                >
                  <Group align="center" gap={8} wrap="nowrap">
                    <IconSchool size={20} />
                    <Text fw={500}>{formation.label}</Text>
                  </Group>
                  <Badge color={formation.badgeColor} variant="light" size="md">
                    {formation.badge}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  {formation.description}
                </Text>
              </Paper>
            ))}
          </Stack>
        </Group>
      ) : (
        <>
          <Title
            order={3}
            mt="xl"
            mb="md"
            style={{ color: "#1e3a8a", textAlign: "center" }}
            className="fade-animated-exp fade-exp-2"
          >
            Expériences
          </Title>
          <Stack gap="md">
            {experiences.map((exp, index) => (
              <Paper
                key={index}
                withBorder
                p="md"
                radius="md"
                className={`fade-animated-exp fade-exp-${index + 3}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <Group align="center" gap={8} wrap="nowrap" mb="xs">
                  <IconBriefcase size={20} />
                  <Text fw={500}>{exp.title}</Text>
                </Group>
                <Text size="xs" c="dimmed" mb="xs">
                  {exp.date}
                </Text>
                <Text size="sm">{exp.description}</Text>
              </Paper>
            ))}
          </Stack>

          <Divider my="xl" className="fade-animated-exp fade-exp-4" />

          <Title
            order={3}
            mt="xl"
            mb="md"
            style={{ color: "#1e3a8a", textAlign: "center" }}
            className="fade-animated-exp fade-exp-5"
          >
            Formations
          </Title>
          <Stack gap="md">
            {formations.map((formation, index) => (
              <Paper
                key={index}
                withBorder
                p="md"
                radius="md"
                className={`fade-animated-exp fade-exp-${index + 6}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <Stack gap={4} mb="xs">
                  <Group align="center" gap={8} wrap="wrap">
                    <IconSchool size={20} />
                    <Text fw={500}>{formation.label}</Text>
                  </Group>
                  <Badge
                    color={formation.badgeColor}
                    variant="light"
                    size="sm"
                    style={{ alignSelf: "flex-start" }}
                  >
                    {formation.badge}
                  </Badge>
                </Stack>
                <Text size="sm" c="dimmed">
                  {formation.description}
                </Text>
              </Paper>
            ))}
          </Stack>
        </>
      )}

      {/* Bouton retour */}
      <Stack align="center" mt="xl">
        <Button
          variant="light"
          color="indigo"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate("/")}
          className="fade-animated-exp fade-exp-7"
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

export default Experience;
