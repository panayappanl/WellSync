/**
 * Goals Hooks
 * 
 * Data Flow:
 * 1. useGoals() - Fetches goals array from GET /patient/goals
 * 2. useUpdateGoals() - Mutation hook for updating goals
 *    a. Gets current goals from cache
 *    b. Updates or creates today's goal entry
 *    c. PUTs entire patient object to /patient
 *    d. Invalidates ["goals"] and ["dashboard"] queries
 *    e. Components automatically refetch updated data
 * 
 * Query Invalidation:
 * - After successful mutation, related queries are invalidated
 * - Components using those queries automatically refetch
 * - Ensures UI stays in sync with server state
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";

interface Goal {
  date: string;
  steps: number;
  water: number;
  sleep: number;
}

export const useGoals = () => {
  return useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await api.get("/patient");
      // Extract goals array from patient object
      return response.data.goals;
    },
  });
};

export const useUpdateGoals = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goals: { steps: number; water: number; sleep: number }) => {
      // Get current goals array
      const currentGoals = queryClient.getQueryData<Goal[]>(["goals"]);
      const today = new Date().toISOString().split("T")[0];

      // Find today's goal or create new one
      const goalsArray = currentGoals || [];
      const todayIndex = goalsArray.findIndex((g) => g.date === today);

      let updatedGoals: Goal[];
      if (todayIndex >= 0) {
        // Update existing goal
        updatedGoals = [...goalsArray];
        updatedGoals[todayIndex] = { ...updatedGoals[todayIndex], ...goals };
      } else {
        // Add new goal
        updatedGoals = [...goalsArray, { date: today, ...goals }];
      }

      // Update the goals array - json-server expects the full patient object structure
      // We need to update the entire patient object
      const patientResponse = await api.get("/patient");
      const patientData = patientResponse.data;
      
      const updatedPatient = {
        ...patientData,
        goals: updatedGoals,
        // Also update dashboard goals
        dashboard: {
          ...patientData.dashboard,
          goals: {
            steps: goals.steps,
            water: goals.water,
            sleep: goals.sleep,
          },
        },
      };

      const response = await api.put("/patient", updatedPatient);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate both goals and dashboard queries
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
