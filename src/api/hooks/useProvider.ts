import { useQuery } from "@tanstack/react-query";
import { api } from "../client";

interface ProviderPatient {
  id: number;
  name: string;
  status: string;
}

interface ProviderPatientsData {
  patients: ProviderPatient[];
}

export const useProviderPatients = () => {
  return useQuery<ProviderPatientsData>({
    queryKey: ["provider", "patients"],
    queryFn: async () => {
      const response = await api.get("/provider");
      // Extract patients array from provider object
      return { patients: response.data.patients };
    },
  });
};

