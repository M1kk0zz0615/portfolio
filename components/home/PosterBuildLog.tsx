"use client";

import { memo, useState, useEffect } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { usePosterWidth } from "@/app/hooks/usePosterWidth";
import { usePosterParallax } from "@/app/hooks/usePosterParallax";
import { buildLogProjects } from "@/data/buildLogProjects";


export const PosterBuildLog = memo(function PosterBuildLog() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);
  usePosterWidth(ref); // 修复 iPadOS Safari cqw 不更新

  // 视差效果 — 入场动画完成后启用（与 PosterAbout 一致的延迟 + 1.5x 陀螺仪补偿）
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setParallaxEnabled(true), 1050);
    return () => clearTimeout(timer);
  }, []);
  usePosterParallax(ref, { enabled: parallaxEnabled, gyroScale: 2.5 });

  return (
    <section
      ref={ref}
      id="build-log"
      className={`poster bg-paper text-[var(--fg)]${parallaxEnabled ? " parallax-active" : ""}`}
      aria-label="构建日志"
    >
      {/* ====== 桌面端 ====== */}
      <div className="hidden lg:contents">
        {/* 红色对角线 */}
        <div
          className="anim-line-x d-1 parallax-layer-2 pointer-events-none absolute bg-[#D10000]/40 z-0"
          style={{
            left: "15%", bottom: "6%", width: "88%", height: "3px",
            transform: "rotate(-16deg)", transformOrigin: "left center",
          }}
        />

        {/* ═══════════════════════════════════════════
            FRAME SYSTEM — 制图框架
            ═══════════════════════════════════════════ */}

        {/* 页面顶部横向粗线 — 已删除 */}


        {/* 左上角 L 型框架 */}
        <div className="anim-line-x parallax-layer-3 absolute z-0"
          style={{ left: "2%", top: "3%", width: "clamp(36px, 5cqw, 64px)", height: "3px", background: "var(--fg)", opacity: 0.2 }}
        />
        <div className="anim-line-x d-1 parallax-layer-3 absolute z-0"
          style={{ left: "2%", top: "3%", width: "3px", height: "clamp(36px, 5cqw, 64px)", background: "var(--fg)", opacity: 0.2 }}
        />

        {/* 底部横线 — 已删除 */}


        {/* ── 四角裁切线 ── */}
        {[
          { right: "2%", top: "3%" },
          { left: "2%", bottom: "4.5%" },
        ].map((pos, i) => (
          <div
            key={i}
            className={`anim-scale d-${i + 1} parallax-layer-3 absolute z-0`}
            style={{ ...pos, width: "clamp(14px, 2cqw, 22px)", height: "clamp(14px, 2cqw, 22px)" }}
          >
            <div style={{ position: "absolute", left: "50%", top: 0, width: "1px", height: "100%", background: "var(--fg)", opacity: 0.2, transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, height: "1px", width: "100%", background: "var(--fg)", opacity: 0.2, transform: "translateY(-50%)" }} />
          </div>
        ))}

        {/* ── Registration Mark · 四角套准标记 ── */}
        {[
          { left: "1.2%", top: "2.5%" },
          { right: "1.2%", bottom: "4%" },
        ].map((pos, i) => (
          <div
            key={`reg-${i}`}
            className={`anim-scale d-${i + 1} parallax-layer-3 absolute z-0`}
            style={{
              ...pos,
              width: "clamp(16px, 2.2cqw, 24px)",
              height: "clamp(16px, 2.2cqw, 24px)",
            }}
            aria-hidden="true"
          >
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--fg)", opacity: 0.2 }} />
            <div style={{ position: "absolute", left: "50%", top: 0, width: "1px", height: "100%", background: "var(--fg)", opacity: 0.2, transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, height: "1px", width: "100%", background: "var(--fg)", opacity: 0.2, transform: "translateY(-50%)" }} />
          </div>
        ))}

        {/* ── 断裂边框 · 右下角 L 型 ── */}
        <div className="anim-line-x d-2 parallax-layer-3 absolute z-0"
          style={{ right: "2%", bottom: "4.5%", width: "clamp(36px, 5cqw, 64px)", height: "3px", background: "var(--fg)", opacity: 0.2 }}
          aria-hidden="true"
        />
        <div className="anim-line-x d-3 parallax-layer-3 absolute z-0"
          style={{ right: "2%", bottom: "4.5%", width: "3px", height: "clamp(36px, 5cqw, 64px)", background: "var(--fg)", opacity: 0.2 }}
          aria-hidden="true"
        />

        {/* ── 断裂边框 · 右上角横线段 — 已删除 */}

        {/* ── 对齐辅助线 · 右缘刻度标记 — 已删除 */}

        {/* ── 对齐辅助线 · 左缘刻度标记 — 已删除 */}

        {/* ── 坐标标记 · 四角字母编号 ── */}
        {[
          { left: "2.8%", top: "4.8%", label: "A" },
          { right: "3.8%", top: "4.8%", label: "B" },
          { left: "2.8%", bottom: "5.2%", label: "C" },
          { right: "3.8%", bottom: "5.2%", label: "D" },
        ].map(({ label, ...pos }, i) => (
          <div key={`coord-${i}`} className={`anim-y-60 d-${i + 1} parallax-layer-3 absolute z-0`}
            style={{
              ...pos,
              fontSize: "clamp(0.45rem, 0.5cqw, 0.6rem)",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--fg)",
              opacity: 0.2,
              letterSpacing: "0.05em",
            }}
            aria-hidden="true"
          >
            {label}
          </div>
        ))}

        {/* ── 左侧竖排西里尔文 ── */}
        <div
          className="anim-y-60 d-3 parallax-layer-2 absolute z-[2] select-none"
          style={{
            left: "2.8%", top: "18%",
            fontSize: "clamp(0.85rem, 1cqw, 1.1rem)",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--fg)",
            opacity: 0.2,
            letterSpacing: "0.3em",
            transform: "rotate(90deg)",
            transformOrigin: "left top",
            whiteSpace: "nowrap",
          }}
          aria-hidden="true"
        >
          АРХИВ 02
        </div>

        {/* ═══════════════════════════════════════════
            CONSTRUCTIVIST GRAPHICS — 构成主义图形
            ═══════════════════════════════════════════ */}

        {/* 左侧红色粗竖条 — 已删除 */}


        {/* 黑色粗方块 — Lissitzky 式几何锚 */}
        <div
          className="anim-scale d-2 parallax-layer-3 absolute z-[1]"
          style={{ right: "6%", top: "20%", width: "clamp(18px, 2.5cqw, 32px)", height: "clamp(18px, 2.5cqw, 32px)", background: "var(--fg)", opacity: 0.2 }}
        />

        {/* 网格点阵 — 沿右辅助线 */}
        {[0.18, 0.35, 0.55, 0.72].map((ratio, i) => (
          <div key={i} className={`anim-scale d-${i + 2} parallax-layer-2 absolute z-[1]`}
            style={{
              right: "calc(6% - 2px)", top: `${10 + ratio * 70}%`,
              width: "6px", height: "6px",
              background: i % 2 === 0 ? "#D10000" : "var(--fg)", opacity: i % 2 === 0 ? 1 : 0.5,
            }}
          />
        ))}

        {/* 右下角小红方块锚点 */}
        <div
          className="anim-scale d-4 parallax-layer-3 absolute z-[1]"
          style={{ right: "2.5%", bottom: "4.8%", width: "clamp(10px, 1.5cqw, 16px)", height: "clamp(10px, 1.5cqw, 16px)", background: "#D10000", opacity: 0.6 }}
        />

        {/* 左上 L 角内侧黑锚点 */}
        <div
          className="anim-scale d-2 parallax-layer-2 absolute z-[1]"
          style={{
            left: "calc(2% + clamp(36px, 5cqw, 64px) + 10px)",
            top: "calc(3% + clamp(36px, 5cqw, 64px) - 6px)",
            width: "10px", height: "10px", background: "var(--fg)", opacity: 0.2,
          }}
        />

        {/* ═══════════════════════════════════════════
            EDITORIAL SYSTEM — 编辑设计系统
            ═══════════════════════════════════════════ */}

        {/* 右下角坐标 */}
        <div
          className="anim-y-60 d-3 parallax-layer-3 absolute z-[5] type-label select-none flex items-baseline gap-3"
          style={{
            right: "clamp(1rem, 2.5cqw, 3rem)", bottom: "2.2%",
            fontSize: "clamp(0.55rem, 0.65cqw, 0.7rem)",
            letterSpacing: "0.15em", color: "var(--fg)",
          }}
        >
          <span>N 23° 08′</span>
          <span style={{ width: "1px", height: "0.8em", background: "#D10000", opacity: 0.6 }} />
          <span>E 113° 22′</span>
        </div>

        {/* 时间编码 */}
        <div
          className="anim-y-60 d-4 parallax-layer-3 absolute z-[5] type-label select-none"
          style={{
            left: "clamp(1rem, 2.5cqw, 3rem)", bottom: "2.2%",
            fontSize: "clamp(0.55rem, 0.6cqw, 0.65rem)",
            letterSpacing: "0.12em", color: "var(--fg)",
          }}
        >
          2026-06-15 / REV B
        </div>

        {/* 印刷编号 — 右下角超大低透明度 */}
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
          aria-hidden="true"
        >
          02
        </div>

        {/* ═══════════════════════════════════════════
            内容区
            ═══════════════════════════════════════════ */}

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
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>02</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ B</span>
        </div>

        {/* 标题组：西里尔文 + 主标题 + 英文 */}
        <div
          className="anim-y-60 d-1 pointer-events-none absolute z-10 flex flex-col"
          style={{
            left: "clamp(1rem,8cqw,12%)", top: "22%",
          }}
        >
          <span
            className="type-cyrillic text-[#D10000] pl-10"
            style={{
              fontSize: "clamp(1.4rem,1.8vw,1.6rem)", letterSpacing: "0.3em",
            }}
          >
            АРХИВ СБОРКИ
          </span>
          <div className="flex items-baseline gap-3">
            <h2
              className="type-display text-[var(--fg)]"
              style={{
                fontSize: "clamp(3rem,6vw,6rem)", lineHeight: 0.9, fontWeight: 900,
                letterSpacing: "-0.02em", transform: "skewX(-4deg)",
              }}
            >
              构建日志
            </h2>
            <span
              className="type-label text-[var(--fg)]/30"
              style={{
                fontSize: "clamp(1rem,1.5vw,1.3rem)", letterSpacing: "0.15em",
              }}
            >
              BUILD LOG
            </span>
          </div>
        </div>

        {/* 项目卡片 */}
        {buildLogProjects.map((project, i) => {
          const positions = [
            { left: "2%", top: "67%" },
            { left: "26%", top: "53%" },
            { left: "50%", top: "39%" },
            { left: "74%", top: "25%" },
          ];
          return (
            <Link
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`anim-y-60 group no-underline absolute z-10 d-${i + 2} card-hover`}
              style={{ ...positions[i], width: "clamp(240px, calc(var(--pw) * 0.22 * 1px), 360px)" }}
            >
              {/* 引导提示 — 居中上方 */}
              <div
                className="absolute left-1/2 flex flex-col items-center gap-0.5 select-none pointer-events-none"
                style={{
                  bottom: "100%",
                  transform: "translateX(-50%)",
                  paddingBottom: "6px",
                  opacity: 0.35,
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "clamp(0.55rem, 0.7cqw, 0.7rem)",
                  color: "var(--fg)",
                  letterSpacing: "0.2em",
                }}
              >
                <span>CLICK HERE</span>
                <span style={{ fontSize: "clamp(0.7rem, 0.9cqw, 0.9rem)", lineHeight: 1 }}>↓</span>
              </div>
              <div
                className="border-l-[3px] border-[#D10000]/30 pl-4 py-2
                  hover:border-[#D10000] hover:bg-[#D10000]/8 transition-all duration-200"
              >
                {/* LED 运行指示灯 */}
                <div
                  className="pointer-events-none led-indicator -mt-[6px] mb-1 group-hover:!bg-[#D49800] group-hover:!shadow-[0_0_4px_rgba(212,152,0,0.6)] group-hover:!animate-none"
                  style={{ width: "8px", height: "8px" }}
                />
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="type-cyrillic text-[#D10000]"
                    style={{ fontSize: "clamp(0.95rem,1.3vw,1.15rem)" }}
                  >
                    {project.id}
                  </span>
                  <span
                    className="type-label text-[var(--fg)]/25"
                    style={{ fontSize: "clamp(0.78rem,1vw,0.88rem)" }}
                  >
                    {project.discipline}
                  </span>
                </div>
                <h3
                  className="type-display text-[var(--fg)]"
                  style={{ fontSize: "clamp(1.45rem,2.3vw,1.8rem)", lineHeight: 1.25 }}
                >
                  {project.title}
                </h3>
                <span
                  className="type-label text-[var(--fg)]/40 mt-1 block"
                  style={{ fontSize: "clamp(0.85rem,1.05vw,0.95rem)" }}
                >
                  {project.tech}
                </span>
                <p
                  className="mt-2 text-[var(--fg)]/70 leading-relaxed"
                  style={{ fontSize: "clamp(1rem,1.3vw,1.15rem)" }}
                >
                  {project.desc}
                </p>
                <span
                  className="absolute right-2 top-2 text-[#D10000] opacity-0
                    group-hover:opacity-100 transition-opacity duration-200"
                  style={{ fontSize: "clamp(0.95rem,1.3vw,1.15rem)" }}
                >
                  ↗
                </span>
              </div>
            </Link>
          );
        })}

        {/* 中间偏上空区 — 色块组 */}
        <div
          className="anim-scale d-2 parallax-layer-1 pointer-events-none absolute bg-[#D10000]/8 z-0"
          style={{
            left: "10%", top: "40%",
            width: "clamp(70px,9cqw,130px)", height: "clamp(50px,6cqh,90px)",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          className="anim-scale d-3 parallax-layer-1 pointer-events-none absolute bg-[var(--fg)]/07 z-0"
          style={{
            right: "22%", top: "38%",
            width: "clamp(60px,8cqw,110px)", height: "clamp(45px,5cqh,80px)",
            transform: "skewX(-10deg)",
          }}
        />
        <div
          className="anim-scale d-4 parallax-layer-1 pointer-events-none absolute bg-[#D10000]/12 z-0"
          style={{
            left: "6%", top: "35%",
            width: "clamp(40px,5cqw,70px)", height: "clamp(35px,4cqh,60px)",
            clipPath: "polygon(0 0, 100% 15%, 85% 100%, 10% 90%)",
          }}
        />
        {/* 中右红色细线 — 已删除 */}
        <div
          className="anim-scale d-4 geo-circle parallax-layer-1 pointer-events-none absolute bg-[#D10000]/25 z-0"
          style={{ right: "30%", top: "36%", width: "10px", height: "10px" }}
        />

        {/* 顶部装饰 */}
        <div
          className="anim-line-x d-1 parallax-layer-1 pointer-events-none absolute bg-[#D10000]/30 z-0"
          style={{ left: "5%", top: "10%", width: "clamp(60px,8cqw,120px)", height: "3px" }}
        />
        <div
          className="anim-scale d-2 parallax-layer-1 pointer-events-none absolute bg-[#D10000]/10 z-0"
          style={{
            right: "20%", top: "14%",
            width: "clamp(50px,6cqw,90px)", height: "clamp(8px,1cqh,14px)",
            transform: "skewX(-25deg)",
          }}
        />
        <div
          className="anim-scale d-3 geo-circle parallax-layer-1 pointer-events-none absolute border-[2px] border-[#D10000]/20 z-0"
          style={{ left: "22%", top: "8%", width: "clamp(16px,2cqw,28px)", height: "clamp(16px,2cqw,28px)" }}
        />

        {/* 右下角构成主义西里尔文 */}
        <span
          className="anim-scale d-3 parallax-layer-1 type-cyrillic pointer-events-none absolute z-0 text-[#8B0000]/12"
          style={{
            right: "2%", bottom: "8%",
            fontSize: "clamp(2rem,4vw,5rem)",
            letterSpacing: "0.15em",
            transform: "skewX(-8deg)",
            lineHeight: 1.1,
            textAlign: "right",
          }}
        >
          МЕТОД<br />—<br />ЭКСПЕРИМЕНТ
        </span>

        <div className="scroll-arrow parallax-layer-2 z-30" />
      </div>

      {/* ====== 移动端 ====== */}
      <div className="lg:hidden relative z-10 flex w-full flex-col px-4 pt-24 pb-16 sm:px-8 sm:pt-28 min-h-dvh">
        {/* 档案编号 — 模块标签样式 */}
        <div className="anim-y-60 font-mono text-xs tracking-widest uppercase mb-6">
          <span style={{
            display: "inline-block",
            width: "clamp(14px, 3cqw, 22px)",
            height: "3px",
            background: "#D10000",
            verticalAlign: "middle",
            marginRight: "0.5em",
          }} />
          <span style={{ color: "var(--fg)", opacity: 0.55 }}>№</span>
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>02</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ B</span>
        </div>
        <div className="anim-y-60 d-1 flex flex-col">
          <span
            className="type-cyrillic text-[#D10000]"
            style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", letterSpacing: "0.3em" }}
          >
            АРХИВ СБОРКИ
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <h2
              className="type-display text-[var(--fg)]"
              style={{
                fontSize: "clamp(2.5rem,8.5vw,5rem)", lineHeight: 0.9, fontWeight: 900,
                transform: "skewX(-4deg)",
              }}
            >
              构建日志
            </h2>
            <span
              className="type-label text-[var(--fg)]/30"
              style={{ fontSize: "clamp(1rem,3vw,1.3rem)", letterSpacing: "0.15em" }}
            >
              BUILD LOG
            </span>
          </div>
        </div>


        <p
          className="anim-y-60 d-2 text-[var(--fg)]/55 mt-5 max-w-md leading-relaxed"
          style={{ fontSize: "clamp(0.9rem,2.5vw,1rem)" }}
        >
          计算机科学课程项目档案。每个项目都是一个从零构建的系统，从底层硬件到上层应用。
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {buildLogProjects.map((project, i) => (
            <Link
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`anim-y-60 group no-underline d-${i + 2} card-hover`}
            >
              {/* 引导提示 — 居中上方 */}
              <div
                className="flex flex-col items-center gap-0.5 select-none pointer-events-none mb-1.5"
                style={{
                  opacity: 0.3,
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "clamp(0.5rem, 2vw, 0.65rem)",
                  color: "var(--fg)",
                  letterSpacing: "0.2em",
                }}
              >
                <span>CLICK HERE</span>
                <span style={{ fontSize: "clamp(0.6rem, 2.2vw, 0.8rem)", lineHeight: 1 }}>↓</span>
              </div>
              <div
                className="border-l-[3px] border-[#D10000]/30 pl-4 py-2
                  hover:border-[#D10000] hover:bg-[#D10000]/8 transition-all duration-200"
              >
                {/* LED 运行指示灯 */}
                <div
                  className="pointer-events-none led-indicator -mt-[6px] mb-1 group-hover:!bg-[#D49800] group-hover:!shadow-[0_0_4px_rgba(212,152,0,0.6)] group-hover:!animate-none"
                  style={{ width: "8px", height: "8px" }}
                />
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="type-cyrillic text-[#D10000]"
                    style={{ fontSize: "clamp(0.95rem,2.3vw,1.15rem)" }}
                  >
                    {project.id}
                  </span>
                  <span
                    className="type-label text-[var(--fg)]/25"
                    style={{ fontSize: "clamp(0.78rem,1.8vw,0.88rem)" }}
                  >
                    {project.discipline}
                  </span>
                </div>
                <h3
                  className="type-display text-[var(--fg)]"
                  style={{ fontSize: "clamp(1.45rem,3.2vw,1.8rem)", lineHeight: 1.25 }}
                >
                  {project.title}
                </h3>
                <span
                  className="type-label text-[var(--fg)]/40 mt-1 block"
                  style={{ fontSize: "clamp(0.85rem,2vw,0.95rem)" }}
                >
                  {project.tech}
                </span>
                <p
                  className="mt-2 text-[var(--fg)]/70 leading-relaxed"
                  style={{ fontSize: "clamp(1rem,2.4vw,1.15rem)" }}
                >
                  {project.desc}
                </p>              </div>
            </Link>
          ))}
        </div>

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
        <div className="absolute z-[1] select-none pointer-events-none" style={{right:"4%",bottom:"4%",fontSize:"clamp(8rem,60vw,28rem)",fontWeight:900,color:"var(--fg)",opacity:.02,lineHeight:.85,letterSpacing:"-0.05em",fontFamily:"var(--font-geist-mono)"}} aria-hidden="true">02</div>
      </div>
    </section>
  );
});
