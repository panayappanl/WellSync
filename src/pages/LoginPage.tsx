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
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { setAuth } from "../features/auth/authSlice";
import { api } from "../api/client";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.get(
        `/users?email=${email}&password=${password}`
      );
      const users = response.data;

      if (users && users.length > 0) {
        const user = users[0];
        dispatch(
          setAuth({
            token: "mock-jwt",
            role: user.role,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          })
        );

        // Redirect based on role
        if (user.role === "patient") {
          navigate("/patient/dashboard");
        } else if (user.role === "provider") {
          navigate("/provider/dashboard");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, width: "100%", minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <Box textAlign="center">
              <Link component={RouterLink} to="/register">
                Don't have an account? Register
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
