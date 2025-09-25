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
  Tabs,
  Transition,
} from "@mantine/core";
import {
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandReact,
  IconBrandNodejs,
  IconCode,
  IconHeartHandshake,
  IconLanguage,
  IconBrandPhp,
  IconBrandCSharp,
  IconArrowLeft,
  IconBrandGit,
  IconBrandDocker,
  IconBrandVscode,
  IconBrandVisualStudio,
  IconApi,
  IconBrandOpenSource,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGitlab,
  IconDatabase,
  IconBrandMongodb,
  IconGitBranch,
  IconBrandFigma,
  IconChevronRight,
} from "@tabler/icons-react";
import { FaMicrosoft } from "react-icons/fa";
import { SiRabbitmq } from "react-icons/si";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

const Skill = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [activeTab, setActiveTab] = useState<string | null>("Langages");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
       html { scroll-behavior: smooth; }

      @keyframes fadeSlideSkill {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .fade-animated-skill {
        animation: fadeSlideSkill 0.7s ease-out forwards;
        opacity: 0;
      }
      .fade-delay-1 { animation-delay: 0.1s; }
      .fade-delay-2 { animation-delay: 0.2s; }
      .fade-delay-3 { animation-delay: 0.3s; }
      .fade-delay-4 { animation-delay: 0.4s; }
      .fade-delay-5 { animation-delay: 0.5s; }
      .fade-delay-6 { animation-delay: 0.6s; }
      .fade-delay-7 { animation-delay: 0.7s; }
      .fade-delay-8 { animation-delay: 0.8s; }
      .fade-delay-9 { animation-delay: 0.9s; }
      .fade-delay-10 { animation-delay: 1.0s; }
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

  const technicalSkills: SkillSection[] = [
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
        { label: "Material UI", icon: <IconCode size={iconSize - 2} /> },
        { label: "Mantine", icon: <IconCode size={iconSize - 2} /> },
        { label: "Tailwind CSS", icon: <IconCode size={iconSize - 2} /> },
        { label: "Bootstrap", icon: <IconCode size={iconSize - 2} /> },
      ],
    },
    {
      title: "Librairies / back-end",
      icon: <IconCode size={iconSize} />,
      items: [
        { label: "Task", icon: <IconBrandDocker size={iconSize - 2} /> },
        { label: "Jest", icon: <IconCode size={iconSize - 2} /> },
        { label: "Sails", icon: <IconCode size={iconSize - 2} /> },
        { label: "Axios", icon: <IconCode size={iconSize - 2} /> },
        { label: "Moment.js", icon: <IconCode size={iconSize - 2} /> },
        { label: "Bcrypt.js", icon: <IconCode size={iconSize - 2} /> },
      ],
    },
    {
      title: "ORMs / Bases de données",
      icon: <IconCode size={iconSize} />,
      items: [
        { label: "Prisma", icon: <IconCode size={iconSize - 2} /> },
        { label: "PostgreSQL", icon: <IconDatabase size={iconSize - 2} /> },
        { label: "TypeORM (bases)", icon: <IconCode size={iconSize - 2} /> },
        { label: "MySQL", icon: <IconDatabase size={iconSize - 2} /> },
        { label: "SQLite", icon: <IconDatabase size={iconSize - 2} /> },
        {
          label: "MongoDB (bases)",
          icon: <IconBrandMongodb size={iconSize - 2} />,
        },
        { label: "Redis", icon: <IconCode size={iconSize - 2} /> },
        {
          label: "Waterline (sails)",
          icon: <IconDatabase size={iconSize - 2} />,
        },
      ],
    },
    {
      title: "Outils",
      icon: <IconCode size={iconSize} />,
      items: [
        { label: "Git", icon: <IconBrandGit size={iconSize - 2} /> },
        { label: "GitKraken", icon: <IconGitBranch size={iconSize - 2} /> },
        { label: "Docker", icon: <IconBrandDocker size={iconSize - 2} /> },
        { label: "VS Code", icon: <IconBrandVscode size={iconSize - 2} /> },
        {
          label: "Visual Studio",
          icon: <IconBrandVisualStudio size={iconSize - 2} />,
        },
        { label: "Suite Jetbrains", icon: <IconCode size={iconSize - 2} /> },
        {
          label: "Suite Jetbrains",
          icon: <IconBrandOpenSource size={iconSize - 2} />,
        },
        { label: "Figma", icon: <IconBrandFigma size={iconSize - 2} /> },
        { label: "Swagger", icon: <IconApi size={iconSize - 2} /> },
        {
          label: "Insomnia",
          icon: <IconBrandOpenSource size={iconSize - 2} />,
        },
        {
          label: "OpenProject",
          icon: <IconBrandOpenSource size={iconSize - 2} />,
        },
        { label: "Suite Microsoft", icon: <FaMicrosoft size={iconSize - 2} /> },
        { label: "Discord", icon: <IconBrandDiscord size={iconSize - 2} /> },
        { label: "GitHub", icon: <IconBrandGithub size={iconSize - 2} /> },
        { label: "GitLab", icon: <IconBrandGitlab size={iconSize - 2} /> },
        { label: "Canva", icon: <IconCode size={iconSize - 2} /> },
        { label: "DbGate", icon: <IconDatabase size={iconSize - 2} /> },
        { label: "Rabbit MQ", icon: <SiRabbitmq size={iconSize - 2} /> },
        { label: "Redis", icon: <IconCode size={iconSize - 2} /> },
        {
          label: "MongoDB (bases)",
          icon: <IconBrandMongodb size={iconSize - 2} />,
        },
      ],
    },
  ];

  const otherSkills: SkillSection[] = [
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

  const allSkills = [...technicalSkills, ...otherSkills];

  const renderSkillSection = (section: SkillSection, index: number) => (
    <Paper
      key={section.title}
      withBorder
      radius="lg"
      p="md"
      className={`fade-animated-skill fade-delay-${index + 2}`}
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
          <Tooltip label={item.label} key={item.label} withArrow position="top">
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
  );

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

      {isDesktop ? (
        <Group align="flex-start" gap="xl" mt="xl" wrap="nowrap">
          <Stack style={{ flex: 1.6 }}>
            <Title
              order={3}
              style={{ color: "#1e3a8a", textAlign: "center" }}
              mb="md"
              className="fade-animated-skill fade-delay-2"
            >
              Compétences Techniques
            </Title>
            <Tabs
              value={activeTab}
              onChange={setActiveTab}
              orientation="vertical"
              variant="pills"
              radius="md"
              className="fade-animated-skill fade-delay-3"
            >
              <Tabs.List>
                {technicalSkills.map((section) => (
                  <Tabs.Tab
                    key={section.title}
                    value={section.title}
                    leftSection={<IconChevronRight size={16} />}
                  >
                    {section.title}
                  </Tabs.Tab>
                ))}
              </Tabs.List>

              {technicalSkills.map((section, index) => (
                <Tabs.Panel key={section.title} value={section.title} pl="lg">
                  <Transition
                    mounted={activeTab === section.title}
                    transition="fade"
                    duration={100}
                    timingFunction="ease"
                  >
                    {(styles) => (
                      <div style={styles}>
                        {renderSkillSection(section, index + 0.7)}
                      </div>
                    )}
                  </Transition>
                </Tabs.Panel>
              ))}
            </Tabs>
          </Stack>

          <Divider
            orientation="vertical"
            style={{ height: "auto", alignSelf: "stretch" }}
          />

          <Stack style={{ flex: 1 }}>
            <Title
              order={3}
              style={{ color: "#1e3a8a", textAlign: "center" }}
              mb="md"
              className="fade-animated-skill fade-delay-4"
            >
              Compétences Relationnelles & Autres
            </Title>
            <Stack gap="lg">
              {otherSkills.map((section, i) =>
                renderSkillSection(section, technicalSkills.length + i)
              )}
            </Stack>
          </Stack>
        </Group>
      ) : (
        <Stack gap="lg">
          {allSkills.map((section, i) => renderSkillSection(section, i))}
        </Stack>
      )}

      <Box ta="center" mt="xl">
        <Button
          variant="light"
          color="indigo"
          radius="xl"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate("/")}
          className={`fade-animated-skill fade-delay-${allSkills.length + 2}`}
          style={{
            paddingInline: 24,
            border: "2px solid #1e3a8a",
          }}
        >
          Retour à l’accueil
        </Button>
      </Box>
    </Container>
  );
};

export default Skill;
