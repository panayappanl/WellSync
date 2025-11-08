import { Container, Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { clearAuth } from "../features/auth/authSlice";

const ProviderDashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h3" component="h1">
            Provider Dashboard
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <Typography variant="h5" gutterBottom>
          Welcome, {user?.name}!
        </Typography>
        <Typography variant="body1" paragraph>
          This is your provider dashboard. Manage your patients and wellness
          programs here.
        </Typography>
      </Box>
    </Container>
  );
};

export default ProviderDashboardPage;

