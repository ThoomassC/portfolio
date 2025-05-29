// src/pages/Contact.tsx
import {
  Container,
  Title,
  Stack,
  Group,
  Text,
  ActionIcon,
  Paper,
} from "@mantine/core";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMapPin,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";

const Contact = () => {
  return (
    <Container size="xs" py="xl">
      <Paper
        withBorder
        p="xl"
        radius="lg"
        style={{
          backdropFilter: "blur(8px)",
          background: "rgba(255, 255, 255, 0.6)",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Stack align="center" gap="lg">
          <Title order={2} style={{ color: "#1e3a8a" }}>
            Me contacter
          </Title>

          <Group>
            <IconMail size={20} />
            <Text size="sm">caronthomas27@gmail.com</Text>
          </Group>

          <Group>
            <IconPhone size={20} />
            <Text size="sm">07 83 52 37 85</Text>
          </Group>

          <Group>
            <IconMapPin size={20} />
            <Text size="sm">Mont-Saint-Aignan</Text>
          </Group>

          <Group gap="xl" mt="md">
            <ActionIcon
              component="a"
              href="https://www.linkedin.com/in/thomas-caron27/"
              target="_blank"
              size="lg"
              variant="transparent"
              style={{
                color: "#0a66c2",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={28} stroke={1.5} />
            </ActionIcon>

            <ActionIcon
              component="a"
              href="https://github.com/ThoomassC"
              target="_blank"
              size="lg"
              variant="transparent"
              style={{
                color: "#171515",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              aria-label="GitHub"
            >
              <IconBrandGithub size={28} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Contact;
