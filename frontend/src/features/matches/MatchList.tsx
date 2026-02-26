"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { interestService, Interest } from "@/services/interestService";
import { User, Check, X } from "lucide-react";

export default function MatchList() {
  const queryClient = useQueryClient();

  // Fetch received interests
  const { data: receivedInterests, isLoading } = useQuery({
    queryKey: ["interests", "received"],
    queryFn: interestService.getReceivedInterests,
  });

  // Accept Mutation
  const acceptMutation = useMutation({
    mutationFn: interestService.acceptInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interests", "received"] });
      alert("Interest accepted! You can now chat with them.");
    },
    onError: () => alert("Failed to accept interest."),
  });

  // Decline Mutation
  const declineMutation = useMutation({
    mutationFn: interestService.declineInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interests", "received"] });
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6A0DAD]"></div>
      </div>
    );
  }

  const pendingInterests =
    receivedInterests?.filter((i) => i.status === "pending") || [];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Received Interests
      </h2>

      {pendingInterests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-purple-50 p-12 text-center text-gray-500">
          <p>No pending interests right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingInterests.map((interest) => (
            <div
              key={interest.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-purple-50 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
                  {interest.senderProfile?.profilePicUrl ? (
                    <img
                      src={interest.senderProfile.profilePicUrl}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-purple-300" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 border-b border-transparent hover:border-[#6A0DAD] cursor-pointer inline-block">
                    {interest.senderProfile?.firstName || "Member"}{" "}
                    {interest.senderProfile?.lastName || ""}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {interest.senderProfile?.age || "?"} yrs •{" "}
                    {interest.senderProfile?.city || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Received:{" "}
                    {new Date(interest.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => declineMutation.mutate(interest.id)}
                  disabled={
                    declineMutation.isPending || acceptMutation.isPending
                  }
                  className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors disabled:opacity-50"
                  title="Decline"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={() => acceptMutation.mutate(interest.id)}
                  disabled={
                    declineMutation.isPending || acceptMutation.isPending
                  }
                  className="px-4 py-2 bg-[#6A0DAD] text-white text-sm font-medium rounded-full shadow-sm hover:bg-purple-800 transition-colors flex items-center disabled:opacity-50"
                >
                  <Check className="w-4 h-4 mr-1" /> Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
