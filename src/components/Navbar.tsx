import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { clearAuth } from "../features/auth/authSlice";

const Navbar = () => {
  const { token, role, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  const isAuthenticated = !!token;
  const userRole = role || (localStorage.getItem("role") as "patient" | "provider" | null);

  return (
    <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
      <Toolbar sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            WellSync
          </Link>
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2 },
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {isAuthenticated ? (
            <>
              {/* Patient Navigation */}
              {userRole === "patient" && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/patient/dashboard"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/patient/goals"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Goals
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/patient/profile"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Profile
                  </Button>
                </>
              )}

              {/* Provider Navigation */}
              {userRole === "provider" && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/provider/dashboard"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Dashboard
                  </Button>
                </>
              )}

              {/* Common authenticated links */}
              <Typography
                variant="body2"
                sx={{ mr: 1, display: { xs: "none", sm: "block" } }}
              >
                {user?.name}
              </Typography>
              {/* <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Logout
              </Button> */}
            </>
          ) : (
            <>
              {/* Guest Navigation */}
              <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                About
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/privacy"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Privacy
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
