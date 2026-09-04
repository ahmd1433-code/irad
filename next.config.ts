import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preview and browsers open http://127.0.0.1, while the server binds 0.0.0.0.
  // Without this, Next.js blocks /_next/hmr with a bare "Unauthorized" body,
  // which Chromium reports as net::ERR_INVALID_HTTP_RESPONSE (-355).
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/site", destination: "/", permanent: true },
      { source: "/site/:path*", destination: "/:path*", permanent: true },
      { source: "/programs", destination: "/irad/programs", permanent: false },
      { source: "/programs/:path*", destination: "/irad/programs/:path*", permanent: false },
      { source: "/playbooks", destination: "/irad/playbooks", permanent: false },
      { source: "/playbooks/:path*", destination: "/irad/playbooks/:path*", permanent: false },
      { source: "/calculator", destination: "/irad/calculator", permanent: false },
      { source: "/compare", destination: "/irad/compare", permanent: false },
      { source: "/zero", destination: "/irad/zero", permanent: false },
      { source: "/deploy", destination: "/irad/deploy", permanent: false },
      { source: "/apply/:path*", destination: "/irad/apply/:path*", permanent: false },
      { source: "/agent", destination: "/irad/agent", permanent: false },
      { source: "/plan", destination: "/irad/plan", permanent: false },
      { source: "/publish", destination: "/irad/publish", permanent: false },
    ];
  },
};

export default nextConfig;
