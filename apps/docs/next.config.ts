import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@workspace/ui",
    "fumadocs-core",
    "fumadocs-mdx",
    "fumadocs-ui",
    "fumadocs-twoslash",
    "fumadocs-typescript",
  ],
  images: {
    // Example photos in components/examples.
    remotePatterns: [new URL("https://images.unsplash.com/**")],
  },
  rewrites: async () => [
    {
      source: "/docs/:path*.mdx",
      destination: "/llms.mdx/docs/:path*",
    },
  ],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
