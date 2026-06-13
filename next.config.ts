import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 图片优化
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // CDN 缓存 7 天 — 第一个访客优化完图片，后续访客直接命中缓存
    minimumCacheTTL: 604800,
  },

  // ====== 缓存策略 ======
  async headers() {
    return [
      // JS/CSS 静态文件 — 文件名带哈希，永久缓存
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // next/image 优化图片 — 浏览器缓存 1 天 + CDN 续命 7 天
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      // public 目录静态资源 — 30 天
      {
        source: "/(.*\\.(?:jpg|jpeg|png|webp|avif|svg|ico|woff2?|ttf|eot))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=2592000" },
        ],
      },
    ];
  },

  // 延长静态页服务端缓存 + 减少 prefetch
  experimental: {
    optimizePackageImports: ["sharp"],
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default nextConfig;
