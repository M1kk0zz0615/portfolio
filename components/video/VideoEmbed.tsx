"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface VideoEmbedProps {
  /** B站视频完整链接，如 https://www.bilibili.com/video/BV1NYwYzoEtD */
  href: string;
  title: string;
  onClose: () => void;
}

/** 从 B 站链接提取 BV 号 */
function extractBvid(href: string): string | null {
  // 匹配 BV 号: BV + 10位字母数字
  const match = href.match(/BV[a-zA-Z0-9]{10}/);
  return match ? match[0] : null;
}

export function VideoEmbed({ href, title, onClose }: VideoEmbedProps) {
  const bvid = extractBvid(href);

  // ESC 关闭
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ background: "rgba(13,13,13,0.92)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`播放: ${title}`}
    >
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 type-cyrillic text-[var(--paper-cream)]/60 hover:text-[#D10000] transition-colors duration-200"
        style={{ fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)", background: "none", border: "none", cursor: "pointer" }}
        aria-label="关闭"
      >
        ✕ ЗАКРЫТЬ
      </button>

      {/* 播放器容器 — 16:9 响应式 */}
      <div
        className="relative"
        style={{ width: "min(90vw, 960px)", aspectRatio: "16/9" }}
        onClick={(e) => e.stopPropagation()}
      >
        {bvid ? (
          <iframe
            src={`//player.bilibili.com/player.html?bvid=${bvid}&page=1&autoplay=0&danmaku=0`}
            scrolling="no"
            frameBorder="no"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "1px solid rgba(209,0,0,0.3)" }}
            title={title}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--fg)] text-[var(--paper-cream)] type-label">
            无法解析视频链接
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
