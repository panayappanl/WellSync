import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";

interface Profile {
  id: number;
  name: string;
  age: number;
  allergies: string;
  medications: string;
}

export const useProfile = () => {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/patient");
      // Extract profile from patient object
      return response.data.profile;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: {
      name: string;
      age: number;
      allergies: string;
      medications: string;
    }) => {
      // Get current patient data
      const patientResponse = await api.get("/patient");
      const patientData = patientResponse.data;

      const updatedPatient = {
        ...patientData,
        profile: {
          ...patientData.profile,
          ...profile,
        },
      };

      const response = await api.put("/patient", updatedPatient);
      return response.data.profile;
    },
    onSuccess: () => {
      // Invalidate profile query
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

