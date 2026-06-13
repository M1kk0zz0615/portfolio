"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface LightboxProps {
  src: string;
  originRect: DOMRect;
  onClose: () => void;
}

export function Lightbox({ src, originRect, onClose }: LightboxProps) {
  const [phase, setPhase] = useState<"enter" | "active" | "exit">("enter");
  const [zoom, setZoom] = useState(1);
  const [flipDone, setFlipDone] = useState(false); // FLIP 动画结束后关闭 transform transition

  // 拖拽/平移状态
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panAtDragStartState = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  const [dragging, setDragging] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  // 关闭流程
  const close = useCallback(() => {
    setPhase("exit");
    setTimeout(onClose, 350);
  }, [onClose]);

  // ESC 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [close]);

  // 入场：下一帧切换 phase，触发 FLIP transform 过渡
  // FLIP 完成后（400ms）关闭 transform transition，后续拖拽/缩放即时响应
  useEffect(() => {
    const raf = requestAnimationFrame(() => setPhase("active"));
    const timer = setTimeout(() => setFlipDone(true), 420);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  // —— FLIP 计算 ————————
  // 终点 = 屏幕居中，等比缩放至 90vw / 90vh
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxW = vw * 0.9;
  const maxH = vh * 0.9;
  const scaleW = maxW / originRect.width;
  const scaleH = maxH / originRect.height;
  const fitScale = Math.min(scaleW, scaleH);

  // 图片始终定位在原点位置，FLIP 靠 transform 完成
  const baseLeft = originRect.left;
  const baseTop = originRect.top;
  const baseW = originRect.width;
  const baseH = originRect.height;

  // 从 origin → center 的位移 & 缩放（transformOrigin: center center）
  const flipT = phase === "active"
    ? {
        x: vw / 2 - (baseLeft + baseW / 2),
        y: vh / 2 - (baseTop + baseH / 2),
        s: fitScale,
      }
    : { x: 0, y: 0, s: 1 };

  // —— 缩放 ——————————————————
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom(prev => {
      const next = Math.min(5, Math.max(0.5, prev + delta));
      if (next <= 1.05) {
        setPan({ x: 0, y: 0 });
      }
      return next;
    });
  }, []);

  // —— 拖拽（RAF 节流，latestMouse ref 保证跟手）————
  const rafId = useRef(0);
  const latestMouse = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1.05) return;
    e.stopPropagation();
    e.preventDefault();
    isDragging.current = true;
    hasDragged.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panAtDragStartState.current = pan;
    latestMouse.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
  }, [zoom, pan]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      // 每次 mousemove 都更新最新鼠标位置
      latestMouse.current = { x: e.clientX, y: e.clientY };
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        hasDragged.current = true;
      }
      // RAF 保证每帧只更新一次，但始终用最新鼠标位置
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          setPan({
            x: panAtDragStartState.current.x + (latestMouse.current.x - dragStart.current.x),
            y: panAtDragStartState.current.y + (latestMouse.current.y - dragStart.current.y),
          });
          rafId.current = 0;
        });
      }
    };
    const onUp = () => {
      isDragging.current = false;
      setDragging(false);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // —— 单击 ——————————————————
  const handleImgClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDragged.current) return;
    if (zoom > 1.05) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      close();
    }
  }, [zoom, close]);

  // —— 图片样式 ——————————————
  // transform 合并：translate 在前 scale 在后，pan 不受 scale 影响 = 1:1 跟手
  const totalX = flipT.x + pan.x;
  const totalY = flipT.y + pan.y;
  const totalScale = flipT.s * zoom;
  const imgTransform = `translate(${totalX}px, ${totalY}px) scale(${totalScale})`;

  const lightbox = (
    <div
      className="fixed inset-0 z-[9999] cursor-pointer"
      style={{
        background: phase === "exit"
          ? "rgba(13,13,13,0)"
          : "rgba(13,13,13,0.95)",
        transition: "background 0.35s cubic-bezier(0.2,0,0,1)",
        // 用 will-change 告知浏览器即将合成，避免首次绘制延迟
        willChange: "background",
      }}
      onClick={close}
      onWheel={handleWheel}
      aria-label="关闭全屏预览"
      role="dialog"
      aria-modal="true"
    >
      {/* 几何装饰 — 四角 */}
      <div
        className="absolute left-6 top-6 flex items-center gap-2 transition-opacity duration-300"
        style={{ opacity: phase === "active" ? 1 : 0 }}
      >
        <div className="bg-[#D10000]" style={{ width: "24px", height: "3px" }} />
        <div className="bg-[#D10000]" style={{ width: "8px", height: "8px" }} />
      </div>
      <div
        className="absolute right-6 bottom-6 flex items-center gap-2 transition-opacity duration-300"
        style={{ opacity: phase === "active" ? 1 : 0 }}
      >
        <div className="bg-[#D10000]" style={{ width: "8px", height: "8px" }} />
        <div className="bg-[#D10000]" style={{ width: "24px", height: "3px" }} />
      </div>

      {/* 照片 — FLIP by transform（GPU 合成层），不再触发 layout */}
      <img
        ref={imageRef}
        src={src}
        alt=""
        draggable={false}
        className="fixed object-contain select-none"
        style={{
          left: baseLeft,
          top: baseTop,
          width: baseW,
          height: baseH,
          transform: imgTransform,
          transformOrigin: "center center",
          transition: phase === "exit"
            ? "transform 0.35s cubic-bezier(0.2,0,0,1), opacity 0.3s linear"
            : !flipDone
              ? "transform 0.4s cubic-bezier(0.2,0,0,1), opacity 0.2s linear"
              : "opacity 0.2s linear",
          opacity: phase === "enter" ? 0 : 1,
          boxShadow: "0 0 0 1px rgba(209,0,0,0.15), 0 0 80px rgba(0,0,0,0.6)",
          zIndex: 10000,
          cursor: zoom > 1.05 ? (dragging ? "grabbing" : "grab") : "zoom-in",
          // GPU 合成层优化
          willChange: phase !== "exit" ? "transform" : undefined,
        }}
        onClick={handleImgClick}
        onMouseDown={handleMouseDown}
      />

      {/* 关闭提示 */}
      <div
        className="fixed bottom-10 left-1/2 type-label text-[#F7F7F7]/30 select-none transition-opacity duration-300"
        style={{
          transform: "translateX(-50%)",
          fontSize: "clamp(0.6rem, 0.75vw, 0.7rem)",
          letterSpacing: "0.1em",
          opacity: phase === "active" ? 1 : 0,
        }}
      >
        滚轮缩放{zoom > 1.05 ? " · 拖拽平移 · 单击归位" : " · 单击关闭"} · ESC
      </div>
    </div>
  );

  return createPortal(lightbox, document.body);
}
