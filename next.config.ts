import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['ai-srv.tail544682.ts.net', 'localhost', 'localhost:3000', '192.168.254.100'],
};

export default nextConfig;
