import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
            <LayoutGrid size={22} className="text-white" />
          </div>
          <span className="text-lg font-extrabold tracking-tighter uppercase">
            OmniPOS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-secondary">
          <Link
            href="#features"
            className="hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#solutions"
            className="hover:text-primary transition-colors"
          >
            Solutions
          </Link>
          <Link href="#docs" className="hover:text-primary transition-colors">
            Documentation
          </Link>
        </div>

        <Link
          href="/home"
          className="text-xs font-black uppercase tracking-widest bg-foreground text-background px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}
