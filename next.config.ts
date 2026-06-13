import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 图片优化：sharp 负责 WebP/AVIF 转换 & 缩放
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 为静态导入的图片启用响应式优化
  experimental: {
    optimizePackageImports: ["sharp"],
  },
};

export default nextConfig;
