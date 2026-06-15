"use client";

/**
 * 全局 Loading UI — 在页面 JS 加载期间展示
 * 构成主义风格骨架屏，匹配视觉系统
 */
export default function Loading() {
  return (
    <div
      className="bg-paper flex items-center justify-center"
      style={{ height: "100dvh", width: "100%", position: "fixed", inset: 0, zIndex: 9998 }}
      aria-label="加载中"
      role="status"
    >
      {/* 极简几何加载指示器 — 符合构成主义设计语言 */}
      <div className="flex flex-col items-center gap-6 select-none">
        {/* 红色旋转方块 — 不是 spinner，是构成主义几何 */}
        <div
          className="bg-[#D10000]"
          style={{
            width: "32px",
            height: "32px",
            animation: "geoLoading 1.2s linear infinite",
          }}
        />
        <span
          className="type-cyrillic text-[#B0B0B0]"
          style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
        >
          ЗАГРУЗКА
        </span>
      </div>
    </div>
  );
}
