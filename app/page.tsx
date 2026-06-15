"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { PosterAbout } from "@/components/home/PosterAbout";

// 非首屏海报动态导入 — 减少首屏 JS 解析量
// PosterAbout 首屏可见，同步加载；其余 lazy load
const PosterBuildLog = dynamic(
  () => import("@/components/home/PosterBuildLog").then((m) => ({ default: m.PosterBuildLog })),
  { ssr: false }
);
const PosterPhotography = dynamic(
  () => import("@/components/home/PosterPhotography").then((m) => ({ default: m.PosterPhotography })),
  { ssr: false }
);
const PosterVideo = dynamic(
  () => import("@/components/home/PosterVideo").then((m) => ({ default: m.PosterVideo })),
  { ssr: false }
);
const PosterOther = dynamic(
  () => import("@/components/home/PosterOther").then((m) => ({ default: m.PosterOther })),
  { ssr: false }
);

const SCROLL_KEY = "home-scroll";

export default function Home() {
  // 优先处理 ?to= 跳转（如 /?to=build-log），否则恢复滚动位置
  useEffect(() => {
    const container = document.querySelector(".poster-container");
    if (!container) return;

    // 检查 query param 跳转信号
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get("to");

    if (scrollTo) {
      const target = document.getElementById(scrollTo);
      if (target) {
        // 多次尝试：等 DOM / 字体 / 图片加载后位置稳定
        const doScroll = () => {
          const cr = container.getBoundingClientRect();
          const tr = target.getBoundingClientRect();
          container.scrollTop += tr.top - cr.top;
        };
        requestAnimationFrame(() => {
          doScroll();
          setTimeout(doScroll, 100);
          setTimeout(doScroll, 400);
        });
        // 清除 URL 中的 query param，不刷新页面
        const url = new URL(window.location.href);
        url.searchParams.delete("to");
        window.history.replaceState({}, "", url.toString());
        return;
      }
    }

    // 无跳转信号时恢复滚动位置
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      container.scrollTop = parseInt(saved, 10);
    }
  }, []);

  // 保存滚动位置
  useEffect(() => {
    const container = document.querySelector(".poster-container");
    if (!container) return;
    const onScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, String(container.scrollTop));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="poster-container">
      <PosterAbout />
      <PosterBuildLog />
      <PosterPhotography />
      <PosterVideo />
      <PosterOther />
    </main>
  );
}
