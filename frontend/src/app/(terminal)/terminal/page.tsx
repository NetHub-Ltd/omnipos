"use client";

import { useState } from "react";
import {
  Building2,
  UserCircle,
  ChevronRight,
  Lock,
  Calendar,
  Loader2,
  Plus,
  X,
  Search,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTenantProfile } from "@/features/auth/hooks/useTenant";
import { useBusiness } from "@/features/business/hooks/useBusiness";

export default function TerminalSwitchboard() {
  const { data: user, isLoading: isLoadingProfile } = useTenantProfile();
  const {
    businesses,
    isLoading: isLoadingBusinesses,
    register,
    isRegistering,
  } = useBusiness();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBusinessName, setNewBusinessName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBusinesses = businesses.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBusinessName.trim()) return;
    register(newBusinessName, {
      onSuccess: () => {
        setNewBusinessName("");
        setIsModalOpen(false);
      },
    });
  };

  return (
    <section className="h-screen w-full flex flex-col bg-[#F8F9FC] overflow-hidden selection:bg-primary/30">
      <main className="flex-1 w-full mx-auto flex flex-col pt-12 px-6 overflow-hidden">
        {/* HERO SECTION */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
              <LayoutGrid size={14} /> Workspace Selector
            </div>
            <h2 className="font-black tracking-tighter uppercase  text-slate-900">
              Business <span className="text-primary">Terminal</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-md">
              Select an operational environment to manage inventory, process
              sales, and track analytics.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold shadow-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        {/* WORKSPACE GRID */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-32">
          {isLoadingBusinesses ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-[2rem] border border-dashed border-gray-200">
              <Loader2 className="animate-spin text-primary mb-4" size={32} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Syncing Assets...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredBusinesses.map((biz) => (
                <Link
                  key={biz.id}
                  // ENHANCEMENT: Passing name in search params
                  href={
                    biz.active
                      ? `/terminal/${biz.id}?name=${encodeURIComponent(biz.name)}&businessId=${encodeURIComponent(biz.id)}`
                      : "#"
                  }
                  className={cn(
                    "group relative flex flex-col p-6 rounded-[2rem] transition-all duration-300 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30",
                    !biz.active && "opacity-50 grayscale cursor-not-allowed",
                  )}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div
                      className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                        biz.active
                          ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                          : "bg-slate-100 text-slate-400",
                      )}
                    >
                      {biz.active ? (
                        <Building2 size={28} />
                      ) : (
                        <Lock size={28} />
                      )}
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">
                      {biz.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        ID: {biz.id.split("-")[0]}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-200" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        {format(new Date(biz.created_at), "MMM yyyy")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {/* NEW WORKSPACE PLACEHOLDER */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="group border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/[0.02] transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <Plus size={24} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-primary">
                  Add Workspace
                </span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* MODAL & STYLES (Keep existing logic but apply similar UI cleanup) */}
      {/* ... (Existing Modal Logic) */}
    </section>
  );
}
