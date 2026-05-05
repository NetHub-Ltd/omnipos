"use client";

import { ShoppingCart, Trash2, Minus, Plus, CreditCard } from "lucide-react";
// import { useCartStore } from "@/store/useCartStore";
import { useCartStore } from "@/features/sales/stores/useCartStore";

export const CartSidebar = () => {
  const { cart, updateQty, clearCart, getTotal } = useCartStore();
  const { subtotal, tax, total } = getTotal();

  const handleComplete = () => {
    // Add your "success" haptic here
    if (typeof window !== "undefined" && window.navigator.vibrate)
      window.navigator.vibrate([10, 30, 10]);
    alert("Transaction Successful");
    clearCart();
  };

  return (
    <aside className="w-96 bg-card border-l border-border flex flex-col shadow-2xl z-10">
      <div className="p-8 border-b border-border flex items-center justify-between">
        <h3 className="font-black uppercase tracking-tighter text-xl">
          Current Sale
        </h3>
        <button
          onClick={clearCart}
          className="text-muted-foreground hover:text-red-500 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-20">
            <ShoppingCart size={80} strokeWidth={1} />
            <p className="font-black uppercase text-xs tracking-widest mt-4">
              Empty
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between animate-in fade-in slide-in-from-right-4"
            >
              <div className="flex-1">
                <p className="font-bold text-sm leading-none">{item.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="p-1 hover:bg-background rounded-lg transition-all active:scale-75"
                >
                  <Minus size={12} />
                </button>
                <span className="text-xs font-black w-4 text-center">
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="p-1 hover:bg-background rounded-lg transition-all active:scale-75"
                >
                  <Plus size={12} />
                </button>
              </div>
              <p className="w-16 text-right font-black italic text-sm ml-2">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="p-8 bg-muted/20 border-t border-border space-y-4">
        <div className="space-y-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between items-end pt-2 border-t border-border/50">
          <span className="text-xs font-black uppercase tracking-widest">
            Total
          </span>
          <span className="text-3xl font-black text-primary italic leading-none">
            ${total.toFixed(2)}
          </span>
        </div>
        <button
          disabled={cart.length === 0}
          onClick={handleComplete}
          className="w-full py-5 bg-foreground text-background rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all disabled:opacity-20"
        >
          Complete Sale
        </button>
      </div>
    </aside>
  );
};
