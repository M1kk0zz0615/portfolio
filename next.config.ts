import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ====== 图片优化 ======
  // 启用 sharp 进行 WebP/AVIF 实时转换，大幅减少图片体积
  images: {
    formats: ["image/webp", "image/avif"],
    // 移动端优先的尺寸断点，减少生成不必要的超大图
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800, // 7 天 CDN 缓存
  },

  // ====== 压缩 ======
  // 开启 gzip 之外的标准压缩（Next.js 默认已启用 gzip，此处确保 brotli 优先）
  compress: true,

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
    // 优化特定包的 tree-shaking
    optimizePackageImports: ["sharp"],
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  // ====== Turbopack 配置（Next.js 16 默认使用 Turbopack for dev）======
  // Turbopack 完全支持 Tailwind CSS v4 + PostCSS，无需额外配置
  // 如遇兼容性问题，可用 `next dev --no-turbo` 回退到 webpack
};

export default nextConfig;
