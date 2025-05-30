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
import { useEffect } from "react";

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeSlide {
        0% { opacity: 0; transform: translateY(30px) scale(0.92); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      .fade-animated { animation: fadeSlide 1s ease-out forwards; opacity: 0; }
      .fade-1 { animation-delay: 0.2s; }
      .fade-2 { animation-delay: 0.4s; }
      .fade-3 { animation-delay: 0.6s; }
      .fade-4 { animation-delay: 0.8s; }
      .fade-5 { animation-delay: 1.0s; }
      .fade-6 { animation-delay: 1.2s; }
      .fade-7 { animation-delay: 1.4s; }
    `;
    document.head.appendChild(style);
  }, []);

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
        className="fade-animated fade-1"
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
            size={200}
            radius="xl"
            alt="Thomas Caron"
            style={{ border: "2px solid #1e3a8a" }}
            className="fade-animated fade-2"
          />

          <Title
            order={2}
            style={{ color: "#1e3a8a", fontWeight: 600 }}
            className="fade-animated fade-3"
          >
            Me contacter
          </Title>

          <Group gap="xs" className="fade-animated fade-4">
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

          <Group gap="xs" className="fade-animated fade-5">
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

          <Group gap="xs" mb="sm" className="fade-animated fade-6">
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
            className="fade-animated fade-7"
            style={{
              borderRadius: 24,
              border: "2px solid indigo",
            }}
          >
            Retour à l’accueil
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Contact;
