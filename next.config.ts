import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/catalog/bronze",
        destination: "/catalog/bronza",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
