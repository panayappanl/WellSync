import { useQuery } from "@tanstack/react-query";
import { api } from "../client";

interface PatientDetails {
  dashboard: {
    goals: {
      steps: number;
      water: number;
      sleep: number;
    };
    reminders: Array<{
      title: string;
      date: string;
    }>;
    healthTip: string;
  };
  profile: {
    id: number;
    name: string;
    age: number;
    allergies: string;
    medications: string;
  };
  goals: Array<{
    date: string;
    steps: number;
    water: number;
    sleep: number;
  }>;
}

export const usePatientDetails = (patientId: number) => {
  return useQuery<PatientDetails>({
    queryKey: ["patient", "details", patientId],
    queryFn: async () => {
      // For now, we'll fetch the patient data from the patient endpoint
      // In a real app, this would be /provider/patient/:id
      const response = await api.get("/patient");
      return response.data;
    },
    enabled: !!patientId,
  });
};

