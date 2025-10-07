import { Container, Title, Stack, Group, Paper, Avatar, Button, Anchor, Box } from "@mantine/core";
import { IconMapPin, IconMail, IconPhone, IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Contact = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "contact-styles";
    style.innerHTML = `
      @keyframes fadeSlideContact {
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

      .fade-animated-contact {
        animation: fadeSlideContact 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }

      .contact-glass-card {
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .contact-glass-card:hover {
        transform: translateY(-8px) scale(1.02) !important;
        box-shadow: 
          0 20px 60px rgba(99, 102, 241, 0.3),
          inset 0 1px 2px rgba(255, 255, 255, 0.95),
          inset 0 -1px 2px rgba(0, 0, 0, 0.05) !important;
      }

      .contact-info-item {
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        padding: 0.5rem;
        border-radius: 8px;
      }

      .contact-info-item:hover {
        transform: translateX(5px);
        background: rgba(99, 102, 241, 0.1);
      }

      .floating-orb {
        animation: float 8s ease-in-out infinite;
      }

      .floating-bubble {
        animation: bubble 6s ease-in-out infinite;
      }

      .fade-contact-1 { animation-delay: 0.1s; }
      .fade-contact-2 { animation-delay: 0.25s; }
      .fade-contact-3 { animation-delay: 0.4s; }
      .fade-contact-4 { animation-delay: 0.55s; }
      .fade-contact-5 { animation-delay: 0.7s; }
      .fade-contact-6 { animation-delay: 0.85s; }
      .fade-contact-7 { animation-delay: 1s; }
      .fade-contact-8 { animation-delay: 1.15s; }
    `;
    document.head.appendChild(style);

    const user = "caronthomas27";
    const domain = "gmail.com";
    setEmail(`${user}@${domain}`);

    const phoneParts = ["07", "83", "52", "37", "85"];
    setPhone(phoneParts.join(" "));

    return () => {
      const styleToRemove = document.getElementById("contact-styles");
      if (styleToRemove) {
        document.head.removeChild(styleToRemove);
      }
    };
  }, []);

  return (
    <Container
      size="xs"
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
          right: "5%",
          width: "300px",
          height: "300px",
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
          bottom: "10%",
          left: "5%",
          width: "350px",
          height: "350px",
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
          className="fade-animated-contact fade-contact-1"
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
          Me Contacter
        </Title>

        <Paper
          withBorder
          radius="xl"
          p="xl"
          className="contact-glass-card fade-animated-contact fade-contact-2"
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
            maxWidth: 450,
            margin: "0 auto",
          }}
        >
          <Stack align="center" gap="lg">
            <Avatar
              src="/assets/thomasca.jpg"
              size={180}
              radius="xl"
              alt="Thomas Caron"
              className="fade-animated-contact fade-contact-3"
              style={{
                border: "4px solid rgba(99, 102, 241, 0.3)",
              }}
            />

            <Title
              order={3}
              className="fade-animated-contact fade-contact-4"
              style={{
                background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              Thomas Caron
            </Title>

            <Stack gap="md" style={{ width: "100%" }}>
              <Group
                gap="xs"
                className="contact-info-item fade-animated-contact fade-contact-5"
                wrap="nowrap"
              >
                <Box
                  style={{
                    background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                    borderRadius: "8px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IconMail size={20} color="white" />
                </Box>
                <Anchor
                  href={email ? `mailto:${email}` : "#"}
                  size="sm"
                  underline="hover"
                  fw={500}
                  style={{
                    color: "#4338ca",
                  }}
                >
                  {email || "Chargement..."}
                </Anchor>
              </Group>

              <Group
                gap="xs"
                className="contact-info-item fade-animated-contact fade-contact-6"
                wrap="nowrap"
              >
                <Box
                  style={{
                    background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                    borderRadius: "8px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IconPhone size={20} color="white" />
                </Box>
                <Anchor
                  href={phone ? `tel:+33${phone.replace(/\s/g, "").substring(1)}` : "#"}
                  size="sm"
                  underline="hover"
                  fw={500}
                  style={{
                    color: "#4338ca",
                  }}
                >
                  {phone || "Chargement..."}
                </Anchor>
              </Group>

              <Group
                gap="xs"
                className="contact-info-item fade-animated-contact fade-contact-7"
                wrap="nowrap"
              >
                <Box
                  style={{
                    background: "linear-gradient(135deg, #4338ca, #7c3aed)",
                    borderRadius: "8px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IconMapPin size={20} color="white" />
                </Box>
                <Anchor
                  href="https://www.google.com/maps?q=Mont-Saint-Aignan"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  underline="hover"
                  fw={500}
                  style={{
                    color: "#4338ca",
                  }}
                >
                  Mont-Saint-Aignan, 76130, France
                </Anchor>
              </Group>
            </Stack>

            <Button
              mt="md"
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 135 }}
              leftSection={<IconArrowLeft size={18} />}
              onClick={() => navigate("/")}
              className="fade-animated-contact fade-contact-8"
              size="md"
              radius="xl"
              style={{
                boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
              }}
            >
              Retour à l'accueil
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Contact;
