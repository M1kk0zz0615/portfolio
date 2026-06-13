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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );

    animEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
