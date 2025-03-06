/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/harmony' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/harmony' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 