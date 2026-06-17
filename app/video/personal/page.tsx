"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { ScrollArrow } from "@/components/ScrollArrow";
import { VideoCard } from "@/components/video/VideoCard";
import { VIDEOS } from "@/data/videos";

export default function PersonalVideoPage() {
  const ref = useScrollReveal<HTMLDivElement>(0.15);
  const personalVideos = VIDEOS.filter((v) => v.category === "personal");

  return (
    <main className="bg-paper text-[var(--fg)] min-h-screen" ref={ref}>
      {/* 顶部导航 */}
      <div className="anim-y-60 fixed left-6 top-6 z-50">
        <Link
          href="/"
          className="type-label text-[#F5EDE0] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D0D0D] transition-colors duration-200"
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
          className="anim-line-x d-1 absolute h-[3px] bg-[var(--fg)]/12 origin-right z-0"
          style={{ right: "0%", top: "40%", width: "28%", transform: "rotate(-7deg)" }}
        />
        <div
          className="anim-scale d-2 geo-circle absolute border-[2px] border-[var(--fg)]/15 z-0"
          style={{ right: "12%", top: "22%", width: "24px", height: "24px" }}
        />
        <div
          className="anim-scale d-3 absolute bg-[#D10000]/60 z-0"
          style={{ right: "8%", top: "35%", width: "8px", height: "8px" }}
        />

        <div className="relative z-10">
          <span
            className="anim-y-60 d-1 type-cyrillic text-[#5C5044] block"
            style={{
              fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)",
              transform: "skewX(-8deg)",
              marginBottom: "0.3rem",
            }}
          >
            PERSONAL
          </span>

          <h1
            className="anim-y-60 d-2 type-display inline-block"
            style={{ fontSize: "clamp(3rem, 6vw, 7rem)" }}
          >
            闲影
          </h1>

          <p
            className="anim-y-60 d-3 type-label text-[#5C5044] mt-3 max-w-md"
            style={{ fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)" }}
          >
            主播发狂时候
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
        {personalVideos.length === 0 ? (
          <p className="type-label text-[#5C5044] text-center py-12"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}>
            暂无个人影像，敬请期待
          </p>
        ) : (
          <div
            className="grid gap-4 sm:gap-6 md:gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(clamp(240px, 70vw, 360px), 1fr))",
            }}
          >
            {personalVideos.map((video, i) => (
              <VideoCard
                key={i}
                title={video.title}
                description={video.description}
                platform="Bilibili"
                href={video.href || undefined}
                coverSrc={video.cover}
                delay={`d-${Math.min(i + 2, 5)}`}
              />
            ))}
          </div>
        )}
{/* 返回 */}
        <div className="anim-y-60 d-4 mt-12 text-center">
          <p
            className="type-label text-[#B0B0B0]/60 mb-3"
            style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
          >
            需要高清原图请联系作者喵
          </p>
          <Link
            href="/video/work"
            className="type-label text-[#F5EDE0] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-6 py-3 bg-[#0D0D0D] transition-colors duration-200"
            style={{ fontSize: "clamp(0.85rem, 1vw, 0.95rem)" }}
          >
            ← 返回受托
          </Link>
        </div>
      </section>
      <ScrollArrow />
    </main>
  );
}
