"use client";

import React from "react";
import { Package, AlertCircle } from "lucide-react";
import { Product } from "@/lib/types/product";
import { useCartStore } from "@/lib/store/useCartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <button
      onClick={() => !isOutOfStock && addToCart(product)}
      disabled={isOutOfStock}
      className={`
        group relative flex flex-col justify-between p-6 h-44 rounded-4xl border-2 transition-all duration-300 text-left
        ${
          isOutOfStock
            ? "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
            : "bg-white border-slate-100 hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] active:scale-[0.96]"
        }
      `}
    >
      {/* Header: Identity */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {product.category_id.replace("cat-", "")}
          </span>
          {isOutOfStock && (
            <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter border border-red-100">
              Sold Out
            </span>
          )}
        </div>
        <h3 className="font-bold text-slate-800 text-lg leading-snug line-clamp-2">
          {product.name}
        </h3>
      </div>

      {/* Footer: Price & Contextual Stock */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            $
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>

          {/* Subtle Stock Indicator */}
          {!isOutOfStock && (
            <div
              className={`
              flex items-center gap-1 text-[11px] font-medium mt-0.5
              ${isLowStock ? "text-amber-600 font-bold" : "text-slate-400"}
            `}
            >
              {isLowStock ? (
                <>
                  <AlertCircle size={12} strokeWidth={3} />
                  <span>Only {product.stock} left</span>
                </>
              ) : (
                <>
                  <Package size={12} className="opacity-50" />
                  <span>{product.stock} available</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* The 'Tap Hint' - Only visible on card hover to keep it clean */}
        {/* <div
          className={`
          w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
          ${isOutOfStock ? "hidden" : "bg-slate-50 text-slate-300 group-hover:bg-primary group-hover:text-white group-hover:rotate-90"}
        `}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-current" />
        </div> */}
      </div>

      {/* Modern High-End Touch: Low Stock Gradient Glow */}
      {isLowStock && (
        <div className="absolute inset-0 rounded-4xl border-2 border-amber-400/20 pointer-events-none" />
      )}
    </button>
  );
}