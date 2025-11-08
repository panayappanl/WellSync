import { Container, Typography, Box } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          About WellSync
        </Typography>
        <Typography variant="body1" paragraph>
          WellSync is a comprehensive healthcare wellness application designed
          to help you track and manage your health and wellness journey.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to empower individuals to take control of their health
          through easy-to-use tools and personalized insights.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;

