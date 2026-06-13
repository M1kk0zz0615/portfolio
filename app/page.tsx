"use client";

import { useEffect } from "react";
import { PosterAbout } from "@/components/home/PosterAbout";
import { PosterPhotography } from "@/components/home/PosterPhotography";
import { PosterVideo } from "@/components/home/PosterVideo";
import { PosterOther } from "@/components/home/PosterOther";

const SCROLL_KEY = "home-scroll";

export default function Home() {
  // 恢复滚动位置
  useEffect(() => {
    const container = document.querySelector(".poster-container");
    if (!container) return;
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
      <PosterPhotography />
      <PosterVideo />
      <PosterOther />
    </main>
  );
}
