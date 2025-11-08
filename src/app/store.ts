/**
 * Redux Store Configuration
 * 
 * Data Flow:
 * 1. Store created with configureStore() from Redux Toolkit
 * 2. Auth reducer added to store
 * 3. RootState type exported for TypeScript type safety
 * 4. AppDispatch type exported for typed dispatch actions
 * 5. Store provided to app via Provider in main.tsx
 * 
 * Reducers:
 * - auth: Manages authentication state (token, role, user)
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
