import { Container, Typography, Box, Button, Card, CardContent, LinearProgress, List, ListItem, ListItemText, Paper, Skeleton, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import { clearAuth } from "../../../features/auth/authSlice";
import { useDashboard } from "../../../api/hooks/useDashboard";

const PatientDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: dashboard, isLoading, error } = useDashboard();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  const handleUpdateGoals = () => {
    navigate("/patient/goals");
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
          <Alert severity="error">Error loading dashboard. Please try again later.</Alert>
        </Box>
      </Container>
    );
  }

  const goals = dashboard?.goals || { steps: 0, water: 0, sleep: 0 };
  const reminders = dashboard?.reminders || [];
  const healthTip = dashboard?.healthTip || "";

  // Calculate progress percentages (assuming targets: 10000 steps, 2L water, 8h sleep)
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
            Patient Dashboard
          </Typography>
          <Button variant="outlined" onClick={handleLogout} sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}>
            Logout
          </Button>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Welcome, {user?.name}!
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            width: "100%",
          }}
        >
          {/* Goals Card */}
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" }, width: "100%" }}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" component="h2">
                    Today's Goals
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleUpdateGoals}
                  >
                    Update Goals
                  </Button>
                </Box>

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

        {/* Health Tip Card */}
        <Box sx={{ mt: 3, width: "100%" }}>
          <Paper elevation={2} sx={{ p: 3, bgcolor: "primary.light", color: "primary.contrastText" }}>
            <Typography variant="h6" component="h2" gutterBottom>
              💡 Health Tip
            </Typography>
            <Typography variant="body1">{healthTip}</Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default PatientDashboard;

