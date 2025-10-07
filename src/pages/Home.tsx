import { Container, Title, Stack, Paper, Text, Box, ThemeIcon, SimpleGrid } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconBriefcase, IconCode, IconMail, IconFileText, IconRocket } from "@tabler/icons-react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "home-styles";
    style.innerHTML = `
      html { scroll-behavior: smooth; }

      @keyframes fadeSlideHome {
        0% { 
          opacity: 0; 
          transform: translateY(30px) scale(0.98);
        }
        100% { 
          opacity: 1; 
          transform: translateY(0) scale(1);
        }
      }

      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }

      @keyframes blink {
        from, to { border-color: transparent }
        50% { border-color: #9333ea }
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

      .fade-animated-home {
        animation: fadeSlideHome 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }

      .typing-title-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 6rem;
        margin-bottom: 2rem;
      }

      .typing-title {
        overflow: hidden; 
        border-right: .15em solid #9333ea; 
        white-space: nowrap; 
        margin: 0 auto; 
        animation: 
          typing 4s steps(50, end) forwards,
          blink .75s step-end infinite;
        max-width: max-content;
        width: 0;
      }

      .liquid-glass-card {
        transition:
          transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
          box-shadow 1s ease,
          filter 0.8s ease;
        cursor: pointer;
        transform: translateY(0) scale(1);
        filter: brightness(1);
      }

      .liquid-glass-card:hover {
        transform: translateY(-6px) scale(1.04) !important;
        filter: brightness(1.05);
        box-shadow:
          0 25px 80px rgba(99, 102, 241, 0.25),
          inset 0 2px 3px rgba(255, 255, 255, 0.9),
          inset 0 -1px 2px rgba(0, 0, 0, 0.05);
      }

      .nav-icon {
        transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .liquid-glass-card:hover .nav-icon {
        transform: rotate(360deg) scale(1.12) !important;
      }

      .floating-orb {
        animation: float 8s ease-in-out infinite;
      }

      .floating-bubble {
        animation: bubble 6s ease-in-out infinite;
      }

      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.25s; }
      .delay-3 { animation-delay: 0.4s; }
      .delay-4 { animation-delay: 0.55s; }
      .delay-5 { animation-delay: 0.7s; }
      .delay-6 { animation-delay: 0.85s; }
      .delay-7 { animation-delay: 1s; }

      @media (max-width: 768px) {
        .typing-title {
          white-space: normal;
          word-break: break-word;
          animation: none !important; 
          border-right: none; 
          font-size: 2.2rem !important;
          width: 100% !important;
        }
      }

      @media (max-width: 480px) {
        .typing-title {
          font-size: 2rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById("home-styles");
      if (styleToRemove) {
        document.head.removeChild(styleToRemove);
      }
    };
  }, []);

  const navigationItems = [
    {
      label: "Découvrir mes projets",
      path: "/project",
      icon: <IconRocket size={28} />,
      description: "Explorez mes réalisations",
    },
    {
      label: "Parcourir mes expériences",
      path: "/experience",
      icon: <IconBriefcase size={28} />,
      description: "Mon parcours professionnel",
    },
    {
      label: "Explorer mes compétences",
      path: "/skill",
      icon: <IconCode size={28} />,
      description: "Technologies & savoir-faire",
    },
    {
      label: "Me contacter",
      path: "/contact",
      icon: <IconMail size={28} />,
      description: "Restons en contact",
    },
    {
      label: "Mon CV",
      path: "/cv",
      icon: <IconFileText size={28} />,
      description: "Téléchargez mon CV",
    },
  ];

  return (
    <Container
      size="xl"
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
      <Box
        className="floating-bubble"
        style={{
          position: "absolute",
          top: "50%",
          right: "20%",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
          animationDelay: "1.5s",
          opacity: 0.5,
        }}
      />

      <Stack gap="xl" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Box className="typing-title-wrapper">
          <Stack gap="md" align="center">
            <Title
              order={1}
              className="typing-title"
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #1e3a8a 0%, #9333ea 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              Laissez-vous guider par mes expériences
            </Title>
            <Text
              size="lg"
              c="dimmed"
              className="fade-animated-home delay-2"
              style={{ maxWidth: 600, textAlign: "center" }}
            >
              Je transforme vos idées en solutions digitales innovantes
            </Text>
          </Stack>
        </Box>

        <div>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: "md", sm: "lg" }}
            style={{ width: "100%", marginBottom: "var(--mantine-spacing-lg)" }}
          >
            {navigationItems.slice(0, 3).map((item, index) => (
              <Paper
                key={index}
                withBorder
                radius="xl"
                p="lg"
                onClick={() => navigate(item.path)}
                className={`liquid-glass-card fade-animated-home delay-${index + 3}`}
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
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack gap="md" align="center" style={{ textAlign: "center", height: "100%" }}>
                  <ThemeIcon
                    size={70}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: "indigo", to: "violet", deg: 135 }}
                    className="nav-icon"
                    style={{
                      boxShadow:
                        "0 8px 24px rgba(99, 102, 241, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {item.icon}
                  </ThemeIcon>
                  <div>
                    <Text
                      fw={700}
                      size="lg"
                      style={{
                        background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: 8,
                      }}
                    >
                      {item.label}
                    </Text>
                    <Text size="sm" c="dimmed" fw={500}>
                      {item.description}
                    </Text>
                  </div>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>

          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 2 }}
            spacing={{ base: "md", sm: "lg" }}
            style={{
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
            }}
          >
            {navigationItems.slice(3).map((item, index) => (
              <Paper
                key={index + 3}
                withBorder
                radius="xl"
                p="lg"
                onClick={() => navigate(item.path)}
                className={`liquid-glass-card fade-animated-home delay-${index + 6}`}
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
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack gap="md" align="center" style={{ textAlign: "center", height: "100%" }}>
                  <ThemeIcon
                    size={70}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: "indigo", to: "violet", deg: 135 }}
                    className="nav-icon"
                    style={{
                      boxShadow:
                        "0 8px 24px rgba(99, 102, 241, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {item.icon}
                  </ThemeIcon>
                  <div>
                    <Text
                      fw={700}
                      size="lg"
                      style={{
                        background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: 8,
                      }}
                    >
                      {item.label}
                    </Text>
                    <Text size="sm" c="dimmed" fw={500}>
                      {item.description}
                    </Text>
                  </div>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </div>
      </Stack>
    </Container>
  );
}

export default Home;
