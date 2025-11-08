/**
 * Application Entry Point
 * 
 * Provider Setup (outermost to innermost):
 * 1. StrictMode - React development mode checks
 * 2. ThemeProvider - MUI theme configuration
 * 3. CssBaseline - MUI global CSS reset
 * 4. QueryClientProvider - TanStack Query for server state
 * 5. Redux Provider - Redux store for global state
 * 6. BrowserRouter - React Router for navigation
 * 7. App - Root component
 * 
 * QueryClient Configuration:
 * - staleTime: 30s (data considered fresh for 30 seconds)
 * - retry: 1 (retry failed requests once)
 * - Errors handled at component level with Alert components
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { theme } from "./theme";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Global error logging (errors are handled at component level with Alert components)
// In a real app, you could add toast notifications here
console.log("QueryClient configured with staleTime: 30s, retry: 1");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
