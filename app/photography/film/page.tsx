"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { ScrollArrow } from "@/components/ScrollArrow";
import { PhotographyPlaceholder } from "@/components/photography/PhotographyPlaceholder";

// 照片条目类型
type FilmPhoto = { src: string; w: string; h: string; rot: string; clip: "tl" | "br" | "tr"; span?: number };

// 彩色胶片 — 10张（8横 + 2竖）
const COLOR_PHOTOS: FilmPhoto[] = [
  { src: "/photos/film/color/000002.jpg", w: "clamp(140px, 22vw, 280px)", h: "clamp(100px, 16vw, 200px)", rot: "-3deg", clip: "tl" as const },
  { src: "/photos/film/color/1 (27)2.jpg", w: "clamp(130px, 20vw, 260px)", h: "clamp(200px, 30vw, 380px)", rot: "1deg", clip: "br" as const, span: 2 },
  { src: "/photos/film/color/000029.jpg", w: "clamp(160px, 24vw, 320px)", h: "clamp(110px, 18vw, 220px)", rot: "-1.5deg", clip: "tr" as const },
  { src: "/photos/film/color/890d0ef0fib606a69dd87bde0f7758dc.jpg", w: "clamp(120px, 19vw, 240px)", h: "clamp(200px, 30vw, 380px)", rot: "-2deg", clip: "tl" as const, span: 2 },
  { src: "/photos/film/color/000040.jpg", w: "clamp(150px, 23vw, 300px)", h: "clamp(100px, 16vw, 200px)", rot: "-2deg", clip: "br" as const },
  { src: "/photos/film/color/1 (20).jpg", w: "clamp(110px, 18vw, 230px)", h: "clamp(120px, 19vw, 240px)", rot: "1deg", clip: "tr" as const },
  { src: "/photos/film/color/1 (27).jpg", w: "clamp(140px, 22vw, 280px)", h: "clamp(110px, 18vw, 220px)", rot: "-2deg", clip: "tl" as const },
  { src: "/photos/film/color/1 (29)(1).jpg", w: "clamp(120px, 20vw, 260px)", h: "clamp(130px, 21vw, 270px)", rot: "2.5deg", clip: "br" as const },
  { src: "/photos/film/color/1 (31).jpg", w: "clamp(160px, 25vw, 330px)", h: "clamp(100px, 16vw, 200px)", rot: "-1deg", clip: "tr" as const },
  { src: "/photos/film/color/1 (35).jpg", w: "clamp(130px, 21vw, 270px)", h: "clamp(120px, 19vw, 240px)", rot: "2deg", clip: "tl" as const },
];

// 黑白胶片 — 6张（全横构图）
const BW_PHOTOS: FilmPhoto[] = [
  { src: "/photos/film/b&w/000005.jpg", w: "clamp(130px, 22vw, 280px)", h: "clamp(130px, 22vw, 280px)", rot: "-4deg", clip: "br" as const },
  { src: "/photos/film/b&w/000021.jpg", w: "clamp(150px, 24vw, 310px)", h: "clamp(110px, 18vw, 220px)", rot: "2.5deg", clip: "tl" as const },
  { src: "/photos/film/b&w/000023.jpg", w: "clamp(140px, 23vw, 290px)", h: "clamp(120px, 20vw, 250px)", rot: "-2deg", clip: "tr" as const },
  { src: "/photos/film/b&w/000036.jpg", w: "clamp(140px, 23vw, 300px)", h: "clamp(120px, 19vw, 240px)", rot: "3.5deg", clip: "tl" as const },
  { src: "/photos/film/b&w/000045.jpg", w: "clamp(160px, 25vw, 330px)", h: "clamp(110px, 18vw, 220px)", rot: "-1deg", clip: "br" as const },
  { src: "/photos/film/b&w/000047.jpg", w: "clamp(150px, 24vw, 310px)", h: "clamp(110px, 18vw, 220px)", rot: "2deg", clip: "tl" as const },
];

export default function FilmPage() {
  const ref = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <main className="bg-paper text-[var(--fg)] min-h-screen" ref={ref}>
      {/* ====== 顶部导航 ====== */}
      <div className="anim-y-60 fixed left-6 top-6 z-50">
        <Link
          href="/"
          className="type-label text-[var(--paper-cream)] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--fg)] transition-colors duration-200"
          style={{ fontSize: "clamp(0.6rem, 0.8vw, 0.7rem)" }}
        >
          <span
            className="inline-block bg-[#D10000]"
            style={{ width: "18px", height: "2px" }}
          />
          ← 返回
        </Link>
      </div>

      {/* ====== 标题区 ====== */}
      <div className="relative px-6 pt-28 pb-8 md:px-12 md:pt-36 md:pb-12">
        {/* 装饰 — 红色对角线 */}
        <div
          className="anim-line-x d-1 absolute h-[4px] bg-[#D10000] origin-left"
          style={{
            left: "0%",
            top: "65%",
            width: "50%",
            transform: "rotate(10deg)",
          }}
        />

        {/* 装饰 — 小黑方块 */}
        <div
          className="anim-scale d-2 absolute bg-[var(--fg)]"
          style={{ right: "8%", top: "30%", width: "16px", height: "16px" }}
        />

        {/* 装饰 — 红圆点 */}
        <div
          className="anim-scale d-3 geo-circle absolute bg-[#D10000]"
          style={{ right: "14%", top: "22%", width: "10px", height: "10px" }}
        />

        {/* 装饰 — 空心方框 */}
        <div
          className="anim-scale d-2 absolute border-[3px] border-[var(--fg)]/20"
          style={{ right: "6%", top: "50%", width: "40px", height: "40px" }}
        />

        {/* 俄文标注 */}
        <span
          className="anim-y-60 d-1 type-cyrillic text-[#D10000] block"
          style={{
            fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
            transform: "skewX(-10deg)",
            marginBottom: "0.5rem",
          }}
        >
          ПЛЁНКА
        </span>

        {/* 主标题 */}
        <h1
          className="anim-y-60 d-2 type-display inline-block"
          style={{ fontSize: "clamp(3.5rem, 7vw, 8rem)" }}
        >
          胶片暗房
        </h1>

        <p
          className="anim-y-60 d-3 type-label text-[#8C8C8C] mt-4 max-w-md"
          style={{ fontSize: "clamp(0.6rem, 0.8vw, 0.75rem)" }}
        >
          银盐 · 暗房 · 手工冲洗 · 每一张都是唯一
        </p>

        {/* 底部装饰红线 */}
        <div
          className="anim-line-x d-4 absolute left-0 h-[3px] bg-[#D10000]"
          style={{ bottom: "0%", width: "100%" }}
        />
      </div>

      {/* ====== 彩色 ====== */}
      <section className="relative px-6 py-14 md:px-12 md:py-20">
        {/* 小节标题 */}
        <div className="anim-y-60 d-2 flex items-center gap-4 mb-10">
          <span
            className="bg-[#D10000]"
            style={{ width: "clamp(20px, 3vw, 36px)", height: "4px" }}
          />
          <h2
            className="type-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            彩色
          </h2>
          <span
            className="type-cyrillic text-[#B0B0B0]"
            style={{ fontSize: "clamp(0.55rem, 0.8vw, 0.7rem)" }}
          >
            COLOR
          </span>
        </div>

        {/* 照片网格 */}
        <div
          className="grid gap-4 md:gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(140px, 22vw, 280px), 1fr))",
            gridAutoRows: "clamp(100px, 16vw, 200px)",
          }}
        >
          {COLOR_PHOTOS.map((p, i) => (
            <div
              key={i}
              className="anim-scale relative"
              style={{
                transitionDelay: `${0.25 + i * 0.06}s`,
                gridRow: p.span ? `span ${p.span}` : "span 1",
              }}
            >
              <PhotographyPlaceholder
                variant="color"
                src={p.src}
                clip={p.clip}
                className="!absolute inset-0"
                style={{
                  transform: p.rot,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 分隔线 */}
      <div className="px-6 md:px-12">
        <div
          className="anim-line-x d-3 h-[2px] bg-[var(--fg)]/10 w-full"
        />
      </div>

      {/* ====== B&W ====== */}
      <section className="relative px-6 py-14 md:px-12 md:py-20 pb-24">
        {/* 小节标题 */}
        <div className="anim-y-60 d-2 flex items-center gap-4 mb-10">
          <span
            className="bg-[var(--fg)]"
            style={{ width: "clamp(20px, 3vw, 36px)", height: "4px" }}
          />
          <h2
            className="type-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            B&W
          </h2>
          <span
            className="type-cyrillic text-[#B0B0B0]"
            style={{ fontSize: "clamp(0.55rem, 0.8vw, 0.7rem)" }}
          >
            MONOCHROME
          </span>
        </div>

        {/* 照片网格 */}
        <div
          className="grid gap-4 md:gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(140px, 22vw, 280px), 1fr))",
            gridAutoRows: "clamp(100px, 16vw, 200px)",
          }}
        >
          {BW_PHOTOS.map((p, i) => (
            <div
              key={i}
              className="anim-scale relative"
              style={{
                transitionDelay: `${0.25 + i * 0.08}s`,
                gridRow: p.span ? `span ${p.span}` : "span 1",
              }}
            >
              <PhotographyPlaceholder
                variant="bw"
                src={p.src}
                clip={p.clip}
                className="!absolute inset-0"
                style={{
                  transform: p.rot,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          ))}
        </div>

        {/* 前往数码 */}
        <div className="anim-y-60 d-4 mt-12 text-center">
          <Link
            href="/photography/digital"
            className="type-label text-[var(--paper-cream)] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-6 py-3 bg-[var(--fg)] transition-colors duration-200"
            style={{ fontSize: "clamp(0.85rem, 1vw, 0.95rem)" }}
          >
            数码明室 →
          </Link>
        </div>

        {/* 右下角几何装饰 */}
        <div
          className="anim-scale d-4 absolute geo-circle bg-[#D10000]"
          style={{ right: "6%", bottom: "8%", width: "12px", height: "12px" }}
        />
      </section>
      <ScrollArrow />
    </main>
  );
}
