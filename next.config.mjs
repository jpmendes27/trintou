/** @type {import('next').NextConfig} */

// Em dev o site roda na raiz (localhost:3000).
// No build de produção o script injeta /trintou, que é a pasta
// onde o site vai morar dentro do jpmendes.com.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
