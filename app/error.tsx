"use client";

/**
 * 全局错误边界 — 构成主义风格
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="bg-paper flex items-center justify-center"
      style={{ height: "100dvh", width: "100%" }}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        {/* 红色大叉 — 构成主义几何 */}
        <div className="relative" style={{ width: "60px", height: "60px" }}>
          <div
            className="absolute bg-[#D10000]"
            style={{
              width: "100%",
              height: "4px",
              top: "50%",
              left: "0",
              transform: "rotate(45deg)",
            }}
          />
          <div
            className="absolute bg-[#D10000]"
            style={{
              width: "100%",
              height: "4px",
              top: "50%",
              left: "0",
              transform: "rotate(-45deg)",
            }}
          />
        </div>

        <h2
          className="type-display text-[var(--fg)]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          出了点问题
        </h2>

        <p className="type-label text-[#8C8C8C]" style={{ fontSize: "0.85rem" }}>
          {error.message || "未知错误"}
        </p>

        <button
          onClick={reset}
          className="type-label border-4 border-[#0D0D0D] bg-[#0D0D0D] px-6 py-3 text-[#F5EDE0] cursor-pointer hover:bg-[#D10000] hover:border-[#D10000] transition-colors duration-200"
          style={{ fontSize: "0.8rem" }}
        >
          重试
        </button>

        <a
          href="/"
          className="type-label text-[#B0B0B0] hover:text-[#D10000] no-underline transition-colors duration-200"
          style={{ fontSize: "0.75rem" }}
        >
          ← 返回首页
        </a>
      </div>
    </div>
  );
}
