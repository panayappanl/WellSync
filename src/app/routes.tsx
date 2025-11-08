/**
 * Application Routes Configuration
 * 
 * Data Flow:
 * 1. BrowserRouter (in main.tsx) wraps entire app
 * 2. Routes component defines all route paths
 * 3. ProtectedRoute checks authentication (token exists)
 * 4. RoleGuard checks role authorization (role matches requiredRole)
 * 5. If unauthorized → redirects to appropriate dashboard or /login
 * 
 * Route Protection Layers:
 * - Public routes: /, /login, /register, /about, /privacy
 * - Protected routes: require authentication (ProtectedRoute)
 * - Role-based routes: require specific role (RoleGuard)
 *   - Patient routes: /patient/* (requires "patient" role)
 *   - Provider routes: /provider/* (requires "provider" role)
 */

import { Routes, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivacyPage from "../pages/PrivacyPage";
import RegisterPage from "../pages/RegisterPage";
import { GoalTracker, PatientDashboard, ProfilePage } from "../features/patient";
import { PatientDetails, ProviderDashboard } from "../features/provider";
import { ProtectedRoute, RoleGuard } from "../components";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      {/* Patient Routes - Protected + Role Guard */}
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute>
            <RoleGuard requiredRole="patient">
              <PatientDashboard />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/goals"
        element={
          <ProtectedRoute>
            <RoleGuard requiredRole="patient">
              <GoalTracker />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute>
            <RoleGuard requiredRole="patient">
              <ProfilePage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Provider Routes - Protected + Role Guard */}
      <Route
        path="/provider/dashboard"
        element={
          <ProtectedRoute>
            <RoleGuard requiredRole="provider">
              <ProviderDashboard />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/provider/patient/:id"
        element={
          <ProtectedRoute>
            <RoleGuard requiredRole="provider">
              <PatientDetails />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
