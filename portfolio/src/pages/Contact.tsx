import {
  Container,
  Title,
  Stack,
  Paper,
  Button,
  Anchor,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

const Cv = () => {
  return (
    <Container
      size="xs"
      py="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "flex-start",
        paddingTop: "6rem",
      }}
    >
      <Title
        order={2}
        style={{
          background: "linear-gradient(90deg, #1e3a8a, #9333ea)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
          fontSize: "2rem",
          textAlign: "center",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        Mon CV
      </Title>
      <Paper
        withBorder
        p="xl"
        radius="lg"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.4)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <Stack align="center" gap="lg">
          <Title order={3} style={{ color: "#1e3a8a", fontWeight: 600 }}>
            Téléchargez mon CV
          </Title>
          <Anchor
            href="/assets/CV_Thomas_MAALSI.pdf"
            download
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="light"
              color="indigo"
              leftSection={<IconDownload size={18} />}
              style={{
                borderRadius: 24,
                border: "2px solid indigo",
              }}
            >
              Télécharger le CV
            </Button>
          </Anchor>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Cv;