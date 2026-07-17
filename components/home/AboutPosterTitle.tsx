import { forwardRef } from "react";

interface AboutPosterTitleProps {
  /** 触发印刷式入场动画 */
  printed?: boolean;
}

export const AboutPosterTitle = forwardRef<HTMLHeadingElement, AboutPosterTitleProps>(
  function AboutPosterTitle({ printed = false }, ref) {
    return (
      <div className={`title-print-stage relative inline-flex flex-col self-start overflow-hidden${printed ? " animate" : ""}`}>
        {/* 红褐色印版 — 内联 translateX 兜底确保初始在框外，CSS 动画接管后覆盖 */}
        <div
          className="title-press-bar absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background: "#3D3228",
            transform: "translateX(-110%)",
          }}
          aria-hidden="true"
        />

        {/* 标题文字 — 印版停下后瞬间出现 */}
        <h1
          ref={ref}
          className="type-display flex flex-col gap-[0.15em] text-[var(--fg)] select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(2.6rem, 7.1vw, 5.8rem)",
            lineHeight: 0.9,
            opacity: printed ? undefined : 0,
          }}
        >
          <span className="leading-none" style={{ letterSpacing: "0.02em" }}>
            关于
          </span>
          <span className="leading-none" style={{ letterSpacing: "0.02em", marginTop: "0.08em" }}>
            迷蔻紫的一切
          </span>
        </h1>
      </div>
    );
  }
);
