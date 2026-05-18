/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  // GitHub Pages에서만 static export 사용
  ...(isGithubPages && { output: 'export' }),
  
  // GitHub Pages에서만 basePath 사용
  ...(isGithubPages && { basePath: '/soma-ai' }),
  
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
