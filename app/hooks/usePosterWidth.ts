"use client";

import { useEffect, useRef } from "react";

/**
 * 修复 iPadOS Safari 容器查询单位 (cqw) 在窗口 resize 时不更新的 bug。
 *
 * 原理：
 * - ResizeObserver 监听海报容器的 inline-size 变化
 * - 将实际像素宽度写入 CSS 自定义属性 --pw
 * - 子元素使用 calc(var(--pw) * FACTOR * 1px) 替代 Xcqw
 * - 由于 --pw 由 JS 直接更新，绕过了 Safari 的 cqw 缓存问题
 *
 * 用法（配合既有的 useScrollReveal ref）：
 *   const ref = useScrollReveal<HTMLDivElement>(0.3);
 *   usePosterWidth(ref);  // 复用同一个 ref
 *   return <section ref={ref} className="poster">...</section>
 */
export function usePosterWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>
) {
  const roRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      console.warn("[usePosterWidth] ref.current is null — 未挂载到 DOM 元素");
      return;
    }

    const update = () => {
      const w = el.clientWidth;
      el.style.setProperty("--pw", String(w));

      // DEBUG: 验证 --pw 是否成功写入并被 CSS 读取
      const computed = getComputedStyle(el).getPropertyValue("--pw").trim();
      console.log(
        `[usePosterWidth] clientWidth=${w}px | --pw computed="${computed}" | contain=${
          getComputedStyle(el).contain
        } | containerType=${getComputedStyle(el).containerType}`
      );
    };

    // 初始写入
    update();

    // ResizeObserver：每次 inline-size 变化时触发
    if (!roRef.current) {
      roRef.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          console.log(
            `[ResizeObserver] contentBoxSize=${JSON.stringify(
              Array.from(entry.contentBoxSize)
            )} | borderBoxSize=${JSON.stringify(
              Array.from(entry.borderBoxSize)
            )}`
          );
        }
        update();
      });
    }
    roRef.current.observe(el);

    return () => {
      roRef.current?.unobserve(el);
    };
  }, [ref]);
}
