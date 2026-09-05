import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export: `npm run build` emits plain HTML/CSS/JS into `out/`,
  // which nginx serves directly (see deploy.sh). No Node runtime on the server.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
