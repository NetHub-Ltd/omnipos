import { Metadata } from "next";
import { Suspense } from "react";
import { LayoutGrid, Activity } from "lucide-react";
import LoginButton from "@/features/auth/loginButton";

export const metadata: Metadata = {
  title: "Secure Terminal Access | OmniPOS",
  description:
    "Enterprise-grade authentication gateway for OmniPOS Terminal v2.4. Authorized personnel only.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "OmniPOS Login",
    description: "Secure access to the OmniPOS terminal ecosystem.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        id="main-content"
        className="relative min-h-screen flex items-center justify-center bg-background p-6 overflow-hidden"
      >
        {/* Ambient background glow optimized for CLS */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"
          aria-hidden="true"
        />

        <section className="w-full max-w-[420px] space-y-8 animate-in fade-in zoom-in-95 duration-500">
          {/* Header & Branding */}
          <header className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card border border-border shadow-soft">
              <LayoutGrid className="text-primary" size={32} />
            </div>
            <div className="space-y-1">
              <h1 className="h1 uppercase text-primary">Terminal Access</h1>
              <p className="text-xs text-secondary font-bold tracking-[0.2em] uppercase opacity-80">
                Enterprise Engine v2.4
              </p>
            </div>
          </header>

          {/* Auth Card */}
          <div className="glass p-8 rounded-[2.5rem] shadow-soft relative overflow-hidden group">
            {/* Visual indicator for active layer */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <p className="text-base font-medium text-foreground">
                  Welcome back
                </p>
                <p className="text-xs text-secondary leading-relaxed">
                  Authentication is managed via NetHub SSO. All session activity
                  is monitored for security.
                </p>
              </div>

              {/* The Interaction Layer */}
              <Suspense
                fallback={
                  <div className="h-14 w-full bg-muted animate-pulse rounded-xl" />
                }
              >
                <LoginButton />
              </Suspense>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-bold text-secondary/60 uppercase tracking-widest">
                  Secure SSO
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </div>
          </div>

          {/* System Status Footer */}
          <footer className="flex justify-between items-center px-4">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-secondary">
                Auth Gateway: Online
              </span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-secondary/40">
              Node: AF-ENT-01
            </span>
          </footer>
        </section>
      </main>
    </>
  );
}