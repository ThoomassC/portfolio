import { Container, Title, Stack, Paper, Text, Group, Box, ThemeIcon } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconBriefcase,
  IconCode,
  IconMail,
  IconFileText,
  IconRocket,
  IconChevronRight,
} from "@tabler/icons-react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html { scroll-behavior: smooth; }

      @keyframes fadeSlideHome {
        0% { opacity: 0; transform: translateY(30px) scale(0.95); }
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

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }

      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .fade-animated-home {
        animation: fadeSlideHome 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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

      .typing-title.animated {
        animation: 
          typing 4s steps(50, end) forwards,
          blink .75s step-end infinite;
      }

      .nav-card-home {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
      }

      .nav-card-home:hover {
        transform: translateY(-8px) scale(1.03);
        box-shadow: 0 20px 40px rgba(99, 102, 241, 0.25) !important;
      }

      .nav-card-home:hover .nav-icon {
        transform: rotate(360deg) scale(1.2);
      }

      .nav-icon {
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .floating-orb {
        animation: float 6s ease-in-out infinite;
      }

      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .delay-4 { animation-delay: 0.5s; }
      .delay-5 { animation-delay: 0.7s; }
      .delay-6 { animation-delay: 0.9s; }
      .delay-7 { animation-delay: 1.1s; }

      @media (max-width: 768px) {
        .typing-title {
          white-space: normal;
          word-break: break-word;
          animation: none !important; 
          border-right: none; 
          font-size: 1.8rem !important;
          width: 100% !important;
        }
      }

      @media (max-width: 480px) {
        .typing-title {
          font-size: 1.5rem !important;
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
    {
      label: "Découvrir mes projets",
      path: "/project",
      icon: <IconRocket size={28} />,
      description: "Explorez mes réalisations et projets",
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
      description: "Technologies et savoir-faire",
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
      description: "Téléchargez mon curriculum vitae",
    },
  ];

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
      {/* Orbes décoratives en arrière-plan */}
      <Box
        className="floating-orb"
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        className="floating-orb"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "8%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
          animationDelay: "3s",
        }}
      />

      <Stack gap="xl" style={{ width: "100%", maxWidth: 900, position: "relative", zIndex: 1 }}>
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

        <Stack gap="lg" align="center" style={{ width: "100%" }}>
          {navigationItems.map((item, index) => (
            <Paper
              key={index}
              withBorder
              radius="xl"
              p="xl"
              onClick={() => navigate(item.path)}
              className={`nav-card-home fade-animated-home delay-${index + 3}`}
              style={{
                width: "100%",
                maxWidth: 600,
                opacity: 0,
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(237, 242, 255, 0.8) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(99, 102, 241, 0.15)",
                boxShadow: "0 8px 32px rgba(99, 102, 241, 0.12)",
              }}
            >
              <Group wrap="nowrap" gap="lg">
                <ThemeIcon
                  size={60}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "violet", deg: 135 }}
                  className="nav-icon"
                  style={{
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </ThemeIcon>
                <div style={{ flex: 1 }}>
                  <Text
                    fw={700}
                    size="lg"
                    style={{
                      background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {item.description}
                  </Text>
                </div>
                <IconChevronRight
                  size={24}
                  style={{
                    color: "#6366f1",
                    flexShrink: 0,
                  }}
                />
              </Group>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Home;
