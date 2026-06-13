import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Noto Sans SC 改用 next/font 本地化加载，消除 Google Fonts 外部请求延迟
const notoSansSC = Noto_Sans_SC({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-noto-sc",
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
