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
      .fade-animated {
        animation: fadeSlide 1s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const navigationItems = [
    { label: "Découvrir mes projets", path: "/projects" },
    { label: "Parcourir mon expérience", path: "/experience" },
    { label: "Me contacter", path: "/contact" },
  ];

  return (
    <Container
      size="md"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Stack gap="xl" style={{ width: "100%" }}>
        {/* Animated Title */}
        <Title
          order={1}
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            background: "linear-gradient(90deg, #1e3a8a, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeSlide 2.5s ease-out",
          }}
        >
          Laissez-vous guider par mes expériences
        </Title>

        {/* Navigation Blocks */}
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
                animationDelay: `${
                  index === 0 ? 0.2 : 0.6 + (index - 1) * 0.5
                }s`,
                animationDuration: "1s",
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
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.05)";
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
