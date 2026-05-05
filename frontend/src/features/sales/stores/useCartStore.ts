import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  category: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: any) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotal: () => { subtotal: number; tax: number; total: number };
}

const triggerHaptic = (style: "light" | "medium" | "success" = "light") => {
  if (typeof window !== "undefined" && window.navigator.vibrate) {
    const patterns = { light: [10], medium: [20], success: [10, 30, 10] };
    window.navigator.vibrate(patterns[style]);
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        triggerHaptic("light");
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, qty: 1 }] };
        });
      },

      updateQty: (id, delta) => {
        triggerHaptic("light");
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id
                ? { ...item, qty: Math.max(0, item.qty + delta) }
                : item,
            )
            .filter((item) => item.qty > 0),
        }));
      },

      clearCart: () => {
        triggerHaptic("medium");
        set({ cart: [] });
      },

      getTotal: () => {
        const subtotal = get().cart.reduce(
          (acc, item) => acc + item.price * item.qty,
          0,
        );
        const tax = subtotal * 0.08;
        return { subtotal, tax, total: subtotal + tax };
      },
    }),
    {
      name: "terminal-cart-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
