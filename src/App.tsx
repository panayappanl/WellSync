import { Box } from "@mui/material";
import AppRoutes from "./app/routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default App;
