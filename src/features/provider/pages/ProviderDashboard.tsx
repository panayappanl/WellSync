import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Skeleton,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import { clearAuth } from "../../../features/auth/authSlice";
import { useProviderPatients } from "../../../api/hooks/useProvider";

const ProviderDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useProviderPatients();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  const handlePatientClick = (patientId: number) => {
    navigate(`/provider/patient/${patientId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "goal met":
        return "success";
      case "missed checkup":
        return "error";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
        <Box>
          <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
        <Box>
          <Alert severity="error">Error loading patients. Please try again later.</Alert>
        </Box>
      </Container>
    );
  }

  const patients = data?.patients || [];

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
            Provider Dashboard
          </Typography>
          <Button variant="outlined" onClick={handleLogout} sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}>
            Logout
          </Button>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Welcome, {user?.name}!
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Patient List
        </Typography>

        {patients.length === 0 ? (
          <Alert severity="info">No patients found</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Status
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    hover
                    onClick={() => handlePatientClick(patient.id)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body1">{patient.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={patient.status}
                        color={getStatusColor(patient.status) as "success" | "error" | "default"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default ProviderDashboard;

