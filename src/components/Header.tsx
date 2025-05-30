import { useEffect, useRef, useState } from "react";
import { Title, Avatar, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [visible, setVisible] = useState(true);
  const prevScrollY = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > prevScrollY.current && currentY > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      prevScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        justifyContent: "center",
        alignItems: "center",
        padding: "0 1rem",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          maxWidth: "100%",
        }}
      >
        <Avatar
          src="/assets/thomasca.jpg"
          alt="Thomas Caron"
          size={60}
          radius="xl"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <Title
          order={2}
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            color: "#1e3a8a",
            fontSize: "1.2rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Thomas Caron — Portfolio
        </Title>
      </Box>
    </header>
  );
};

export default Header;
