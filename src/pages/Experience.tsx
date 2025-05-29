// src/pages/Experience.tsx
import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Group,
  Divider,
} from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";

const Experience = () => {
  return (
    <Container size="md" py="xl">
      <Title
        order={2}
        mb="xl"
        style={{ color: "#1e3a8a", textAlign: "center" }}
      >
        Mon parcours professionnel
      </Title>

      <Stack gap="lg">
        {/* Expérience principale */}
        <Paper
          withBorder
          p="md"
          radius="md"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Group align="center" mb="xs">
            <IconBriefcase size={20} />
            <Text fw={500}>Alternant Développeur Informatique — Linkt</Text>
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
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Group align="center" mb="xs">
            <IconBriefcase size={20} />
            <Text fw={500}>Projets personnels</Text>
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

      <Divider my="xl" />

      {/* Formation */}
      <Title
        order={3}
        mt="xl"
        mb="md"
        style={{ color: "#1e3a8a", textAlign: "center" }}
      >
        Formation
      </Title>
      <Paper
        withBorder
        p="md"
        radius="md"
        style={{
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Text fw={500}>
          BAC général (mention) · BAC+2 Développeur Informatique · BAC+3 en
          cours
        </Text>
        <Text size="sm" c="dimmed">
          École CESI
        </Text>
      </Paper>
    </Container>
  );
};

export default Experience;
