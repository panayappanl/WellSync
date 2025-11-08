/**
 * Dashboard Hook
 * 
 * Data Flow:
 * 1. Component calls useDashboard()
 * 2. TanStack Query checks cache for ["dashboard"] query
 * 3. If stale or missing → fetches GET /patient/dashboard
 * 4. Returns { data, isLoading, error } for component to use
 * 5. Cache persists for 30 seconds (staleTime configured in main.tsx)
 * 
 * Usage:
 * const { data, isLoading, error } = useDashboard();
 */

import { useQuery } from "@tanstack/react-query";
import { api } from "../client";

interface DashboardGoals {
  steps: number;
  water: number;
  sleep: number;
}

interface Reminder {
  title: string;
  date: string;
}

interface DashboardData {
  goals: DashboardGoals;
  reminders: Reminder[];
  healthTip: string;
}

export const useDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await api.get("/patient");
      // Extract dashboard from patient object
      return response.data.dashboard;
    },
  });
};
