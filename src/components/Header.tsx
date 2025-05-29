import { useEffect, useRef, useState } from "react";
import { Title, Avatar, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [visible, setVisible] = useState(true);
  const prevScrollY = useRef(0);
  const navigate = useNavigate();

  // Import de la police Raleway
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Logique de détection du scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > prevScrollY.current && currentY > 60) {
        setVisible(false); // Scroll vers le bas → cache
      } else {
        setVisible(true); // Scroll vers le haut → affiche
      }
      prevScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // <--- dépendance vide

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        zIndex: 100,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.4s ease, opacity 0.4s ease",
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          position: "absolute",
          left: 24,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          src="/assets/thomasca.jpg"
          alt="Thomas Caron"
          size={44}
          radius="xl"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Box>
      <Title
        order={2}
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 600,
          color: "#1e3a8a",
          fontSize: "1.4rem",
          textAlign: "center",
        }}
      >
        Thomas Caron — Portfolio
      </Title>
    </header>
  );
};

export default Header;
