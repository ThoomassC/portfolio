import { Center, Group, ActionIcon, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const Footer = () => {
  return (
    <Center
      style={{
        flexDirection: "column",
        backgroundColor: "#0f172a",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Group gap="xl" mb="xs">
        <ActionIcon
          component="a"
          href="https://www.linkedin.com/in/thomas-caron27/"
          target="_blank"
          size={48}
          style={{
            color: "#ffffff",
            backgroundColor: "transparent",
            transition: "transform 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.3)";
            e.currentTarget.style.color = "yellow";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = "#ffffff";
          }}
          aria-label="LinkedIn"
        >
          <IconBrandLinkedin size={32} stroke={1.5} />
        </ActionIcon>

        <ActionIcon
          component="a"
          href="https://github.com/ThoomassC"
          target="_blank"
          size={48}
          style={{
            color: "#ffffff",
            backgroundColor: "transparent",
            transition: "transform 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.3)";
            e.currentTarget.style.color = "yellow";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = "#ffffff";
          }}
          aria-label="GitHub"
        >
          <IconBrandGithub size={32} stroke={1.5} />
        </ActionIcon>
      </Group>
      <Text size="xs" c="gray.4">
        © {new Date().getFullYear()} Thomas Caron — Tous droits réservés.
      </Text>
    </Center>
  );
};

export default Footer;
