"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

export function PosterVideo() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <section
      ref={ref}
      className="poster flex items-center bg-paper text-[var(--fg)]"
      aria-label="影像档案"
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
        <span className="mx-2 text-[var(--fg)]">03</span>
      </div>

      {/* ====== 装饰层 z-0 ====== */}

      {/* Lissitzky 悬浮几何 — 左上角小方块 + 红圆点 */}
      <div
        className="anim-y-60 d-2 absolute bg-[var(--fg)] z-0"
        style={{ left: "12%", top: "36%", width: "clamp(16px, 2cqw, 24px)", height: "clamp(16px, 2cqw, 24px)" }}
      />
      <div
        className="anim-scale d-3 geo-circle absolute bg-[#D10000] z-0"
        style={{ left: "14%", top: "44%", width: "clamp(8px, 1cqw, 14px)", height: "clamp(8px, 1cqw, 14px)" }}
      />

      {/* 右侧细竖线 */}
      <div
        className="anim-line-x d-2 absolute right-[14%] h-[30%] w-[3px] bg-[var(--fg)]/30 z-0"
        style={{ top: "22%" }}
      />

      {/* 顶部右侧 — 红色小方块 */}
      <div
        className="anim-scale d-1 absolute bg-[#D10000] z-0"
        style={{ right: "8%", top: "14%", width: "clamp(10px, 1.5cqw, 18px)", height: "clamp(10px, 1.5cqw, 18px)" }}
      />

      {/* === 右半边腰部填充 === */}

      {/* 右侧中腰 — 红色斜线，从右上往左下方 */}
      <div
        className="anim-line-x d-2 absolute h-[3px] bg-[#D10000]/70 origin-right z-0"
        style={{
          right: "0%",
          top: "38%",
          width: "32%",
          transform: "rotate(-15deg)",
        }}
      />

      {/* 右侧中下 — 空心黑方框 Lissitzky 式 */}
      <div
        className="anim-scale d-3 absolute border-[3px] border-[var(--fg)] z-0"
        style={{
          right: "20%",
          top: "48%",
          width: "clamp(24px, 3.5cqw, 44px)",
          height: "clamp(24px, 3.5cqw, 44px)",
        }}
      />

      {/* 右侧偏下 — 红色小圆 */}
      <div
        className="anim-scale d-4 geo-circle absolute bg-[#D10000] z-0"
        style={{
          right: "30%",
          bottom: "28%",
          width: "clamp(8px, 1.2cqw, 14px)",
          height: "clamp(8px, 1.2cqw, 14px)",
        }}
      />

      {/* 右下角装饰斜线组 */}
      <div
        className="anim-scale d-4 diagonal-stripes absolute select-none z-0"
        style={{ right: "10%", bottom: "16%" }}
      >
        <span /><span /><span />
      </div>

      {/* ====== 色块/几何层 z-[1] ====== */}

      {/* 黑色大圆 — 画面中央 */}
      <div
        className="anim-scale d-2 geo-circle absolute flex items-center justify-center bg-[var(--fg)] select-none z-[1]"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(180px, 30cqw, 360px)",
          height: "clamp(180px, 30cqw, 360px)",
        }}
      >
        <span
          className="type-display text-[#D10000]"
          style={{
            fontSize: "clamp(1.8rem, 3.5cqw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "0.15em",
          }}
        >
          КИНО
        </span>
      </div>

      {/* ====== 文字层 z-10+ ====== */}

      {/* 主标题 */}
      <h2
        className="anim-y-60 type-display absolute text-[var(--fg)] select-none z-10"
        style={{
          left: "9%",
          top: "51%",
          fontSize: "clamp(2.5rem, 4.5cqw, 4.5rem)",
          transform: "skewX(-5deg)",
        }}
      >
        影像档案
      </h2>

      {/* 俄文标注 */}
      <span
        className="anim-y-60 d-1 type-cyrillic absolute text-[#B0B0B0] select-none z-10"
        style={{
          left: "10%",
          top: "26%",
          fontSize: "clamp(0.7rem, 1cqw, 0.9rem)",
        }}
      >
        КИНОАРХИВ
      </span>

      {/* 两个视频入口 */}
      <div
        className="anim-y-60 d-3 absolute flex flex-col gap-6 select-none z-20"
        style={{ left: "17%", bottom: "22%" }}
      >
        <Link href="/video/work" className="group flex items-center no-underline">
          <span className="geo-marker" />
          <span className="type-display hover-red" style={{ fontSize: "clamp(1.8rem, 3.5cqw, 3rem)" }}>
            受托
          </span>
        </Link>
        <Link href="/video/personal" className="group flex items-center no-underline" style={{ marginLeft: "3em" }}>
          <span className="geo-marker" />
          <span className="type-display hover-red" style={{ fontSize: "clamp(1.8rem, 3.5cqw, 3rem)" }}>
            闲影
          </span>
        </Link>
      </div>

      {/* 说明文字 */}
      <p
        className="anim-y-60 d-4 absolute type-label text-[#8C8C8C] select-none z-10"
        style={{
          left: "12%",
          bottom: "11%",
          fontSize: "clamp(0.6rem, 0.8cqw, 0.75rem)",
          maxWidth: "420px",
        }}
      >
        活动记录 · 年度回顾 · 毕业纪念 · Vlog · 实验短片
      </p>

      <div className="scroll-arrow z-30" />
    </section>
  );
}
