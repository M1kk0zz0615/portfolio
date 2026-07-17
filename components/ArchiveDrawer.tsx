"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArchiveContent } from "@/components/ArchiveContent";

interface ArchiveDrawerProps {
  onClose: () => void;
  onCloseStart?: () => void;  // 退出动画开始时触发（Hero 同步归位）
  onNavigate: (target: string) => void;
  onBottomCTA?: () => void; // 底部 CTA 单独回调
}

/** 抽屉内容占视口不足 75% 时触发退出 */
const getPullThreshold = () => {
  const vh = window.innerHeight;
  const el = document.querySelector('[data-drawer-panel]') as HTMLElement | null;
  const topOffset = el
    ? parseFloat(getComputedStyle(el).top) || 0
    : vh * 0.15; // 回退值
  return vh * 0.25 - topOffset;
};
/** 停止下拉后等待此时间再判断回弹/关闭 */
const PULL_IDLE_MS = 100;
/** 滚轮阻尼系数 */
const PULL_DAMPING = 0.45;
/** 拖拽阻尼系数 */
const DRAG_DAMPING = 0.6;

export function ArchiveDrawer({ onClose, onCloseStart, onNavigate, onBottomCTA }: ArchiveDrawerProps) {
  const [phase, setPhase] = useState<"enter" | "active" | "exit">("enter");
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [contentCanScroll, setContentCanScroll] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [restReady, setRestReady] = useState(false);

  // ── 下拉回弹状态 ──
  const [pullPhase, setPullPhase] = useState<"idle" | "pulling" | "bouncing">("idle");
  const [pullOffset, setPullOffset] = useState(0);
  const pullOffsetRef = useRef(0);
  const pullTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 鼠标/触屏拖拽 ──
  const isDraggingRef = useRef(false);
  const isExitingRef = useRef(false); // 退出动画进行中，屏蔽所有输入
  const dragLastYRef = useRef(0);
  const dragUpAccRef = useRef(0);   // 上拖累积 → 展开抽屉
  const dragDownAccRef = useRef(0); // peek 态下拖累积 → 触屏展开

  const drawerRef = useRef<HTMLDivElement>(null);

  // ── 关闭速度：按钮快 / 把手慢 ──
  const closeDurationRef = useRef(400);

  const close = useCallback(
    (speed?: "fast" | "slow") => {
      // Hero 归位延迟 300ms，等抽屉 ease-in 慢段结束后开始，600ms 时同时到位
      setTimeout(() => onCloseStart?.(), 300);
      const dur = 600;
      closeDurationRef.current = dur;
      setPhase("exit");
      setTimeout(onClose, dur);
    },
    [onClose, onCloseStart]
  );

  const handleContentNavigate = useCallback(
    (target: string) => {
      // 先在抽屉后面切到目标海报 → 再退出抽屉露出
      onNavigate(target);
      setTimeout(() => close("fast"), 150);
    },
    [onNavigate, close]
  );

  const handleContinueToBuildLog = useCallback(() => {
    close("fast"); // 抽屉退出 300ms
    onBottomCTA?.(); // 同步触发 Hero 复位
  }, [onBottomCTA, close]);

  // ── 从当前拖拽位置播放退出动画（不经过 React phase，避免内联/React transform 冲突） ──
  const exitFromDrag = useCallback(() => {
    // Hero 归位延迟 300ms，等抽屉 ease-in 慢段结束后开始，600ms 时同时到位
    setTimeout(() => onCloseStart?.(), 300);
    const el = drawerRef.current;
    if (!el) { onClose(); return; }
    const dur = closeDurationRef.current;
    let closed = false;
    const doClose = () => { if (!closed) { closed = true; onClose(); } };
    el.style.transition = `transform ${dur}ms cubic-bezier(0.4, 0, 1, 1)`;
    requestAnimationFrame(() => {
      el.style.transform = 'translateY(100%)';
    });
    const onEnd = () => {
      el.removeEventListener('transitionend', onEnd);
      doClose();
    };
    el.addEventListener('transitionend', onEnd);
    // 兜底：动画没触发时也能关闭
    setTimeout(doClose, dur + 100);
  }, [onClose, onCloseStart]);

  // ── 共享下拉逻辑：累加偏移 → 阈值检测 → 空闲回弹 ──
  const applyPull = useCallback(
    (delta: number) => {
      if (isExitingRef.current) return; // 退出中，屏蔽
      const threshold = getPullThreshold();
      setPullOffset((prev) => {
        const next = Math.min(prev + delta, threshold); // 钳制在阈值内
        pullOffsetRef.current = next;
        return next;
      });
      setPullPhase("pulling");

      if (pullTimeoutRef.current) clearTimeout(pullTimeoutRef.current);

      // 到达阈值 → 从 75% 位置播放退出动画
      if (pullOffsetRef.current >= threshold) {
        isExitingRef.current = true;
        exitFromDrag();
        return;
      }

      // 空闲检测
      pullTimeoutRef.current = setTimeout(() => {
        const final = pullOffsetRef.current;
        if (final >= getPullThreshold()) {
          isExitingRef.current = true;
          exitFromDrag();
        } else if (final > 0) {
          setPullPhase("bouncing");
          requestAnimationFrame(() => {
            pullOffsetRef.current = 0;
            setPullOffset(0);
            setTimeout(() => setPullPhase("idle"), 350);
          });
        }
      }, PULL_IDLE_MS);
    },
    [close]
  );

  // ESC 关闭 + body scroll lock + 鼠标拖拽监听
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close("fast");
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    // ── 全局拖拽（鼠标 + 触屏统一走 pointer 事件） ──
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || isExitingRef.current) return;
      const el = drawerRef.current;
      if (!el || el.scrollTop > 0) {
        // 内容已滚动 → 取消拖拽
        isDraggingRef.current = false;
        dragDownAccRef.current = 0;
        if (el) el.style.transition = '';
        return;
      }
      const dy = e.clientY - dragLastYRef.current;
      dragLastYRef.current = e.clientY;
      if (dy > 0) {
        // peek 态向下拖 → 展开抽屉（触屏 wheel 等价路径），阈值 20px 区分轻滑和意图拖拽
        if (!drawerExpanded) {
          dragDownAccRef.current += dy;
          if (dragDownAccRef.current > 50) {
            setDrawerExpanded(true);
            isDraggingRef.current = false;
            dragDownAccRef.current = 0;
            return;
          }
          return; // peek 态不触发下拉关闭
        }
        // 展开态向下拖 → 直写 DOM，绕过 React
        dragUpAccRef.current = 0;
        dragDownAccRef.current = 0;
        const threshold = getPullThreshold();
        const delta = dy * DRAG_DAMPING;
        const next = Math.min(pullOffsetRef.current + delta, threshold);
        pullOffsetRef.current = next;
        el.style.transform = `translateY(${next}px)`;

        // 到达阈值 → 从 75% 位置播放退出动画
        if (next >= threshold) {
          isDraggingRef.current = false;
          isExitingRef.current = true;
          exitFromDrag();
          return;
        }

        // 空闲检测
        if (pullTimeoutRef.current) clearTimeout(pullTimeoutRef.current);
        pullTimeoutRef.current = setTimeout(() => {
          const final = pullOffsetRef.current;
          if (!isDraggingRef.current && final > 0 && final < getPullThreshold()) {
            el.style.transition = '';
            el.style.transform = '';
            pullOffsetRef.current = 0;
            setPullPhase("bouncing");
            setPullOffset(0);
            setTimeout(() => setPullPhase("idle"), 350);
          }
        }, PULL_IDLE_MS);
      } else if (dy < 0 && !drawerExpanded) {
        // 向上拖 → 展开抽屉全屏
        dragUpAccRef.current += Math.abs(dy);
        dragDownAccRef.current = 0;
        if (dragUpAccRef.current > 50) {
          setDrawerExpanded(true);
          dragUpAccRef.current = 0;
        }
      }
    };

    const onPointerUp = () => {
      const el = drawerRef.current;
      if (el) el.style.transition = ''; // 恢复 transition
      if (isDraggingRef.current && pullOffsetRef.current > 0) {
        // 松手回弹：清除内联 transform，同步回 React
        if (el) el.style.transform = '';
        pullOffsetRef.current = 0;
        setPullPhase("bouncing");
        setPullOffset(0);
        setTimeout(() => setPullPhase("idle"), 350);
      }
      isDraggingRef.current = false;
      dragUpAccRef.current = 0;
      dragDownAccRef.current = 0;
    };

    const onPointerCancel = () => {
      // 来电/通知打断 → 等同于松手回弹
      onPointerUp();
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerCancel);

    return () => {
      document.removeEventListener("keydown", handler);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerCancel);
      document.body.style.overflow = "";
    };
  }, [close, drawerExpanded]);

  // 入场
  useEffect(() => {
    const raf = requestAnimationFrame(() => setPhase("active"));
    return () => cancelAnimationFrame(raf);
  }, []);

  // 入场动画完成后渲染剩余 section（减轻入场 composite 负担）
  useEffect(() => {
    if (phase === "active") {
      const timer = setTimeout(() => setRestReady(true), 400);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // ── 抽屉完全展开后才允许内容滚动 ──
  // drawerExpanded → true：等待 380ms（top 350ms 过渡 + 余量）
  // drawerExpanded → false：立即禁用
  useEffect(() => {
    if (drawerExpanded) {
      const timer = setTimeout(() => setContentCanScroll(true), 260);
      return () => clearTimeout(timer);
    } else {
      setContentCanScroll(false);
    }
  }, [drawerExpanded]);

  // ── 滚动监听 ──
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = el;
      if (scrollTop > 40) {
        setDrawerExpanded(true);
      } else if (scrollTop <= 5) {
        setDrawerExpanded(false);
        pullOffsetRef.current = 0;
        setPullOffset(0);
        setPullPhase("idle");
      }
      setReachedBottom(scrollTop + clientHeight >= scrollHeight - 20);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // 清理 timeout
  useEffect(() => {
    return () => {
      if (pullTimeoutRef.current) clearTimeout(pullTimeoutRef.current);
    };
  }, []);

  // ── 滚轮 ──
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isExitingRef.current) return; // 退出中，屏蔽滚轮
      const el = drawerRef.current;
      if (!el) return;

      // peek 模式下向下滚 → 先展开抽屉，内容不滚
      if (!drawerExpanded && e.deltaY > 0) {
        setDrawerExpanded(true);
        return;
      }

      if (el.scrollTop <= 0 && e.deltaY < 0) {
        applyPull(Math.abs(e.deltaY) * PULL_DAMPING);
      } else if (e.deltaY > 0 && pullOffsetRef.current > 0) {
        pullOffsetRef.current = 0;
        setPullOffset(0);
        setPullPhase("idle");
        if (pullTimeoutRef.current) clearTimeout(pullTimeoutRef.current);
      }
    },
    [drawerExpanded, applyPull]
  );

  // ── 把手拖拽开始（鼠标 + 触屏统一走 pointer） ──
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const el = drawerRef.current;
    if (!el || el.scrollTop > 0) return; // 内容已滚动时不触发
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId); // 锁定指针，手指划出把手仍跟手
    isDraggingRef.current = true;
    dragLastYRef.current = e.clientY;
    dragDownAccRef.current = 0;
    el.style.transition = 'none'; // 关闭 transition，把手瞬间跟手
  }, []);

  // 减少动画偏好
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const noAnim = prefersReduced ? "none" : undefined;

  // ── 各阶段状态 ──
  const isActive = phase === "active";
  const isVisible = phase === "enter" || isActive;

  const overlayOpacity = isActive ? 1 : 0;
  const drawerTop = drawerExpanded ? "0" : "15vh";

  const slideY = isActive ? "0px" : "100%";

  const pullY = pullPhase !== "idle" ? pullOffset : 0;

  const drawerTransition = noAnim
    ? "none"
    : phase === "exit"
      ? `top 600ms cubic-bezier(0.4, 0, 1, 1), transform ${closeDurationRef.current}ms cubic-bezier(0.4, 0, 1, 1), box-shadow 350ms linear`
      : pullPhase === "pulling"
        ? "top 250ms cubic-bezier(0.2,0,0,1), box-shadow 350ms linear"
        : pullPhase === "bouncing"
          ? "top 250ms cubic-bezier(0.2,0,0,1), transform 350ms linear, box-shadow 350ms linear"
          : "top 250ms cubic-bezier(0.2,0,0,1), transform 400ms cubic-bezier(0.2,0,0,1)";

  const drawer = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
      aria-hidden={!isVisible}
    >
      {/* ── 遮罩层 ── */}
      <div
        onClick={() => close("fast")}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.12)",
          opacity: overlayOpacity,
          transition: noAnim ?? "opacity 200ms linear",
        }}
        aria-label="关闭档案抽屉"
      />

      {/* ── Drawer 面板 ── */}
      <div
        ref={drawerRef}
        data-drawer-panel
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          top: drawerTop,
          transform: `translateY(${slideY}) translateY(${pullY}px)`,
          transition: drawerTransition,
          overflowY: contentCanScroll ? "auto" : "hidden",
          overflowX: "hidden",
          scrollbarGutter: "stable",
          background: "var(--bg)",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          willChange: "transform",
          boxShadow: drawerExpanded
            ? "0 -2px 12px rgba(0,0,0,0.12)"
            : "0 -2px 20px rgba(0,0,0,0.25)",
        }}
      >
        {/* ── 抽屉把手（可拖拽）── */}
        <div
          className="sticky top-0 z-30 flex justify-center py-3"
          style={{
            background: "var(--bg)",
            cursor: isDraggingRef.current ? "grabbing" : "grab",
            userSelect: "none",
            touchAction: "none",
          }}
          onPointerDown={handlePointerDown}
          aria-hidden="true"
        >
          <div
            style={{
              width: "clamp(48px, 8vw, 80px)",
              height: "5px",
              background: "#D10000",
              opacity: drawerExpanded ? 0.25 : 0.7,
              transition: noAnim ?? "opacity 250ms linear",
            }}
          />
        </div>

        {/* Archive 全部内容 */}
        <ArchiveContent
          className="bg-paper text-[var(--fg)]"
          onNavigate={handleContentNavigate}
          restReady={restReady}
        />

        {/* ── 底部 CTA ── */}
        <div
          className="sticky bottom-0 left-0 right-0 z-20 flex justify-center py-4"
          style={{
            background: "linear-gradient(to top, var(--bg) 60%, transparent)",
            opacity: reachedBottom ? 1 : 0,
            pointerEvents: reachedBottom ? "auto" : "none",
            transition: noAnim ?? "opacity 250ms linear",
          }}
        >
          <button
            onClick={handleContinueToBuildLog}
            className="group inline-flex items-center gap-2 sm:gap-3 border-[3px] sm:border-4 border-[#0D0D0D] bg-[#0D0D0D] px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs sm:text-sm tracking-widest text-[#F5EDE0] uppercase shadow-[3px_3px_0_0_#D10000] sm:shadow-[4px_4px_0_0_#D10000] transition-all duration-200 hover:border-[#D10000] hover:bg-[#D10000] hover:shadow-[5px_5px_0_0_#0D0D0D] sm:hover:shadow-[6px_6px_0_0_#0D0D0D] hover:text-[#F5EDE0] cursor-pointer"
          >
            前往 Build Log
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(drawer, document.body);
}
