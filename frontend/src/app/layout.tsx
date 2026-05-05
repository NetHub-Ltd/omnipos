import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/lib/providers"; // Assuming standard lib structure
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // WCAG compliance for accessibility
};

export const metadata: Metadata = {
  title: "OmniPOS | High-Performance Cloud Commerce",
  description:
    "The enterprise-grade POS engine built for sub-second speeds and global scale.",
  metadataBase: new URL("https://omnipos.io"), // Replace with actual domain
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OmniPOS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-primary/20">
        <Providers>
          {/* Main Landmark for SEO/a11y */}
          <main id="main-content" className="relative flex flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}