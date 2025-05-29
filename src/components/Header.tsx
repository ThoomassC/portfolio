// src/components/Header.tsx
import { Center, Title } from "@mantine/core";
import { useEffect } from "react";

const Header = () => {
  // Chargement dynamique de la police
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <header
      style={{
        height: 70,
        padding: "var(--mantine-spacing-md)",
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
      }}
    >
      <Center h="100%" style={{ height: "100%" }}>
        <Title
          order={2}
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            color: "#1e3a8a",
          }}
        >
          Thomas Caron — Portfolio
        </Title>
      </Center>
    </header>
  );
};

export default Header;
