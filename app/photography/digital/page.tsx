"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { ScrollArrow } from "@/components/ScrollArrow";
import { PhotographyPlaceholder } from "@/components/photography/PhotographyPlaceholder";

// 照片条目类型
type DigitalPhoto = { src: string; rot: string; clip: "tl" | "br" | "tr"; span?: number };

// 竖图 span:2 占两行，横图 span:1
const COMMISSIONED_PHOTOS: DigitalPhoto[] = [
  { src: "/photos/digital/work/1781326254378.webp", rot: "-1deg", clip: "br" as const },
  { src: "/photos/digital/work/DSC03078.webp", rot: "2deg", clip: "tl" as const },
  { src: "/photos/digital/work/DSC03095.webp", rot: "-2deg", clip: "tr" as const },
  { src: "/photos/digital/work/DSC03124.webp", rot: "1deg", clip: "br" as const },
  { src: "/photos/digital/work/DSC03130.webp", rot: "-1deg", clip: "tl" as const },
  { src: "/photos/digital/work/DSC03165.webp", rot: "2deg", clip: "tr" as const },
];

const LANDSCAPE_PHOTOS: DigitalPhoto[] = [
  { src: "/photos/digital/landscape/1.webp", rot: "-2deg", clip: "tl" as const, span: 2 },
  { src: "/photos/digital/landscape/2.webp", rot: "2.5deg", clip: "br" as const, span: 2 },
  { src: "/photos/digital/landscape/6436259C7AC9B87CBA8B7D9F56F87650.webp", rot: "-1deg", clip: "tr" as const },
  { src: "/photos/digital/landscape/D15447C749809A59FE4E708E4F25BE64.webp", rot: "3deg", clip: "tl" as const },
];

const STREET_PHOTOS: DigitalPhoto[] = [
  { src: "/photos/digital/street/3C808CD630D3762524689C8369E03F9D.webp", rot: "-3.5deg", clip: "br" as const },
  { src: "/photos/digital/street/3.webp", rot: "2deg", clip: "tl" as const, span: 2 },
  { src: "/photos/digital/street/4773508DFF53256DC4386FD8783D247E.webp", rot: "-1.5deg", clip: "tr" as const },
  { src: "/photos/digital/street/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-13_125431_663.webp", rot: "3deg", clip: "tl" as const },
  { src: "/photos/digital/street/6.webp", rot: "-2deg", clip: "br" as const, span: 2 },
  { src: "/photos/digital/street/4.webp", rot: "1deg", clip: "tr" as const, span: 2 },
  { src: "/photos/digital/street/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-13_125852_923.webp", rot: "-2deg", clip: "tl" as const },
  { src: "/photos/digital/street/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-13_132119_928.webp", rot: "2deg", clip: "br" as const },
  { src: "/photos/digital/street/5.webp", rot: "-1deg", clip: "tr" as const, span: 2 },
];

function SectionHeader({ title, cyrillic, markerColor = "var(--red)" }: {
  title: string;
  cyrillic: string;
  markerColor?: string;
}) {
  return (
    <div className="anim-y-60 d-2 flex items-center gap-4 mb-10">
      <span
        style={{ width: "clamp(20px, 3vw, 36px)", height: "4px", background: markerColor }}
      />
      <h2
        className="type-display"
        style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
      >
        {title}
      </h2>
      <span
        className="type-cyrillic text-[#B0B0B0]"
        style={{ fontSize: "clamp(0.55rem, 0.8vw, 0.7rem)" }}
      >
        {cyrillic}
      </span>
    </div>
  );
}

export default function DigitalPage() {
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
        {/* 装饰 — 取景框 */}
        <div
          className="anim-scale d-1 absolute border-[3px] border-[var(--fg)]/15"
          style={{
            right: "6%",
            top: "20%",
            width: "clamp(60px, 10vw, 120px)",
            height: "clamp(80px, 13vw, 160px)",
          }}
        />

        {/* 装饰 — 像素格 */}
        <div className="anim-scale d-2 absolute" style={{ right: "10%", top: "28%" }}>
          {[
            [0, 0], [1, 0], [0, 1], [1, 1],
          ].map(([c, r], i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${c * 14}px`,
                top: `${r * 14}px`,
                width: "8px",
                height: "8px",
                background: (c + r) % 2 === 0 ? "var(--fg)" : "var(--red)",
                opacity: (c + r) % 2 === 0 ? 0.3 : 1,
              }}
            />
          ))}
        </div>

        {/* 装饰 — 红对角线 */}
        <div
          className="anim-line-x d-1 absolute h-[3px] bg-[#D10000]/60 origin-left"
          style={{
            left: "0%",
            top: "35%",
            width: "45%",
            transform: "rotate(10deg)",
          }}
        />

        {/* 俄文标注 */}
        <span
          className="anim-y-60 d-1 type-cyrillic text-[#D10000] block"
          style={{
            fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
            transform: "skewX(-8deg)",
            marginBottom: "0.5rem",
          }}
        >
          ЦИФРА
        </span>

        {/* 主标题 */}
        <h1
          className="anim-y-60 d-2 type-display inline-block"
          style={{ fontSize: "clamp(3.5rem, 7vw, 8rem)" }}
        >
          数码明室
        </h1>

        <p
          className="anim-y-60 d-3 type-label text-[#8C8C8C] mt-4 max-w-md"
          style={{ fontSize: "clamp(0.6rem, 0.8vw, 0.75rem)" }}
        >
          像素 · 屏幕 · 即时显影 · 无限可能
        </p>

        {/* 底部装饰红线 */}
        <div
          className="anim-line-x d-4 absolute left-0 h-[3px] bg-[#D10000]"
          style={{ bottom: "0%", width: "100%" }}
        />
      </div>

      {/* ====== 在场 ====== */}
      <section className="relative px-6 py-14 md:px-12 md:py-20">
        <SectionHeader title="在场" cyrillic="COMMISSIONED" />

        <div
          className="grid gap-3 sm:gap-4 md:gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(120px, 38vw, 280px), 1fr))",
            gridAutoRows: "clamp(90px, 28vw, 200px)",
          }}
        >
          {COMMISSIONED_PHOTOS.map((p, i) => (
            <div
              key={i}
              className="anim-scale relative"
              style={{
                transitionDelay: `${0.25 + i * 0.06}s`,
                gridRow: p.span ? `span ${p.span}` : "span 1",
              }}
            >
              <PhotographyPlaceholder
                variant="commissioned"
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
        <div className="anim-line-x d-3 h-[2px] bg-[var(--fg)]/10 w-full" />
      </div>

      {/* ====== 风光 ====== */}
      <section className="relative px-6 py-14 md:px-12 md:py-20">
        <SectionHeader title="风光" cyrillic="LANDSCAPE" />

        <div
          className="grid gap-3 sm:gap-4 md:gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(120px, 38vw, 280px), 1fr))",
            gridAutoRows: "clamp(90px, 28vw, 200px)",
          }}
        >
          {LANDSCAPE_PHOTOS.map((p, i) => (
            <div
              key={i}
              className="anim-scale relative"
              style={{
                transitionDelay: `${0.25 + i * 0.06}s`,
                gridRow: p.span ? `span ${p.span}` : "span 1",
              }}
            >
              <PhotographyPlaceholder
                src={p.src}
                variant="landscape"
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
        <div className="anim-line-x d-3 h-[2px] bg-[var(--fg)]/10 w-full" />
      </div>

      {/* ====== 街头 ====== */}
      <section className="relative px-6 py-14 md:px-12 md:py-20 pb-24">
        <SectionHeader title="街头" cyrillic="STREET" markerColor="var(--fg)" />

        <div
          className="grid gap-3 sm:gap-4 md:gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(120px, 38vw, 280px), 1fr))",
            gridAutoRows: "clamp(90px, 28vw, 200px)",
          }}
        >
          {STREET_PHOTOS.map((p, i) => (
            <div
              key={i}
              className="anim-scale relative"
              style={{
                transitionDelay: `${0.25 + i * 0.06}s`,
                gridRow: p.span ? `span ${p.span}` : "span 1",
              }}
            >
              <PhotographyPlaceholder
                src={p.src}
                variant="street"
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

        {/* 右下角几何装饰 */}
        <div className="absolute right-[6%] bottom-[8%] flex gap-2">
          <div
            className="anim-scale d-4 geo-circle border-[2px] border-[var(--fg)]/20"
            style={{ width: "12px", height: "12px" }}
          />
          <div
            className="anim-scale d-5 geo-circle bg-[#D10000]"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
{/* 返回 */}
        <div className="anim-y-60 d-4 mt-12 text-center">
          <p
            className="type-label text-[#B0B0B0]/60 mb-3"
            style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
          >
            需要高清原图请联系作者喵
          </p>
          <Link
            href="/photography/film"
            className="type-label text-[var(--paper-cream)] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-6 py-3 bg-[var(--fg)] transition-colors duration-200"
            style={{ fontSize: "clamp(0.85rem, 1vw, 0.95rem)" }}
          >
            ← 返回胶片
          </Link>
        </div>
      </section>
      <ScrollArrow />
    </main>
  );
}
