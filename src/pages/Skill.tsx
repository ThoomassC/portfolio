import {
  Container,
  Title,
  Stack,
  Paper,
  Group,
  Text,
  ThemeIcon,
  Divider,
  Box,
  Tooltip,
  Button,
} from "@mantine/core";
import {
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandReact,
  IconDatabase,
  IconBrandNodejs,
  IconCode,
  IconHeartHandshake,
  IconLanguage,
  IconBrandPhp,
  IconBrandCSharp,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Skill = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html { scroll-behavior: smooth; }

      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .fade-animated-skill {
        animation: fadeInUp 0.9s ease-out forwards;
        opacity: 0;
      }
      .fade-delay-1 { animation-delay: 0.2s; }
      .fade-delay-2 { animation-delay: 0.4s; }
      .fade-delay-3 { animation-delay: 0.6s; }
      .fade-delay-4 { animation-delay: 0.8s; }
      .fade-delay-5 { animation-delay: 1s; }
      .fade-delay-6 { animation-delay: 1.2s; }
      .fade-delay-7 { animation-delay: 1.4s; }
    `;
    document.head.appendChild(style);
  }, []);

  const iconSize = 26;

  type SkillItem = {
    label: string;
    icon?: React.ReactNode;
  };

  type SkillSection = {
    title: string;
    icon: React.ReactNode;
    items: SkillItem[];
  };

  const skills: SkillSection[] = [
    {
      title: "Langages",
      icon: <IconCode size={iconSize} />,
      items: [
        { label: "JavaScript", icon: <IconBrandJavascript size={iconSize} /> },
        { label: "TypeScript", icon: <IconBrandTypescript size={iconSize} /> },
        { label: "PHP (bases)", icon: <IconBrandPhp size={iconSize} /> },
        { label: "C# (bases)", icon: <IconBrandCSharp size={iconSize} /> },
        { label: "HTML", icon: <IconCode size={iconSize - 2} /> },
        { label: "CSS", icon: <IconCode size={iconSize - 2} /> },
        { label: "SQL (bases)", icon: <IconDatabase size={iconSize} /> },
        { label: "JSON", icon: <IconCode size={iconSize - 2} /> },
        { label: "XML (bases)", icon: <IconCode size={iconSize - 2} /> },
        { label: "YAML", icon: <IconCode size={iconSize - 2} /> },
        { label: "Markdown", icon: <IconCode size={iconSize - 2} /> },
        { label: "Bash (bases)", icon: <IconCode size={iconSize - 2} /> },
        { label: "GraphQL (bases)", icon: <IconCode size={iconSize - 2} /> },
      ],
    },
    {
      title: "Frameworks",
      icon: <IconBrandNodejs size={iconSize} />,
      items: [
        { label: "React JS & TS", icon: <IconBrandReact size={iconSize} /> },
        { label: "Node JS", icon: <IconBrandNodejs size={iconSize} /> },
        {
          label: "Entity Framework (bases)",
          icon: <IconDatabase size={iconSize} />,
        },
        { label: "Express", icon: <IconCode size={iconSize - 2} /> },
        { label: "Sails JS", icon: <IconCode size={iconSize - 2} /> },
        { label: "Next.js", icon: <IconCode size={iconSize - 2} /> },
        { label: "Nest.js", icon: <IconCode size={iconSize - 2} /> },
        { label: "Laravel (bases)", icon: <IconCode size={iconSize - 2} /> },
      ],
    },
    {
      title: "Librairies / UI",
      icon: <IconCode size={iconSize} />,
      items: [
        { label: "Sails", icon: <IconCode size={iconSize - 2} /> },
        { label: "Material UI", icon: <IconCode size={iconSize - 2} /> },
        { label: "Mantine", icon: <IconCode size={iconSize - 2} /> },
        { label: "Tailwind CSS", icon: <IconCode size={iconSize - 2} /> },
        { label: "Bootstrap", icon: <IconCode size={iconSize - 2} /> },
      ],
    },
    {
      title: "Soft-skills",
      icon: <IconHeartHandshake size={iconSize} />,
      items: [
        { label: "Motivation" },
        { label: "Autonomie" },
        { label: "Organisation" },
        { label: "Communication" },
        { label: "Travail en équipe" },
        { label: "Savoir être" },
        { label: "Sens du dialogue & relationnel" },
      ],
    },
    {
      title: "Langues",
      icon: <IconLanguage size={iconSize} />,
      items: [{ label: "Anglais (notions)" }, { label: "Espagnol (notions)" }],
    },
  ];

  return (
    <Container
      size="md"
      style={{
        paddingTop: "5rem",
        paddingBottom: "6rem",
      }}
    >
      <Title
        order={2}
        ta="center"
        mb="xl"
        className="fade-animated-skill fade-delay-1"
        style={{
          background: "linear-gradient(90deg, #1e3a8a, #9333ea)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
          fontSize: "2rem",
        }}
      >
        Mes Compétences
      </Title>

      <Stack gap="lg">
        {skills.map((section, i) => (
          <Paper
            key={section.title}
            withBorder
            radius="lg"
            p="md"
            className={`fade-animated-skill fade-delay-${i + 2}`}
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <Group mb="sm">
              <ThemeIcon size={32} variant="light" color="indigo" radius="xl">
                {section.icon}
              </ThemeIcon>
              <Text fw={600} size="lg" color="indigo">
                {section.title}
              </Text>
            </Group>

            <Divider mb="sm" />

            <Group gap="md" wrap="wrap">
              {section.items.map((item) => (
                <Tooltip
                  label={item.label}
                  key={item.label}
                  withArrow
                  position="top"
                >
                  <Box
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "4px 10px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.35)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      fontSize: "0.875rem",
                      color: "#1e3a8a",
                    }}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.label}</span>
                  </Box>
                </Tooltip>
              ))}
            </Group>
          </Paper>
        ))}
        <Box ta="center" mt="xl">
          <Button
            variant="light"
            color="indigo"
            radius="xl"
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => navigate("/")}
            className="fade-animated-skill fade-delay-7"
            style={{
              paddingInline: 24,
              border: "2px solid #1e3a8a",
            }}
          >
            Retour à l’accueil
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Skill;
