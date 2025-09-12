import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: config => {
    // Ensure TS paths aliases also work in non-TS files or runtime webpack resolution
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
