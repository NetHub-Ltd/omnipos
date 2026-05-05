"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Globe,
  CreditCard,
  LayoutGrid,
  Database,
  Zap,
  BarChart3,
  Cpu,
} from "lucide-react";
import { Navbar } from "@/features/marketing/components/navbar";

export default function HeroSection() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground selection:bg-primary/10">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 pt-20 pb-32">
          {/* Ambient Background - Optimized for minimal main thread impact */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column: Value Prop */}
              <div className="flex flex-col space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 self-center lg:self-start bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                  <Cpu size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    v2.4 Enterprise Engine Live
                  </span>
                </div>

                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-pretty">
                    The POS Engine <br />
                    <span className="text-primary">Built for Scale.</span>
                  </h1>
                  <p className="max-w-xl text-lg text-secondary leading-relaxed mx-auto lg:mx-0 font-medium text-pretty">
                    Unify your entire commerce operation. From high-volume
                    retail to complex wholesale distribution—OmniPOS delivers
                    sub-second transaction speeds and real-time inventory sync
                    across all outlets.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/home"
                    className="group flex h-16 items-center justify-center gap-3 rounded-2xl bg-primary px-10 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 hover:brightness-110 active:scale-[0.97] transition-all"
                  >
                    Launch Terminal
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                  <Link
                    href="#enterprise"
                    className="flex h-16 items-center justify-center gap-3 rounded-2xl border border-border bg-card px-10 text-sm font-black uppercase tracking-widest hover:bg-muted transition-colors"
                  >
                    Request Demo
                  </Link>
                </div>

                {/* POS-Specific Feature Pills */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl">
                    <Database size={14} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase">
                      Multi-Store Sync
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl">
                    <Zap size={14} className="text-yellow-500" />
                    <span className="text-[10px] font-black uppercase">
                      0.2s Transaction Speed
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl">
                    <BarChart3 size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase">
                      Real-time Analytics
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual POS Terminal Mockup */}
              <div className="relative group">
                {/* Floating "Status" Widget */}
                <div className="absolute -top-6 -right-6 z-10 bg-white dark:bg-slate-900 border border-border p-4 rounded-2xl shadow-2xl transition-transform group-hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      System Operational
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] bg-card rounded-[2.5rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden shadow-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                  {/* Mock POS Terminal UI */}
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-2">
                        <LayoutGrid size={18} className="text-primary" />
                        <div className="h-3 w-24 bg-muted rounded-full" />
                      </div>
                      <div className="h-8 w-20 bg-primary/10 border border-primary/20 rounded-lg" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-[4/3] bg-muted/40 rounded-2xl border border-border/50 flex flex-col p-3 gap-2"
                        >
                          <div className="h-full bg-muted/60 rounded-lg" />
                          <div className="h-2 w-full bg-muted/80 rounded-full" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto p-4 bg-muted/30 rounded-3xl border border-border/50">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-3 w-16 bg-muted rounded-full" />
                        <div className="h-4 w-24 bg-primary/40 rounded-full" />
                      </div>
                      <div className="h-12 w-full bg-primary rounded-2xl shadow-lg" />
                    </div>
                  </div>
                </div>

                {/* Decorative Hardware Base Element */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-slate-800 rounded-b-2xl blur-[1px]" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Compliance & Trust Footer */}
      <footer className="border-t border-border bg-card py-12 px-6">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
          <div className="text-center md:text-left">
            <p className="text-foreground mb-1">OmniPOS Infrastructure</p>
            <p>© 2026 Architected for Global Commerce</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-primary" /> Global-Sync
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-primary" /> SOC2 Type II
            </div>
            <div className="flex items-center gap-2">
              <CreditCard size={14} className="text-primary" /> PCI-DSS Level 1
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
