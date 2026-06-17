"use client";

import { useEffect, useRef, useState } from "react";

export interface PwDebugInfo {
  mounted: boolean;
  clientWidth: number;
  pwComputed: string;
  contain: string;
  containerType: string;
  roCount: number;
}

/**
 * 修复 iPadOS Safari 容器查询单位 (cqw) 在窗口 resize 时不更新的 bug。
 *
 * 返回 debugInfo 供组件渲染诊断面板。
 */
export function usePosterWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>
) {
  const roRef = useRef<ResizeObserver | null>(null);
  const roCountRef = useRef(0);
  const [debugInfo, setDebugInfo] = useState<PwDebugInfo>({
    mounted: false,
    clientWidth: 0,
    pwComputed: "",
    contain: "",
    containerType: "",
    roCount: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setDebugInfo((prev) => ({ ...prev, mounted: false }));
      return;
    }

    const collect = () => {
      const w = el.clientWidth;
      el.style.setProperty("--pw", String(w));

      const style = getComputedStyle(el);
      const info: PwDebugInfo = {
        mounted: true,
        clientWidth: w,
        pwComputed: style.getPropertyValue("--pw").trim(),
        contain: style.contain,
        containerType: style.containerType,
        roCount: roCountRef.current,
      };
      setDebugInfo(info);
      console.log("[usePosterWidth]", JSON.stringify(info));
    };

    // 初始值
    collect();

    if (!roRef.current) {
      roRef.current = new ResizeObserver(() => {
        roCountRef.current++;
        collect();
      });
    }
    roRef.current.observe(el);

    return () => {
      roRef.current?.unobserve(el);
    };
  }, [ref]);

  return debugInfo;
}
