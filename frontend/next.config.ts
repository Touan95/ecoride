import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecoride-sooty.vercel.app'
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
