"use client";

import { useEffect } from "react";

// ── 精确指点设备媒体查询：匹配则走鼠标路径，否则走陀螺仪 ──
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** iOS 13+ 专有静态方法，不在标准 lib.dom 类型里 */
interface DOEWithPermission {
  requestPermission?: () => Promise<"granted" | "denied">;
}

export interface PosterParallaxOptions {
  /** JS 门控 — 对应 parallaxEnabled（帷幕完成且抽屉关闭时启用） */
  enabled: boolean;
  /** 倾斜多少度达到满偏 ±1，默认 30 */
  maxTiltDeg?: number;
  /** 陀螺仪额外倍率 — 调大则手持设备视差更明显，默认 1 */
  gyroScale?: number;
}

/**
 * 统一视差 hook：鼠标优先、陀螺仪兜底。
 *
 * 将输入源归一化后的 [-1, 1] 偏移写入 CSS 变量 --parallax-x / --parallax-y，
 * 供 .parallax-layer-1/2/3 的 translate 规则消费。
 *
 * 源仲裁：
 * - (hover: hover) and (pointer: fine) 匹配 → 鼠标路径（桌面 / iPad 连鼠标）
 * - 不匹配 → 陀螺仪路径（纯触屏设备）
 * - MQ change 时实时切换（iPad 插拔鼠标 / 变形本翻转）
 *
 * 陀螺仪细节：
 * - 首帧零点标定：以当前持机姿态为零位，防止自然前倾导致 y 轴满偏
 * - 横屏轴重映射：转屏后 gamma↔beta 互换
 * - iOS 13+ 权限：乐观调用 → 回访用户零感知；缺手势则挂一次性 click 兜底
 * - 不支持 / 权限拒绝 / 全 null 事件 → 全部静默降级
 */
export function usePosterParallax<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  { enabled, maxTiltDeg = 30, gyroScale = 1 }: PosterParallaxOptions
) {
  useEffect(() => {
    // ── 门控 ──
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ── 写入 CSS 变量 ──
    const setVars = (x: number, y: number) => {
      el.style.setProperty("--parallax-x", String(x));
      el.style.setProperty("--parallax-y", String(y));
    };
    const clamp1 = (v: number) => Math.max(-1, Math.min(1, v));

    // ═══════════════════════════════════════════
    // 源 A：鼠标
    // ═══════════════════════════════════════════

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setVars(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        ((e.clientY - rect.top) / rect.height) * 2 - 1
      );
    };

    const attachMouse = (): (() => void) => {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMouseMove);
    };

    // ═══════════════════════════════════════════
    // 源 B：陀螺仪
    // ═══════════════════════════════════════════

    let baseX: number | null = null; // 首帧标定的持机零点（屏幕轴）
    let baseY: number | null = null;

    /** 设备轴 → 屏幕轴重映射（横屏时 beta/gamma 互换） */
    const remapAxes = (beta: number, gamma: number): [number, number] => {
      const raw = (screen.orientation?.angle as number | undefined) ?? (window as { orientation?: number }).orientation ?? 0;
      const angle = ((Number(raw) % 360) + 360) % 360; // -90 → 270
      switch (angle) {
        case 90:  return [beta, -gamma];
        case 180: return [-gamma, -beta];
        case 270: return [-beta, gamma];
        default:  return [gamma, beta]; // 0° 竖屏
      }
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      // 桌面 Chrome 会发全 null 事件 — 静默忽略
      if (e.beta == null || e.gamma == null) return;

      const [dx, dy] = remapAxes(e.beta, e.gamma);

      // 首帧标定：以当前持机姿态为零点
      if (baseX === null || baseY === null) {
        baseX = dx;
        baseY = dy;
        return;
      }

      setVars(
        clamp1(((dx - baseX) / maxTiltDeg) * gyroScale),
        clamp1(((dy - baseY) / maxTiltDeg) * gyroScale)
      );
    };

    /** 转屏后重置零点（姿态必然变化） */
    const onOrientationChange = () => {
      baseX = null;
      baseY = null;
    };

    const attachGyro = (): (() => void) | null => {
      // 能力检测：无 API → 静默放弃
      if (typeof window.DeviceOrientationEvent === "undefined") return null;

      let listening = false;
      const listen = () => {
        if (listening) return;
        listening = true;
        window.addEventListener("deviceorientation", onOrientation, { passive: true });
        window.addEventListener("orientationchange", onOrientationChange);
      };
      const unlisten = () => {
        window.removeEventListener("deviceorientation", onOrientation);
        window.removeEventListener("orientationchange", onOrientationChange);
      };

      const doe = DeviceOrientationEvent as unknown as DOEWithPermission;

      // 无需权限（Android / 桌面）→ 直接监听
      if (typeof doe.requestPermission !== "function") {
        listen();
        return unlisten;
      }

      // iOS 13+：乐观尝试 → 已授权回访用户立即生效
      doe.requestPermission()
        .then((state) => {
          if (state === "granted") listen();
          // denied → 静默放弃，不打任何日志
        })
        .catch(() => {
          // 缺少用户手势被 reject → 挂一次性 click，用户首次点屏幕任意位置时触发
          const onFirstTap = () => {
            doe.requestPermission!()
              .then((state) => { if (state === "granted") listen(); })
              .catch(() => {});
          };
          window.addEventListener("click", onFirstTap, { once: true, passive: true });
        });

      return () => {
        unlisten();
      };
    };

    // ═══════════════════════════════════════════
    // 仲裁：精确指点 → 鼠标；否则 → 陀螺仪
    // ═══════════════════════════════════════════

    const mq = window.matchMedia(FINE_POINTER);
    let detach: (() => void) | null = null;

    const sync = () => {
      detach?.();
      setVars(0, 0); // 切源时重置偏移，避免跳变
      baseX = null;
      baseY = null;
      if (mq.matches) {
        detach = attachMouse();
      } else {
        detach = attachGyro(); // attachGyro 可能返回 null（无传感器）
      }
    };

    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      detach?.();
    };
  }, [enabled, maxTiltDeg, ref]);
}
