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
    "fumadocs-openapi",
  ],
  rewrites: async () => [
    {
      source: "/docs/:path*.mdx",
      destination: "/llms.mdx/docs/:path*",
    },
  ],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
