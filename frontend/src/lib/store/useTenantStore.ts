// store/useTenantStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Business {
  id: string;
  name: string;
  tenant_id: string;
}

interface TenantState {
  activeBusiness: Business | null;
  setBusiness: (business: Business) => void;
  clearSession: () => void;
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      activeBusiness: null,
      setBusiness: (business) => set({ activeBusiness: business }),
      clearSession: () => set({ activeBusiness: null }),
    }),
    { name: "omni-tenant-session" },
  ),
);
