import { useEffect, useState, useRef } from "react";
import { Title, Avatar, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "header-styles";
    style.innerHTML = `
      @keyframes avatarPulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
        }
        50% {
          box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
        }
      }

      @keyframes bubbleAppear {
        0% {
          transform: translate(-50%, -100%) scale(0.8);
          opacity: 0;
          border-radius: 50%;
        }
        50% {
          transform: translate(-50%, -20%) scale(1.05);
          opacity: 0.8;
          border-radius: 50%;
        }
        100% {
          transform: translate(-50%, 0) scale(1);
          opacity: 1;
          border-radius: 50px;
        }
      }

      @keyframes bubbleDisappear {
        0% {
          transform: translate(-50%, 0) scale(1);
          opacity: 1;
          border-radius: 50px;
        }
        50% {
          transform: translate(-50%, -10%) scale(0.95);
          opacity: 0.5;
          border-radius: 50%;
        }
        100% {
          transform: translate(-50%, -100%) scale(0.8);
          opacity: 0;
          border-radius: 50%;
        }
      }

      .header-container {
        animation: bubbleAppear 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
      }

      .header-container.hiding {
        animation: bubbleDisappear 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
      }

      .header-avatar {
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        animation: avatarPulse 2s infinite;
      }

      .header-avatar:hover {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 8px 24px rgba(99, 102, 241, 0.5) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById("header-styles");
      if (styleToRemove) {
        document.head.removeChild(styleToRemove);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;

      // Détection du scroll vers le haut
      if (isScrollingUp && currentScrollY > 100) {
        setIsVisible(true);

        // Annuler le timeout précédent
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Masquer après 3 secondes
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else if (currentScrollY <= 100) {
        // Masquer si on est tout en haut
        setIsVisible(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <header
      className={`header-container ${!isVisible ? "hiding" : ""}`}
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        height: isDesktop ? 70 : 60,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(40px) saturate(200%) brightness(1.1)",
        WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(1.1)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.12),
          inset 0 1px 0 rgba(255, 255, 255, 0.8),
          inset 0 -1px 0 rgba(255, 255, 255, 0.2),
          0 0 0 1px rgba(99, 102, 241, 0.1)
        `,
        borderRadius: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isDesktop ? "0 1.5rem" : "0 1rem",
        minWidth: "fit-content",
        maxWidth: isDesktop ? "auto" : "calc(100vw - 2rem)",
        width: isDesktop ? "auto" : "auto",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: isDesktop ? 16 : 12,
        }}
      >
        <Avatar
          src="/assets/thomasca.jpg"
          alt="Thomas Caron"
          size={isDesktop ? 50 : 40}
          radius="xl"
          className="header-avatar"
          style={{
            cursor: "pointer",
            border: "2px solid rgba(99, 102, 241, 0.4)",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            flexShrink: 0,
          }}
          onClick={() => navigate("/")}
        />
        <Title
          order={2}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: isDesktop ? "1.3rem" : "1rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #1e3a8a 0%, #9333ea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 2px 8px rgba(99, 102, 241, 0.2)",
            maxWidth: isDesktop ? "none" : "calc(100vw - 140px)",
          }}
        >
          Thomas Caron — Portfolio
        </Title>
      </Box>
    </header>
  );
};

export default Header;
