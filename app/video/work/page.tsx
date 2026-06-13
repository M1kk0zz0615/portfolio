"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { ScrollArrow } from "@/components/ScrollArrow";
import { VideoCard } from "@/components/video/VideoCard";

const WORK_VIDEOS = [
  {
    title: "待补充",
    description: "学院活动记录",
    platform: "Bilibili" as const,
    href: "",
  },
  {
    title: "待补充",
    description: "年度回顾视频",
    platform: "视频号" as const,
    href: "",
  },
  {
    title: "待补充",
    description: "毕业纪念短片",
    platform: "Bilibili" as const,
    href: "",
  },
  {
    title: "待补充",
    description: "学院宣传片",
    platform: "视频号" as const,
    href: "",
  },
  {
    title: "待补充",
    description: "活动纪录片",
    platform: "Bilibili" as const,
    href: "",
  },
  {
    title: "待补充",
    description: "私下接活项目",
    platform: "Bilibili" as const,
    href: "",
  },
];

export default function WorkVideoPage() {
  const ref = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <main className="bg-paper text-[var(--fg)] min-h-screen" ref={ref}>
      {/* 顶部导航 */}
      <div className="anim-y-60 fixed left-6 top-6 z-50">
        <Link
          href="/"
          className="type-label text-[var(--paper-cream)] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--fg)] transition-colors duration-200"
          style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
        >
          <span className="inline-block bg-[#D10000]" style={{ width: "18px", height: "2px" }} />
          ← 返回
        </Link>
      </div>

      {/* 标题区 */}
      <div className="relative px-6 pt-16 pb-6 md:px-12 md:pt-20 md:pb-8">
        {/* 装饰 */}
        <div
          className="anim-line-x d-1 absolute h-[4px] bg-[#D10000] origin-left z-0"
          style={{ left: "0%", top: "50%", width: "32%", transform: "rotate(11deg)" }}
        />
        <div
          className="anim-scale d-2 geo-circle absolute bg-[#D10000] z-0"
          style={{ right: "10%", top: "25%", width: "10px", height: "10px" }}
        />
        <div
          className="anim-scale d-3 absolute bg-[var(--fg)] z-0"
          style={{ right: "6%", top: "18%", width: "12px", height: "12px" }}
        />

        <div className="relative z-10">
          <span
            className="anim-y-60 d-1 type-cyrillic text-[#D10000] block"
            style={{
              fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)",
              transform: "skewX(-8deg)",
              marginBottom: "0.3rem",
            }}
          >
            WORK
          </span>

          <h1
            className="anim-y-60 d-2 type-display inline-block"
            style={{ fontSize: "clamp(3rem, 6vw, 7rem)" }}
          >
            受托
          </h1>

          <p
            className="anim-y-60 d-3 type-label text-[#5C5044] mt-3 max-w-md"
            style={{ fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)" }}
          >
            学院融媒体中心 · 活动记录 · 年度回顾 · 毕业纪念 · 委托项目
          </p>
        </div>

        {/* 底部红线 */}
        <div
          className="anim-line-x d-4 absolute right-0 h-[3px] bg-[#D10000] z-0"
          style={{ bottom: "0%", width: "clamp(100px, 22vw, 280px)" }}
        />
      </div>

      {/* 视频网格 */}
      <section className="px-6 py-8 md:px-12 md:py-10 pb-20">
        <div
          className="grid gap-4 sm:gap-6 md:gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(240px, 70vw, 360px), 1fr))",
          }}
        >
          {WORK_VIDEOS.map((video, i) => (
            <VideoCard
              key={i}
              title={video.title}
              description={video.description}
              platform={video.platform}
              href={video.href || undefined}
              delay={`d-${Math.min(i + 2, 5)}`}
            />
          ))}
        </div>
        {/* 前往闲影 */}
        <div className="anim-y-60 d-4 mt-12 text-center">
          <p
            className="type-label text-[#B0B0B0]/60 mb-3"
            style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
          >
            需要高清原图请联系作者喵
          </p>
          <Link
            href="/video/personal"
            className="type-label text-[var(--paper-cream)] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-6 py-3 bg-[var(--fg)] transition-colors duration-200"
            style={{ fontSize: "clamp(0.85rem, 1vw, 0.95rem)" }}
          >
            闲影 →
          </Link>
        </div>
      </section>
      <ScrollArrow />
    </main>
  );
}
