"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { usePosterWidth } from "@/app/hooks/usePosterWidth";
import { AboutArchiveButton } from "./AboutArchiveButton";
import { AboutPosterTitle } from "./AboutPosterTitle";

export function PosterAbout() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);
  const dbg = usePosterWidth(ref);
  const btnRef = useRef<HTMLDivElement>(null);
  const [btnRect, setBtnRect] = useState<{ left: number; top: number; right: number; bottom: number } | null>(null);

  const measureBtn = useCallback(() => {
    if (!btnRef.current || !ref.current) return;
    const posterRect = ref.current.getBoundingClientRect();
    const b = btnRef.current.getBoundingClientRect();
    setBtnRect({
      left: Math.round(b.left - posterRect.left),
      top: Math.round(b.top - posterRect.top),
      right: Math.round(b.right - posterRect.left),
      bottom: Math.round(b.bottom - posterRect.top),
    });
  }, [ref]);

  useEffect(() => {
    measureBtn();
    const ro = new ResizeObserver(measureBtn);
    if (btnRef.current) ro.observe(btnRef.current);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [measureBtn, ref]);

  return (
    <section
      id="poster-about"
      ref={ref}
      className="poster bg-paper text-[var(--fg)]"
      aria-label="关于迷蔻紫的一切"
    >
      {/* ═══════════════════════════════════════════
          FRAME SYSTEM — 制图框架
          ═══════════════════════════════════════════ */}

      {/* 页面顶部横向粗线 */}
      <div
        className="anim-line-x absolute left-[2%] h-[3px] bg-[var(--fg)] z-0 hidden md:block"
        style={{ top: "3%", width: "96%", opacity: 0.7 }}
      />

      {/* 左上角 L 型框架 — 加粗 */}
      <div className="anim-line-x absolute z-0 hidden md:block"
        style={{ left: "2%", top: "3%", width: "clamp(36px, 5cqw, 64px)", height: "3px", background: "var(--fg)", opacity: 1 }}
      />
      <div className="anim-line-x d-1 absolute z-0 hidden md:block"
        style={{ left: "2%", top: "3%", width: "3px", height: "clamp(36px, 5cqw, 64px)", background: "var(--fg)", opacity: 1 }}
      />

      {/* 右侧垂直辅助线 — 更粗更明显 */}
      <div
        className="anim-line-x d-2 absolute right-[6%] w-[2px] bg-[var(--fg)] z-0 hidden md:block"
        style={{ top: "10%", height: "70%", opacity: 0.7 }}
      />

      {/* 底部不闭合横线 — 加粗加对比 */}
      <div
        className="anim-line-x d-3 absolute left-[3%] h-[3px] bg-[var(--fg)] z-0 hidden md:block"
        style={{ bottom: "5%", width: "clamp(80px, 14cqw, 180px)", opacity: 0.7 }}
      />
      <div
        className="anim-line-x d-3 absolute right-[3%] h-[3px] bg-[#D10000] z-0 hidden md:block"
        style={{ bottom: "5%", width: "clamp(80px, 14cqw, 180px)" }}
      />

      {/* 裁切线 — 加粗加深 */}
      {[
        { l: "2%", t: "3%" },
        { r: "2%", t: "3%" },
        { l: "2%", b: "4.5%" },
        { r: "2%", b: "4.5%" },
      ].map((pos, i) => (
        <div
          key={i}
          className={`anim-scale d-${i + 1} absolute z-0 hidden lg:block`}
          style={{ ...pos, width: "clamp(14px, 2cqw, 22px)", height: "clamp(14px, 2cqw, 22px)" }}
        >
          <div style={{ position: "absolute", left: "50%", top: 0, width: "1px", height: "100%", background: "var(--fg)", transform: "translateX(-50%)", opacity: 1 }} />
          <div style={{ position: "absolute", top: "50%", left: 0, height: "1px", width: "100%", background: "var(--fg)", transform: "translateY(-50%)", opacity: 1 }} />
        </div>
      ))}

      {/* ═══════════════════════════════════════════
          技术制图标记 — 印刷套准 / 对齐 / 坐标
          仅出现在边缘，不进入内容区
          ═══════════════════════════════════════════ */}

      {/* ── Registration Mark · 四角套准标记 ── */}
      {[
        { left: "1.2%", top: "2.5%" },
        { right: "1.2%", top: "2.5%" },
        { left: "1.2%", bottom: "4%" },
        { right: "1.2%", bottom: "4%" },
      ].map((pos, i) => (
        <div
          key={`reg-${i}`}
          className={`anim-scale d-${i + 1} absolute z-0 hidden lg:block`}
          style={{
            ...pos,
            width: "clamp(16px, 2.2cqw, 24px)",
            height: "clamp(16px, 2.2cqw, 24px)",
          }}
          aria-hidden="true"
        >
          {/* 外圆 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid var(--fg)",
              opacity: 1,
            }}
          />
          {/* 十字线 */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: "1px",
              height: "100%",
              background: "var(--fg)",
              opacity: 1,
              transform: "translateX(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              height: "1px",
              width: "100%",
              background: "var(--fg)",
              opacity: 1,
              transform: "translateY(-50%)",
            }}
          />
        </div>
      ))}

      {/* ── 不闭合边框 · 右下角 L 型 ── */}
      <div
        className="anim-line-x d-2 absolute z-0 hidden md:block"
        style={{
          right: "2%",
          bottom: "4.5%",
          width: "clamp(36px, 5cqw, 64px)",
          height: "3px",
          background: "var(--fg)",
          opacity: 1,
        }}
        aria-hidden="true"
      />
      <div
        className="anim-line-x d-3 absolute z-0 hidden md:block"
        style={{
          right: "2%",
          bottom: "4.5%",
          width: "3px",
          height: "clamp(36px, 5cqw, 64px)",
          background: "var(--fg)",
          opacity: 1,
        }}
        aria-hidden="true"
      />

      {/* ── 不闭合边框 · 右上角横线段 ── */}
      <div
        className="anim-line-x d-1 absolute z-0 hidden md:block"
        style={{
          right: "2%",
          top: "3%",
          width: "clamp(20px, 3cqw, 40px)",
          height: "2px",
          background: "var(--fg)",
          opacity: 0.7,
        }}
        aria-hidden="true"
      />

      {/* ── 对齐辅助线 · 右缘刻度标记 ── */}
      {[0.22, 0.38, 0.54, 0.7].map((ratio, i) => (
        <div
          key={`tick-r-${i}`}
          className={`anim-line-x d-${i + 1} absolute z-0 hidden lg:block`}
          style={{
            right: "2.5%",
            top: `${8 + ratio * 72}%`,
            width: "clamp(6px, 1cqw, 12px)",
            height: "1px",
            background: i % 2 === 0 ? "var(--fg)" : "#D10000",
            opacity: i % 2 === 0 ? 0.18 : 0.25,
          }}
          aria-hidden="true"
        />
      ))}

      {/* ── 对齐辅助线 · 左缘刻度标记 ── */}
      {[0.3, 0.5, 0.7].map((ratio, i) => (
        <div
          key={`tick-l-${i}`}
          className={`anim-line-x d-${i + 2} absolute z-0 hidden lg:block`}
          style={{
            left: "2.5%",
            top: `${12 + ratio * 68}%`,
            width: "clamp(5px, 0.8cqw, 10px)",
            height: "1px",
            background: "var(--fg)",
            opacity: 1,
          }}
          aria-hidden="true"
        />
      ))}

      {/* ── 坐标标记 · 四角字母编号 ── */}
      {[
        { left: "2.8%", top: "4.8%", label: "A" },
        { right: "3.8%", top: "4.8%", label: "B" },
        { left: "2.8%", bottom: "5.2%", label: "C" },
        { right: "3.8%", bottom: "5.2%", label: "D" },
      ].map(({ label, ...pos }, i) => (
        <div
          key={`coord-${i}`}
          className={`anim-y-60 d-${i + 1} absolute z-0 hidden lg:block`}
          style={{
            ...pos,
            fontSize: "clamp(0.45rem, 0.5cqw, 0.6rem)",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--fg)",
            opacity: 1,
            letterSpacing: "0.05em",
          }}
          aria-hidden="true"
        >
          {label}
        </div>
      ))}

      {/* ── 西里尔文档案标注 · 左缘红色竖线下方 ── */}
      <div
        className="anim-y-60 d-3 absolute z-[2] select-none hidden lg:block"
        style={{
          left: "2.8%",
          top: "72%",
          fontSize: "clamp(0.85rem, 1cqw, 1.1rem)",
          fontFamily: "var(--font-geist-mono)",
          color: "var(--fg)",
          letterSpacing: "0.3em",
          transform: "rotate(90deg)",
          transformOrigin: "left top",
          whiteSpace: "nowrap",
        }}
        aria-hidden="true"
      >
        АРХИВ 01
      </div>

      {/* ═══════════════════════════════════════════
          CONSTRUCTIVIST GRAPHICS — 构成主义图形
          ═══════════════════════════════════════════ */}

      {/* 左侧红色粗竖条 — 沿左边缘，Rodchenko 式结构锚 */}
      <div
        className="anim-line-x d-1 absolute left-[2%] w-[4px] bg-[#D10000] z-[1] hidden md:block"
        style={{ top: "16%", height: "28%", opacity: 0.55 }}
      />

      {/* 红色水平对齐线 — 加粗 */}
      <div
        className="anim-line-x d-2 absolute left-0 h-[2px] bg-[#D10000] z-[1] hidden md:block"
        style={{ top: "28%", width: "22%", opacity: 0.4 }}
      />

      {/* 第二条红水平线 */}
      <div
        className="anim-line-x d-3 absolute left-[2%] h-[2px] bg-[#D10000] z-[1] hidden md:block"
        style={{ top: "47%", width: "16%", opacity: 0.35 }}
      />

      {/* 状态文字 — 两条红线之间 */}
      <div
        className="anim-y-60 d-3 absolute z-[5] select-none hidden lg:block"
        style={{
          left: "clamp(2rem, 5cqw, 5.5rem)",
          top: "30%",
          fontSize: "clamp(0.65rem, 0.78cqw, 0.85rem)",
          fontFamily: "var(--font-geist-mono)",
          color: "var(--fg)",
          opacity: 0.5,
          fontWeight: 700,
          lineHeight: 1.7,
          letterSpacing: "0.06em",
        }}
        aria-hidden="true"
      >
        <div style={{ marginBottom: "0.3em", letterSpacing: "0.12em" }}>CURRENTLY：</div>
        <div>期末烧脑中</div>
        <div>优化 Mikko Portfolio v2</div>
        <div>幻想成为画画大师</div>
        <div style={{ marginTop: "0.8em", letterSpacing: "0.12em" }}>Listening:</div>
        <div>Кино</div>
      </div>

      {/* 黑色粗方块 — Lissitzky 式几何锚 */}
      <div
        className="anim-scale d-2 absolute z-[1] hidden md:block"
        style={{ right: "6%", top: "20%", width: "clamp(18px, 2.5cqw, 32px)", height: "clamp(18px, 2.5cqw, 32px)", background: "var(--fg)", opacity: 0.7 }}
      />

      {/* 网格点阵 — 沿右辅助线，更明显 */}
      {[0.18, 0.35, 0.55, 0.72].map((ratio, i) => (
        <div
          key={i}
          className={`anim-scale d-${i + 2} absolute z-[1] hidden lg:block`}
          style={{
            right: "calc(6% - 2px)",
            top: `${10 + ratio * 70}%`,
            width: "6px",
            height: "6px",
            background: i % 2 === 0 ? "#D10000" : "var(--fg)",
            opacity: i % 2 === 0 ? 1 : 0.7,
          }}
        />
      ))}

      {/* 右下角小红方块锚点 */}
      <div
        className="anim-scale d-4 absolute z-[1] hidden md:block"
        style={{ right: "2.5%", bottom: "4.8%", width: "clamp(10px, 1.5cqw, 16px)", height: "clamp(10px, 1.5cqw, 16px)", background: "#D10000", opacity: 0.6 }}
      />

      {/* 左上 L 角内侧黑锚点 */}
      <div
        className="anim-scale d-2 absolute z-[1] hidden md:block"
        style={{
          left: "calc(2% + clamp(36px, 5cqw, 64px) + 10px)",
          top: "calc(3% + clamp(36px, 5cqw, 64px) - 6px)",
          width: "10px", height: "10px", background: "var(--fg)", opacity: 1,
        }}
      />

      {/* 左侧中部黑色半透明块 — 对冲右侧 Logo 体量 */}
      <div
        className="anim-scale d-3 absolute z-[1] hidden lg:block"
        style={{
          left: "4%", top: "55%", width: "clamp(30px, 4cqw, 50px)", height: "clamp(50px, 8cqw, 100px)",
          background: "var(--fg)", opacity: 0.08,
        }}
      />

      {/* ═══════════════════════════════════════════
          EDITORIAL SYSTEM — 编辑设计系统
          ═══════════════════════════════════════════ */}

      {/* 左侧竖排文字 — 提高对比度 */}
      <div
        className="anim-y-60 d-2 absolute z-[5] type-cyrillic select-none hidden md:flex flex-col"
        style={{
          left: "clamp(0.5rem, 1cqw, 1rem)",
          top: "14%",
          fontSize: "clamp(0.6rem, 0.75cqw, 0.75rem)",
          letterSpacing: "0.4em",
          color: "var(--fg)",
          writingMode: "vertical-rl",
          gap: "0.5em",
        }}
      >
        <span>ЛИЧНЫЙ</span>
        <span>АРХИВ</span>
        <span>2026</span>
      </div>

      {/* 右下角坐标 — 提高对比度 */}
      <div
        className="anim-y-60 d-3 absolute z-[5] type-label select-none hidden md:flex items-baseline gap-3"
        style={{
          right: "clamp(1rem, 2.5cqw, 3rem)",
          bottom: "2.2%",
          fontSize: "clamp(0.55rem, 0.65cqw, 0.7rem)",
          letterSpacing: "0.15em",
          color: "var(--fg)",
        }}
      >
        <span>N 23° 08′</span>
        <span style={{ width: "1px", height: "0.8em", background: "#D10000", opacity: 0.6 }} />
        <span>E 113° 22′</span>
      </div>

      {/* 时间编码 — 提高对比度 */}
      <div
        className="anim-y-60 d-4 absolute z-[5] type-label select-none hidden md:block"
        style={{
          left: "clamp(1rem, 2.5cqw, 3rem)",
          bottom: "2.2%",
          fontSize: "clamp(0.55rem, 0.6cqw, 0.65rem)",
          letterSpacing: "0.12em",
          color: "var(--fg)",
        }}
      >
        2026-06-15 / REV A
      </div>

      {/* ====== 原有元素 ====== */}

      {/* 档案编号 — 模块标签样式 */}
      <div
        className="anim-y-60 z-20 font-mono text-xs tracking-widest uppercase
          absolute left-[clamp(1.5rem,6cqw,8%)] top-[19%]
          max-[767px]:relative max-[767px]:left-4 max-[767px]:top-0 max-[767px]:mb-2"
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
        <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>01</span>
        <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ A</span>
      </div>

      {/* ═══════════════════════════════════════════
          内容模块 — flex-col 流式布局
          标题 + 简介 + 按钮 组成单一内容模块
          无 absolute 定位依赖
          ═══════════════════════════════════════════ */}
      <div
        className="relative z-10 mx-auto flex flex-col h-full w-full max-w-6xl
          pl-2 pr-4 pt-16
          sm:pl-4 sm:pr-6 sm:pt-20
          md:pl-0 md:pr-6 md:pt-44 md:pb-24
          lg:pt-[20rem]
          xl:pt-[26rem]"
      >
        {/* 标题 + 简介 + 按钮 — flex-shrink-0 保持自然高度 */}
        <div className="flex-shrink-0 flex flex-col md:mt-16 md:max-w-[62cqw] lg:mt-24 lg:ml-[34px] lg:max-w-[62cqw] xl:-ml-8">
          <AboutPosterTitle />

          <p className="anim-y-60 d-1 mt-8 max-w-sm font-mono text-base tracking-wide text-[var(--gray-dark)] ml-2">
            计算机学生 / 摄影师 / 影像创作者
          </p>

          <p className="anim-y-60 d-2 mt-4 max-w-md text-lg leading-relaxed text-[var(--gray-dark)]/80 md:text-xl ml-2">
            用胶片与像素，记录在场与想象
          </p>

          <div ref={btnRef} className="anim-y-60 d-3 mt-6 flex justify-start md:mt-14 md:ml-2 lg:-mt-[70px] lg:ml-[457px] xl:-mt-[72px] xl:ml-[453px]">
            <AboutArchiveButton />
          </div>
        </div>

        {/* 弹性占位 — 吸收剩余高度，驱动按钮保持在内容自然位置 */}
        <div className="flex-1 min-h-0" aria-hidden="true" />

        {/* Logo 图案 — 桌面端 absolute 脱离布局流，移动端自然排列 */}
        <div
          className="flex-shrink-0 flex items-center justify-center mt-8
            md:absolute md:right-[4%] md:top-[10%] md:h-[38%] md:w-[30%] md:mt-0
            lg:absolute lg:right-[4%] lg:top-[8%] lg:h-[45%] lg:w-[32%] xl:w-[35%] lg:mt-0"
        >
          {/* ═══════════════════════════════════════════
              LOGO 背景构成 — 红色构成主义矩形
              ═══════════════════════════════════════════ */}

          {/* 黑色矩形 — 右下方基底块 */}
          <div
            className="absolute hidden md:block"
            style={{
              left: "5%",
              bottom: "5%",
              width: "82%",
              height: "48%",
              background: "var(--fg)",
              opacity: 0.07,
            }}
          />

          {/* 红色裁切矩形 — 右上角被斜切 */}
          <div
            className="absolute hidden md:block"
            style={{
              right: "10%",
              top: "8%",
              width: "48%",
              height: "42%",
              background: "#D10000",
              opacity: 0.06,
              clipPath: "polygon(0 0, 100% 0, 100% 72%, 75% 100%, 0 100%)",
            }}
          />

          <div className="relative z-10" style={{ width: "418px", maxWidth: "95vw" }}>
            <img
              src="/mikkologo/miko.png"
              alt="Mikko"
              className="anim-scale d-4 relative w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          印刷编号 — 右下角超大低透明度
          杂志封面式背景信息层，非按钮/标签
          ═══════════════════════════════════════════ */}
      <div
        className="absolute z-[1] select-none hidden md:block"
        style={{
          right: "4%",
          bottom: "4%",
          fontSize: "clamp(12rem, 27cqw, 32rem)",
          fontWeight: 900,
          color: "var(--fg)",
          opacity: 0.045,
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          fontFamily: "var(--font-geist-mono)",
        }}
        aria-hidden="true"
      >
        01
      </div>

      {/* 俄文标注 */}
      <span
        className="anim-y-60 d-2 type-cyrillic absolute z-10 text-[var(--fg)] select-none hidden md:inline"
        style={{
          right: "8%",
          bottom: "18%",
          fontSize: "clamp(0.7rem, 1cqw, 0.85rem)",
        }}
      >
        ВСЁ ОБО МНЕ
      </span>

      {/* 滚动引导文字 */}
      <div
        className="absolute left-1/2 z-30 select-none hidden md:block"
        style={{
          bottom: "60px",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.3em",
          color: "var(--fg)",
          textTransform: "uppercase",
        }}
        aria-hidden="true"
      >
        scroll down
      </div>
      <div className="scroll-arrow z-30" />

      {/* ═══════════════════════════════════════════
          DEBUG PANEL — iPad 诊断 (false 隐藏，改 true 恢复)
          ═══════════════════════════════════════════ */}
      {false && (
      <div
        style={{
          position: "absolute",
          left: 8,
          bottom: 8,
          zIndex: 9999,
          background: "rgba(0,0,0,0.82)",
          color: "#0f0",
          padding: "10px 14px",
          borderRadius: 6,
          fontFamily: "var(--font-geist-mono)",
          fontSize: "clamp(9px, 1.2cqw, 12px)",
          lineHeight: 1.55,
          maxWidth: "94vw",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div style={{ color: "#FF0", fontWeight: 700, marginBottom: 4 }}>
          🔍 POSTER ABOUT DEBUG
        </div>
        <div>clientWidth: <b>{dbg.clientWidth}</b>px</div>
        <div>clientHeight: <b>{dbg.clientHeight}</b>px</div>
        <div>--pw computed: "<b>{dbg.pwComputed || "(empty)"}</b>"</div>
        <div>contain: <b>{dbg.contain || "(unknown)"}</b></div>
        <div>containerType: <b>{dbg.containerType || "(unknown)"}</b></div>
        <div>ResizeObserver: <b>{dbg.roCount}</b> 次</div>
        <div>mounted: <b>{String(dbg.mounted)}</b></div>
        <div style={{ color: "#FF0", marginTop: 4 }}>📌 按钮 (相对 poster):</div>
        <div>  left: <b>{btnRect?.left ?? "—"}</b>px &nbsp; top: <b>{btnRect?.top ?? "—"}</b>px</div>
        <div>  right: <b>{btnRect?.right ?? "—"}</b>px &nbsp; bottom: <b>{btnRect?.bottom ?? "—"}</b>px</div>
      </div>
      )}
    </section>
  );
}
