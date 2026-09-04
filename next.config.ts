import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preview and browsers open http://127.0.0.1, while the server binds 0.0.0.0.
  // Without this, Next.js blocks /_next/hmr with a bare "Unauthorized" body,
  // which Chromium reports as net::ERR_INVALID_HTTP_RESPONSE (-355).
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
