/**
 * Auth Redux Slice
 * 
 * Data Flow:
 * 1. User logs in/registers → LoginPage/RegisterPage dispatches setAuth()
 * 2. setAuth() updates Redux state and persists to localStorage
 * 3. On app load, loadAuthFromStorage() restores auth state from localStorage
 * 4. ProtectedRoute checks token from Redux/localStorage
 * 5. RoleGuard checks role matches required route role
 * 6. Logout dispatches clearAuth() → clears Redux + localStorage → redirects to /login
 * 
 * State Structure:
 * - token: JWT token string (or "mock-jwt" for mock API)
 * - role: "patient" | "provider" | null
 * - user: User object with id, name, email, role
 */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  role: "patient" | "provider";
}

interface AuthState {
  token: string | null;
  role: "patient" | "provider" | null;
  user: User | null;
}

/**
 * Loads authentication state from localStorage on app initialization
 * Returns initial auth state if valid data exists, otherwise returns empty state
 */
const loadAuthFromStorage = (): AuthState => {
  try {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") as "patient" | "provider" | null;
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (token && role && user) {
      return { token, role, user };
    }
  } catch (error) {
    console.error("Error loading auth from storage:", error);
  }
  return { token: null, role: null, user: null };
};

const initialState: AuthState = loadAuthFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets authentication state and persists to localStorage
     * Called after successful login/registration
     */
    setAuth: (
      state,
      action: PayloadAction<{
        token: string;
        role: "patient" | "provider";
        user: User;
      }>
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;

      // Persist to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    /**
     * Clears authentication state and localStorage
     * Called on logout
     */
    clearAuth: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
    /**
     * Updates user information in state and localStorage
     * Called when profile is updated
     */
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { setAuth, clearAuth, updateUser } = authSlice.actions;
export default authSlice.reducer;
