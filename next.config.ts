import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tools/capcut-ai",
        destination: "/tools/capcut",
        permanent: true,
      },
      {
        source: "/tools/zapier-ai",
        destination: "/tools/zapier",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
