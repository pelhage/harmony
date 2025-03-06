/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/harmony',
  assetPrefix: '/harmony',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 