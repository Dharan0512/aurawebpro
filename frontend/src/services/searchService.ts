import apiClient from "@/lib/apiClient";

export interface SearchFilters {
  gender?: string;
  ageMin?: string;
  ageMax?: string;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  state?: string;
  city?: string;
  education?: string;
  employment?: string;
  page?: string;
  limit?: string;
}

export interface SearchResultProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  religionName: string;
  casteName: string;
  city: string;
  state: string;
  education: string;
  occupation: string;
  profilePicUrl?: string;
}

export interface SearchResponse {
  data: SearchResultProfile[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const searchService = {
  searchProfiles: async (filters: SearchFilters): Promise<SearchResponse> => {
    // Keep only truthy keys from filters object to build the query string cleanly
    const params = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v != null && v !== ""),
    );
    const { data } = await apiClient.get("/search", { params });
    return data;
  },
};
