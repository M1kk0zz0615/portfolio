"use client";

import { useState, useEffect } from "react";

/**
 * 固定底部的下滚指示三角，滚到底自动隐藏。
 */
export function ScrollArrow() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 80;
      setVisible(!nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 z-50"
      style={{ transform: "translateX(-50%)" }}
    >
      <div
        className="scroll-arrow"
        style={{ position: "static", animation: "arrow-bob 2s linear infinite" }}
      />
    </div>
  );
}
