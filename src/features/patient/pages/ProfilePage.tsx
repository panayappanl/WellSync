import { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth, updateUser } from "../../../features/auth/authSlice";
import { useProfile, useUpdateProfile } from "../../../api/hooks/useProfile";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    allergies: "",
    medications: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        age: profile.age?.toString() || "",
        allergies: profile.allergies || "",
        medications: profile.medications || "",
      });
    }
  }, [profile]);

  const handleEdit = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        age: profile.age?.toString() || "",
        allergies: profile.allergies || "",
        medications: profile.medications || "",
      });
    }
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSuccessMessage("");
    if (profile) {
      setFormData({
        name: profile.name || "",
        age: profile.age?.toString() || "",
        allergies: profile.allergies || "",
        medications: profile.medications || "",
      });
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum < 0) {
      setSuccessMessage("Age must be a valid number");
      return;
    }

    try {
      const updatedProfile = await updateProfileMutation.mutateAsync({
        name: formData.name,
        age: ageNum,
        allergies: formData.allergies,
        medications: formData.medications,
      });

      // Update Redux user state
      dispatch(
        updateUser({
          name: updatedProfile.name,
        })
      );

      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setSuccessMessage("Failed to update profile. Please try again.");
      console.error("Update profile error:", err);
    }
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
        <Box>
          <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, width: "100%" }}>
        <Box>
          <Alert severity="error">Error loading profile. Please try again later.</Alert>
        </Box>
      </Container>
    );
  }

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
            My Profile
          </Typography>
          <Button variant="outlined" onClick={handleLogout} sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}>
            Logout
          </Button>
        </Box>

        {successMessage && (
          <Alert
            severity={successMessage.includes("successfully") ? "success" : "error"}
            sx={{ mb: 3 }}
            onClose={() => setSuccessMessage("")}
          >
            {successMessage}
          </Alert>
        )}

        <Card>
          <CardContent>
            {isEditing ? (
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  required
                  value={formData.name}
                  onChange={handleChange("name")}
                  disabled={updateProfileMutation.isPending}
                />
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  margin="normal"
                  required
                  value={formData.age}
                  onChange={handleChange("age")}
                  disabled={updateProfileMutation.isPending}
                  inputProps={{ min: 0 }}
                />
                <TextField
                  fullWidth
                  label="Allergies"
                  margin="normal"
                  multiline
                  rows={3}
                  value={formData.allergies}
                  onChange={handleChange("allergies")}
                  disabled={updateProfileMutation.isPending}
                  placeholder="List any allergies or enter 'None'"
                />
                <TextField
                  fullWidth
                  label="Medications"
                  margin="normal"
                  multiline
                  rows={3}
                  value={formData.medications}
                  onChange={handleChange("medications")}
                  disabled={updateProfileMutation.isPending}
                  placeholder="List current medications"
                />
                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={updateProfileMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={updateProfileMutation.isPending}
                    sx={{ position: "relative" }}
                  >
                    {updateProfileMutation.isPending ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CircularProgress size={20} />
                        Saving...
                      </Box>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h5" component="h2">
                    Profile Information
                  </Typography>
                  <Button variant="contained" onClick={handleEdit}>
                    Edit
                  </Button>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Name
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {profile?.name || "N/A"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Age
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {profile?.age || "N/A"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Allergies
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {profile?.allergies || "None"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Medications
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {profile?.medications || "None"}
                  </Typography>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProfilePage;

