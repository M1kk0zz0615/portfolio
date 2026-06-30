"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { PosterAbout } from "@/components/home/PosterAbout";
import { ArchiveDrawer } from "@/components/ArchiveDrawer";

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
  const [fromArchive, setFromArchive] = useState(false);
  const jumpTargetRef = useRef<string | null>(null);
  const [heroShifted, setHeroShifted] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);

  // 优先处理 ?to= 跳转（如 /?to=build-log），否则恢复滚动位置
  useEffect(() => {
    const fromArchiveFlag = sessionStorage.getItem("from-archive") === "1";
    if (fromArchiveFlag) {
      setFromArchive(true);
    }

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

        // 来自 Archive 时，记录目标海报 ID 用于滚动监听
        if (fromArchiveFlag) {
          jumpTargetRef.current = scrollTo;
        }

        return;
      }
    }

    // 无跳转信号时恢复滚动位置
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      container.scrollTop = parseInt(saved, 10);
    }
  }, []);

  // 保存滚动位置 + 检测是否滚离跳转目标海报
  useEffect(() => {
    const container = document.querySelector(".poster-container");
    if (!container) return;
    const onScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, String(container.scrollTop));
      // 如果来自 Archive，检测是否已滚离目标海报
      if (jumpTargetRef.current) {
        const target = document.getElementById(jumpTargetRef.current);
        if (target) {
          const cr = container.getBoundingClientRect();
          const tr = target.getBoundingClientRect();
          // 目标海报可见不足 40% 时隐藏返回按钮
          const visibleTop = Math.max(tr.top, cr.top);
          const visibleBottom = Math.min(tr.bottom, cr.bottom);
          const visibleH = Math.max(0, visibleBottom - visibleTop);
          const totalH = tr.bottom - tr.top;
          if (totalH > 0 && visibleH / totalH < 0.4) {
            sessionStorage.removeItem("from-archive");
            setFromArchive(false);
            jumpTargetRef.current = null;
          }
        }
      }
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // 「← 返回档案」→ 在当前海报上打开抽屉
  const handleBackToArchive = () => {
    setFromArchive(false);
    jumpTargetRef.current = null;
    setHeroShifted(true);
    setDrawerMounted(true);
  };

  // 从 Archive Drawer 跳转（内部按钮）：先切海报 → 抽屉退出露出
  const handleArchiveNavigate = (target: string) => {
    setFromArchive(true);
    jumpTargetRef.current = target;
    document.getElementById(target)?.scrollIntoView({ block: "start" });
  };

  // 底部 CTA：抽屉退出 + Hero 复位 同步 → 完成后平滑滚动
  const handleBottomCTA = () => {
    setHeroShifted(false); // Hero 400ms 复位，与抽屉 300ms 退出同步
    setFromArchive(true);
    jumpTargetRef.current = "build-log";
    setTimeout(() => {
      document.getElementById("build-log")?.scrollIntoView({ behavior: "smooth" });
    }, 350); // 抽屉 300ms + Hero 300ms 同步完成
  };

  return (
    <main className="poster-container">
      {fromArchive && (
        <button
          onClick={handleBackToArchive}
          className="fixed left-6 top-6 z-50 type-label text-[#F5EDE0] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D0D0D] transition-colors duration-200"
          style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
        >
          <span className="inline-block bg-[#F5EDE0]" style={{ width: "12px", height: "1.5px" }} />
          ← 返回档案
        </button>
      )}
      <PosterAbout
        archiveOpen={heroShifted}
        onOpenArchive={() => { setHeroShifted(true); setDrawerMounted(true); }}
      />
      <PosterBuildLog />
      <PosterPhotography />
      <PosterVideo />
      <PosterOther />

      {/* Archive Drawer — Portal 渲染到 body */}
      {drawerMounted && (
        <ArchiveDrawer
          onClose={() => { setHeroShifted(false); setDrawerMounted(false); }}
          onNavigate={handleArchiveNavigate}
          onBottomCTA={handleBottomCTA}
        />
      )}
    </main>
  );
}
