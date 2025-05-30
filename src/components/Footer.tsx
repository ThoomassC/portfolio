import { useEffect, useState } from "react";
import { Center, Group, ActionIcon, Text } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

const accentColor = "#38bdf8";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      setVisible(atBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <Center
      style={{
        flexDirection: "column",
        backgroundColor: "#0f172a",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        transition:
          "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Group gap="md" mb={2}>
        <ActionIcon
          component="a"
          href="mailto:caronthomas27@gmail.com"
          target="_blank"
          size={36}
          style={{
            color: "#ffffff",
            backgroundColor: "transparent",
            transition: "transform 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
            e.currentTarget.style.color = accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = "#ffffff";
          }}
          aria-label="Mail"
        >
          <IconMail size={35} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          component="a"
          href="https://www.linkedin.com/in/thomas-caron27/"
          target="_blank"
          size={36}
          style={{
            color: "#ffffff",
            backgroundColor: "transparent",
            transition: "transform 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = "#ffffff";
          }}
          aria-label="LinkedIn"
        >
          <IconBrandLinkedin size={35} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          component="a"
          href="https://github.com/ThoomassC"
          target="_blank"
          size={36}
          style={{
            color: "#ffffff",
            backgroundColor: "transparent",
            transition: "transform 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
            e.currentTarget.style.color = accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = "#ffffff";
          }}
          aria-label="GitHub"
        >
          <IconBrandGithub size={35} stroke={1.5} />
        </ActionIcon>
      </Group>
      <Text size="xs" c="gray.4">
        © {new Date().getFullYear()} Thomas Caron — Tous droits réservés.
      </Text>
    </Center>
  );
};

export default Footer;
