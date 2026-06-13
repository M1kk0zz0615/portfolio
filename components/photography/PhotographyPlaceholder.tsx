"use client";

import { useState, useRef } from "react";
import { Lightbox } from "@/components/Lightbox";

type PlaceholderVariant = "hero" | "documentary" | "creative" | "commissioned" | "color" | "bw" | "landscape" | "street";

interface PhotographyPlaceholderProps {
  variant: PlaceholderVariant;
  /** 真实照片路径，传入后显示照片而非占位图案 */
  src?: string;
  clip?: "tl" | "br" | "tr";
  className?: string;
  style?: React.CSSProperties;
}

function InnerPattern({ variant }: { variant: PlaceholderVariant }) {
  switch (variant) {
    case "hero":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-light)]">
          <div
            className="geo-circle absolute"
            style={{
              width: "48%",
              height: "48%",
              border: "2px solid",
              borderColor: "var(--red)",
              opacity: 0.4,
              background:
                "radial-gradient(circle, rgba(209,0,0,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="geo-circle absolute"
            style={{
              width: "28%",
              height: "28%",
              border: "1px solid",
              borderColor: "var(--red)",
              opacity: 0.25,
            }}
          />
        </div>
      );

    case "documentary":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-light)]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(13,13,13,0.08) 28px, rgba(13,13,13,0.08) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(13,13,13,0.08) 28px, rgba(13,13,13,0.08) 29px)",
            }}
          />
          <div
            className="absolute bg-[#D10000]"
            style={{ left: "32%", top: "38%", width: "10px", height: "10px" }}
          />
        </div>
      );

    case "creative":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-light)]">
          <div
            className="absolute"
            style={{
              width: "55%",
              height: "45%",
              border: "2px solid",
              borderColor: "var(--red)",
              opacity: 0.3,
              background: "rgba(209,0,0,0.08)",
              transform: "rotate(-20deg)",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "45%",
              height: "55%",
              border: "2px solid",
              borderColor: "var(--red)",
              opacity: 0.3,
              background: "rgba(209,0,0,0.06)",
              transform: "rotate(15deg)",
            }}
          />
        </div>
      );

    case "commissioned":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-light)]">
          <div
            className="absolute"
            style={{
              inset: "8%",
              border: "2px solid",
              borderColor: "var(--fg)",
              opacity: 0.12,
            }}
          />
          <div
            className="absolute"
            style={{
              width: "60%",
              height: "60%",
              border: "1px solid",
              borderColor: "var(--red)",
              opacity: 0.2,
            }}
          />
          <div
            className="geo-circle absolute bg-[#D10000]"
            style={{ width: "6px", height: "6px", opacity: 0.6 }}
          />
        </div>
      );

    case "color":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-light)]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(30deg, transparent, transparent 16px, rgba(209,0,0,0.06) 16px, rgba(209,0,0,0.06) 18px)",
            }}
          />
          <div
            className="geo-circle absolute"
            style={{
              width: "40%",
              height: "40%",
              border: "2px solid var(--red)",
              opacity: 0.25,
            }}
          />
        </div>
      );

    case "landscape":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-light)]">
          <div
            className="absolute"
            style={{
              width: "50%",
              height: "40%",
              border: "2px solid var(--red)",
              opacity: 0.25,
            }}
          />
          <div
            className="absolute"
            style={{
              left: 0,
              bottom: "30%",
              width: "100%",
              height: "3px",
              background: "var(--red)",
              opacity: 0.3,
            }}
          />
        </div>
      );

    case "street":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-light)]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(209,0,0,0.08) 12px, rgba(209,0,0,0.08) 14px)",
            }}
          />
          <div
            className="absolute bg-[#D10000]"
            style={{ width: "8px", height: "24px", opacity: 0.4 }}
          />
        </div>
      );

    case "bw":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--gray-light)]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(13,13,13,0.06) 20px, rgba(13,13,13,0.06) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(13,13,13,0.06) 20px, rgba(13,13,13,0.06) 21px)",
            }}
          />
          <div
            className="absolute bg-[var(--fg)]"
            style={{ width: "12px", height: "12px", opacity: 0.15 }}
          />
        </div>
      );
  }
}

export function PhotographyPlaceholder({
  variant,
  src,
  clip,
  className = "",
  style,
}: PhotographyPlaceholderProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (src && containerRef.current) {
      setOriginRect(containerRef.current.getBoundingClientRect());
      setLightboxOpen(true);
    }
  };

  const clipClass =
    clip === "tl"
      ? "clip-angle-tl"
      : clip === "br"
        ? "clip-angle-br"
        : clip === "tr"
          ? "clip-angle-tr"
          : "";

  return (
    <>
      <div
        ref={containerRef}
        className={`photo-montage ${clipClass} absolute bg-[var(--bg-muted)] cursor-pointer z-[5] ${className}`}
        style={{
          transition: "transform 0.3s cubic-bezier(0.2,0,0,1)",
          ...style,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
        onMouseLeave={(e) => {
          if (style?.transform) {
            e.currentTarget.style.transform = style.transform as string;
          } else {
            e.currentTarget.style.transform = "";
          }
        }}
        onClick={handleClick}
      >
        {src ? (
          <img
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${variant === "color" ? "photo-img--color" : ""}`}
          />
        ) : (
          <InnerPattern variant={variant} />
        )}
        {/* 彩色照片不加 duotone overlay */}
        {variant !== "color" && <div className="duotone-overlay" />}
      </div>

      {lightboxOpen && src && originRect && (
        <Lightbox src={src} originRect={originRect} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}
