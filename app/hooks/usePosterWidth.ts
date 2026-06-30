"use client";

import { useEffect, useRef, useState } from "react";

// ═══════════════════════════════════════════
// 调试开关 — 需要诊断 iPad 容器查询时改为 true
// ═══════════════════════════════════════════
const DEBUG = false;

export interface PwDebugInfo {
  mounted: boolean;
  clientWidth: number;
  clientHeight: number;
  pwComputed: string;
  contain: string;
  containerType: string;
  roCount: number;
}

const STUB: PwDebugInfo = {
  mounted: false,
  clientWidth: 0,
  clientHeight: 0,
  pwComputed: "",
  contain: "",
  containerType: "",
  roCount: 0,
};

/**
 * 修复 iPadOS Safari 容器查询单位 (cqw) 在窗口 resize 时不更新的 bug。
 *
 * 通过 ResizeObserver 将海报实际像素宽写入 CSS 变量 --pw，
 * 供 calc(var(--pw) * …) 回退方案使用。
 *
 * DEBUG=true 时输出诊断日志到控制台（默认关闭）。
 */
export function usePosterWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>
) {
  const roRef = useRef<ResizeObserver | null>(null);
  const roCountRef = useRef(0);
  const [debugInfo, setDebugInfo] = useState<PwDebugInfo>(STUB);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      if (DEBUG) setDebugInfo((prev) => ({ ...prev, mounted: false }));
      return;
    }

    const sync = () => {
      const w = el.clientWidth;
      el.style.setProperty("--pw", String(w));

      if (DEBUG) {
        roCountRef.current++;
        const style = getComputedStyle(el);
        const info: PwDebugInfo = {
          mounted: true,
          clientWidth: w,
          clientHeight: el.clientHeight,
          pwComputed: style.getPropertyValue("--pw").trim(),
          contain: style.contain,
          containerType: style.containerType,
          roCount: roCountRef.current,
        };
        setDebugInfo(info);
        console.log("[usePosterWidth]", JSON.stringify(info));
      }
    };

    sync(); // 初始值

    if (!roRef.current) {
      roRef.current = new ResizeObserver(sync);
    }
    roRef.current.observe(el);

    return () => {
      roRef.current?.unobserve(el);
    };
  }, [ref]);

  return DEBUG ? debugInfo : STUB;
}
