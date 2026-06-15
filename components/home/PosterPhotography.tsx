"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { Lightbox } from "@/components/Lightbox";

export function PosterPhotography() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);
  const [lightbox, setLightbox] = useState<{ src: string; rect: DOMRect } | null>(null);

  return (
    <section
      ref={ref}
      className="poster flex items-center bg-paper text-[var(--fg)]"
      aria-label="摄影档案"
    >
      {/* ====== 桌面端 (>1034px) — 绝对定位海报布局 ====== */}
      <div className="hidden lg:contents">
        {/* 档案编号 — 模块标签样式 */}
        <div
          className="anim-y-60 absolute z-20 font-mono text-xs tracking-widest uppercase"
          style={{
            left: "clamp(1.5rem, 6cqw, 8%)",
            top: "19%",
          }}
        >
          <span style={{
            display: "inline-block",
            width: "clamp(14px, 1.8cqw, 22px)",
            height: "3px",
            background: "#D10000",
            verticalAlign: "middle",
            marginRight: "0.5em",
          }} />
          <span style={{ color: "var(--fg)", opacity: 0.55 }}>№</span>
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>03</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ C</span>
        </div>

        {/* 黑色对角线 */}
        <div
          className="anim-line-x d-1 absolute h-[4px] bg-[var(--fg)] origin-left z-0"
          style={{ left: "0%", top: "42%", width: "68%", transform: "rotate(14deg)" }}
        />
        {/* 细红线 */}
        <div
          className="anim-line-x d-2 absolute h-[3px] bg-[#D10000]/60 origin-right z-0"
          style={{ right: "0%", top: "48%", width: "45%", transform: "rotate(-10deg)" }}
        />
        {/* 红色粗竖线 */}
        <div
          className="anim-line-x d-3 absolute w-[4px] bg-[#D10000] z-0"
          style={{ right: "22%", top: "30%", height: "28%" }}
        />
        {/* 黑色横条 */}
        <div
          className="anim-scale d-4 absolute bg-[var(--fg)] z-0"
          style={{ right: "10%", top: "58%", width: "clamp(30px, 4cqw, 60px)", height: "4px" }}
        />
        {/* 红色小圆点 */}
        <div
          className="anim-scale d-2 geo-circle absolute bg-[#D10000] z-0"
          style={{ right: "40%", top: "5%", width: "clamp(10px, 1.5cqw, 18px)", height: "clamp(10px, 1.5cqw, 18px)" }}
        />
        {/* 小黑方块 */}
        <div
          className="anim-scale d-5 absolute bg-[var(--fg)] z-0"
          style={{ left: "4%", bottom: "8%", width: "14px", height: "14px" }}
        />

        {/* 半透明红块 */}
        <div
          className="anim-scale d-3 absolute bg-[#D10000]/30 pointer-events-none z-[1]"
          style={{ left: "38%", top: "36%", width: "clamp(60px, 8cqw, 120px)", height: "clamp(60px, 8cqw, 120px)" }}
        />
        <div
          className="anim-scale d-3 absolute bg-[#D10000]/20 pointer-events-none z-[1]"
          style={{ right: "26%", top: "44%", width: "clamp(50px, 7cqw, 100px)", height: "clamp(50px, 7cqw, 100px)" }}
        />

        {/* 照片 1 */}
        <div
className="anim-scale d-3 photo-montage clip-angle-tl absolute bg-[var(--bg-muted)] cursor-pointer z-[5]"
          style={{
            left: "16%", top: "7%",
            width: "clamp(160px, 26cqw, 340px)", height: "clamp(120px, 20cqw, 260px)",
          }}
          onClick={(e) => {
            const el = e.currentTarget;
            setLightbox({ src: "/photos/cover/1.webp", rect: el.getBoundingClientRect() });
          }}
        >
          <div className="relative w-full h-full rotate-[-6deg] hover:rotate-0 transition-transform duration-300" style={{ transitionTimingFunction: "cubic-bezier(0.2,0,0,1)" }}>
            <Image src="/photos/cover/1.webp" alt="" fill sizes="340px" className="object-cover"
              style={{ filter: "grayscale(0.65) contrast(1.1) brightness(0.85)" }} loading="lazy" />
          </div>
          <div className="duotone-overlay" />
        </div>

        {/* 照片 2 */}
        <div
className="anim-scale d-4 photo-montage clip-angle-br absolute bg-[var(--bg-muted)] cursor-pointer z-[5]"
          style={{
            right: "-10%", top: "9%",
            width: "clamp(140px, 22cqw, 280px)", height: "clamp(160px, 24cqw, 310px)",
          }}
          onClick={(e) => {
            const el = e.currentTarget;
            setLightbox({ src: "/photos/cover/2.webp", rect: el.getBoundingClientRect() });
          }}
        >
          <div className="relative w-full h-full rotate-[4deg] hover:rotate-0 transition-transform duration-300" style={{ transitionTimingFunction: "cubic-bezier(0.2,0,0,1)" }}>
            <Image src="/photos/cover/2.webp" alt="" fill sizes="280px" className="object-cover"
              style={{ filter: "grayscale(0.65) contrast(1.1) brightness(0.85)" }} loading="lazy" />
          </div>
          <div className="duotone-overlay" />
        </div>

        {/* 照片 3 */}
        <div
className="anim-scale d-5 photo-montage clip-angle-tr absolute bg-[var(--bg-muted)] cursor-pointer z-[5]"
          style={{
            right: "0%", bottom: "10%",
            width: "clamp(150px, 24cqw, 310px)", height: "clamp(110px, 16cqw, 210px)",
          }}
          onClick={(e) => {
            const el = e.currentTarget;
            setLightbox({ src: "/photos/cover/3.webp", rect: el.getBoundingClientRect() });
          }}
        >
          <div className="relative w-full h-full rotate-[-3deg] hover:rotate-0 transition-transform duration-300" style={{ transitionTimingFunction: "cubic-bezier(0.2,0,0,1)" }}>
            <Image src="/photos/cover/3.webp" alt="" fill sizes="310px" className="object-cover"
              style={{ filter: "grayscale(0.65) contrast(1.1) brightness(0.85)" }} loading="lazy" />
          </div>
          <div className="absolute left-0 top-[55%] h-[4px] w-full bg-[#D10000]" />
          <div className="duotone-overlay" />
        </div>

        {/* 俄文标注 */}
        <span
          className="anim-y-60 d-1 type-cyrillic absolute text-[var(--fg)] select-none z-10"
          style={{ left: "15%", top: "20%", fontSize: "clamp(1.5rem, 3cqw, 2.5rem)", transform: "skewX(-12deg)" }}
        >
          ФОТО
        </span>

        {/* 主标题 */}
        <h2
          className="anim-y-60 d-2 type-display absolute text-[#D10000] select-none z-10"
          style={{ left: "5%", top: "26%", fontSize: "clamp(3.5rem, 7cqw, 8rem)", letterSpacing: "0.14em", lineHeight: "1.25" }}
        >
          <span>摄影</span><br />
          <span>档案</span>
        </h2>

        {/* 分类入口 */}
        <div
          className="anim-y-60 d-4 absolute flex items-end gap-8 select-none z-20"
          style={{ left: "8%", bottom: "12%" }}
        >
          <Link href="/photography/film" className="group flex flex-col gap-2 no-underline">
            <span className="type-display hover-red" style={{ fontSize: "clamp(2rem, 4cqw, 3.5rem)" }}>胶片</span>
            <span className="type-label text-[#8C8C8C]" style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.75rem)" }}>彩色 · B&amp;W</span>
          </Link>
          <div className="bg-[#D10000]" style={{ width: "4px", height: "clamp(36px, 6cqw, 56px)" }} />
          <Link href="/photography/digital" className="group flex flex-col gap-2 no-underline">
            <span className="type-display hover-red" style={{ fontSize: "clamp(2rem, 4cqw, 3.5rem)" }}>数码</span>
            <span className="type-label text-[#8C8C8C]" style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.75rem)" }}>在场 · 风光 · 街头</span>
          </Link>
        </div>

        <div className="scroll-arrow z-30" />
      </div>

      {/* ====== 移动端+平板 (<1034px) — flex-col 纵向布局 ====== */}
      <div className="lg:hidden relative z-10 flex w-full flex-col px-4 pt-16 sm:px-8 sm:pt-20">
        {/* 档案编号 — 模块标签样式 */}
        <div
          className="anim-y-60 font-mono text-xs tracking-widest uppercase mb-2"
        >
          <span style={{
            display: "inline-block",
            width: "clamp(14px, 3cqw, 22px)",
            height: "3px",
            background: "#D10000",
            verticalAlign: "middle",
            marginRight: "0.5em",
          }} />
          <span style={{ color: "var(--fg)", opacity: 0.55 }}>№</span>
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>03</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ C</span>
        </div>

        {/* 俄文 + 主标题 */}
        <span
          className="anim-y-60 d-1 type-cyrillic text-[var(--fg)] select-none"
          style={{ fontSize: "clamp(1.2rem, 5vw, 1.8rem)", transform: "skewX(-10deg)" }}
        >
          ФОТО
        </span>
        <h2
          className="anim-y-60 d-2 type-display text-[#D10000] select-none mb-6"
          style={{ fontSize: "clamp(2.8rem, 12vw, 5rem)", letterSpacing: "0.1em", lineHeight: "1.1" }}
        >
          摄影档案
        </h2>

        {/* 移动端：2张照片并排 */}
        <div className="flex gap-2 sm:gap-3 mb-6" style={{ height: "clamp(160px, 42vw, 280px)" }}>
          <div
    className="anim-scale d-2 photo-montage clip-angle-tl bg-[var(--bg-muted)] cursor-pointer flex-1"
            style={{ transform: "rotate(-3deg)", minWidth: 0 }}
            onClick={(e) => {
            const el = e.currentTarget;
            setLightbox({ src: "/photos/cover/1.webp", rect: el.getBoundingClientRect() });
          }}
          >
            <Image src="/photos/cover/1.webp" alt="" fill sizes="(max-width: 767px) 50vw, 300px" className="object-cover"
              style={{ filter: "grayscale(0.65) contrast(1.1) brightness(0.85)" }} loading="lazy" />
            <div className="duotone-overlay" />
          </div>
          <div
    className="anim-scale d-3 photo-montage clip-angle-tr bg-[var(--bg-muted)] cursor-pointer flex-1"
            style={{ transform: "rotate(2deg)", minWidth: 0 }}
            onClick={(e) => {
            const el = e.currentTarget;
            setLightbox({ src: "/photos/cover/2.webp", rect: el.getBoundingClientRect() });
          }}
          >
            <Image src="/photos/cover/2.webp" alt="" fill sizes="(max-width: 767px) 50vw, 300px" className="object-cover"
              style={{ filter: "grayscale(0.65) contrast(1.1) brightness(0.85)" }} loading="lazy" />
            <div className="duotone-overlay" />
          </div>
        </div>

        {/* 第三张照片 — 单独一行，宽幅 */}
        <div
className="anim-scale d-4 photo-montage clip-angle-br bg-[var(--bg-muted)] cursor-pointer mb-6"
          style={{
            height: "clamp(140px, 36vw, 240px)",
            width: "80%",
            transform: "rotate(-2deg)",
            alignSelf: "flex-end",
          }}
          onClick={(e) => {
            const el = e.currentTarget;
            setLightbox({ src: "/photos/cover/3.webp", rect: el.getBoundingClientRect() });
          }}
        >
          <Image src="/photos/cover/3.webp" alt="" fill sizes="(max-width: 767px) 80vw, 310px" className="object-cover"
            style={{ filter: "grayscale(0.65) contrast(1.1) brightness(0.85)" }} loading="lazy" />
          <div className="absolute left-0 top-[55%] h-[3px] w-full bg-[#D10000]" />
          <div className="duotone-overlay" />
        </div>

        {/* 分类入口 — 按钮式 */}
        <div className="anim-y-60 d-4 flex flex-col gap-3 select-none pb-4">
          <Link
            href="/photography/film"
            className="group flex items-center gap-3 border-4 border-[var(--fg)] bg-[var(--fg)] px-5 py-3.5 no-underline shadow-[3px_3px_0_0_#D10000] transition-all duration-200 hover:border-[#D10000] hover:bg-[#D10000] hover:shadow-[5px_5px_0_0_var(--fg)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <span
              className="type-display text-[var(--paper-cream)] group-hover:text-[var(--paper-cream)]"
              style={{ fontSize: "clamp(1.3rem, 5vw, 1.8rem)" }}
            >
              胶片
            </span>
            <span
              className="type-label text-[var(--paper-cream)]/50 group-hover:text-[var(--paper-cream)]/70"
              style={{ fontSize: "clamp(0.65rem, 2.5vw, 0.75rem)" }}
            >
              彩色 · B&amp;W
            </span>
          </Link>
          <Link
            href="/photography/digital"
            className="group flex items-center gap-3 border-4 border-[var(--fg)] bg-[var(--fg)] px-5 py-3.5 no-underline shadow-[3px_3px_0_0_#D10000] transition-all duration-200 hover:border-[#D10000] hover:bg-[#D10000] hover:shadow-[5px_5px_0_0_var(--fg)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <span
              className="type-display text-[var(--paper-cream)] group-hover:text-[var(--paper-cream)]"
              style={{ fontSize: "clamp(1.3rem, 5vw, 1.8rem)" }}
            >
              数码
            </span>
            <span
              className="type-label text-[var(--paper-cream)]/50 group-hover:text-[var(--paper-cream)]/70"
              style={{ fontSize: "clamp(0.65rem, 2.5vw, 0.75rem)" }}
            >
              在场 · 风光 · 街头
            </span>
          </Link>
        </div>
      </div>

      {/* 灯箱 */}
      {lightbox && (
        <Lightbox src={lightbox.src} originRect={lightbox.rect} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
