import {
  Container,
  Title,
  Button,
  Box,
  Group,
  Center,
  Text,
} from "@mantine/core";
import { IconDownload, IconArrowLeft } from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cv = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeSlideCv {
        0% { opacity: 0; transform: translateY(30px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      .fade-animated-cv { animation: fadeSlideCv 1s ease-out forwards; opacity: 0; }
      .fade-cv-1 { animation-delay: 0.2s; }
      .fade-cv-2 { animation-delay: 0.4s; }
      .fade-cv-3 { animation-delay: 0.6s; }
      .fade-cv-4 { animation-delay: 0.8s; }
    `;
    document.head.appendChild(style);
  }, []);

  const cvPath = "/assets/CV_Thomas_MAALSI.pdf";

  return (
    <Container
      pt={{ base: "2rem", sm: "5rem" }}
      pb={{ base: "3rem", sm: "6rem" }}
    >
      <Title
        order={2}
        ta="center"
        mb="xl"
        className="fade-animated-cv fade-cv-1"
        style={{
          background: "linear-gradient(90deg, #1e3a8a, #9333ea)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
          fontSize: "2rem",
        }}
      >
        Mon Curriculum Vitae
      </Title>

      <Group justify="center" mb="xl" className="fade-animated-cv fade-cv-2">
        <Button
          component="a"
          href={cvPath}
          download="CV_Thomas_MAALSI.pdf"
          color="indigo"
          size="md"
          radius="xl"
          leftSection={<IconDownload size={20} />}
        >
          Télécharger le CV
        </Button>
      </Group>

      <Box
        className="fade-animated-cv fade-cv-3"
        visibleFrom="sm"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
          paddingTop: "106%",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
        }}
      >
        <iframe
          src={`${cvPath}#toolbar=0&navpanes=0`}
          title="CV de Thomas MAALSI"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </Box>

      <Text ta="center" c="dimmed" hiddenFrom="sm" mb="lg">
        La prévisualisation du CV est disponible sur un écran plus grand.
      </Text>

      <Center mt="xl" className="fade-animated-cv fade-cv-4">
        <Button
          variant="light"
          color="indigo"
          radius="xl"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate("/")}
          style={{
            paddingInline: 24,
            border: "2px solid #1e3a8a",
          }}
        >
          Retour à l’accueil
        </Button>
      </Center>
    </Container>
  );
};

export default Cv;
