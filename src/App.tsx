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

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppShell
        padding="md"
        styles={{
          main: {
            background:
              "linear-gradient(135deg, #dbeafe 0%, #f0f9ff 50%, #e0f2fe 100%)",
            backdropFilter: "blur(12px)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          },
          footer: {
            marginTop: "auto",
          },
        }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: 70,
          }}
        >
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

        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
