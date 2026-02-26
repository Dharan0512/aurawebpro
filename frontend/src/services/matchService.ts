import apiClient from "../lib/apiClient";

export interface MatchProfile {
  userId: string;
  basicDetails: {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    religion: string;
    location: string;
  };
  professionalInfo: {
    education: string;
    profession: string;
    incomeRange: string;
  };
  photos: string[];
  matchScore: number;
}

export const matchService = {
  getDailyMatches: async (): Promise<MatchProfile[]> => {
    const response = await apiClient.get("/matches/daily");
    return response.data;
  },
};
