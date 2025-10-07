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
  Accordion,
  SimpleGrid,
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
      0% { opacity: 0; transform: translateY(30px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }

    .fade-animated-skill {
      animation: fadeSlideSkill 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      opacity: 0;
    }

    .skill-card-hover {
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .skill-card-hover:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2), 0 0 60px rgba(147, 51, 234, 0.15) !important;
    }

    .skill-item {
      transition: all 0.25s ease;
      cursor: pointer;
    }

    .skill-item:hover {
      transform: translateY(-3px);
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(147, 51, 234, 0.2)) !important;
    }

    .gradient-border {
      position: relative;
      background: linear-gradient(white, white) padding-box,
                  linear-gradient(135deg, #6366f1, #9333ea) border-box;
      border: 2px solid transparent;
    }

    /* Styles pour les onglets Mantine */
    .mantine-Tabs-tab:not([data-active]):hover {
      background-color: rgba(71, 85, 105, 0.2) !important;
      transform: translateX(8px) scale(1.02);
      box-shadow: 0 4px 16px rgba(71, 85, 105, 0.25);
      font-weight: 600;
    }

    .mantine-Tabs-tab[data-active] {
      background: linear-gradient(135deg, #6366f1, #9333ea) !important;
      color: white !important;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
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

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const iconSize = 26;

  type SkillItem = {
    label: string;
    icon?: React.ReactNode;
    level?: "expert" | "advanced" | "intermediate" | "beginner";
  };

  type SkillSection = {
    title: string;
    icon: React.ReactNode;
    items: SkillItem[];
    gradient: string;
  };

  const technicalSkills: SkillSection[] = [
    {
      title: "Langages",
      icon: <IconCode size={iconSize} />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { label: "JavaScript", icon: <IconBrandJavascript size={iconSize} />, level: "expert" },
        { label: "TypeScript", icon: <IconBrandTypescript size={iconSize} />, level: "expert" },
        { label: "PHP (bases)", icon: <IconBrandPhp size={iconSize} />, level: "beginner" },
        { label: "C# (bases)", icon: <IconBrandCSharp size={iconSize} />, level: "beginner" },
        { label: "HTML", icon: <IconCode size={iconSize - 2} />, level: "expert" },
        { label: "CSS", icon: <IconCode size={iconSize - 2} />, level: "expert" },
        { label: "SQL (bases)", icon: <IconDatabase size={iconSize} />, level: "intermediate" },
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
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      items: [
        { label: "React JS & TS", icon: <IconBrandReact size={iconSize} />, level: "expert" },
        { label: "Node JS", icon: <IconBrandNodejs size={iconSize} />, level: "advanced" },
        { label: "Entity Framework (bases)", icon: <IconDatabase size={iconSize} /> },
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
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
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
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
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
      icon: <IconDatabase size={iconSize} />,
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      items: [
        { label: "Prisma", icon: <IconCode size={iconSize - 2} /> },
        { label: "PostgreSQL", icon: <IconDatabase size={iconSize - 2} /> },
        { label: "TypeORM (bases)", icon: <IconCode size={iconSize - 2} /> },
        { label: "MySQL", icon: <IconDatabase size={iconSize - 2} /> },
        { label: "SQLite", icon: <IconDatabase size={iconSize - 2} /> },
        { label: "MongoDB (bases)", icon: <IconBrandMongodb size={iconSize - 2} /> },
        { label: "Redis", icon: <IconCode size={iconSize - 2} /> },
        { label: "Waterline (sails)", icon: <IconDatabase size={iconSize - 2} /> },
      ],
    },
    {
      title: "Outils",
      icon: <IconCode size={iconSize} />,
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      items: [
        { label: "Git", icon: <IconBrandGit size={iconSize - 2} /> },
        { label: "GitKraken", icon: <IconGitBranch size={iconSize - 2} /> },
        { label: "Docker", icon: <IconBrandDocker size={iconSize - 2} /> },
        { label: "VS Code", icon: <IconBrandVscode size={iconSize - 2} /> },
        { label: "Visual Studio", icon: <IconBrandVisualStudio size={iconSize - 2} /> },
        { label: "Suite Jetbrains", icon: <IconCode size={iconSize - 2} /> },
        { label: "Figma", icon: <IconBrandFigma size={iconSize - 2} /> },
        { label: "Swagger", icon: <IconApi size={iconSize - 2} /> },
        { label: "Insomnia", icon: <IconBrandOpenSource size={iconSize - 2} /> },
        { label: "OpenProject", icon: <IconBrandOpenSource size={iconSize - 2} /> },
        { label: "Suite Microsoft", icon: <FaMicrosoft size={iconSize - 2} /> },
        { label: "Discord", icon: <IconBrandDiscord size={iconSize - 2} /> },
        { label: "GitHub", icon: <IconBrandGithub size={iconSize - 2} /> },
        { label: "GitLab", icon: <IconBrandGitlab size={iconSize - 2} /> },
        { label: "Canva", icon: <IconCode size={iconSize - 2} /> },
        { label: "DbGate", icon: <IconDatabase size={iconSize - 2} /> },
        { label: "Rabbit MQ", icon: <SiRabbitmq size={iconSize - 2} /> },
      ],
    },
  ];

  const otherSkills: SkillSection[] = [
    {
      title: "Soft-skills",
      icon: <IconHeartHandshake size={iconSize} />,
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
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
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      items: [{ label: "Anglais (notions)" }, { label: "Espagnol (notions)" }],
    },
  ];

  const allSkills = [...technicalSkills, ...otherSkills];

  const cardStyle = {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(237, 242, 255, 0.8) 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(99, 102, 241, 0.1)",
    boxShadow: "0 8px 32px rgba(99, 102, 241, 0.1), 0 0 0 1px rgba(147, 51, 234, 0.05)",
  };

  const renderSkillItems = (items: SkillItem[]) => (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="md">
      {items.map((item) => (
        <Tooltip label={item.label} key={item.label} withArrow position="top" color="indigo">
          <Box
            className="skill-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 20px",
              borderRadius: 14,
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.9))",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(99, 102, 241, 0.15)",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#4338ca",
              boxShadow: "0 2px 8px rgba(99, 102, 241, 0.08)",
              minHeight: "60px",
            }}
          >
            {item.icon && (
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #9333ea)",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
            )}
            <Text
              style={{
                flex: 1,
                lineHeight: 1.4,
              }}
            >
              {item.label}
            </Text>
          </Box>
        </Tooltip>
      ))}
    </SimpleGrid>
  );

  const renderSkillSection = (section: SkillSection, index: number) => (
    <Paper
      key={section.title}
      withBorder
      radius="xl"
      p="xl"
      className={`fade-animated-skill fade-delay-${Math.min(index + 2, 10)} skill-card-hover`}
      style={cardStyle}
    >
      <Group mb="lg" gap="md">
        <ThemeIcon
          size={48}
          radius="xl"
          variant="gradient"
          gradient={{ from: "indigo", to: "violet", deg: 135 }}
        >
          {section.icon}
        </ThemeIcon>
        <div style={{ flex: 1 }}>
          <Text
            fw={700}
            size="xl"
            style={{
              background: "linear-gradient(135deg, #4338ca, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {section.title}
          </Text>
          <Text size="xs" c="dimmed" mt={4}>
            {section.items.length} compétence{section.items.length > 1 ? "s" : ""}
          </Text>
        </div>
      </Group>
      <Divider
        mb="lg"
        variant="dashed"
        style={{
          borderColor: "rgba(99, 102, 241, 0.2)",
        }}
      />
      {renderSkillItems(section.items)}
    </Paper>
  );

  return (
    <Container
      size="xl"
      style={{
        paddingTop: "5rem",
        paddingBottom: "6rem",
        position: "relative",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Stack gap="xl" style={{ position: "relative", zIndex: 1 }}>
        <Box ta="center" mb="xl">
          <Group justify="center" gap="xs" mb="md" className="fade-animated-skill fade-delay-1">
            <Title
              order={1}
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #9333ea 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
                fontSize: "3rem",
                letterSpacing: "-0.02em",
              }}
            >
              Mes Compétences
            </Title>
          </Group>
          <Text
            size="lg"
            c="dimmed"
            maw={600}
            mx="auto"
            className="fade-animated-skill fade-delay-2"
          >
            Explorez mes compétences techniques et mes outils de développement
          </Text>
        </Box>

        {isDesktop ? (
          <Group align="flex-start" gap="xl" mt="xl" wrap="nowrap">
            <Stack style={{ flex: 1.6 }}>
              <Paper
                radius="xl"
                p="md"
                className="fade-animated-skill fade-delay-3 gradient-border"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 242, 255, 0.9) 100%)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <Title
                  order={2}
                  ta="center"
                  mb="md"
                  style={{
                    background: "linear-gradient(135deg, #1e3a8a, #9333ea)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                  }}
                >
                  💻 Compétences Techniques
                </Title>
                <Tabs
                  value={activeTab}
                  onChange={setActiveTab}
                  orientation="vertical"
                  variant="pills"
                  radius="xl"
                  styles={{
                    root: {
                      background: "transparent",
                    },
                    tab: {
                      fontWeight: 500,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      padding: "14px 24px",
                      fontSize: "0.95rem",
                    },
                    panel: {
                      paddingLeft: "var(--mantine-spacing-xl)",
                    },
                  }}
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
                    <Tabs.Panel key={section.title} value={section.title}>
                      <Transition
                        mounted={activeTab === section.title}
                        transition="fade"
                        duration={200}
                        timingFunction="ease"
                      >
                        {(styles) => <div style={styles}>{renderSkillSection(section, index)}</div>}
                      </Transition>
                    </Tabs.Panel>
                  ))}
                </Tabs>
              </Paper>
            </Stack>

            <Divider
              orientation="vertical"
              style={{
                height: "auto",
                alignSelf: "stretch",
                borderColor: "rgba(99, 102, 241, 0.2)",
              }}
            />

            <Stack style={{ flex: 1 }}>
              <Paper
                radius="xl"
                p="md"
                mb="lg"
                className="fade-animated-skill fade-delay-4 gradient-border"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 242, 255, 0.9) 100%)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <Title
                  order={2}
                  ta="center"
                  mb="md"
                  style={{
                    background: "linear-gradient(135deg, #1e3a8a, #9333ea)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                  }}
                >
                  🌟 Soft Skills & Langues
                </Title>
                <Stack gap="lg" mt="md">
                  {otherSkills.map((section, i) =>
                    renderSkillSection(section, technicalSkills.length + i)
                  )}
                </Stack>
              </Paper>
            </Stack>
          </Group>
        ) : (
          <Stack gap="xl">
            <Title
              order={2}
              ta="center"
              mb="md"
              className="fade-animated-skill fade-delay-2"
              style={{
                background: "linear-gradient(135deg, #1e3a8a, #9333ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              💻 Compétences Techniques
            </Title>
            <Accordion
              variant="separated"
              radius="xl"
              className="fade-animated-skill fade-delay-3"
              styles={{
                item: {
                  ...cardStyle,
                  border: "1px solid rgba(99, 102, 241, 0.15)",
                  overflow: "hidden",
                  marginBottom: "var(--mantine-spacing-md)",
                },
                control: {
                  padding: "var(--mantine-spacing-lg)",
                  fontWeight: 600,
                  "&:hover": {
                    background: "rgba(99, 102, 241, 0.05)",
                  },
                },
                panel: {
                  padding: "var(--mantine-spacing-lg)",
                },
              }}
            >
              {technicalSkills.map((section) => (
                <Accordion.Item key={section.title} value={section.title}>
                  <Accordion.Control
                    icon={
                      <ThemeIcon
                        size={36}
                        radius="xl"
                        variant="gradient"
                        gradient={{ from: "indigo", to: "violet", deg: 135 }}
                      >
                        {section.icon}
                      </ThemeIcon>
                    }
                  >
                    <Text fw={600} size="lg">
                      {section.title}
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>{renderSkillItems(section.items)}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>

            <Divider my="xl" variant="dashed" style={{ borderColor: "rgba(99, 102, 241, 0.2)" }} />

            <Title
              order={2}
              ta="center"
              mb="md"
              className="fade-animated-skill fade-delay-4"
              style={{
                background: "linear-gradient(135deg, #1e3a8a, #9333ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              🌟 Soft Skills & Langues
            </Title>
            <Accordion
              variant="separated"
              radius="xl"
              className="fade-animated-skill fade-delay-5"
              styles={{
                item: {
                  ...cardStyle,
                  border: "1px solid rgba(99, 102, 241, 0.15)",
                  overflow: "hidden",
                  marginBottom: "var(--mantine-spacing-md)",
                },
                control: {
                  padding: "var(--mantine-spacing-lg)",
                  fontWeight: 600,
                  "&:hover": {
                    background: "rgba(99, 102, 241, 0.05)",
                  },
                },
                panel: {
                  padding: "var(--mantine-spacing-lg)",
                },
              }}
            >
              {otherSkills.map((section) => (
                <Accordion.Item key={section.title} value={section.title}>
                  <Accordion.Control
                    icon={
                      <ThemeIcon
                        size={36}
                        radius="xl"
                        variant="gradient"
                        gradient={{ from: "indigo", to: "violet", deg: 135 }}
                      >
                        {section.icon}
                      </ThemeIcon>
                    }
                  >
                    <Text fw={600} size="lg">
                      {section.title}
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>{renderSkillItems(section.items)}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        )}

        <Box ta="center" mt="xl">
          <Button
            size="lg"
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 135 }}
            radius="xl"
            leftSection={<IconArrowLeft size={20} />}
            onClick={() => navigate("/")}
            className={`fade-animated-skill fade-delay-${allSkills.length + 2}`}
            style={{
              paddingInline: 32,
              boxShadow: "0 8px 24px rgba(99, 102, 241, 0.3)",
              transition: "all 0.3s ease",
            }}
            styles={{
              root: {
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 32px rgba(99, 102, 241, 0.4)",
                },
              },
            }}
          >
            Retour à l'accueil
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Skill;
