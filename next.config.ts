import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    // El panel de contenido es un HTML estático en public/admin
    return [{ source: '/admin', destination: '/admin/index.html' }];
  },
};

export default nextConfig;
