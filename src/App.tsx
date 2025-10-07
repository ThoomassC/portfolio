import { AppShell } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Cv from "./pages/Cv";
import Skill from "./pages/Skill";
import RouteMiddleware from "./components/RouteMiddleware";
import { Toaster } from "react-hot-toast";
import { useScrollToBottom } from "./hooks/useScrollToBottom";
import { useEffect } from "react";

function App() {
  const isAtBottom = useScrollToBottom(100);

  useEffect(() => {
    // Gradient background
    const gradientBg = "linear-gradient(135deg, #dbeafe 0%, #f0f9ff 50%, #e0f2fe 100%)";

    // Appliquer les styles sur html et body
    document.documentElement.style.backgroundColor = "#dbeafe";
    document.documentElement.style.background = gradientBg;
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.minHeight = "100vh";

    // Gestion des SafeArea
    document.documentElement.style.paddingTop = "env(safe-area-inset-top)";
    document.documentElement.style.paddingBottom = "env(safe-area-inset-bottom)";
    document.documentElement.style.paddingLeft = "env(safe-area-inset-left)";
    document.documentElement.style.paddingRight = "env(safe-area-inset-right)";

    document.body.style.background = gradientBg;
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.width = "100%";
    document.body.style.maxWidth = "100vw";
    document.body.style.minHeight = "100vh";

    return () => {
      document.documentElement.style.backgroundColor = "";
      document.documentElement.style.background = "";
      document.documentElement.style.overflowX = "";
      document.documentElement.style.minHeight = "";
      document.documentElement.style.paddingTop = "";
      document.documentElement.style.paddingBottom = "";
      document.documentElement.style.paddingLeft = "";
      document.documentElement.style.paddingRight = "";

      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
      document.body.style.width = "";
      document.body.style.maxWidth = "";
      document.body.style.minHeight = "";
    };
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Header />
      <AppShell
        padding={0}
        styles={{
          main: {
            background: "transparent",
            paddingTop: "70px",
            padding: 0,
            minHeight: "100vh",
            maxWidth: "100vw",
            overflowX: "hidden",
          },
        }}
      >
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skill" element={<Skill />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cv" element={<Cv />} />
            <Route path="*" element={<RouteMiddleware />} />
          </Routes>
        </AppShell.Main>

        <AppShell.Footer
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 10,
            transform: isAtBottom ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.1s ease-in-out",
            left: 0,
            right: 0,
            width: "100%",
          }}
        >
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
