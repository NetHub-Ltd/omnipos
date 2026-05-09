// "use client";

// import { Package, Barcode, Tag } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ProductResponse } from "@/lib/api/generated/models";

// /**
//  * @Scribe_Audit
//  * UI/UX: Fixed dimensions (w-full / h-64) to prevent grid collapse.
//  * Layout: Utilized flex-1 on the middle section to push financials to the bottom regardless of text length.
//  * Tactile: Increased shadow-depth on hover for clear interactive signaling.
//  */


// export function ProductCard({ product, onAdd }: ProductCardProps) {
//   const isOutOfStock = product.stock <= 0;
//   const { sku, category, unit_of_measure } = product.attributes || {};

//   return (
//     <button
//       onClick={() => onAdd(product)}
//       disabled={isOutOfStock || !product.active}
//       aria-label={`Add ${product.label} to cart. SKU: ${sku || "N/A"}. ${product.stock} ${unit_of_measure || "units"} available.`}
//       className={cn(
//         "group relative flex flex-col text-left bg-card border border-border/60 rounded-[2.5rem] p-6 transition-all duration-300",
//         // Force dimensions to prevent collapse in grid
//         "w-full h-42 min-w-[240px] max-w-[340px] shrink-0",
//         "hover:shadow-md hover:border-primary/40 hover:-translate-y-2 active:scale-[0.96] shadow-soft",
//         (isOutOfStock || !product.active) &&
//           "opacity-50 grayscale cursor-not-allowed shadow-none hover:translate-y-0",
//       )}
//     >
//       {/* Header: Visual Identity & Stock Status */}
//       <div className="flex justify-between items-start mb-4 shrink-0">
//         <div className="h-14 w-14 rounded-2xl bg-background border border-border/20 group-hover:bg-primary/5 flex items-center justify-center transition-colors shadow-inner">
//           <Package
//             size={24}
//             className="group-hover:text-primary text-secondary/60 transition-colors"
//           />
//         </div>
//         <div className="flex flex-col items-end gap-1.5">
//           <div
//             className={cn(
//               "text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm border",
//               isOutOfStock
//                 ? "bg-red-50 text-red-600 border-red-100"
//                 : "bg-background text-secondary/80 border-border/40",
//             )}
//           >
//             {isOutOfStock
//               ? "Depleted"
//               : `${product.stock}${unit_of_measure || ""} In Stock`}
//           </div>
//           {category && (
//             <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-secondary/40 px-2 flex items-center gap-1">
//               <Tag size={8} /> {category}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Middle: Identification - Flex-1 ensures it takes available space */}
//       <div className="flex flex-col gap-1 flex-1 overflow-hidden">
//         <h3 className="font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug uppercase tracking-tight">
//           {product.label}
//         </h3>
//         {sku && (
//           <div className="flex items-center gap-1.5 text-secondary/50">
//             <Barcode size={12} strokeWidth={2.5} />
//             <span className="text-[10px] font-mono tracking-tighter uppercase">
//               {sku}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Footer: Financials */}
//       <div className="mt-4 pt-4 border-t border-border/10 shrink-0">
//         <p className="text-2xl text-foreground font-black tracking-tighter italic flex items-baseline gap-1 leading-none">
//           <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest not-italic">
//             Ksh
//           </span>
//           {product.selling_price.toLocaleString(undefined, {
//             minimumFractionDigits: 2,
//           })}
//           {unit_of_measure && (
//             <span className="text-[10px] font-bold text-secondary/30 lowercase ml-0.5 not-italic">
//               /{unit_of_measure}
//             </span>
//           )}
//         </p>
//       </div>

//       {/* Interactive Overlay Glow */}
//       <div className="absolute inset-0 rounded-[2.5rem] bg-primary/0 group-hover:bg-primary/[0.03] pointer-events-none transition-colors" />
//     </button>
//   );
// }

"use client";

import React from "react";
import { Package, Barcode, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductResponse } from "@/lib/api/generated/models";

/**
 * @Scribe_Audit
 * Theme: Removed specific text sizes (text-sm, text-2xl) in favor of fluid theme tokens.
 * Logic: Strict adherence to Orval's ProductResponse and BaseAttributes.
 * UX: Optimized the interactive surface area for rapid-fire POS selection.
 */

interface ProductCardProps {
  product: ProductResponse;
  onAdd: (product: ProductResponse) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;

  // Safely extract from Orval's BaseAttributes
  const { sku, unit_of_measure } = product.attributes || {};

  // Note: 'category' is not in your current BaseAttributes interface snippet.
  // We handle it as optional/undefined to prevent TypeScript errors.
  const category = (product.attributes as any)?.category;

  const formattedPrice = new Intl.NumberFormat("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.selling_price);

  return (
    <button
      onClick={() => onAdd(product)}
      disabled={isOutOfStock || !product.active}
      aria-label={`Add ${product.label} to cart. ${product.stock} available.`}
      className={cn(
        "group relative flex flex-col text-left bg-card border border-color-border rounded-[2.5rem] p-6 transition-all duration-300",
        "w-full h-auto min-w-[240px] shadow-soft",
        "hover:border-primary/40 hover:-translate-y-1 active:scale-[0.98]",
        (isOutOfStock || !product.active) &&
          "opacity-50 grayscale cursor-not-allowed shadow-none hover:translate-y-0",
      )}
    >
      {/* Header: Status Indicator */}
      <div className="flex justify-between items-start mb-4 shrink-0">
        <div className="h-12 w-12 rounded-2xl bg-background border border-color-border/40 group-hover:bg-primary/5 flex items-center justify-center transition-colors">
          <Package
            size={20}
            className="group-hover:text-primary text-secondary transition-colors"
          />
        </div>

        <div className="flex flex-col items-end gap-1">
          <div
            className={cn(
              "text-xs font-black px-3 py-1 rounded-full uppercase tracking-tighter border",
              isOutOfStock
                ? "bg-red-50 text-red-600 border-red-100"
                : "bg-background text-secondary border-color-border",
            )}
          >
            {isOutOfStock ? "Depleted" : `${product.stock} In Stock`}
          </div>
          {category && (
            <span className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-1 opacity-60">
              <Tag size={10} /> {category}
            </span>
          )}
        </div>
      </div>

      {/* Middle: Identity */}
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="font-bold text-foreground leading-tight uppercase tracking-tight group-hover:text-primary transition-colors">
          {product.label}
        </h3>
        {sku && (
          <div className="flex items-center gap-1.5 text-secondary opacity-50">
            <Barcode size={14} />
            <span className="text-xs font-mono uppercase tracking-tighter">
              {sku}
            </span>
          </div>
        )}
      </div>

      {/* Footer: Financials (Using Fluid Typography) */}
      <div className="mt-4 pt-4 border-t border-color-border/10 shrink-0">
        <div className="font-black tracking-tighter italic flex items-baseline gap-1 leading-none text-foreground">
          <span className="text-xs font-black text-secondary/40 uppercase tracking-widest not-italic">
            Ksh
          </span>
          <span className="text-xl">{formattedPrice}</span>
          {unit_of_measure && (
            <span className="text-xs font-bold text-secondary/40 lowercase ml-0.5 not-italic">
              /{unit_of_measure}
            </span>
          )}
        </div>
      </div>

      {/* Interactive Overlay Glow */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-primary/0 group-hover:bg-primary/[0.02] pointer-events-none transition-colors" />
    </button>
  );
}