import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Skeleton,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearAuth } from "../../../features/auth/authSlice";
import { usePatientDetails } from "../../../api/hooks/usePatientDetails";

const PatientDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const patientId = id ? parseInt(id, 10) : 0;

  const { data: patientDetails, isLoading, error } = usePatientDetails(patientId);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/provider/dashboard");
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
        <Box>
          <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
        <Box>
          <Alert severity="error">Error loading patient details. Please try again later.</Alert>
        </Box>
      </Container>
    );
  }

  if (!patientDetails) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
        <Box>
          <Alert severity="info">Patient not found</Alert>
        </Box>
      </Container>
    );
  }

  const goals = patientDetails.dashboard?.goals || { steps: 0, water: 0, sleep: 0 };
  const profile = patientDetails.profile || {};
  const reminders = patientDetails.dashboard?.reminders || [];
  const healthTip = patientDetails.dashboard?.healthTip || "";

  // Calculate progress percentages
  const stepsProgress = Math.min((goals.steps / 10000) * 100, 100);
  const waterProgress = Math.min((goals.water / 2) * 100, 100);
  const sleepProgress = Math.min((goals.sleep / 8) * 100, 100);

  return (
    <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 4,
            gap: 2,
            width: "100%",
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem" } }}>
            Patient Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button variant="outlined" onClick={handleBack} sx={{ width: { xs: "100%", sm: "auto" } }}>
              Back to Dashboard
            </Button>
            <Button variant="outlined" onClick={handleLogout} sx={{ width: { xs: "100%", sm: "auto" } }}>
              Logout
            </Button>
          </Box>
        </Box>

        {/* Profile Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Profile Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Name
              </Typography>
              <Typography variant="body1" paragraph>
                {profile.name || "N/A"}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Age
              </Typography>
              <Typography variant="body1" paragraph>
                {profile.age || "N/A"}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Allergies
              </Typography>
              <Typography variant="body1" paragraph>
                {profile.allergies || "None"}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Medications
              </Typography>
              <Typography variant="body1" paragraph>
                {profile.medications || "None"}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Goals and Reminders in a row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 3,
            width: "100%",
          }}
        >
          {/* Goals Card */}
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" }, width: "100%" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Current Goals
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Steps: {goals.steps}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round(stepsProgress)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={stepsProgress}
                    sx={{ mb: 2 }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Water: {goals.water}L
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round(waterProgress)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={waterProgress}
                    sx={{ mb: 2 }}
                  />
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Sleep: {goals.sleep}h
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round(sleepProgress)}%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={sleepProgress} />
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Reminders Card */}
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" }, width: "100%" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Upcoming Reminders
                </Typography>
                {reminders.length > 0 ? (
                  <List>
                    {reminders.map((reminder, index) => (
                      <ListItem key={index} divider={index < reminders.length - 1}>
                        <ListItemText
                          primary={reminder.title}
                          secondary={new Date(reminder.date).toLocaleDateString()}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No upcoming reminders
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Health Tip */}
        {healthTip && (
          <Paper
            elevation={2}
            sx={{
              p: 3,
              bgcolor: "primary.light",
              color: "primary.contrastText",
              width: "100%",
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              💡 Health Tip
            </Typography>
            <Typography variant="body1">{healthTip}</Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default PatientDetails;

