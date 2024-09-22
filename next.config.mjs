import { withKumaUI } from "@kuma-ui/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  // distDir: 'dist',
  images: {
    domains: ['raw.githubusercontent.com'],
    // unoptimized: true, // 画像最適化を無効化
  },
};

export default withKumaUI(nextConfig, {
  wasm: true // Optional
});