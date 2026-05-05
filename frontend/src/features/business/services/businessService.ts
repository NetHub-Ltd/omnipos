// import { Business } from "@/features/business/types/business";

// export const businessService = {
//   /**
//    * Fetches the list of businesses from the internal API route.
//    * Throws detailed errors for TanStack Query to catch and process.
//    */
//   fetchAll: async (): Promise<Business[]> => {
//     const response = await fetch("/api/v1/business", {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       // Next.js 16: Dynamic fetching ensures we don't show stale business lists
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to fetch workspace data");
//     }

//     // Per your note: backend returns data.data
//     return response.json();
//   },

//   register: async (name: string): Promise<Business> => {
//     const response = await fetch("/api/v1/business", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Registration failed");
//     }

//     return response.json();
//   },
// };

// import { Business } from "@/types/business";

import { Business } from "@/features/business/types/business";
export const businessService = {
  /**
   * GET: Retrieves the list of businesses.
   * Logic: Points to our internal API route which handles token injection.
   */
  getBusinesses: async (): Promise<Business[]> => {
    const response = await fetch("/api/v1/business", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // Ensures switchboard always shows current business list
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to synchronize business data");
    }

    // Per your structure: Next.js API route returns data.data directly
    return response.json();
  },

  /**
   * POST: Registers a new business entity.
   */
  createBusiness: async (name: string): Promise<Business> => {
    const response = await fetch("/api/v1/business", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to register business");
    }

    return response.json();
  },
};