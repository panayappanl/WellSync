import { Container, Typography, Box } from "@mui/material";

const PrivacyPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          Your privacy is important to us. This privacy policy explains how we
          collect, use, and protect your personal information.
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 3, mb: 2 }}>
          Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect information that you provide directly to us, including
          your name, email address, and health-related data.
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 3, mb: 2 }}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use your information to provide and improve our services, to
          communicate with you, and to ensure the security of our platform.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPage;

