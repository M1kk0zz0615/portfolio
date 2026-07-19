"use client";

import { memo, useState, useEffect } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { usePosterWidth } from "@/app/hooks/usePosterWidth";
import { usePosterParallax } from "@/app/hooks/usePosterParallax";

export const PosterVideo = memo(function PosterVideo() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);
  usePosterWidth(ref); // 修复 iPadOS Safari cqw 不更新

  // 视差效果
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setParallaxEnabled(true), 1050);
    return () => clearTimeout(timer);
  }, []);
  usePosterParallax(ref, { enabled: parallaxEnabled, gyroScale: 1.75 });

  return (
    <section
      ref={ref}
      id="video"
      className={`poster flex items-center bg-paper text-[var(--fg)]${parallaxEnabled ? " parallax-active" : ""}`}
      aria-label="影像档案"
    >
      {/* ====== 桌面端 (>1024px) — 绝对定位海报布局 ====== */}
      <div className="hidden lg:contents">
        {/* 档案编号 — 模块标签样式 */}
        <div
          className="anim-y-60 parallax-layer-3 absolute z-20 font-mono text-xs tracking-widest uppercase"
          style={{ left: "clamp(1.5rem, 6cqw, 8%)", top: "19%" }}
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
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>04</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ D</span>
        </div>

        {/* Lissitzky 几何 — 左上角 */}
        <div
          className="anim-y-60 d-2 parallax-layer-2 absolute bg-[var(--fg)] z-0"
          style={{ left: "12%", top: "36%", width: "clamp(16px, 2cqw, 24px)", height: "clamp(16px, 2cqw, 24px)" }}
        />
        <div
          className="anim-scale d-3 geo-circle parallax-layer-2 absolute bg-[#D10000] z-0"
          style={{ left: "14%", top: "44%", width: "clamp(8px, 1cqw, 14px)", height: "clamp(8px, 1cqw, 14px)" }}
        />

        {/* 右侧细竖线 */}
        <div
          className="anim-line-x d-2 parallax-layer-2 absolute right-[14%] h-[30%] w-[3px] bg-[var(--fg)]/30 z-0"
          style={{ top: "22%" }}
        />
        {/* 红色小方块 */}
        <div
          className="anim-scale d-1 parallax-layer-2 absolute bg-[#D10000] z-0"
          style={{ right: "8%", top: "14%", width: "clamp(10px, 1.5cqw, 18px)", height: "clamp(10px, 1.5cqw, 18px)" }}
        />
        {/* 红色斜线 */}
        <div
          className="anim-line-x d-2 parallax-layer-2 absolute h-[3px] bg-[#D10000]/70 origin-right z-0"
          style={{ right: "0%", top: "38%", width: "32%", transform: "rotate(-15deg)" }}
        />
        {/* 空心黑方框 */}
        <div
          className="anim-scale d-3 parallax-layer-2 absolute border-[3px] border-[var(--fg)] z-0"
          style={{ right: "20%", top: "48%", width: "clamp(24px, 3.5cqw, 44px)", height: "clamp(24px, 3.5cqw, 44px)" }}
        />
        {/* 红色小圆 */}
        <div
          className="anim-scale d-4 geo-circle parallax-layer-2 absolute bg-[#D10000] z-0"
          style={{ right: "30%", bottom: "28%", width: "clamp(8px, 1.2cqw, 14px)", height: "clamp(8px, 1.2cqw, 14px)" }}
        />
        {/* 装饰斜线组 */}
        <div
          className="anim-scale d-4 diagonal-stripes parallax-layer-2 absolute select-none z-0"
          style={{ right: "10%", bottom: "16%" }}
        >
          <span /><span /><span />
        </div>

        {/* 黑色大圆 */}
        <div
          className="anim-scale d-2 geo-circle absolute flex items-center justify-center bg-[var(--fg)] select-none z-[1]"
          style={{
            left: "50%", top: "50%", transform: "translate(-50%, -50%)",
            width: "clamp(180px, 30cqw, 360px)", height: "clamp(180px, 30cqw, 360px)",
          }}
        >
          <span className="type-display text-[#D10000]"
            style={{ fontSize: "clamp(1.8rem, calc(var(--pw) * 0.035 * 1px), 3.5rem)", fontWeight: 900, letterSpacing: "0.15em" }}>
            КИНО
          </span>
        </div>

        {/* 主标题 */}
        <h2
          className="anim-y-60 parallax-layer-1 type-display absolute text-[var(--fg)] select-none z-10"
          style={{ left: "9%", top: "51%", fontSize: "clamp(2.5rem, calc(var(--pw) * 0.045 * 1px), 4.5rem)", transform: "skewX(-5deg)" }}
        >
          影像档案
        </h2>

        {/* 俄文标注 */}
        <span
          className="anim-y-60 d-1 parallax-layer-2 type-cyrillic absolute text-[var(--fg)] select-none z-10"
          style={{ left: "10%", top: "26%", fontSize: "clamp(0.7rem, 1cqw, 0.9rem)" }}
        >
          КИНОАРХИВ
        </span>

        {/* 入口 */}
        <div className="anim-y-60 d-3 parallax-layer-1 absolute flex flex-col gap-6 select-none z-20" style={{ left: "17%", bottom: "22%" }}>
          <Link href="/video/work" className="group flex items-center no-underline">
            <span className="geo-marker" />
            <span className="type-display hover-red" style={{ fontSize: "clamp(1.8rem, calc(var(--pw) * 0.035 * 1px), 3rem)" }}>受托</span>
          </Link>
          <Link href="/video/personal" className="group flex items-center no-underline" style={{ marginLeft: "3em" }}>
            <span className="geo-marker" />
            <span className="type-display hover-red" style={{ fontSize: "clamp(1.8rem, calc(var(--pw) * 0.035 * 1px), 3rem)" }}>闲影</span>
          </Link>
        </div>

        {/* 说明文字 */}
        <p className="anim-y-60 d-4 parallax-layer-1 absolute type-label text-[#8C8C8C] select-none z-10"
          style={{ left: "12%", bottom: "11%", fontSize: "clamp(0.6rem, 0.8cqw, 0.75rem)", maxWidth: "420px" }}>
          活动记录 · 年度回顾 · 毕业纪念 · Vlog · 实验短片
        </p>

        {/* ── 四角裁切线 ── */}
        {[
          { right: "2%", top: "3%" },
          { left: "2%", bottom: "4.5%" },
        ].map((pos, i) => (
          <div key={i} className={`anim-scale d-${i + 1} parallax-layer-3 absolute z-0`}
            style={{ ...pos, width: "clamp(14px, 2cqw, 22px)", height: "clamp(14px, 2cqw, 22px)" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, width: "1px", height: "100%", background: "var(--fg)", opacity: 0.2, transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, height: "1px", width: "100%", background: "var(--fg)", opacity: 0.2, transform: "translateY(-50%)" }} />
          </div>
        ))}

        {/* ── Registration Mark · 四角套准标记 ── */}
        {[
          { left: "1.2%", top: "2.5%" },
          { right: "1.2%", bottom: "4%" },
        ].map((pos, i) => (
          <div key={`reg-${i}`} className={`anim-scale d-${i + 1} parallax-layer-3 absolute z-0`}
            style={{ ...pos, width: "clamp(16px, 2.2cqw, 24px)", height: "clamp(16px, 2.2cqw, 24px)" }}
            aria-hidden="true">
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--fg)", opacity: 0.2 }} />
            <div style={{ position: "absolute", left: "50%", top: 0, width: "1px", height: "100%", background: "var(--fg)", opacity: 0.2, transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, height: "1px", width: "100%", background: "var(--fg)", opacity: 0.2, transform: "translateY(-50%)" }} />
          </div>
        ))}

        {/* ── 左侧竖排西里尔文 ── */}
        <div
          className="anim-y-60 d-3 parallax-layer-2 absolute z-[2] select-none"
          style={{
            left: "2.8%", top: "68%",
            fontSize: "clamp(0.85rem, 1cqw, 1.1rem)",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--fg)",
            opacity: 0.2,
            letterSpacing: "0.3em",
            transform: "rotate(90deg)",
            transformOrigin: "left top",
            whiteSpace: "nowrap",
          }}
          aria-hidden="true">
          АРХИВ 04
        </div>

        {/* 右下角大水印数字 */}
        <div
          className="parallax-layer-2 absolute z-[1] select-none"
          style={{
            right: "4%", bottom: "4%",
            fontSize: "clamp(10rem, 22cqw, 26rem)",
            fontWeight: 900,
            color: "var(--fg)",
            opacity: 0.02,
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            fontFamily: "var(--font-geist-mono)",
          }}
          aria-hidden="true">
          04
        </div>

        {/* 俄文格言 */}
        <p className="anim-y-60 d-4 parallax-layer-1 type-cyrillic absolute left-1/2 text-[var(--fg)] text-center select-none z-10"
          style={{
            bottom: "7%",
            transform: "translateX(-50%)",
            fontSize: "clamp(0.65rem, 0.85cqw, 0.9rem)",
            letterSpacing: "0.08em",
            lineHeight: 1.6,
          }}>
          Реальность — вторичная<br />структурная обработка.
        </p>

        <div className="scroll-arrow parallax-layer-2 z-30" />
      </div>

      {/* ====== 移动端+平板 (<1024px) — flex-col 纵向布局 ====== */}
      <div className="lg:hidden relative z-10 flex w-full flex-col px-4 pt-16 sm:px-8 sm:pt-20 min-h-dvh" style={{gap:"clamp(1rem, 3vh, 2.5rem)"}}>
        {/* 档案编号 — 模块标签样式 */}
        <div className="anim-y-60 font-mono text-xs tracking-widest uppercase mb-4">
          <span style={{
            display: "inline-block",
            width: "clamp(14px, 3cqw, 22px)",
            height: "3px",
            background: "#D10000",
            verticalAlign: "middle",
            marginRight: "0.5em",
          }} />
          <span style={{ color: "var(--fg)", opacity: 0.55 }}>№</span>
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>04</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ D</span>
        </div>

        {/* 俄文 */}
        <span
          className="anim-y-60 d-1 type-cyrillic text-[var(--fg)] select-none"
          style={{ fontSize: "clamp(0.7rem, 2.5vw, 0.9rem)" }}
        >
          КИНОАРХИВ
        </span>

        {/* 黑色大圆 + КИНО — 移动端缩小、靠右 */}
        <div className="relative my-4 flex items-center justify-end">
          <div
            className="anim-scale d-2 geo-circle flex items-center justify-center bg-[var(--fg)] select-none"
            style={{ width: "clamp(180px, 50vw, 300px)", height: "clamp(180px, 50vw, 300px)" }}
          >
            <span className="type-display text-[#D10000]"
              style={{ fontSize: "clamp(1.4rem, 6vw, 2.4rem)", fontWeight: 900, letterSpacing: "0.12em" }}>
              КИНО
            </span>
          </div>
        </div>

        {/* 构成主义装饰 — 圆与标题之间 */}
        <div className="anim-line-x d-2 flex items-center gap-3 mb-1" aria-hidden="true">
          <div className="h-[3px] bg-[#D10000]" style={{ width: "clamp(40px, 12vw, 80px)" }} />
          <div className="bg-[var(--fg)]" style={{ width: "clamp(8px, 2vw, 12px)", height: "clamp(8px, 2vw, 12px)" }} />
          <div className="geo-circle bg-[#D10000]" style={{ width: "clamp(6px, 1.5vw, 10px)", height: "clamp(6px, 1.5vw, 10px)" }} />
        </div>

        {/* 主标题 */}
        <h2
          className="anim-y-60 d-2 type-display text-[var(--fg)] select-none mb-6"
          style={{ fontSize: "clamp(3rem, 14vw, 5.5rem)", transform: "skewX(-4deg)" }}
        >
          影像档案
        </h2>

        {/* 入口 — 纵向排列 */}
        <div className="anim-y-60 d-3 flex flex-col gap-4 select-none mb-6">
          <Link href="/video/work" className="group flex items-center no-underline">
            <span className="geo-marker" />
            <span className="type-display hover-red" style={{ fontSize: "clamp(2rem, 9vw, 3.2rem)" }}>受托</span>
          </Link>
          <Link href="/video/personal" className="group flex items-center no-underline" style={{ marginLeft: "2em" }}>
            <span className="geo-marker" />
            <span className="type-display hover-red" style={{ fontSize: "clamp(2rem, 9vw, 3.2rem)" }}>闲影</span>
          </Link>
        </div>

        {/* 俄文格言 */}
        <p className="anim-y-60 d-4 type-cyrillic text-[var(--fg)] text-center select-none pb-4"
          style={{ fontSize: "clamp(0.65rem, 2.2vw, 0.85rem)", letterSpacing: "0.08em", lineHeight: 1.6 }}>
          Реальность — вторичная<br />структурная обработка.
        </p>

        {/* ═══════════ 移动端制图标识 ═══════════ */}

        {/* 四角裁切线 */}
        {[{left:"2.2%",top:"3.2%"},{right:"2.2%",top:"3.2%"},{left:"2.2%",bottom:"4.7%"},{right:"2.2%",bottom:"4.7%"}].map((p,i)=>
          <div key={`cm-${i}`} className="absolute z-0" style={{...p,width:"clamp(10px,3vw,16px)",height:"clamp(10px,3vw,16px)"}} aria-hidden="true">
            <div style={{position:"absolute",left:"50%",top:0,width:"1px",height:"100%",background:"var(--fg)",opacity:.10,transform:"translateX(-50%)"}} />
            <div style={{position:"absolute",top:"50%",left:0,height:"1px",width:"100%",background:"var(--fg)",opacity:.10,transform:"translateY(-50%)"}} />
          </div>
        )}

        {/* ABCD 坐标字母 */}
        {[{left:"3%",top:"5%",v:"A"},{right:"4%",top:"5%",v:"B"},{left:"3%",bottom:"5.5%",v:"C"},{right:"4%",bottom:"5.5%",v:"D"}].map(({v,...p},i)=>
          <div key={`abc-${i}`} className="absolute z-0 select-none" style={{...p,fontSize:"clamp(0.45rem,2vw,0.6rem)",fontFamily:"var(--font-geist-mono)",color:"var(--fg)",opacity:.10,letterSpacing:"0.05em"}} aria-hidden="true">{v}</div>
        )}

        {/* 超大编号水印 */}
        <div className="absolute z-[1] select-none pointer-events-none" style={{right:"4%",bottom:"4%",fontSize:"clamp(8rem,60vw,28rem)",fontWeight:900,color:"var(--fg)",opacity:.02,lineHeight:.85,letterSpacing:"-0.05em",fontFamily:"var(--font-geist-mono)"}} aria-hidden="true">04</div>
      </div>
    </section>
  );
});
