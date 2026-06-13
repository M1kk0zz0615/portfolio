"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { Lightbox } from "@/components/Lightbox";

export function PosterPhotography() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);
  const [lightbox, setLightbox] = useState<{ src: string; rect: DOMRect } | null>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((src: string, el: HTMLDivElement | null) => {
    if (el) setLightbox({ src, rect: el.getBoundingClientRect() });
  }, []);

  return (
    <section
      ref={ref}
      className="poster flex items-center bg-paper text-[var(--fg)]"
      aria-label="摄影档案"
    >
      {/* 档案编号 */}
      <div
        className="anim-y-60 absolute z-20 font-mono text-xs tracking-widest text-[#B0B0B0] uppercase"
        style={{
          left: "clamp(1.5rem, 6cqw, 8%)",
          top: "19%",
        }}
      >
        <span className="text-[#D10000]">档案</span>
        <span className="mx-2 text-[var(--fg)]">02</span>
      </div>

      {/* ====== 装饰层 z-0 ====== */}

      {/* 黑色对角线 — 从左上延伸到右腰 */}
      <div
        className="anim-line-x d-1 absolute h-[4px] bg-[var(--fg)] origin-left z-0"
        style={{
          left: "0%",
          top: "42%",
          width: "68%",
          transform: "rotate(14deg)",
        }}
      />

      {/* 第二条细红线 — 从右上方往左下 */}
      <div
        className="anim-line-x d-2 absolute h-[3px] bg-[#D10000]/60 origin-right z-0"
        style={{
          right: "0%",
          top: "48%",
          width: "45%",
          transform: "rotate(-10deg)",
        }}
      />

      {/* 右侧腰部 — 红色粗竖线 */}
      <div
        className="anim-line-x d-3 absolute w-[4px] bg-[#D10000] z-0"
        style={{ right: "22%", top: "30%", height: "28%" }}
      />

      {/* 右腰偏下 — 黑色横条 */}
      <div
        className="anim-scale d-4 absolute bg-[var(--fg)] z-0"
        style={{
          right: "10%",
          top: "58%",
          width: "clamp(30px, 4cqw, 60px)",
          height: "4px",
        }}
      />

      {/* 右侧顶部 — 红色小圆点 */}
      <div
        className="anim-scale d-2 geo-circle absolute bg-[#D10000] z-0"
        style={{
          right: "40%",
          top: "5%",
          width: "clamp(10px, 1.5cqw, 18px)",
          height: "clamp(10px, 1.5cqw, 18px)",
        }}
      />

      {/* 左下小黑方块 */}
      <div
        className="anim-scale d-5 absolute bg-[var(--fg)] z-0"
        style={{ left: "4%", bottom: "8%", width: "14px", height: "14px" }}
      />

      {/* ====== 色块/几何层 z-[1] ====== */}

      {/* 半透明红块 — 悬浮在标题上方区域，不遮挡文字 */}
      <div
        className="anim-scale d-3 absolute bg-[#D10000]/30 pointer-events-none z-[1]"
        style={{
          left: "38%",
          top: "36%",
          width: "clamp(60px, 8cqw, 120px)",
          height: "clamp(60px, 8cqw, 120px)",
        }}
      />

      {/* 右侧腰部 — 半透明红方块，填充照片 2 和 3 之间的空白 */}
      <div
        className="anim-scale d-3 absolute bg-[#D10000]/20 pointer-events-none z-[1]"
        style={{
          right: "26%",
          top: "44%",
          width: "clamp(50px, 7cqw, 100px)",
          height: "clamp(50px, 7cqw, 100px)",
        }}
      />

      {/* ====== 照片层 z-[5] ====== */}

      {/* 照片 1 — 左上 */}
      <div
        ref={photo1Ref}
        className="anim-scale d-3 photo-montage clip-angle-tl absolute bg-[var(--bg-muted)] cursor-pointer z-[5]"
        style={{
          left: "16%",
          top: "7%",
          width: "clamp(160px, 26cqw, 340px)",
          height: "clamp(120px, 20cqw, 260px)",
          transform: "rotate(-6deg)",
          transition: "transform 0.3s cubic-bezier(0.2,0,0,1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(-6deg)")}
        onClick={() => openLightbox("/photos/cover/1.jpg", photo1Ref.current)}
      >
        <img
          src="/photos/cover/1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(0.65) contrast(1.1) brightness(0.85)" }}
        />
        <div className="duotone-overlay" />
      </div>

      {/* 照片 2 — 右上 */}
      <div
        ref={photo2Ref}
        className="anim-scale d-4 photo-montage clip-angle-br absolute bg-[var(--bg-muted)] cursor-pointer z-[5]"
        style={{
          right: "-10%",
          top: "9%",
          width: "clamp(140px, 22cqw, 280px)",
          height: "clamp(160px, 24cqw, 310px)",
          transform: "rotate(4deg)",
          transition: "transform 0.3s cubic-bezier(0.2,0,0,1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(4deg)")}
        onClick={() => openLightbox("/photos/cover/2.jpg", photo2Ref.current)}
      >
        <img
          src="/photos/cover/2.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(0.65) contrast(1.1) brightness(0.85)" }}
        />
        <div className="duotone-overlay" />
      </div>

      {/* 照片 3 — 右下，被红线穿过 */}
      <div
        ref={photo3Ref}
        className="anim-scale d-5 photo-montage clip-angle-tr absolute bg-[var(--bg-muted)] cursor-pointer z-[5]"
        style={{
          right: "0%",
          bottom: "10%",
          width: "clamp(150px, 24cqw, 310px)",
          height: "clamp(110px, 16cqw, 210px)",
          transform: "rotate(-3deg)",
          transition: "transform 0.3s cubic-bezier(0.2,0,0,1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(-3deg)")}
        onClick={() => openLightbox("/photos/cover/3.jpg", photo3Ref.current)}
      >
        <img
          src="/photos/cover/3.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(0.65) contrast(1.1) brightness(0.85)" }}
        />
        <div className="absolute left-0 top-[55%] h-[4px] w-full bg-[#D10000]" />
        <div className="duotone-overlay" />
      </div>

      {/* ====== 文字层 z-10+ ====== */}

      {/* 俄文标注 */}
      <span
        className="anim-y-60 d-1 type-cyrillic absolute text-[var(--fg)] select-none z-10"
        style={{
          left: "15%",
          top: "20%",
          fontSize: "clamp(1.5rem, 3cqw, 2.5rem)",
          transform: "skewX(-12deg)",
        }}
      >
        ФОТО
      </span>

      {/* 主标题 — z-10 确保在色块上方 */}
      <h2
        className="anim-y-60 d-2 type-display absolute text-[#D10000] select-none z-10"
        style={{
          left: "5%",
          top: "26%",
          fontSize: "clamp(3.5rem, 7cqw, 8rem)",
          letterSpacing: "0.14em",
          lineHeight: "1.25",
        }}
      >
        <span>摄影</span><br />
        <span>档案</span>
      </h2>

      {/* 分类入口 — 左下角 */}
      <div
        className="anim-y-60 d-4 absolute flex items-end gap-8 select-none z-20"
        style={{ left: "8%", bottom: "12%" }}
      >
        <Link href="/photography/film" className="group flex flex-col gap-2 no-underline">
          <span className="type-display hover-red" style={{ fontSize: "clamp(2rem, 4cqw, 3.5rem)" }}>
            胶片
          </span>
          <span className="type-label text-[#8C8C8C]" style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.75rem)" }}>
            彩色 · B&amp;W
          </span>
        </Link>

        <div className="bg-[#D10000]" style={{ width: "4px", height: "clamp(36px, 6cqw, 56px)" }} />

        <Link href="/photography/digital" className="group flex flex-col gap-2 no-underline">
          <span className="type-display hover-red" style={{ fontSize: "clamp(2rem, 4cqw, 3.5rem)" }}>
            数码
          </span>
          <span className="type-label text-[#8C8C8C]" style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.75rem)" }}>
            在场 · 风光 · 街头
          </span>
        </Link>
      </div>

      <div className="scroll-arrow z-30" />

      {/* 灯箱 */}
      {lightbox && (
        <Lightbox src={lightbox.src} originRect={lightbox.rect} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
