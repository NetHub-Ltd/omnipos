// import HeroSection from "@/features/marketing/components/herosection";
// import React from 'react'

// const HomePage = () => {
//   return (
//     <div>
//       <HeroSection />
//     </div>
//   )
// }

// export default HomePage

// import { Metadata } from "next";
// import {
//   ArrowRight,
//   ShieldCheck,
//   Globe,
//   CreditCard,
//   LayoutGrid,
//   Database,
//   Zap,
//   BarChart3,
//   Cpu,
// } from "lucide-react";
// import Link from "next/link";
// import { Navbar } from "@/features/marketing/components/navbar";

// // TECHNICAL SEO: Metadata API
// export const metadata: Metadata = {
//   title: "OmniPOS | High-Performance Cloud POS for Global Retail",
//   description:
//     "Scale your commerce with OmniPOS. Sub-second transactions, real-time inventory sync, and multi-store management. Built for enterprise reliability.",
//   alternates: { canonical: "/" },
// };

// export default function LandingPage() {
//   // TECHNICAL SEO: Structured Data (JSON-LD)
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "SoftwareApplication",
//     name: "OmniPOS",
//     applicationCategory: "BusinessApplication",
//     operatingSystem: "Web-based",
//     offers: {
//       "@type": "Offer",
//       price: "0",
//       priceCurrency: "USD",
//     },
//     aggregateRating: {
//       "@type": "AggregateRating",
//       ratingValue: "4.9",
//       ratingCount: "1250",
//     },
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />

//       <div className="flex min-h-screen flex-col bg-background font-sans text-foreground selection:bg-primary/10">
//         <Navbar />

//         <main id="main-content" className="flex-1">
//           <section
//             className="relative overflow-hidden px-6 pt-24 pb-32 lg:pt-32"
//             aria-labelledby="hero-heading"
//           >
//             {/* Ambient Background - Static Optimization */}
//             <div
//               className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-primary/5 blur-[140px] rounded-full pointer-events-none"
//               aria-hidden="true"
//             />

//             <div className="container mx-auto max-w-7xl">
//               <div className="grid lg:grid-cols-2 gap-16 items-center">
//                 {/* Left Column: Value Prop */}
//                 <div className="flex flex-col space-y-8 text-center lg:text-left">
//                   <div className="inline-flex items-center gap-2 self-center lg:self-start bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
//                     <Cpu
//                       size={14}
//                       className="text-primary"
//                       aria-hidden="true"
//                     />
//                     <span className="text-[10px] font-black uppercase tracking-widest text-primary">
//                       v2.4 Enterprise Engine Live
//                     </span>
//                   </div>

//                   <div className="space-y-6">
//                     <h1
//                       id="hero-heading"
//                       className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-pretty"
//                     >
//                       The POS Engine <br />
//                       <span className="text-primary">Built for Scale.</span>
//                     </h1>
//                     <p className="max-w-xl text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0 font-medium text-pretty">
//                       Unify your commerce operation. From high-volume retail to
//                       wholesale distribution—OmniPOS delivers{" "}
//                       <strong>sub-second transaction speeds</strong> and
//                       real-time inventory sync.
//                     </p>
//                   </div>

//                   {/* UI/UX: Fitts's Law Optimized CTAs */}
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                     <Link
//                       href="/terminal"
//                       className="group flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-xl bg-primary px-8 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-primary/25 hover:-translate-y-0.5 active:scale-95 transition-all"
//                     >
//                       Launch Terminal
//                       <ArrowRight
//                         size={18}
//                         className="group-hover:translate-x-1 transition-transform"
//                       />
//                     </Link>
//                     <Link
//                       href="#demo"
//                       className="flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-xl border border-input bg-background px-8 text-sm font-black uppercase tracking-widest hover:bg-accent transition-colors"
//                     >
//                       Request Demo
//                     </Link>
//                   </div>

//                   {/* Trust Indicators */}
//                   <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4 opacity-80">
//                     <FeaturePill
//                       icon={<Database size={14} />}
//                       text="Multi-Store Sync"
//                     />
//                     <FeaturePill
//                       icon={<Zap size={14} />}
//                       text="0.2s Transaction"
//                     />
//                     <FeaturePill
//                       icon={<BarChart3 size={14} />}
//                       text="Live Analytics"
//                     />
//                   </div>
//                 </div>

//                 {/* Right Column: Visual Mockup */}
//                 <div className="relative group perspective-1000">
//                   <div className="absolute -top-6 -right-6 z-10 bg-card border border-border p-4 rounded-2xl shadow-2xl transition-transform group-hover:-translate-y-2">
//                     <div className="flex items-center gap-3">
//                       <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
//                       <span className="text-[10px] font-black uppercase tracking-widest">
//                         Node: US-EAST-1 Online
//                       </span>
//                     </div>
//                   </div>

//                   {/* UI/UX: Visual Stability via Aspect Ratio */}
//                   <div className="relative aspect-[16/10] bg-slate-950 rounded-[2rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden shadow-primary/20">
//                     {/* Mock POS Terminal Content */}
//                     <div className="p-6 h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-950">
//                       <div className="flex justify-between items-center mb-8">
//                         <div className="flex items-center gap-2">
//                           <LayoutGrid size={18} className="text-primary" />
//                           <div className="h-2 w-24 bg-slate-800 rounded-full" />
//                         </div>
//                         <div className="h-6 w-16 bg-primary/20 rounded-md border border-primary/30" />
//                       </div>

//                       <div className="grid grid-cols-3 gap-3 mb-6">
//                         {[...Array(6)].map((_, i) => (
//                           <div
//                             key={i}
//                             className="aspect-square bg-slate-900/50 rounded-xl border border-white/5"
//                           />
//                         ))}
//                       </div>

//                       <div className="mt-auto h-20 bg-slate-900 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
//                         <div className="space-y-2">
//                           <div className="h-2 w-12 bg-slate-800 rounded-full" />
//                           <div className="h-3 w-20 bg-primary/40 rounded-full" />
//                         </div>
//                         <div className="h-10 w-24 bg-primary rounded-xl" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// }

// function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
//   return (
//     <div className="flex items-center gap-2 bg-muted/50 border border-border px-3 py-1.5 rounded-lg">
//       <span className="text-primary">{icon}</span>
//       <span className="text-[9px] font-bold uppercase tracking-tight">
//         {text}
//       </span>
//     </div>
//   );
// }

// function Footer() {
//   return (
//     <footer className="border-t border-border bg-card py-10 px-6">
//       <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
//         <div className="text-center md:text-left">
//           <p className="text-foreground mb-1">OmniPOS Infrastructure</p>
//           <p>© 2026 Architected for Global Commerce</p>
//         </div>
//         <div className="flex flex-wrap justify-center gap-6">
//           <FooterItem icon={<Globe size={14} />} text="Global-Sync" />
//           <FooterItem icon={<ShieldCheck size={14} />} text="SOC2 Type II" />
//           <FooterItem icon={<CreditCard size={14} />} text="PCI-DSS Level 1" />
//         </div>
//       </div>
//     </footer>
//   );
// }

// function FooterItem({ icon, text }: { icon: React.ReactNode; text: string }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span className="text-primary">{icon}</span> {text}
//     </div>
//   );
// }

// import { Metadata } from "next";
// import Link from "next/link";
// import {
//   ArrowRight,
//   Cpu,
//   Database,
//   Zap,
//   BarChart3,
//   ShieldCheck,
//   Globe,
//   CreditCard,
// } from "lucide-react";

// // Technical SEO: Page-level Metadata
// export const metadata: Metadata = {
//   title: "OmniPOS | High-Performance Cloud POS for Enterprise",
//   description:
//     "Scale your retail operation with OmniPOS. Sub-second transaction speeds, real-time sync, and multi-store management.",
// };

// export default function LandingPage() {
//   // SEO: Structured Data for SoftwareApplication
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "SoftwareApplication",
//     name: "OmniPOS",
//     operatingSystem: "Web/Cloud",
//     applicationCategory: "BusinessApplication",
//     offers: {
//       "@type": "Offer",
//       price: "0",
//       priceCurrency: "USD",
//     },
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />

//       <main id="main-content" className="flex-1">
//         <section className="relative overflow-hidden px-6 pt-24 pb-32 lg:pt-32">
//           {/* Background Optimization: Use CSS-only blurs for zero main-thread impact */}
//           <div
//             className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"
//             aria-hidden="true"
//           />

//           <div className="container mx-auto max-w-7xl">
//             <div className="grid lg:grid-cols-2 gap-16 items-center">
//               {/* Left: Value Proposition */}
//               <div className="flex flex-col space-y-8 text-center lg:text-left">
//                 <header className="inline-flex items-center gap-2 self-center lg:self-start bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
//                   <Cpu size={14} className="text-primary" />
//                   <span className="text-[10px] font-black uppercase tracking-widest text-primary">
//                     v2.4 Enterprise Engine Live
//                   </span>
//                 </header>

//                 <div className="space-y-6">
//                   <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-pretty">
//                     The POS Engine <br />
//                     <span className="text-primary">Built for Scale.</span>
//                   </h1>
//                   <p className="max-w-xl text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0 font-medium">
//                     Unify your entire commerce operation. From high-volume
//                     retail to complex distribution—OmniPOS delivers sub-second
//                     speeds across every terminal.
//                   </p>
//                 </div>

//                 {/* UX: High-Contrast Primary CTA */}
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                   <Link
//                     href="/terminal"
//                     className="group flex h-14 items-center justify-center gap-3 rounded-xl bg-primary px-10 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
//                   >
//                     Launch Terminal
//                     <ArrowRight
//                       size={18}
//                       className="group-hover:translate-x-1 transition-transform"
//                     />
//                   </Link>
//                   <Link
//                     href="#enterprise"
//                     className="flex h-14 items-center justify-center gap-3 rounded-xl border border-input bg-background px-10 text-sm font-black uppercase tracking-widest hover:bg-accent transition-colors"
//                   >
//                     Request Demo
//                   </Link>
//                 </div>

//                 {/* Trust Indicators */}
//                 <div className="flex flex-wrap justify-center lg:justify-start gap-3 opacity-80">
//                   <Badge
//                     icon={<Database size={14} />}
//                     label="Multi-Store Sync"
//                   />
//                   <Badge icon={<Zap size={14} />} label="0.2s Transaction" />
//                   <Badge
//                     icon={<BarChart3 size={14} />}
//                     label="Real-time Analytics"
//                   />
//                 </div>
//               </div>

//               {/* Right: Hardware/UI Mockup */}
//               <div className="relative group perspective-1000">
//                 <div className="absolute -top-6 -right-6 z-10 bg-card border border-border p-4 rounded-2xl shadow-2xl transition-transform group-hover:-translate-y-2">
//                   <div className="flex items-center gap-3">
//                     <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
//                     <span className="text-[10px] font-black uppercase tracking-widest">
//                       Node: US-EAST-1 Online
//                     </span>
//                   </div>
//                 </div>

//                 {/* POS Terminal Visual */}
//                 <div className="relative aspect-[4/3] bg-slate-950 rounded-[2.5rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden shadow-primary/10">
//                   <div className="p-6 h-full flex flex-col bg-gradient-to-br from-primary/5 to-transparent">
//                     <div className="flex justify-between items-center mb-8">
//                       <div className="h-3 w-24 bg-slate-800 rounded-full" />
//                       <div className="h-8 w-20 bg-primary/20 rounded-lg border border-primary/30" />
//                     </div>
//                     <div className="grid grid-cols-3 gap-4 mb-8">
//                       {[...Array(6)].map((_, i) => (
//                         <div
//                           key={i}
//                           className="aspect-video bg-slate-900 rounded-xl border border-white/5"
//                         />
//                       ))}
//                     </div>
//                     <div className="mt-auto h-16 bg-slate-900 rounded-2xl border border-white/5" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }

// function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
//   return (
//     <div className="flex items-center gap-2 bg-muted/50 border border-border px-4 py-2 rounded-xl">
//       <span className="text-primary">{icon}</span>
//       <span className="text-[10px] font-black uppercase tracking-tight">
//         {label}
//       </span>
//     </div>
//   );
// }

// function Footer() {
//   return (
//     <footer className="border-t border-border bg-card py-12 px-6">
//       <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
//         <div className="text-center md:text-left">
//           <p className="text-foreground mb-1">OmniPOS Infrastructure</p>
//           <p>© 2026 Architected for Global Commerce</p>
//         </div>
//         <div className="flex flex-wrap justify-center gap-8">
//           <span className="flex items-center gap-2">
//             <Globe size={14} className="text-primary" /> Global-Sync
//           </span>
//           <span className="flex items-center gap-2">
//             <ShieldCheck size={14} className="text-primary" /> SOC2 Type II
//           </span>
//           <span className="flex items-center gap-2">
//             <CreditCard size={14} className="text-primary" /> PCI-DSS Level 1
//           </span>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Database,
  Zap,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "OmniPOS | Smart Commerce Infrastructure",
  description:
    "Scale your retail operation with OmniPOS. 0.2s transaction speeds and real-time multi-store synchronization.",
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OmniPOS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="relative overflow-hidden px-6 pt-24 pb-32 lg:pt-40"
        aria-labelledby="hero-title"
      >
        {/* Ambient background using theme ring token */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-[var(--ring)] blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left: Transactional Value Prop */}
            <div className="flex flex-col space-y-10 text-center lg:text-left">
              <header className="inline-flex items-center gap-2 self-center lg:self-start bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                <Cpu size={16} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  Engine v2.4 Live
                </span>
              </header>

              <div className="space-y-6">
                <h1 id="hero-title" className="h1 lg:text-3xl">
                  The POS Engine <br />
                  <span className="text-primary">Built for Scale.</span>
                </h1>
                <p className="max-w-xl text-base text-secondary font-medium leading-relaxed mx-auto lg:mx-0">
                  Unify your entire commerce operation. From high-volume retail
                  to complex distribution—OmniPOS delivers{" "}
                  <strong>sub-second transaction speeds</strong> across every
                  terminal.
                </p>
              </div>

              {/* Fitts's Law: Large, Accessible CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/terminal"
                  className="btn group flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-xl bg-primary px-8 text-base font-bold text-white shadow-soft hover:brightness-110"
                >
                  Launch Terminal
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="#demo"
                  className="btn flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-xl border border-border bg-card px-8 text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  Request Demo
                </Link>
              </div>

              {/* Trust/Feature Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
                <TrustBadge icon={<Zap />} text="0.2s Speed" />
                <TrustBadge icon={<Database />} text="Real-time Sync" />
                <TrustBadge icon={<ShieldCheck />} text="PCI Compliant" />
              </div>
            </div>

            {/* Right: Abstract Terminal Visual */}
            <div className="relative group perspective-1000 hidden lg:block">
              <div className="relative aspect-[4/3] bg-card rounded-[2rem] border-8 border-brand-navy shadow-2xl overflow-hidden shadow-soft">
                <div className="p-8 h-full flex flex-col bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="flex justify-between items-center mb-10">
                    <div className="h-4 w-32 bg-secondary/20 rounded-full" />
                    <div className="h-10 w-24 bg-primary/20 rounded-xl border border-primary/30" />
                  </div>
                  <div className="pos-grid">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-secondary/10 rounded-xl border border-border"
                      />
                    ))}
                  </div>
                  <div className="mt-auto h-20 bg-card border border-border rounded-2xl shadow-sm flex items-center px-6 justify-between">
                    <div className="h-4 w-24 bg-primary/40 rounded-full" />
                    <div className="h-10 w-32 bg-primary rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/50">
      <span className="text-primary scale-75">{icon}</span>
      <span className="text-xs font-bold text-secondary uppercase tracking-tight">
        {text}
      </span>
    </div>
  );
}