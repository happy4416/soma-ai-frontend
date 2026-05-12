/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/soma-ai',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
