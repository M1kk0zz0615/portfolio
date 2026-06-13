"use client";

import Link from "next/link";

interface VideoCardProps {
  title: string;
  description: string;
  platform: "Bilibili" | "视频号";
  /** 填写视频链接后自动变为可点击状态 */
  href?: string;
  delay: string;
}

function VideoPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-light)]">
      {/* 胶片齿孔装饰 */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around" style={{ width: "8px", padding: "12% 0" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="geo-circle bg-[var(--bg)]" style={{ width: "4px", height: "4px", opacity: 0.5 }} />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around" style={{ width: "8px", padding: "12% 0" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="geo-circle bg-[var(--bg)]" style={{ width: "4px", height: "4px", opacity: 0.5 }} />
        ))}
      </div>

      {/* 播放三角 */}
      <div
        className="geo-circle relative flex items-center justify-center"
        style={{
          width: "clamp(36px, 5vw, 56px)",
          height: "clamp(36px, 5vw, 56px)",
          border: "2px solid var(--red)",
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "clamp(6px, 1vw, 10px) solid transparent",
            borderBottom: "clamp(6px, 1vw, 10px) solid transparent",
            borderLeft: "clamp(10px, 1.5vw, 16px) solid var(--red)",
            marginLeft: "3px",
          }}
        />
      </div>

      {/* 对角线装饰 */}
      <div
        className="absolute bg-[#D10000]/10"
        style={{ width: "60%", height: "2px", transform: "rotate(15deg)" }}
      />
      <div
        className="absolute bg-[var(--fg)]/06"
        style={{ width: "40%", height: "2px", transform: "rotate(-10deg)" }}
      />
    </div>
  );
}

export function VideoCard({ title, description, platform, href, delay }: VideoCardProps) {
  const isClickable = !!href;

  const card = (
    <div className={`anim-y-60 ${delay} group cursor-${isClickable ? "pointer" : "default"}`}>
      {/* 封面 — 16:9 */}
      <div className="photo-montage relative w-full overflow-hidden border border-[var(--fg)]/08" style={{ aspectRatio: "16/9" }}>
        <VideoPlaceholder />
        <div className="duotone-overlay" />

        {/* 平台标签 */}
        <span
          className="type-label absolute z-10 text-[var(--paper-cream)] px-2 py-0.5"
          style={{
            top: "8px",
            right: "8px",
            fontSize: "clamp(0.55rem, 0.7vw, 0.65rem)",
            background: platform === "Bilibili" ? "var(--red)" : "var(--fg)",
            opacity: 0.85,
          }}
        >
          {platform}
        </span>

        {/* hover 播放提示 */}
        {isClickable && (
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(13,13,13,0.35)" }}>
            <div className="geo-circle flex items-center justify-center" style={{ width: "48px", height: "48px", border: "2px solid var(--paper-cream)" }}>
              <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "12px solid var(--paper-cream)", marginLeft: "3px" }} />
            </div>
          </div>
        )}
      </div>

      {/* 信息 */}
      <div className="mt-3 flex items-start gap-3">
        <span className="bg-[#D10000] shrink-0 mt-[0.4em]" style={{ width: "12px", height: "3px" }} />
        <div>
          <h3
            className="type-display"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)", lineHeight: 1.2 }}
          >
            {title}
          </h3>
          <p
            className="type-label text-[#5C5044] mt-1"
            style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
          >
            {description}
          </p>
          {!isClickable && (
            <span
              className="type-label text-[#B0B0B0] mt-1 inline-block"
              style={{ fontSize: "clamp(0.55rem, 0.7vw, 0.65rem)" }}
            >
              链接待补充
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isClickable) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline text-[var(--fg)]">
        {card}
      </a>
    );
  }

  return card;
}
