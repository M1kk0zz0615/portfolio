"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { AboutArchiveButton } from "./AboutArchiveButton";
import { AboutPosterTitle } from "./AboutPosterTitle";

export function PosterAbout() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <section
      ref={ref}
      className="poster bg-paper text-[var(--fg)]"
      aria-label="关于我的一切"
    >
      {/* 顶部装饰线 */}
      <div
        className="anim-line-x absolute left-[6%] h-[4px] bg-[var(--fg)] z-0"
        style={{ top: "10%", width: "28%" }}
      />
      <div
        className="anim-line-x d-1 absolute h-[4px] bg-[#D10000] z-0"
        style={{ right: "6%", top: "10%", width: "28%" }}
      />

      {/* 底部红线 */}
      <div
        className="anim-line-x d-2 absolute left-0 h-[4px] bg-[#D10000] z-0"
        style={{ bottom: "12%", width: "100%" }}
      />

      {/* 档案编号 — 独立定位 */}
      <div
        className="anim-y-60 absolute z-20 font-mono text-xs tracking-widest text-[#B0B0B0] uppercase"
        style={{
          left: "clamp(1.5rem, 6cqw, 8%)",
          top: "19%",
        }}
      >
        <span className="text-[#D10000]">档案</span>
        <span className="mx-2 text-[var(--fg)]">01</span>
      </div>

      {/* 主内容区 — 左右平衡 */}
      <div
        className="relative z-10 mx-auto grid h-full w-full max-w-6xl items-start gap-6 pl-4 pr-4 pt-16 sm:pl-8 sm:pr-6 sm:pt-20 md:pl-20 md:pr-10 lg:grid-cols-2 lg:gap-8 lg:pt-74"
      >
        {/* 左侧：标题 + 按钮 — z-10 确保在 Logo 色块之上 */}
        <div
          className="relative z-10 order-1 lg:order-none"
          style={{
            minHeight: "clamp(280px, 38vh, 400px)",
          }}
        >
          <AboutPosterTitle />

          <p
            className="anim-y-60 d-1 mt-8 max-w-sm font-mono text-sm tracking-wide text-[var(--gray-dark)]"
          >
            计算机学生 / 摄影师 / 影像创作者
          </p>

          <p
            className="anim-y-60 d-2 mt-4 max-w-md text-base leading-relaxed text-[var(--gray-dark)]/80 md:text-lg"
          >
            用胶片与像素，记录在场与想象
          </p>

          {/* 标题区右下角 — 翻阅档案按钮 */}
          <div className="anim-y-60 d-3 mt-6 flex justify-end lg:absolute lg:bottom-12 lg:right-0">
            <AboutArchiveButton />
          </div>
        </div>

        {/* 右侧：Logo + 底色块 + 黑斜线（打包为一个整体） */}
        <div
          className="order-2 flex items-center justify-center lg:order-none lg:absolute lg:right-[6%] lg:top-[16%] lg:h-[50%] lg:w-[35%]"
        >
          <div className="relative" style={{ width: "clamp(120px, 40vw, 260px)", maxWidth: "260px" }}>
            {/* 红褐色大不规则体块 — 底层 */}
            <div
              className="anim-scale d-1 absolute bg-[#8B4A3A]"
              style={{
                left: "-22%",
                top: "-6%",
                right: "0%",
                bottom: "2%",
                clipPath: "polygon(5% 0, 100% 4%, 96% 100%, 0% 97%, 2% 45%)",
              }}
            />
            {/* 红色半透明类平行四边形 — 中层，右下偏移 */}
            <div
              className="anim-scale d-2 absolute bg-[#D10000]"
              style={{
                left: "35%",
                top: "30%",
                right: "-28%",
                bottom: "-22%",
                clipPath: "polygon(10% 0, 100% 5%, 93% 100%, 0% 95%)",
                opacity: 0.7,
              }}
            >
              <div className="anim-scale d-3 absolute bg-[#8B0000]" style={{ left: "14%", bottom: "16%", width: "22%", height: "18%" }} />
            </div>
            {/* Logo */}
            <img
              src="/mikkologo/logo.png"
              alt="Mikko"
              className="anim-scale d-4 relative z-10 w-full h-auto"
            />
            {/* 粗黑斜线 — 穿越色块区，从右往左绘制，基于内层固定容器定位 */}
            <div
              className="absolute z-[15]"
              style={{
                right: "-50%",
                bottom: "-12%",
                width: "105%",
                transform: "rotate(-25deg)",
              }}
            >
              <div
                className="anim-line-x d-3 h-[5px] bg-[var(--fg)] w-full"
                style={{ transformOrigin: "right center" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 俄文标注 */}
      <span
        className="anim-y-60 d-2 type-cyrillic absolute z-10 text-[#B0B0B0] select-none"
        style={{
          right: "8%",
          bottom: "18%",
          fontSize: "clamp(0.7rem, 1cqw, 0.85rem)",
        }}
      >
        ВСЁ ОБО МНЕ
      </span>

      <div className="scroll-arrow z-30" />
    </section>
  );
}
