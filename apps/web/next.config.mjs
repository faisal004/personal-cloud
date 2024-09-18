/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
    experimental: {
        turbo: {
          resolveAlias: {
            'next/server.js': 'next/server',
            'next/navigation.js': 'next/navigation',
            'next/headers.js': 'next/headers',
          },
        },
     },
};

export default nextConfig;
