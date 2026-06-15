import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

// display: "swap" 关键优化：浏览器立即用回退字体渲染，字体加载完成后切换
// 避免 FOIT（Flash of Invisible Text），在 4G Slow 下效果显著
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",          // ← 防止文字不可见
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",          // ← 防止文字不可见
  preload: true,
  fallback: ["ui-monospace", "monospace"],
});

// Noto Sans SC 仅加载 weight 900 用于中文展示标题
// display:swap 确保 4G 下不回退到不可见文字
// preload:false → 降低首屏关键请求数，中文 900 字重约 2MB 不应阻塞 LCP
const notoSansSC = Noto_Sans_SC({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
  preload: false,           // ← 不预加载中文大字体，降低首屏关键请求
  variable: "--font-noto-sc",
  fallback: ["PingFang SC", "Microsoft YaHei", "Heiti SC", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Mikko的数字档案",
  description: "摄影师与影像创作者的个人视觉档案",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} antialiased`}
    >
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
