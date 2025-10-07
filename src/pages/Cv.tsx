import { Container, Title, Button, Box, Stack, Text, Paper } from "@mantine/core";
import { IconDownload, IconArrowLeft } from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cv = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "cv-styles";
    style.innerHTML = `
      @keyframes fadeSlideCv {
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

      .fade-animated-cv {
        animation: fadeSlideCv 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }

      .cv-glass-card {
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .cv-glass-card:hover {
        transform: translateY(-4px) scale(1.01) !important;
        box-shadow: 
          0 20px 60px rgba(99, 102, 241, 0.25),
          inset 0 1px 2px rgba(255, 255, 255, 0.95),
          inset 0 -1px 2px rgba(0, 0, 0, 0.05) !important;
      }

      .floating-orb {
        animation: float 8s ease-in-out infinite;
      }

      .floating-bubble {
        animation: bubble 6s ease-in-out infinite;
      }

      .fade-cv-1 { animation-delay: 0.1s; }
      .fade-cv-2 { animation-delay: 0.25s; }
      .fade-cv-3 { animation-delay: 0.4s; }
      .fade-cv-4 { animation-delay: 0.55s; }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById("cv-styles");
      if (styleToRemove) {
        document.head.removeChild(styleToRemove);
      }
    };
  }, []);

  const cvPath = "/assets/CV_Thomas_MAALSI.pdf";

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

      <Stack gap="xl" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Title
          order={1}
          ta="center"
          className="fade-animated-cv fade-cv-1"
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
          Mon Curriculum Vitae
        </Title>

        <Stack align="center" gap="lg">
          <Button
            component="a"
            href={cvPath}
            download="CV_Thomas_MAALSI.pdf"
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 135 }}
            leftSection={<IconDownload size={20} />}
            className="fade-animated-cv fade-cv-2"
            size="md"
            radius="xl"
            style={{
              boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
            }}
          >
            Télécharger le CV
          </Button>

          <Paper
            withBorder
            radius="xl"
            p="md"
            className="cv-glass-card fade-animated-cv fade-cv-3"
            visibleFrom="sm"
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
              width: "100%",
              maxWidth: "700px",
            }}
          >
            <Box
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "141.4%",
                borderRadius: "8px",
                overflow: "hidden",
                background: "white",
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
          </Paper>

          <Text
            ta="center"
            c="dimmed"
            hiddenFrom="sm"
            className="fade-animated-cv fade-cv-3"
            fw={500}
            size="sm"
          >
            La prévisualisation du CV est disponible sur un écran plus grand.
          </Text>

          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 135 }}
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => navigate("/")}
            className="fade-animated-cv fade-cv-4"
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

export default Cv;
