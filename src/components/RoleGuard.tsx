import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: "patient" | "provider";
}

const RoleGuard = ({ children, requiredRole }: RoleGuardProps) => {
  const { token, role } = useSelector((state: RootState) => state.auth);

  // Also check localStorage as fallback
  const tokenFromStorage = localStorage.getItem("token");
  const roleFromStorage = localStorage.getItem("role") as "patient" | "provider" | null;

  const isAuthenticated = token || tokenFromStorage;
  const userRole = role || roleFromStorage;

  // First check if authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Then check if user has the required role
  if (userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    if (userRole === "patient") {
      return <Navigate to="/patient/dashboard" replace />;
    } else if (userRole === "provider") {
      return <Navigate to="/provider/dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default RoleGuard;

