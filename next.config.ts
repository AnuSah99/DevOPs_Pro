import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === "true" || process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export", images: { unoptimized: true } } : {}),
  basePath: process.env.GITHUB_PAGES === "true" ? "/DevOPs_Pro" : "",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
