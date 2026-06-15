"use client";

import { useEffect, useRef } from "react";

/**
 * 为子元素添加 Intersection Observer 入场动画。
 * 容器内的所有 `.anim-*` 元素在进入视口时获得 `.visible` class。
 *
 * 性能优化：
 * - 使用单个 observer 监控所有子元素
 * - 已在视口内的元素跳过动画直接显示
 * - 支持 prefers-reduced-motion 跳过动画
 * - rootMargin 预加载减少可见延迟
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // 检查减少动画偏好 — 直接全部显示，不建立 observer
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animEls = container.querySelectorAll<HTMLElement>(
      ".anim-y-60, .anim-x--80, .anim-scale, .anim-line-x"
    );

    if (animEls.length === 0) return;

    // 减少动画偏好：直接全部显示
    if (prefersReduced) {
      animEls.forEach((el) => {
        el.style.transition = "none";
        el.classList.add("visible");
      });
      return;
    }

    // 使用 rAF 批量处理初始可见元素，避免逐个触发重排
    requestAnimationFrame(() => {
      const viewH = window.innerHeight;
      // 使用 rootMargin 等效逻辑预判定
      animEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewH && rect.bottom > 0) {
          // 已在视口内：跳过动画直接显示
          el.style.transition = "none";
          el.classList.add("visible");
        }
      });

      // 强制一次重排后批量恢复 transition（而非逐元素触发）
      void container.offsetHeight;
      animEls.forEach((el) => {
        if (el.classList.contains("visible")) {
          el.style.transition = "";
        }
      });
    });

    // 单个 observer 监控剩余元素
    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold,
        // rootMargin 提前 50px 触发，避免滚动到才加载
        rootMargin: "0px 0px 50px 0px",
      }
    );

    // 批量 observe 不在视口内的元素
    animEls.forEach((el) => {
      if (!el.classList.contains("visible")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
