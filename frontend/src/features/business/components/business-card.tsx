"use client";

import React from "react";
import { Building2, ArrowRight, Edit3, Trash2 } from "lucide-react";

interface Business {
  name: string;
  id: string;
  tenant_id: string;
  active: boolean;
  created_at: string;
}

interface BusinessCardProps {
  biz: Business;
  onSelect: (biz: Business) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BusinessCard({
  biz,
  onSelect,
  onEdit,
  onDelete,
}: BusinessCardProps) {
  return (
    <div
      className="group relative bg-white border border-gray-200 p-10 rounded-[2.5rem] flex flex-col justify-between items-start hover:border-black hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all cursor-pointer min-h-[260px] w-full"
      onClick={() => onSelect(biz)}
    >
      <div className="w-full flex justify-between items-start">
        <div className="p-5 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors border border-gray-100">
          <Building2 size={32} />
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(biz.id);
            }}
            className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-black"
            title="Edit Business"
          >
            <Edit3 size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(biz.id);
            }}
            className="p-3 hover:bg-red-50 rounded-xl transition-colors text-gray-500 hover:text-red-600"
            title="Delete Business"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-between items-end mt-12">
        <div className="space-y-1">
          <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">
            {biz.name}
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            ID: {biz.id.slice(0, 8)}...
          </p>
        </div>
        <ArrowRight
          className="text-gray-300 group-hover:text-black transform group-hover:translate-x-2 transition-all"
          size={28}
        />
      </div>
    </div>
  );
}
