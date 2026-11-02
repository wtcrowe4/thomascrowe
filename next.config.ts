import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Sawgrass 17 ships with postprocessing off; swap the library for no-op
  // stubs so it stays out of the scene chunk. See the stub file header.
  turbopack: {
    resolveAlias: {
      "@react-three/postprocessing": "./components/sawgrass17/overrides/postprocessing-stub.tsx",
    },
  },
  experimental: {
    optimizePackageImports: ["@react-three/drei", "lucide-react"],
  },
};

export default nextConfig;
