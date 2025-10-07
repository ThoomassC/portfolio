import { Center, Group, ActionIcon, Text, Box } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "footer-styles";
    style.innerHTML = `
      @keyframes iconFloat {
        0%, 100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-5px) scale(1.05);
        }
      }

      .footer-icon {
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .footer-icon:hover {
        transform: scale(1.15) rotate(5deg);
        background: rgba(99, 102, 241, 0.5) !important;
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5) !important;
      }

      .footer-icon:active {
        transform: scale(1.05) rotate(5deg);
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById("footer-styles");
      if (styleToRemove) {
        document.head.removeChild(styleToRemove);
      }
    };
  }, []);

  return (
    <Center
      component="footer"
      style={{
        flexDirection: "column",
        background: "#4438ca92",
        backdropFilter: "blur(30px) saturate(200%)",
        WebkitBackdropFilter: "blur(30px) saturate(200%)",
        borderTop: "1px solid rgba(99, 102, 241, 0.5)",
        boxShadow: "0 -4px 30px rgba(99, 102, 241, 0.2)",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#7c3aed81",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Group gap="md" mb="xs" style={{ position: "relative", zIndex: 1 }}>
        <ActionIcon
          component="a"
          href="mailto:caronthomas27@gmail.com"
          target="_blank"
          size={40}
          radius="xl"
          className="footer-icon"
          style={{
            background: "rgba(99, 102, 241, 0.35)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(99, 102, 241, 0.6)",
            boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
          }}
          aria-label="Mail"
        >
          <IconMail size={20} stroke={2.5} color="#ffffff" />
        </ActionIcon>
        <ActionIcon
          component="a"
          href="https://www.linkedin.com/in/thomas-caron27/"
          target="_blank"
          size={40}
          radius="xl"
          className="footer-icon"
          style={{
            background: "rgba(99, 102, 241, 0.35)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(99, 102, 241, 0.6)",
            boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
          }}
          aria-label="LinkedIn"
        >
          <IconBrandLinkedin size={20} stroke={2.5} color="#ffffff" />
        </ActionIcon>
        <ActionIcon
          component="a"
          href="https://github.com/ThoomassC"
          target="_blank"
          size={40}
          radius="xl"
          className="footer-icon"
          style={{
            background: "rgba(99, 102, 241, 0.35)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(99, 102, 241, 0.6)",
            boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
          }}
          aria-label="GitHub"
        >
          <IconBrandGithub size={20} stroke={2.5} color="#ffffff" />
        </ActionIcon>
      </Group>
      <Text
        size="xs"
        fw={500}
        c="#e0e7ff"
        style={{
          position: "relative",
          zIndex: 1,
          opacity: 0.95,
        }}
      >
        © {new Date().getFullYear()} Thomas Caron
      </Text>
    </Center>
  );
};

export default Footer;
