// src/pages/Contact.tsx
import {
  Container,
  Title,
  Stack,
  Group,
  Paper,
  Avatar,
  Button,
  Anchor,
} from "@mantine/core";
import {
  IconMapPin,
  IconMail,
  IconPhone,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <Container
      size="xs"
      py="xl"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        withBorder
        p="xl"
        radius="lg"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.4)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Stack align="center" gap="lg">
          <Avatar
            src="/assets/thomasca.jpg"
            size={100}
            radius="xl"
            alt="Thomas Caron"
            style={{ border: "2px solid #1e3a8a" }}
          />

          <Title order={2} style={{ color: "#1e3a8a", fontWeight: 600 }}>
            Me contacter
          </Title>

          <Group gap="xs">
            <IconMail size={20} />
            <Anchor
              href="mailto:caronthomas27@gmail.com"
              size="sm"
              underline="hover"
              c="indigo"
            >
              caronthomas27@gmail.com
            </Anchor>
          </Group>

          <Group gap="xs">
            <IconPhone size={20} />
            <Anchor
              href="tel:+33783523785"
              size="sm"
              underline="hover"
              c="indigo"
            >
              07 83 52 37 85
            </Anchor>
          </Group>

          <Group gap="xs" mb="sm">
            <IconMapPin size={20} />
            <Anchor
              href="https://www.google.com/maps?q=Mont-Saint-Aignan"
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              underline="hover"
              c="indigo"
            >
              Mont-Saint-Aignan, 76130, France
            </Anchor>
          </Group>

          <Button
            mt="md"
            variant="light"
            color="indigo"
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => navigate("/")}
          >
            Retour à l’accueil
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Contact;
