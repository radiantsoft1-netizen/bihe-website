import type { NextConfig } from "next";
import { imageRewriteMap } from "./src/lib/images";

/** Dev uses `.next`; production builds use `.next-build` so they never break a running dev server. */
const distDir = process.env.BIHE_DIST_DIR ?? ".next";

const nextConfig: NextConfig = {
  distDir,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
    qualities: [60, 70, 75, 80, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384, 512, 640],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8001",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8001",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8099",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "admin.bihe.edu",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "admin.bihedvg.org",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "*.trycloudflare.com",
        pathname: "/storage/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lenis"],
  },
  async rewrites() {
    return Object.entries(imageRewriteMap).map(([slug, destination]) => ({
      source: `/i/${slug}`,
      destination,
    }));
  },
};

export default nextConfig;
