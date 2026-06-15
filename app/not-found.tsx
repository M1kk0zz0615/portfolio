import Link from "next/link";

/**
 * 404 页面 — 构成主义风格
 */
export default function NotFound() {
  return (
    <div
      className="bg-paper flex items-center justify-center"
      style={{ height: "100dvh", width: "100%" }}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        {/* 几何 — 空心黑方 + 红圆 */}
        <div className="relative" style={{ width: "80px", height: "80px" }}>
          <div
            className="absolute border-[4px] border-[var(--fg)]"
            style={{ inset: "0" }}
          />
          <div
            className="geo-circle absolute bg-[#D10000]"
            style={{
              right: "-8px",
              bottom: "-8px",
              width: "18px",
              height: "18px",
            }}
          />
        </div>

        <h1
          className="type-display text-[#D10000]"
          style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
        >
          404
        </h1>

        <p
          className="type-display text-[var(--fg)]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          页面不存在
        </p>

        <p className="type-label text-[#B0B0B0]" style={{ fontSize: "0.8rem" }}>
          这张海报还没印出来
        </p>

        <Link
          href="/"
          className="type-label mt-4 border-4 border-[var(--fg)] bg-[var(--fg)] px-7 py-3.5 text-[var(--paper-cream)] no-underline hover:bg-[#D10000] hover:border-[#D10000] transition-colors duration-200 shadow-[4px_4px_0_0_#D10000] hover:shadow-[6px_6px_0_0_var(--fg)]"
          style={{ fontSize: "0.8rem" }}
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
