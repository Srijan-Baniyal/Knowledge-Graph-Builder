import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [100],
    
  },
  cacheComponents: true,
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
