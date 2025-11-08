import { useState } from "react";
import type { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { setAuth } from "../features/auth/authSlice";
import { api } from "../api/client";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"patient" | "provider">("patient");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!consent) {
      setError("Please provide consent to continue");
      return;
    }

    setLoading(true);

    try {
      // Check if user already exists
      const checkResponse = await api.get(`/users?email=${email}`);
      if (checkResponse.data && checkResponse.data.length > 0) {
        setError("Email already registered");
        setLoading(false);
        return;
      }

      // Register new user
      const response = await api.post("/users", {
        name,
        email,
        password,
        role,
      });

      const newUser = response.data;

      // Auto-login after registration
      dispatch(
        setAuth({
          token: "mock-jwt",
          role: newUser.role,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        })
      );

      // Redirect based on role
      if (newUser.role === "patient") {
        navigate("/patient/dashboard");
      } else if (newUser.role === "provider") {
        navigate("/provider/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, width: "100%", minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Register
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              select
              label="Role"
              margin="normal"
              required
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "patient" | "provider")
              }
              disabled={loading}
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="provider">Provider</MenuItem>
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={loading}
                />
              }
              label="I consent to the terms and conditions"
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
            <Box textAlign="center">
              <Link component={RouterLink} to="/login">
                Already have an account? Login
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
