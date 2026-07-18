"use client";

import { useEffect, useRef, useCallback } from "react";

interface UsePosterScaleOptions {
  /** 视口占比阈值，默认 0.7（即 70%） */
  threshold?: number;
}

/**
 * 响应式等比缩放 hook。
 *
 * 当内容块+Logo 的自然宽度超过视口宽度的 threshold 比例时，
 * 对 wrapper 施加 transform: scale() 等比缩放。
 *
 * ## 关键设计：containing block 问题
 *
 * CSS 规范规定：设置了 transform 的元素会变成新的 containing block，
 * 导致其内部 absolute 子元素不再相对于原来的 flex 容器定位。
 *
 * 解决方案：当 scale < 1 时，让 wrapper 变为 absolute 定位并用 inset:0
 * 覆盖 flex 容器整个 padding box。这样子元素 absolute 的坐标系（padding box）
 * 与原来参照 flex 容器时完全一致，不会产生任何偏移。
 */
export function usePosterScale<T extends HTMLElement>(
  wrapperRef: React.RefObject<T | null>,
  contentRef: React.RefObject<HTMLElement | null>,
  logoRef: React.RefObject<HTMLElement | null>,
  options: UsePosterScaleOptions = {}
) {
  const { threshold = 0.7 } = options;
  const currentScaleRef = useRef(1);

  const measureAndScale = useCallback(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;
    if (!wrapper || !content || !logo) return;

    // 1. 临时仅移除 transform 测量自然尺寸（不改 position，避免闪烁）
    const prevTransform = wrapper.style.transform;
    wrapper.style.transform = "none";

    const contentRect = content.getBoundingClientRect();
    const logoRect = logo.getBoundingClientRect();

    const leftEdge = contentRect.left;
    const rightEdge = Math.max(contentRect.right, logoRect.right);
    const naturalWidth = rightEdge - leftEdge;

    // 2. 计算新 scale
    const viewportWidth = window.innerWidth;
    const maxAllowed = viewportWidth * threshold;
    const newScale = maxAllowed >= naturalWidth ? 1 : maxAllowed / naturalWidth;
    const clampedScale = Math.max(0.5, Math.min(1, newScale));

    // 3. 应用结果
    if (clampedScale < 1) {
      // scale < 1 → wrapper 需变成 containing block。
      // inset:0 覆盖 flex 容器整个 padding box，与子元素原来参照的坐标系完全一致。
      wrapper.style.position = "absolute";
      wrapper.style.top = "0";
      wrapper.style.left = "0";
      wrapper.style.right = "0";
      wrapper.style.bottom = "0";
      wrapper.style.transform = `scale(${clampedScale})`;
    } else {
      // scale = 1 → 还原默认状态，不干预布局
      wrapper.style.transform = "";
      wrapper.style.position = "";
      wrapper.style.top = "";
      wrapper.style.left = "";
      wrapper.style.right = "";
      wrapper.style.bottom = "";
    }

    if (Math.abs(clampedScale - currentScaleRef.current) > 0.001) {
      currentScaleRef.current = clampedScale;
    }
  }, [wrapperRef, contentRef, logoRef, threshold]);

  useEffect(() => {
    measureAndScale();

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const posterEl = wrapper.closest(".poster");
    const ro = posterEl
      ? new ResizeObserver(() => measureAndScale())
      : null;
    if (ro && posterEl) ro.observe(posterEl);

    window.addEventListener("resize", measureAndScale);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measureAndScale);
    };
  }, [measureAndScale, wrapperRef]);

  return currentScaleRef;
}
