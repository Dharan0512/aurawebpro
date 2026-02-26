import apiClient from "@/lib/apiClient";

export interface Interest {
  id: string;
  senderId: string;
  receiverId: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
  senderProfile?: any; // Normally you'd type this out based on what the API returns
}

export const interestService = {
  sendInterest: async (receiverId: string): Promise<void> => {
    await apiClient.post("/interests", { receiverId });
  },

  getReceivedInterests: async (): Promise<Interest[]> => {
    const { data } = await apiClient.get("/interests/received");
    return data;
  },

  getSentInterests: async (): Promise<Interest[]> => {
    const { data } = await apiClient.get("/interests/sent");
    return data;
  },

  acceptInterest: async (interestId: string): Promise<void> => {
    await apiClient.post(`/interests/${interestId}/accept`);
  },

  declineInterest: async (interestId: string): Promise<void> => {
    await apiClient.post(`/interests/${interestId}/decline`);
  },
};
