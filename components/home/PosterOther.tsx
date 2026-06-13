"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { Lightbox } from "@/components/Lightbox";

export function PosterOther() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);
  const wechatRef = useRef<HTMLAnchorElement>(null);
  const [wechatLightbox, setWechatLightbox] = useState<{ src: string; rect: DOMRect } | null>(null);

  const openWechat = useCallback(() => {
    if (wechatRef.current) {
      const linkRect = wechatRef.current.getBoundingClientRect();
      // 用链接中心点构造虚拟方形区域，避免小文字 rect 导致图片渲染模糊
      const cx = linkRect.left + linkRect.width / 2;
      const cy = linkRect.top + linkRect.height / 2;
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.2;
      const virtualRect: DOMRect = {
        left: cx - size / 2,
        top: cy - size / 2,
        width: size,
        height: size * (1338 / 912), // 保持原图宽高比
        right: cx + size / 2,
        bottom: cy + size * (1338 / 912) / 2,
        x: cx - size / 2,
        y: cy - size / 2,
        toJSON: () => ({}),
      };
      setWechatLightbox({
        src: "/photos/wechat/mmqrcode1781334663008.png",
        rect: virtualRect,
      });
    }
  }, []);

  return (
    <section
      ref={ref}
      className="poster flex items-center bg-paper text-[var(--fg)]"
      aria-label="其他"
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
        <span className="mx-2 text-[var(--fg)]">04</span>
      </div>

      {/* ====== 装饰层 z-0 ====== */}

      {/* 左上角空心正方形 */}
      <div
        className="anim-scale d-1 absolute border-[4px] border-[var(--fg)] z-0"
        style={{
          left: "12%",
          top: "18%",
          width: "clamp(40px, 6cqw, 70px)",
          height: "clamp(40px, 6cqw, 70px)",
        }}
      />

      {/* 中央上方 — 实心红色小圆 */}
      <div
        className="anim-scale d-2 geo-circle absolute bg-[#D10000] z-0"
        style={{
          left: "28%",
          top: "22%",
          width: "clamp(14px, 2cqw, 22px)",
          height: "clamp(14px, 2cqw, 22px)",
        }}
      />

      {/* 右侧 — 空心黑圆 */}
      <div
        className="anim-scale d-3 geo-circle absolute border-[3px] border-[var(--fg)] z-0"
        style={{
          right: "16%",
          top: "20%",
          width: "clamp(30px, 4cqw, 50px)",
          height: "clamp(30px, 4cqw, 50px)",
        }}
      />

      {/* 中间右侧 — 细水平线 */}
      <div
        className="anim-line-x d-3 absolute right-0 h-[2px] bg-[var(--fg)]/15 z-0"
        style={{ top: "42%", width: "18%" }}
      />

      {/* === 右半边腰部填充 === */}

      {/* 右侧中腰 — 红色粗短横线 */}
      <div
        className="anim-line-x d-2 absolute right-[12%] h-[4px] bg-[#D10000] z-0"
        style={{ top: "46%", width: "clamp(40px, 6cqw, 80px)" }}
      />

      {/* 右侧中下 — 黑色小方块 */}
      <div
        className="anim-scale d-4 absolute bg-[var(--fg)] z-0"
        style={{
          right: "18%",
          top: "55%",
          width: "clamp(10px, 1.5cqw, 18px)",
          height: "clamp(10px, 1.5cqw, 18px)",
        }}
      />

      {/* 右下角偏上 — 红色圆点 */}
      <div
        className="anim-scale d-5 geo-circle absolute bg-[#D10000] z-0"
        style={{
          right: "10%",
          bottom: "24%",
          width: "clamp(8px, 1.2cqw, 14px)",
          height: "clamp(8px, 1.2cqw, 14px)",
        }}
      />

      {/* 右侧中上 — 竖向细线 */}
      <div
        className="anim-line-x d-1 absolute w-[2px] bg-[var(--fg)]/20 z-0"
        style={{
          right: "26%",
          top: "26%",
          height: "16%",
        }}
      />

      {/* ====== 文字/链接层 z-10+ ====== */}

      {/* 两个链接 — 居中 */}
      <div
        className="anim-y-60 d-2 absolute flex flex-col gap-8 select-none z-10"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        <Link href="/index" className="group flex items-center no-underline">
          <span className="geo-marker" />
          <span className="type-display hover-red" style={{ fontSize: "clamp(2.5rem, 5cqw, 5rem)" }}>
            索引
          </span>
          <span
            className="type-cyrillic ml-4 text-[#B0B0B0]"
            style={{ fontSize: "clamp(0.6rem, 0.9cqw, 0.8rem)" }}
          >
            INDEX
          </span>
        </Link>
        <Link href="/about" className="group flex items-center no-underline">
          <span className="geo-marker" />
          <span className="type-display hover-red" style={{ fontSize: "clamp(2.5rem, 5cqw, 5rem)" }}>
            关于
          </span>
          <span
            className="type-cyrillic ml-4 text-[#B0B0B0]"
            style={{ fontSize: "clamp(0.6rem, 0.9cqw, 0.8rem)" }}
          >
            ABOUT
          </span>
        </Link>
      </div>

      {/* 社交媒体 */}
      <div
        className="anim-y-60 d-4 absolute flex flex-col items-start gap-3 select-none z-10"
        style={{
          left: "12%",
          bottom: "14%",
        }}
      >
        {/* 找到我 + 向下箭头 */}
        <div className="flex items-center gap-2">
          <span
            className="type-label text-[#8C8C8C]"
            style={{ fontSize: "clamp(0.55rem, 0.7cqw, 0.65rem)", letterSpacing: "0.2em" }}
          >
            找到我
          </span>
          {/* 向下三角 */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "7px solid var(--red)",
            }}
          />
        </div>

        {/* 按钮行 */}
        <div className="flex items-center gap-3 type-label">
          <a
            href="https://space.bilibili.com/39276639?spm_id_from=333.1007.0.0"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--fg)]/20 px-3 py-1.5 text-[var(--fg)] no-underline transition-all duration-200 hover:border-[#D10000] hover:text-[#D10000] hover:bg-[#D10000]/5"
            style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.7rem)" }}
          >
            Bilibili
          </a>
          <a
            ref={wechatRef}
            href="#"
            onClick={(e) => { e.preventDefault(); openWechat(); }}
            className="border border-[var(--fg)]/20 px-3 py-1.5 text-[var(--fg)] no-underline transition-all duration-200 hover:border-[#D10000] hover:text-[#D10000] hover:bg-[#D10000]/5"
            style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.7rem)" }}
          >
            WeChat
          </a>
          <a
            href="#"
            className="border border-[var(--fg)]/20 px-3 py-1.5 text-[var(--fg)] no-underline transition-all duration-200 hover:border-[#D10000] hover:text-[#D10000] hover:bg-[#D10000]/5"
            style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.7rem)" }}
          >
            Instagram
          </a>
        </div>
      </div>

      {/* 底部黑色粗线 — 封底 */}
      <div className="footer-bar z-0" />

      {/* 微信二维码灯箱 */}
      {wechatLightbox && (
        <Lightbox src={wechatLightbox.src} originRect={wechatLightbox.rect} onClose={() => setWechatLightbox(null)} />
      )}
    </section>
  );
}
