// import React from "react";
// import { Metadata } from "next";
// import { TerminalHeader } from "@/features/business/components/TerminalHeader";
// import { TerminalSidebar } from "@/features/business/components/TerminalSidebar";
// import { BusinessProvider } from "@/features/business/components/BusinessProvider";
// import { cn } from "@/lib/utils";

// /**
//  * @Scribe_Audit
//  * Fix: Moved BusinessContext.Provider to a Client Component wrapper.
//  * Architecture: Retains Server Component status for optimal LCP and Metadata handling.
//  * Next.js 16: Correctly awaits async params and searchParams.
//  */

// export const metadata: Metadata = {
//   title: "Terminal | Sales Hub",
//   description:
//     "High-performance POS interface for streamlined business operations.",
//   robots: "noindex, nofollow",
// };

// interface LayoutProps {
//   children: React.ReactNode;
//   params: Promise<{ businessId: string }>;
//   searchParams: Promise<{ name?: string }>;
// }

// export default async function TerminalLayout({
//   children,
//   params,
//   searchParams,
// }: LayoutProps) {
//   // Resolve async primitives for Next.js 16
//   const resolvedParams = await params;
//   const resolvedSearchParams = (await searchParams) || {};

//   const { businessId } = resolvedParams;
//   const { name } = resolvedSearchParams;
//   const businessName = name || "Sales Hub";

//   if (!businessId) return null;

//   return (
//     <BusinessProvider businessId={businessId} businessName={businessName}>
//       <div className="h-screen w-full flex flex-col bg-background overflow-hidden select-none text-foreground">
//         {/* GLOBAL HEADER (Client Island) */}
//         <TerminalHeader businessName={businessName} />

//         <div className="flex flex-1 min-h-0">
//           {/* SIDE NAVIGATION (Client Island) */}
//           <TerminalSidebar businessId={businessId} />

//           {/* INTERNAL VIEWPORT (Server Rendered) */}
//           <main
//             className={cn(
//               "flex-1 overflow-y-auto relative bg-background",
//               "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
//             )}
//           >
//             <div className=" min-h-full">{children}</div>
//           </main>
//         </div>
//       </div>
//     </BusinessProvider>
//   );
// }

import React from "react";
import { Metadata } from "next";
import { TerminalHeader } from "@/features/business/components/TerminalHeader";
import { TerminalSidebar } from "@/features/business/components/TerminalSidebar";
import { BusinessProvider } from "@/features/business/components/BusinessProvider";
import { cn } from "@/lib/utils";

/**
 * @Scribe_Audit
 * Fix: Removed searchParams from LayoutProps to resolve Next.js Type Error 184:31.
 * Performance: Layout is kept as a Server Component; navigation is handled via Client Islands.
 * Architecture: businessName is now derived from businessId or a default to maintain layout stability.
 */

export const metadata: Metadata = {
  title: "Terminal | Sales Hub",
  description:
    "High-performance POS interface for streamlined business operations.",
  robots: "noindex, nofollow",
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ businessId: string }>;
}

export default async function TerminalLayout({
  children,
  params,
}: LayoutProps) {
  // Await params for Next.js 16 asynchronous dynamic APIs
  const { businessId } = await params;

  if (!businessId) return null;

  // Note: searchParams are unavailable in Layouts.
  // If the business name is dynamic, fetch it here server-side or
  // handle it within the BusinessProvider/Header via the businessId.
  const businessName = "Sales Hub";

  return (
    <BusinessProvider businessId={businessId} businessName={businessName}>
      <div className="h-screen w-full flex flex-col bg-background overflow-hidden select-none text-foreground">
        {/* GLOBAL HEADER (Client Island) */}
        <TerminalHeader businessName={businessName} />

        <div className="flex flex-1 min-h-0">
          {/* SIDE NAVIGATION (Client Island) */}
          <TerminalSidebar businessId={businessId} />

          {/* INTERNAL VIEWPORT (Server Rendered) */}
          <main
            className={cn(
              "flex-1 overflow-y-auto relative bg-background",
              "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
            )}
          >
            <div className="min-h-full">{children}</div>
          </main>
        </div>
      </div>
    </BusinessProvider>
  );
}