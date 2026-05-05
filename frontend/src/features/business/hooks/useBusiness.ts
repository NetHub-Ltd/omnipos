// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";
// import { axiosClient } from "../../../lib/axiosClient";

// const API_BASE = `http://localhost:8000/api/v1/business`; // Assuming axiosClient has the base URL

// export function useBusinesses() {
//   const { data: session } = useSession();
//   const queryClient = useQueryClient();

//   // Extracting user UUID for cache isolation and the token for RS authorization
//   const userId = session?.user?.id;
//   const token = session?.accessToken;

//   const authHeader = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   // 1. Fetching Businesses (Localized to User UUID)
//   const query = useQuery({
//     queryKey: ["businesses", userId],
//     queryFn: async () => {
//       const { data } = await axiosClient.get(
//         `/api/v1/business`,
//       );
//       console.log("Fetched businesses:", data);
//       return data.data;
//     },
//     // Only execute if we have an active session and token
//     enabled: !!userId && !!token,
//     staleTime: 1000 * 60 * 5, // 5 minutes cache for high-performance navigation
//   });

//   // 2. Create Business Mutation
//   const createMutation = useMutation({
//     mutationFn: async (newBiz: { name: string; business_type?: string }) => {
//       const { data } = await axiosClient.post(
//         `${API_BASE}/register-business`,
//         newBiz,
//         authHeader,
//       );
//       return data;
//     },
//     onSuccess: () => {
//       // Precise invalidation using the user's specific cache key
//       queryClient.invalidateQueries({ queryKey: ["businesses", userId] });
//       toast.success("Business registered successfully");
//     },
//     onError: (error: any) => {
//       toast.error(
//         error.response?.data?.detail || "Failed to register business",
//       );
//     },
//   });

//   // 3. Update Business Mutation (Reflecting image_965bdb.png PATCH)
//   const updateMutation = useMutation({
//     mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
//       const { data } = await axiosClient.patch(
//         `${API_BASE}/update-business/${id}`,
//         payload,
//         authHeader,
//       );
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["businesses", userId] });
//       toast.success("Business updated");
//     },
//   });

//   // 4. Delete Business Mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (businessId: string) => {
//       const { data } = await axiosClient.delete(
//         `${API_BASE}/delete/${businessId}`,
//         authHeader,
//       );
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["businesses", userId] });
//       toast.error("Business permanently removed");
//     },
//   });

//   return {
//     businesses: query.data || [],
//     isLoading: query.isLoading,
//     isError: query.isError,
//     error: query.error,
//     createBusiness: createMutation.mutateAsync,
//     updateBusiness: updateMutation.mutateAsync,
//     deleteBusiness: deleteMutation.mutateAsync,
//     // Status helpers for UI loading states
//     isCreating: createMutation.isPending,
//     isDeleting: deleteMutation.isPending,
//     isUpdating: updateMutation.isPending,
//   };
// }

// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import { businessService } from "@/lib/services/businessService";
// // import { Business } from "@/types/business";
// import { Business } from "@/features/business/types/business";
// import { businessService } from "@/features/business/services/businessService";

// export function useBusiness() {
//   const queryClient = useQueryClient();

//   // 1. Fetching Logic
//   const query = useQuery<Business[]>({
//     queryKey: ["businesses"],
//     queryFn: businessService.fetchAll,
//     staleTime: 1000 * 60 * 5, // 5 minutes: Balance between freshness and performance
//     refetchOnWindowFocus: true, // Crucial for POS/Terminal environments
//   });

//   // 2. Registration Logic
//   const mutation = useMutation({
//     mutationFn: businessService.register,
//     onSuccess: () => {
//       // Invalidate cache to trigger an immediate background refetch
//       queryClient.invalidateQueries({ queryKey: ["businesses"] });
//     },
//   });

//   return {
//     businesses: query.data ?? [],
//     isLoading: query.isLoading,
//     isError: query.isError,
//     error: query.error,

//     // Mutation Exports
//     registerBusiness: mutation.mutate,
//     isRegistering: mutation.isPending,
//     registrationError: mutation.error,
//   };
// }

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { businessService } from "@/features/business/services/businessService";
// import { Business } from "@/types/business";
import { Business } from "@/features/business/types/business";

export function useBusiness() {
  const queryClient = useQueryClient();

  // Query logic: Fetch and cache the business list
  const {
    data: businesses = [],
    isLoading,
    isError,
    error,
  } = useQuery<Business[]>({
    queryKey: ["businesses"],
    queryFn: businessService.getBusinesses,
    staleTime: 1000 * 60 * 5, // 5 mins: prevents excessive refetching during session
  });

  // Mutation logic: Handle new business creation
  const registerMutation = useMutation({
    mutationFn: businessService.createBusiness,
    onSuccess: () => {
      // Logic: Invalidate the "businesses" key to trigger an immediate refetch
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },
  });

  return {
    // State
    businesses,
    isLoading,
    isError,
    error,

    // Actions
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registrationError: registerMutation.error,
  };
}