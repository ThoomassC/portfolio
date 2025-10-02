import { Container, Title, Stack, Paper, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeSlide {
        0% { opacity: 0; transform: translateY(30px) scale(0.92); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }

      @keyframes blink {
        from, to { border-color: transparent }
        50% { border-color: #9333ea }
      }

      .fade-animated {
        animation: fadeSlide 0.7s ease-out forwards;
      }

      .typing-title-wrapper {
        display: inline-block;
        text-align: center;
        width: 100%;
        height: 6rem; /* Hauteur pour éviter le décalage lors du retour à la ligne */
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .typing-title {
        overflow: hidden; 
        border-right: .15em solid #9333ea; 
        white-space: nowrap; 
        margin: 0 auto; 
        animation: 
          typing 3.5s steps(40, end),
          blink .75s step-end infinite;
        max-width: max-content;
      }

      @media (max-width: 100%) {
        .typing-title {
          white-space: normal;
          word-break: break-word;
          animation: none; 
          width: auto; 
          border-right: none; 
          font-size: 1.1rem !important;
        }
      }

      @media (max-width: 480px) {
        .typing-title {
          font-size: 1.4rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const navigationItems = [
    { label: "Découvrir mes projets", path: "/project" },
    { label: "Parcourir mes expériences", path: "/experience" },
    { label: "Explorer mes compétences", path: "/skill" },
    { label: "Me contacter", path: "/contact" },
    { label: "Mon CV", path: "/cv" },
  ];

  return (
    <Container
      size="md"
      style={{
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 1rem",
      }}
    >
      <Stack gap="xl" style={{ width: "100%" }}>
        <div className="typing-title-wrapper">
          <Title
            order={1}
            className="typing-title"
            style={{
              fontSize: "250%",
              fontWeight: 700,
              background: "linear-gradient(90deg, #1e3a8a, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Laissez-vous guider par mes expériences
          </Title>
        </div>

        <Stack
          gap="md"
          align="center"
          style={{
            maxWidth: 400,
            margin: "0 auto",
            width: "100%",
          }}
        >
          {navigationItems.map((item, index) => (
            <Paper
              key={index}
              withBorder
              radius="lg"
              p="md"
              onClick={() => navigate(item.path)}
              className="fade-animated"
              style={{
                animationDelay: `${index === 0 ? 0.1 : 0.3 + (index - 1) * 0.2}s`,
                animationDuration: "0.7s",
                opacity: 0,
                width: "100%",
                textAlign: "center",
                cursor: "pointer",
                background: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                color: theme.colors.indigo[7],
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
              }}
            >
              <Title order={4} style={{ fontWeight: 600 }}>
                {item.label}
              </Title>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Home;
