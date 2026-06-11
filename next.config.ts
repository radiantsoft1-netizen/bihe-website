import type { NextConfig } from "next";
import { imageRewriteMap } from "./src/lib/images";

/** Dev uses `.next`; production builds use `.next-build` so they never break a running dev server. */
const distDir = process.env.BIHE_DIST_DIR ?? ".next";

const nextConfig: NextConfig = {
  distDir,
  images: {
    qualities: [75, 90, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [256, 384, 512, 640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
  async rewrites() {
    return Object.entries(imageRewriteMap).map(([slug, destination]) => ({
      source: `/i/${slug}`,
      destination,
    }));
  },
};

export default nextConfig;
