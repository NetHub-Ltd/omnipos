import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, Database, Zap, ShieldCheck } from "lucide-react";

/**
 * @Scribe_Audit
 * Brand: Tawala POS
 * Positioning: SME Business Management Platform (Kenya-first)
 * Theme: Strict tokens only (--primary, --secondary, --border)
 */

export const metadata: Metadata = {
  title: "Tawala POS | Business Management for Kenyan SMEs",
  description:
    "Tawala helps Kenyan businesses manage sales, stock, staff, and growth from one simple platform. Move from manual biashara to structured business management.",
  alternates: {
    canonical: "/",
  },
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tawala POS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "Business management platform for Kenyan SMEs to manage sales, inventory, staff, and growth.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="relative overflow-hidden px-6 pt-24 pb-32 lg:pt-40 bg-background"
        aria-labelledby="hero-title"
      >
        {/* Ambient Brand Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-[var(--ring)] blur-[120px] rounded-full pointer-events-none will-change-transform"
          aria-hidden="true"
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* LEFT: HERO COPY */}
            <div className="flex flex-col space-y-10 text-center lg:text-left">
              <header className="inline-flex items-center gap-2 self-center lg:self-start bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                <Cpu size={14} className="text-primary" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Built for Kenyan SMEs
                </span>
              </header>

              <div className="space-y-6">
                <h1 id="hero-title" className="h1 lg:text-[4rem] leading-[1]">
                  From Hustle
                  <br />
                  to Structure.
                  <br />
                  <span className="text-primary">Tawala biashara yako.</span>
                </h1>

                <p className="max-w-xl text-base md:text-lg text-secondary font-medium leading-relaxed mx-auto lg:mx-0">
                  Tawala helps you manage sales, stock, staff, and operations
                  from one simple platform — built for the reality of Kenyan
                  businesses.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/terminal"
                  className="group flex h-16 min-w-[240px] items-center justify-center gap-3 rounded-2xl bg-primary px-8 text-base font-black text-white shadow-soft hover:scale-[1.02] transition-all"
                >
                  Start Selling
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  href="#demo"
                  className="flex h-16 min-w-[200px] items-center justify-center gap-3 rounded-2xl border border-border bg-card px-8 text-base font-bold text-foreground hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  Book Demo
                </Link>
              </div>

              {/* TRUST / VALUE */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-6">
                <TrustBadge icon={<Zap size={16} />} text="Easy to Use" />
                <TrustBadge
                  icon={<Database size={16} />}
                  text="Stock Control"
                />
                <TrustBadge
                  icon={<ShieldCheck size={16} />}
                  text="Business Insights"
                />
              </div>
            </div>

            {/* RIGHT: VISUAL */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] bg-card rounded-[2.5rem] border-[12px] border-foreground shadow-2xl overflow-hidden shadow-soft">
                <div className="p-8 h-full flex flex-col bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="flex justify-between items-center mb-8">
                    <div className="h-3 w-32 bg-secondary/20 rounded-full" />
                    <div className="h-8 w-24 bg-primary/20 rounded-lg border border-primary/30" />
                  </div>

                  {/* GRID REPRESENTATION */}
                  <div className="grid grid-cols-5 gap-3">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-secondary/5 rounded-xl border border-border/50 animate-pulse"
                        style={{ animationDelay: `${i * 80}ms` }}
                      />
                    ))}
                  </div>

                  <div className="mt-auto h-20 glass rounded-2xl flex items-center px-6 justify-between">
                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-primary/30 rounded-full" />
                      <div className="h-2 w-16 bg-secondary/20 rounded-full" />
                    </div>
                    <div className="h-10 w-32 bg-primary rounded-xl shadow-lg shadow-primary/20" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-primary/10 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
      <span className="text-primary" aria-hidden="true">
        {icon}
      </span>
      <span className="text-[10px] font-black text-secondary uppercase tracking-widest">
        {text}
      </span>
    </div>
  );
}
