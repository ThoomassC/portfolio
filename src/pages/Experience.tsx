import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Group,
  Divider,
  Badge,
} from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";
import { useEffect } from "react";

const Experience = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeSlideExp {
        0% { opacity: 0; transform: translateY(30px) scale(0.92);}
        100% { opacity: 1; transform: translateY(0) scale(1);}
      }
      .fade-animated-exp { animation: fadeSlideExp 1s ease-out forwards; opacity: 0; }
      .fade-exp-1 { animation-delay: 0.2s; }
      .fade-exp-2 { animation-delay: 0.5s; }
      .fade-exp-3 { animation-delay: 0.8s; }
      .fade-exp-4 { animation-delay: 1.1s; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <Container
      size="md"
      py="xl"
      style={{
        marginTop: "3.5rem",
        marginBottom: "3.5rem",
      }}
    >
      {" "}
      <Title
        order={2}
        mb="xl"
        style={{ color: "#1e3a8a", textAlign: "center" }}
        className="fade-animated-exp fade-exp-1"
      >
        Mon parcours professionnel
      </Title>
      <Stack gap="lg">
        {/* Expérience principale */}
        <Paper
          withBorder
          p="md"
          radius="md"
          className="fade-animated-exp fade-exp-2"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Group
            align="center"
            mb="xs"
            style={{
              flexWrap: "wrap",
              gap: 8,
              flexDirection: "row",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                flex: "0 0 auto",
              }}
            >
              <IconBriefcase size={20} />
            </span>
            <Text
              fw={500}
              style={{
                display: "flex",
                alignItems: "center",
                minWidth: 0,
                flex: "1 1 0%",
                wordBreak: "break-word",
              }}
            >
              Alternant Développeur Informatique — Linkt
            </Text>
          </Group>
          <Text size="xs" c="dimmed" mb="xs">
            Septembre 2022 — Septembre 2025
          </Text>
          <Text size="sm">
            Participation au développement d’un outil de production et gestion
            de deux projets annexes en tant que Chef de Projet.
          </Text>
        </Paper>

        {/* Projets personnels */}
        <Paper
          withBorder
          p="md"
          radius="md"
          className="fade-animated-exp fade-exp-3"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Group
            align="center"
            mb="xs"
            style={{
              flexWrap: "wrap",
              gap: 8,
              flexDirection: "row",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                flex: "0 0 auto",
              }}
            >
              <IconBriefcase size={20} />
            </span>
            <Text
              fw={500}
              style={{
                display: "flex",
                alignItems: "center",
                minWidth: 0,
                flex: "1 1 0%",
                wordBreak: "break-word",
              }}
            >
              Projets personnels
            </Text>
          </Group>
          <Text size="xs" c="dimmed" mb="xs">
            Depuis 2022
          </Text>
          <Text size="sm">
            Création de sites web, APIs (architecture hexagonale), application
            de gestion d’argent, participation à la GameJam Rouen Métropole
            2024.
          </Text>
        </Paper>
      </Stack>
      <Divider my="xl" className="fade-animated-exp fade-exp-4" />
      {/* Formation */}
      <Title
        order={3}
        mt="xl"
        mb="md"
        style={{ color: "#1e3a8a", textAlign: "center" }}
        className="fade-animated-exp fade-exp-4"
      >
        Formations
      </Title>
      <Stack gap="md">
        <Paper
          withBorder
          p="sm"
          radius="md"
          className="fade-animated-exp fade-exp-4"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            position: "relative",
            minHeight: 70,
          }}
        >
          <Badge
            color="teal"
            variant="light"
            size="sm"
            style={{
              position: "absolute",
              top: 8,
              right: 12,
              zIndex: 1,
            }}
          >
            Obtenu
          </Badge>
          <Text fw={500} mb={2}>
            BAC +2 Développeur Informatique
          </Text>
          <Text size="sm" c="dimmed">
            École CESI
          </Text>
        </Paper>
        <Paper
          withBorder
          p="sm"
          radius="md"
          className="fade-animated-exp fade-exp-4"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            position: "relative",
            minHeight: 70,
          }}
        >
          <Badge
            color="orange"
            variant="light"
            size="sm"
            style={{
              position: "absolute",
              top: 8,
              right: 12,
              zIndex: 1,
            }}
          >
            En cours d'obtention
          </Badge>
          <Text fw={500} mb={2}>
            BAC +3 Concepteur Développeur d'Applications
          </Text>
          <Text size="sm" c="dimmed">
            École CESI
          </Text>
        </Paper>
        <Paper
          withBorder
          p="sm"
          radius="md"
          className="fade-animated-exp fade-exp-4"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            position: "relative",
            minHeight: 70,
          }}
        >
          <Badge
            color="blue"
            variant="light"
            size="sm"
            style={{
              position: "absolute",
              top: 8,
              right: 12,
              zIndex: 1,
            }}
          >
            Suivi
          </Badge>
          <Text fw={500} mb={2}>
            OpenClassRoom & Udemy
          </Text>
          <Text size="sm" c="dimmed">
            Formations complémentaires en ligne
          </Text>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Experience;
