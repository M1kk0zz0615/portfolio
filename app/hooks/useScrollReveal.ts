"use client";

import { useEffect, useRef } from "react";

/**
 * 为子元素添加 Intersection Observer 入场动画。
 * 容器内的所有 `.anim-*` 元素在进入视口时获得 `.visible` class。
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const animEls = container.querySelectorAll<HTMLElement>(
      ".anim-y-60, .anim-x--80, .anim-scale, .anim-line-x"
    );

    if (animEls.length === 0) return;

    // 已经是可见的元素直接显示，不做动画（避免首次加载大量动画卡死主线程）
    const viewH = window.innerHeight;
    animEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewH && rect.bottom > 0) {
        // 已在视口内：跳过动画直接显示
        el.style.transition = "none";
        el.classList.add("visible");
        // 强制重排后恢复 transition，让后续 hover 等交互正常
        void el.offsetHeight;
        el.style.transition = "";
      }
    });

    // 对剩下的元素（初始不在视口内）建立观察器
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    animEls.forEach((el) => {
      // 只观察尚未显示的元素
      if (!el.classList.contains("visible")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
