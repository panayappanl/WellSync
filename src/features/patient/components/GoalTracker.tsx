import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useUpdateGoals } from "../../../api/hooks/useGoals";

const GoalTracker = () => {
  const [steps, setSteps] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateGoalsMutation = useUpdateGoals();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const stepsNum = parseInt(steps, 10);
    const waterNum = parseFloat(water);
    const sleepNum = parseFloat(sleep);

    if (isNaN(stepsNum) || stepsNum < 0) {
      setError("Steps must be a valid number");
      return;
    }

    if (isNaN(waterNum) || waterNum < 0) {
      setError("Water must be a valid number");
      return;
    }

    if (isNaN(sleepNum) || sleepNum < 0 || sleepNum > 24) {
      setError("Sleep must be a valid number between 0 and 24");
      return;
    }

    try {
      await updateGoalsMutation.mutateAsync({
        steps: stepsNum,
        water: waterNum,
        sleep: sleepNum,
      });
      // Redirect back to dashboard after successful update
      navigate("/patient/dashboard");
    } catch (err) {
      setError("Failed to update goals. Please try again.");
      console.error("Update goals error:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, width: "100%", minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Update Goals
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Steps"
              type="number"
              margin="normal"
              required
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              disabled={updateGoalsMutation.isPending}
              helperText="Enter your daily step goal"
            />
            <TextField
              fullWidth
              label="Water (Liters)"
              type="number"
              margin="normal"
              required
              value={water}
              onChange={(e) => setWater(e.target.value)}
              disabled={updateGoalsMutation.isPending}
              inputProps={{ step: "0.1" }}
              helperText="Enter your daily water intake goal in liters"
            />
            <TextField
              fullWidth
              label="Sleep (Hours)"
              type="number"
              margin="normal"
              required
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              disabled={updateGoalsMutation.isPending}
              inputProps={{ step: "0.5", min: "0", max: "24" }}
              helperText="Enter your daily sleep goal in hours"
            />
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => navigate("/patient/dashboard")}
                disabled={updateGoalsMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={updateGoalsMutation.isPending}
                sx={{ position: "relative" }}
              >
                {updateGoalsMutation.isPending ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} />
                    Updating...
                  </Box>
                ) : (
                  "Update Goals"
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default GoalTracker;

