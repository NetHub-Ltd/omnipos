"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit3, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductResponse } from "@/lib/api/generated/models";

/**
 * @Scribe_Audit
 * Pattern: High-density "Sheet" editing.
 * Data: Full exposure of ProductResponse schema.
 * Form: React Hook Form for atomic row validation.
 */

const productSchema = z.object({
  label: z.string().min(1, "Label required"),
  selling_price: z.coerce.number().min(0), // Update the type here
  track_stock: z.boolean(),
  stock: z.coerce.number().min(0),
  active: z.boolean(),
  attributes: z.object({
    unit_of_measure: z.string().min(1, "Unit required"),
    buying_price: z.coerce.number().min(0),
    sku: z.string().min(1, "SKU required"),
  }),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface RegistryRowProps {
  product: ProductResponse;
  onUpdate: (id: string, data: Partial<ProductResponse>) => void;
  onDelete: (id: string, name: string) => void;
}

export function RegistryRow({ product, onUpdate, onDelete }: RegistryRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      label: product.label,
      selling_price: product.selling_price,
      track_stock: product.track_stock,
      stock: product.stock,
      active: product.active,
      attributes: {
        unit_of_measure: product.attributes?.unit_of_measure || "pcs",
        buying_price: product.attributes?.buying_price || 0,
        sku: product.attributes?.sku || "",
      },
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Submitting update with data:", data);
    onUpdate(product.id, data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const inputClasses = (error?: any) =>
    cn(
      "w-full bg-background border rounded px-2 py-1 text-[11px] font-bold outline-none transition-all",
      error
        ? "border-red-500 ring-1 ring-red-500/20"
        : "border-primary/20 focus:ring-2 focus:ring-primary/10",
    );

  const labelClasses =
    "text-[8px] font-black uppercase tracking-widest text-secondary/40 block mb-1";

  return (
    <tr
      className={cn(
        "transition-all border-b border-border/30",
        isEditing
          ? "bg-primary/[0.03] shadow-inner"
          : "hover:bg-muted/20 group",
      )}
    >
      {/* ID & STATUS */}
      <td className="px-4 py-4 align-top">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] font-black text-secondary/30 uppercase">
            #{product.id.substring(0, 5)}
          </span>
          {isEditing ? (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("active")}
                className="accent-primary"
              />
              <span className="text-[9px] font-black uppercase tracking-tighter">
                Active
              </span>
            </label>
          ) : (
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                product.active ? "bg-emerald-500" : "bg-red-500",
              )}
            />
          )}
        </div>
      </td>

      {/* CORE IDENTIFIERS (SKU & Label) */}
      <td className="px-4 py-4 align-top min-w-[200px]">
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className={labelClasses}>SKU Identifier</label>
              <input
                {...register("attributes.sku")}
                className={inputClasses(errors.attributes?.sku)}
              />
            </div>
            <div>
              <label className={labelClasses}>Product Label</label>
              <input
                {...register("label")}
                className={inputClasses(errors.label)}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-secondary/50 uppercase tracking-tight">
              {product.attributes?.sku}
            </span>
            <span className="text-xs font-black text-foreground uppercase truncate max-w-[180px]">
              {product.label}
            </span>
          </div>
        )}
      </td>

      {/* PRICING (Buying vs Selling) */}
      <td className="px-4 py-4 align-top w-48">
        {isEditing ? (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClasses}>Buying</label>
              <input
                type="number"
                {...register("attributes.buying_price")}
                className={inputClasses(errors.attributes?.buying_price)}
              />
            </div>
            <div>
              <label className={labelClasses}>Selling</label>
              <input
                type="number"
                {...register("selling_price")}
                className={inputClasses(errors.selling_price)}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col text-right">
            <span className="text-[9px] font-bold text-secondary/40 line-through">
              Ksh {product.attributes?.buying_price?.toLocaleString()}
            </span>
            <span className="text-xs font-black text-primary italic">
              Ksh {product.selling_price.toLocaleString()}
            </span>
          </div>
        )}
      </td>

      {/* INVENTORY CONTROL */}
      <td className="px-4 py-4 align-top w-48">
        {isEditing ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("track_stock")}
                className="accent-primary"
              />
              <label className={labelClasses + " mb-0"}>Track Stock</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClasses}>Stock</label>
                <input
                  type="number"
                  {...register("stock")}
                  className={inputClasses(errors.stock)}
                />
              </div>
              <div>
                <label className={labelClasses}>Unit</label>
                <input
                  {...register("attributes.unit_of_measure")}
                  className={inputClasses(errors.attributes?.unit_of_measure)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col text-right">
            <div className="flex items-center justify-end gap-1">
              <span
                className={cn(
                  "text-xs font-black",
                  product.stock <= 5 ? "text-red-500" : "text-foreground",
                )}
              >
                {product.stock}
              </span>
              <span className="text-[9px] font-bold uppercase text-secondary/40">
                {product.attributes?.unit_of_measure}
              </span>
            </div>
            <span className="text-[8px] font-black uppercase text-secondary/20">
              {product.track_stock ? "Auto-Tracking ON" : "Manual Override"}
            </span>
          </div>
        )}
      </td>

      {/* ROW ACTIONS */}
      <td className="px-4 py-4 align-top text-right w-24">
        <div className="flex items-center justify-end gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmit(onSubmit)}
                className="h-8 w-8 flex items-center justify-center rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-sm"
              >
                <Check size={14} strokeWidth={3} />
              </button>
              <button
                onClick={handleCancel}
                className="h-8 w-8 flex items-center justify-center rounded border border-border bg-card hover:bg-muted transition-all"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 flex items-center justify-center rounded hover:bg-primary/10 hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => onDelete(product.id, product.label)}
                className="h-8 w-8 flex items-center justify-center rounded hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
