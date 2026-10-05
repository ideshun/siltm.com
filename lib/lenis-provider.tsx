"use client";

import { useEffect } from "react";

/**
 * 全局平滑滚动：Lenis 驱动，ScrollTrigger 同步刷新。
 * GSAP 与 Lenis 均动态加载，不进入首屏 bundle；
 * 用户偏好减弱动效时退化为原生滚动，什么都不加载。
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("lenis"), import("@/lib/gsap").then((m) => m.loadGsap())]).then(
      ([{ default: Lenis }, { ScrollTrigger }]) => {
        if (cancelled) return;
        const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
        lenis.on("scroll", ScrollTrigger.update);
        cleanup = () => lenis.destroy();
      }
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
