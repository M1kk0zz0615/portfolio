"use client";

import { useRef, useState, useEffect, memo, type MutableRefObject } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { usePosterWidth } from "@/app/hooks/usePosterWidth";
import { usePosterParallax } from "@/app/hooks/usePosterParallax";
import { usePosterScale } from "@/app/hooks/usePosterScale";
import { AboutArchiveButton } from "./AboutArchiveButton";
import { AboutPosterTitle } from "./AboutPosterTitle";

interface PosterAboutProps {
  archiveOpen?: boolean;
  onOpenArchive?: () => void;
}

/** 纯客户端 debug 面板 — 避免 SSR hydration 不匹配 */
function DebugPanel({ dbg, scaleRef, contentRef, logoRef, wrapperRef }: {
  dbg: ReturnType<typeof import("@/app/hooks/usePosterWidth").usePosterWidth>;
  scaleRef: MutableRefObject<number>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  logoRef: MutableRefObject<HTMLDivElement | null>;
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const [mounted, setMounted] = useState(false);
  const [info, setInfo] = useState({ scale: 1, vw: 0, cLeft: 0, cRight: 0, cTop: 0, lLeft: 0, lRight: 0, lTop: 0, natW: 0, wrapPos: "", wrapHasTransform: false });

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const content = contentRef.current;
      const logo = logoRef.current;
      const wrapper = wrapperRef.current;
      const cr = content?.getBoundingClientRect();
      const lr = logo?.getBoundingClientRect();
      setInfo({
        scale: scaleRef.current,
        vw: window.innerWidth,
        cLeft: cr ? Math.round(cr.left) : 0,
        cRight: cr ? Math.round(cr.right) : 0,
        cTop: cr ? Math.round(cr.top) : 0,
        lLeft: lr ? Math.round(lr.left) : 0,
        lRight: lr ? Math.round(lr.right) : 0,
        lTop: lr ? Math.round(lr.top) : 0,
        natW: (cr && lr) ? Math.round(Math.max(cr.right, lr.right) - cr.left) : 0,
        wrapPos: wrapper?.style.position || "(default)",
        wrapHasTransform: !!wrapper?.style.transform,
      });
    };
    tick();
    const id = setInterval(tick, 300);
    window.addEventListener("resize", tick);
    return () => { clearInterval(id); window.removeEventListener("resize", tick); };
  }, [scaleRef, contentRef, logoRef, wrapperRef]);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "absolute", left: 8, bottom: 8, zIndex: 9999,
        background: "rgba(0,0,0,0.82)", color: "#0f0", padding: "10px 14px",
        borderRadius: 6, fontFamily: "var(--font-geist-mono)",
        fontSize: "clamp(9px, 1.2cqw, 12px)", lineHeight: 1.55, maxWidth: "94vw",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <div style={{ color: "#FF0", fontWeight: 700, marginBottom: 4 }}>🔍 POSTER ABOUT DEBUG</div>
      <div>vw: <b>{info.vw}</b>px | Scale: <b>{info.scale.toFixed(4)}</b> | 70%vw: <b>{Math.round(info.vw * 0.7)}</b>px</div>
      <div>自然宽度: <b>{info.natW}</b>px | wrapper: <b>{info.wrapPos}</b> | transform: <b>{String(info.wrapHasTransform)}</b></div>
      <div style={{ color: "#0ff", marginTop: 2 }}>📦 内容块: L=<b>{info.cLeft}</b> R=<b>{info.cRight}</b> T=<b>{info.cTop}</b></div>
      <div style={{ color: "#f0f" }}>🖼️ Logo块: L=<b>{info.lLeft}</b> R=<b>{info.lRight}</b> T=<b>{info.lTop}</b></div>
      <div>间隔: <b>{info.lLeft - info.cRight}</b>px | clientW: <b>{dbg.clientWidth}</b>px</div>
    </div>
  );
}

export const PosterAbout = memo(function PosterAbout({ archiveOpen = false, onOpenArchive }: PosterAboutProps) {
  const ref = useScrollReveal<HTMLDivElement>(0.3);
  const dbg = usePosterWidth(ref);
  const [curtainPlayed, setCurtainPlayed] = useState(false);

  // 印版退回后的动画阶段状态机
  type PostPressPhase = 'idle' | 'line-extend' | 'content-reveal' | 'line-retract' | 'done';
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scaleWrapperRef = useRef<HTMLDivElement>(null);
  const [postPressPhase, setPostPressPhase] = useState<PostPressPhase>('idle');
  const [titleWidth, setTitleWidth] = useState(0);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  // 构成主义色块帷幕 Logo 出场动画 — 页面就绪后立即触发
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtainPlayed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 测量标题文字像素宽度（供红线延长目标使用）
  useEffect(() => {
    if (!curtainPlayed || !titleRef.current) return;
    const raf = requestAnimationFrame(() => {
      if (titleRef.current) {
        setTitleWidth(titleRef.current.scrollWidth);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [curtainPlayed]);

  // 红线延长 → 内容展开 → 红线缩回 阶段链
  useEffect(() => {
    if (!curtainPlayed) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 印版退回开始时触发红线延长 (1.15s)
    timers.push(setTimeout(() => setPostPressPhase('line-extend'), 1150));
    // 红线到位后内容展开 (1.40s)
    timers.push(setTimeout(() => setPostPressPhase('content-reveal'), 1400));
    // 内容展开后红线缩回 (1.95s)
    timers.push(setTimeout(() => setPostPressPhase('line-retract'), 1950));
    // 全部完成 (2.15s)
    timers.push(setTimeout(() => setPostPressPhase('done'), 2150));

    return () => timers.forEach(clearTimeout);
  }, [curtainPlayed]);

  // 标题出现后即启用鼠标视差（Archive 抽屉打开时关闭）
  useEffect(() => {
    if (!curtainPlayed || archiveOpen) {
      setParallaxEnabled(false);
      return;
    }
    const timer = setTimeout(() => setParallaxEnabled(true), 1050);
    return () => clearTimeout(timer);
  }, [curtainPlayed, archiveOpen]);

  // 鼠标/陀螺仪视差 — 输入源由 usePosterParallax 仲裁（鼠标优先、陀螺仪兜底）
  usePosterParallax(ref, { enabled: parallaxEnabled, gyroScale: 1.5 });

  // 内容块+Logo 响应式等比缩放 — 空间不足 70% 视口时等比缩小
  const scaleRef = usePosterScale(scaleWrapperRef, contentRef, logoRef, { threshold: 0.7 });

  return (
    <section
      id="poster-about"
      ref={ref}
      className={`poster bg-paper text-[var(--fg)]${archiveOpen ? " archive-open-hero" : ""}${parallaxEnabled ? " parallax-active" : ""}`}
      aria-label="关于迷蔻紫的一切"
    >
      {/* ====== 桌面端 (≥1024px) — 构成主义海报布局 ====== */}
      <div className="hidden lg:contents">

      {/* ═══════════════════════════════════════════
          FRAME SYSTEM — 制图框架 (背景层 bonus)
          ═══════════════════════════════════════════ */}

      {/* 左上角 L 型框架 */}
      <div className="anim-line-x d-4 parallax-layer-3 absolute z-0"
        style={{ left: "3%", top: "3%", width: "clamp(36px, 5cqw, 64px)", height: "3px", background: "var(--fg)", opacity: 0.2 }}
      />
      <div className="anim-line-x d-5 parallax-layer-3 absolute z-0"
        style={{ left: "3%", top: "3%", width: "3px", height: "clamp(36px, 5cqw, 64px)", background: "var(--fg)", opacity: 0.2 }}
      />

      {/* 右侧垂直辅助线（暂时移除） */}
      {/*
      <div
        className="anim-line-x d-2 absolute right-[6%] w-[2px] bg-[var(--fg)] z-0"
        style={{ top: "10%", height: "70%", opacity: 0.2 }}
      />
      */}

      {/* 底部不闭合横线 — 右下方红色段 */}
      <div
        className="anim-line-x d-4 parallax-layer-3 absolute right-[12%] h-[3px] bg-[#D10000] z-0"
        style={{ bottom: "3%", width: "clamp(80px, 14cqw, 180px)", opacity: 0.2 }}
      />

      {/* ── 四角裁切线 ── */}
      {[
        { right: "3%", top: "3%" },
        { left: "3%", bottom: "3%" },
      ].map((pos, i) => (
        <div
          key={i}
          className={`anim-scale d-${i + 2} parallax-layer-3 absolute z-0`}
          style={{ ...pos, width: "clamp(14px, 2cqw, 22px)", height: "clamp(14px, 2cqw, 22px)" }}
        >
          <div style={{ position: "absolute", left: "50%", top: 0, width: "1px", height: "100%", background: "var(--fg)", transform: "translateX(-50%)", opacity: 0.2 }} />
          <div style={{ position: "absolute", top: "50%", left: 0, height: "1px", width: "100%", background: "var(--fg)", transform: "translateY(-50%)", opacity: 0.2 }} />
        </div>
      ))}

      {/* ═══════════════════════════════════════════
          技术制图标记 — 印刷套准 / 对齐 / 坐标
          仅出现在边缘，不进入内容区
          ═══════════════════════════════════════════ */}

      {/* ── Registration Mark · 四角套准标记 ── */}
      {[
        { left: "4%", top: "3.5%" },
        { right: "4%", bottom: "3.5%" },
      ].map((pos, i) => (
        <div
          key={`reg-${i}`}
          className={`anim-scale d-${i + 2} parallax-layer-3 absolute z-0`}
          style={{
            ...pos,
            width: "clamp(16px, 2.2cqw, 24px)",
            height: "clamp(16px, 2.2cqw, 24px)",
          }}
          aria-hidden="true"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid var(--fg)",
              opacity: 0.2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: "1px",
              height: "100%",
              background: "var(--fg)",
              opacity: 0.2,
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
              opacity: 0.2,
              transform: "translateY(-50%)",
            }}
          />
        </div>
      ))}

      {/* ── 不闭合边框 · 右下角 L 型 ── */}
      <div
        className="anim-line-x d-4 parallax-layer-3 absolute z-0"
        style={{
          right: "3%",
          bottom: "3%",
          width: "clamp(36px, 5cqw, 64px)",
          height: "3px",
          background: "var(--fg)",
          opacity: 0.2,
        }}
        aria-hidden="true"
      />
      <div
        className="anim-line-x d-5 parallax-layer-3 absolute z-0"
        style={{
          right: "3%",
          bottom: "3%",
          width: "3px",
          height: "clamp(36px, 5cqw, 64px)",
          background: "var(--fg)",
          opacity: 0.2,
        }}
        aria-hidden="true"
      />

      {/* ── 坐标标记 · 四角字母编号 ── */}
      {[
        { left: "5.5%", top: "4%", label: "A" },
        { right: "5.5%", top: "4%", label: "B" },
        { left: "5.5%", bottom: "5.5%", label: "C" },
        { right: "5.5%", bottom: "5.5%", label: "D" },
      ].map(({ label, ...pos }, i) => (
        <div
          key={`coord-${i}`}
          className={`anim-y-60 d-${i + 2} parallax-layer-3 absolute z-0`}
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

      {/* ── 西里尔文档案标注 · 左缘 ── */}
      <div
        className="anim-y-60 d-4 parallax-layer-2 absolute z-[2] select-none"
        style={{
          left: "4%",
          top: "72%",
          fontSize: "clamp(0.85rem, 1cqw, 1.1rem)",
          fontFamily: "var(--font-geist-mono)",
          color: "var(--fg)",
          letterSpacing: "0.3em",
          transform: "rotate(90deg)",
          transformOrigin: "left top",
          whiteSpace: "nowrap",
          opacity: 0.2,
        }}
        aria-hidden="true"
      >
        АРХИВ 01
      </div>

      {/* Rodchenko 式大圆 — 标题与 Logo 之间，背景层 */}
      <div
        className="anim-scale d-4 parallax-layer-1 absolute z-[1] pointer-events-none"
        style={{
          right: "25%",
          top: "22%",
          width: "clamp(120px, 16cqw, 220px)",
          height: "clamp(120px, 16cqw, 220px)",
          borderRadius: "50%",
          border: "3px solid #D10000",
          opacity: 0.06,
        }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════
          CONSTRUCTIVIST GRAPHICS — 构成主义图形
          ═══════════════════════════════════════════ */}

      {/* 左侧红色粗竖条 — 沿左边缘，Rodchenko 式结构锚 */}
      <div
        className="anim-line-x d-3 parallax-layer-2 absolute left-[3%] w-[4px] bg-[#D10000] z-[1]"
        style={{ top: "16%", height: "28%", opacity: 0.10 }}
      />

      {/* 红色水平对齐线 */}
      <div
        className="anim-line-x d-3 parallax-layer-2 absolute left-0 h-[2px] bg-[#D10000] z-[1]"
        style={{ top: "28%", width: "22%", opacity: 0.12 }}
      />

      {/* 第二条红水平线 */}
      <div
        className="anim-line-x d-4 parallax-layer-2 absolute left-[3%] h-[2px] bg-[#D10000] z-[1]"
        style={{ top: "47%", width: "16%", opacity: 0.10 }}
      />

      {/* 状态文字 — 两条红线之间 */}
      <div
        className="anim-y-60 d-4 parallax-layer-1 absolute z-[5] select-none"
        style={{
          left: "clamp(2rem, 5cqw, 5.5rem)",
          top: "30%",
          fontSize: "clamp(0.65rem, 0.78cqw, 0.85rem)",
          fontFamily: "var(--font-geist-mono)",
          color: "var(--fg)",
          opacity: 0.10,
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
        className="anim-scale d-3 parallax-layer-3 absolute z-[1]"
        style={{ right: "6%", top: "20%", width: "clamp(18px, 2.5cqw, 32px)", height: "clamp(18px, 2.5cqw, 32px)", background: "var(--fg)", opacity: 0.10 }}
      />

      {/* 网格点阵 — 沿右辅助线 */}
      {[0.18, 0.35, 0.55, 0.72].map((ratio, i) => (
        <div
          key={i}
          className={`anim-scale d-${i + 3} parallax-layer-2 absolute z-[1]`}
          style={{
            right: "calc(6% - 2px)",
            top: `${10 + ratio * 70}%`,
            width: "6px",
            height: "6px",
            background: i % 2 === 0 ? "#D10000" : "var(--fg)",
            opacity: 0.10,
          }}
        />
      ))}


      {/* 左上 L 角内侧黑锚点 */}
      <div
        className="anim-scale d-3 parallax-layer-2 absolute z-[1]"
        style={{
          left: "calc(3% + clamp(36px, 5cqw, 64px) + 10px)",
          top: "calc(1% + clamp(36px, 5cqw, 64px) - 6px)",
          width: "10px", height: "10px", background: "var(--fg)", opacity: 0.12,
        }}
      />

      {/* 左侧中部黑色半透明块 — 对冲右侧 Logo 体量 */}
      <div
        className="anim-scale d-3 parallax-layer-1 absolute z-[1]"
        style={{
          left: "4%", top: "55%", width: "clamp(30px, 4cqw, 50px)", height: "clamp(50px, 8cqw, 100px)",
          background: "var(--fg)", opacity: 0.06,
        }}
      />

      {/* ═══════════════════════════════════════════
          EDITORIAL SYSTEM — 编辑设计系统
          ═══════════════════════════════════════════ */}

      {/* 左侧竖排文字 — 背景层 */}
      <div
        className="anim-y-60 d-3 parallax-layer-1 absolute z-[5] type-cyrillic select-none flex flex-col"
        style={{
          left: "clamp(0.5rem, 1cqw, 1rem)",
          top: "14%",
          fontSize: "clamp(0.6rem, 0.75cqw, 0.75rem)",
          letterSpacing: "0.4em",
          color: "var(--fg)",
          opacity: 0.10,
          writingMode: "vertical-rl",
          gap: "0.5em",
        }}
      >
        <span>ЛИЧНЫЙ</span>
        <span>АРХИВ</span>
        <span>2026</span>
      </div>

      {/* 右下角坐标 — 背景层 */}
      <div
        className="anim-y-60 d-4 parallax-layer-3 absolute z-[5] type-label select-none flex items-baseline gap-3"
        style={{
          right: "clamp(1rem, 2.5cqw, 3rem)",
          bottom: "2.2%",
          fontSize: "clamp(0.55rem, 0.65cqw, 0.7rem)",
          letterSpacing: "0.15em",
          color: "var(--fg)",
          opacity: 0.12,
        }}
      >
        <span>N 23° 08′</span>
        <span style={{ width: "1px", height: "0.8em", background: "#D10000", opacity: 0.6 }} />
        <span>E 113° 22′</span>
      </div>

      {/* 时间编码 — 背景层 */}
      <div
        className="anim-y-60 d-5 parallax-layer-3 absolute z-[5] type-label select-none"
        style={{
          left: "clamp(1rem, 2.5cqw, 3rem)",
          bottom: "2.2%",
          fontSize: "clamp(0.55rem, 0.6cqw, 0.65rem)",
          letterSpacing: "0.12em",
          color: "var(--fg)",
          opacity: 0.12,
        }}
      >
        2026-06-15 / REV A
      </div>

      {/* ====== 原有元素 ====== */}

      {/* 档案编号 — 模块标签样式 */}
      <div
        className="anim-y-60 parallax-layer-3 z-20 font-mono text-xs tracking-widest uppercase
          absolute left-[clamp(1.5rem,6cqw,8%)] top-[19%]"
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
          pl-[30px] pr-6 pt-[12rem] pb-24
          xl:pt-[16rem]"
      >
        {/* ═══════ 缩放包装容器 — 内容块+Logo 响应式等比缩放 ═══════ */}
        <div ref={scaleWrapperRef} style={{ transformOrigin: "50% 0" }}>

        {/* 标题 + 简介 + 按钮 — absolute 定位 */}
        <div ref={contentRef} className="absolute flex flex-col" style={{ top: "33%", left: "72px", maxWidth: "58cqw" }}>
          <AboutPosterTitle ref={titleRef} printed={curtainPlayed} />

          <div
            className="press-red-line ml-2"
            style={{
              height: "5px",
              background: "#D10000",
              marginTop: "1.5rem",
              marginBottom: "0.3rem",
              opacity: postPressPhase === 'idle' ? 0 : 1,
              '--line-width': (postPressPhase === 'line-extend' || postPressPhase === 'content-reveal') && titleWidth > 0
                ? `${titleWidth}px`
                : 'clamp(48px, 6cqw, 80px)',
              width: 'var(--line-width)',
            } as React.CSSProperties}
            aria-hidden="true"
          />

          <p className={`press-reveal-text mt-5 max-w-lg tracking-wide text-[var(--fg)] ml-2${postPressPhase !== 'idle' && postPressPhase !== 'line-extend' ? ' revealed' : ''}`} style={{ fontFamily: "var(--font-noto-sc-light), \"PingFang SC\", \"Microsoft YaHei\", \"Heiti SC\", sans-serif", fontSize: "1.7rem" }}>
            计算机学生 / 摄影师 / 影像创作者
          </p>

          <p className={`press-reveal-text press-reveal-d1 mt-2 max-w-xl leading-relaxed text-[var(--gray-dark)]/80 ml-2${postPressPhase !== 'idle' && postPressPhase !== 'line-extend' ? ' revealed' : ''}`} style={{ fontFamily: "var(--font-noto-sc-light), \"PingFang SC\", \"Microsoft YaHei\", \"Heiti SC\", sans-serif", fontSize: "1.45rem" }}>
            用胶片与像素，记录在场与想象
          </p>

          <div className={`press-reveal-text press-reveal-d2 flex justify-start mt-5${postPressPhase !== 'idle' && postPressPhase !== 'line-extend' ? ' revealed' : ''}`}>
            <AboutArchiveButton onClick={onOpenArchive} />
          </div>
        </div>

        {/* Logo 图案 — 桌面端 absolute，右移对齐主标题 */}
        <div
          ref={logoRef}
          className="flex-shrink-0 flex items-end justify-end
            absolute right-[6%] top-[18%] h-[42%] w-[38%]
            xl:w-[48%]"
        >
          {/* ═══════════════════════════════════════════
              LOGO 背景构成 — 构成主义矩形 (背景层)
              ═══════════════════════════════════════════ */}

          {/* 黑色矩形 — 帷幕下片：初始上移覆盖 → 下移分开 → 归位 */}
          <div
            className={`block-curtain-black absolute w-[62%] h-[48%] lg:w-[340px] lg:h-[180px]${curtainPlayed ? " animate" : ""}`}
            style={{
              left: "28%",
              bottom: "5%",
              background: "var(--fg)",
            }}
          />

          {/* 红色裁切矩形 — 帷幕上片：初始下移覆盖 → 上移分开 → 归位 */}
          <div
            className={`block-curtain-red absolute w-[48%] h-[42%] lg:w-[260px] lg:h-[160px]${curtainPlayed ? " animate" : ""}`}
            style={{
              right: "10%",
              top: "8%",
              background: "#D10000",
              clipPath: "polygon(0 0, 100% 0, 100% 72%, 75% 100%, 0 100%)",
            }}
          />

          <div className="relative z-10" style={{ width: "min(420px, 32vw)", maxWidth: "95vw" }}>
            <img
              src="/mikkologo/miko.webp"
              alt="Mikko"
              className={`relative w-full h-auto${curtainPlayed ? " logo-reveal" : ""}`}
              style={curtainPlayed ? undefined : { opacity: 0 }}
            />
          </div>

        </div>

        </div>{/* 缩放包装容器结束 */}

        {/* 弹性占位 — 吸收剩余高度，驱动按钮保持在内容自然位置 */}
        <div className="flex-1 min-h-0" aria-hidden="true" />

      </div>

      {/* ═══════════════════════════════════════════
          印刷编号 — 右下角超大低透明度
          杂志封面式背景信息层，非按钮/标签
          用 cqw 断点：poster ~1445px 时 31cqw=28rem 开始缩小，至 ~1135px 触底 22rem
          ═══════════════════════════════════════════ */}
      <div
        className="parallax-layer-2 absolute z-[1] select-none"
        style={{
          right: "3.5%",
          bottom: "0.5%",
          fontSize: "clamp(22rem, 31cqw, 28rem)",
          fontWeight: 900,
          color: "var(--fg)",
          opacity: 0.02,
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
        className="anim-y-60 d-2 parallax-layer-2 type-cyrillic absolute z-10 text-[var(--fg)] select-none"
        style={{
          right: "8%",
          bottom: "18%",
          fontSize: "clamp(0.7rem, 1cqw, 0.85rem)",
          opacity: 0.2,
        }}
      >
        ВСЁ ОБО МНЕ
      </span>

      {/* 滚动引导文字 */}
      <div
        className="parallax-layer-2 absolute left-1/2 z-30 select-none"
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
      <div className="scroll-arrow parallax-layer-2 z-30" />

      </div>{/* 桌面端结束 */}

      {/* ====== 移动端+平板 (<1024px) — flex-col 纵向布局 ====== */}
      <div className="lg:hidden relative z-10 flex w-full flex-col px-4 pt-16 sm:px-8 sm:pt-20 min-h-dvh">
        {/* 档案编号 */}
        <div className="anim-y-60 self-start font-mono text-xs tracking-widest uppercase mb-8">
          <span style={{
            display: "inline-block",
            width: "clamp(14px, 3cqw, 22px)",
            height: "3px",
            background: "#D10000",
            verticalAlign: "middle",
            marginRight: "0.5em",
          }} />
          <span style={{ color: "var(--fg)", opacity: 0.55 }}>№</span>
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>01</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ A</span>
        </div>

        {/* 标题 — 两行排版 */}
        <h1
          className="type-display select-none flex flex-col"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 4rem)",
            lineHeight: 0.9,
            marginBottom: "1.5rem",
          }}
        >
          <span className="leading-none" style={{ letterSpacing: "-0.02em" }}>
            关于
          </span>
          <span className="leading-none" style={{ letterSpacing: "-0.02em" }}>
            迷蔻紫的一切
          </span>
        </h1>

        {/* 身份描述 */}
        <p className="anim-y-60 d-1 font-mono text-base tracking-wide text-[var(--gray-dark)] mb-3">
          计算机学生 / 摄影师 / 影像创作者
        </p>

        {/* 副标题 */}
        <p className="anim-y-60 d-2 text-lg leading-relaxed text-[var(--gray-dark)]/80 mb-8">
          用胶片与像素，记录在场与想象
        </p>

        {/* 按钮 — 自然流内 */}
        <div className="anim-y-60 d-3 flex justify-start gap-3 mb-8">
          <AboutArchiveButton onClick={onOpenArchive} />
        </div>

        {/* Logo — 流内居中 */}
        <div className="anim-y-60 d-2 flex items-center justify-center mt-4 mb-6">
          <div style={{ width: "min(280px, 65vw)" }}>
            <img
              src="/mikkologo/miko.webp"
              alt="Mikko"
              className="relative w-full h-auto"
            />
          </div>
        </div>

        {/* ═══════════ 移动端制图标识 ═══════════ */}

        {/* 四角裁切线 */}
        {[{left:"3%",top:"3%"},{right:"3%",top:"3%"},{left:"3%",bottom:"3%"},{right:"3%",bottom:"3%"}].map((p,i)=>
          <div key={`cm-${i}`} className="parallax-layer-3 absolute z-0" style={{...p,width:"clamp(10px,3vw,16px)",height:"clamp(10px,3vw,16px)"}} aria-hidden="true">
            <div style={{position:"absolute",left:"50%",top:0,width:"1px",height:"100%",background:"var(--fg)",opacity:0.10,transform:"translateX(-50%)"}} />
            <div style={{position:"absolute",top:"50%",left:0,height:"1px",width:"100%",background:"var(--fg)",opacity:0.10,transform:"translateY(-50%)"}} />
          </div>
        )}

        {/* ABCD 坐标字母 */}
        {[{left:"3.5%",top:"4%",v:"A"},{right:"3.5%",top:"4%",v:"B"},{left:"3.5%",bottom:"3.5%",v:"C"},{right:"3.5%",bottom:"3.5%",v:"D"}].map(({v,...p},i)=>
          <div key={`abc-${i}`} className="parallax-layer-2 absolute z-0 select-none" style={{...p,fontSize:"clamp(0.45rem,2vw,0.6rem)",fontFamily:"var(--font-geist-mono)",color:"var(--fg)",opacity:0.10,letterSpacing:"0.05em"}} aria-hidden="true">{v}</div>
        )}

        {/* 超大编号水印 */}
        <div className="parallax-layer-1 absolute z-[1] select-none pointer-events-none" style={{right:"4%",bottom:"4%",fontSize:"clamp(8rem,60vw,28rem)",fontWeight:900,color:"var(--fg)",opacity:.02,lineHeight:.85,letterSpacing:"-0.05em",fontFamily:"var(--font-geist-mono)"}} aria-hidden="true">01</div>

        {/* 俄文标注 */}
        <span className="parallax-layer-2 type-cyrillic text-[var(--fg)] text-center select-none"
          style={{ fontSize: "clamp(0.65rem, 2.5vw, 0.8rem)", letterSpacing: "0.3em", opacity: 0.2 }}>
          ВСЁ ОБО МНЕ
        </span>
      </div>{/* 移动端结束 */}

      {/* ═══════════════════════════════════════════
          DEBUG PANEL — iPad 诊断 (false 隐藏，改 true 恢复)
          ═══════════════════════════════════════════ */}
      {false && <DebugPanel dbg={dbg} scaleRef={scaleRef} contentRef={contentRef} logoRef={logoRef} wrapperRef={scaleWrapperRef} />}
    </section>
  );
});
