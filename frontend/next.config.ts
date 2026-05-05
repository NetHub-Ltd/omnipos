// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// next.config.ts
import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // swMinify: true,
  // disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* Add other config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default withPWA(nextConfig);