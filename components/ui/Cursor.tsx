"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * 自定义光标：桌面端（精确指针）默认为小圆点，
 * 悬停可交互元素时变形为「RECALL」圆环。触屏与减弱动效偏好下不渲染。
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [recall, setRecall] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("cursor-none-fine");
    return () => document.body.classList.remove("cursor-none-fine");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement | null;
      setRecall(!!target?.closest("a, button, input, [role='button'], [data-cursor]"));
    };
    const loop = () => {
      // 圆环滞后跟随，形成流体拖尾感
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);

  if (!enabled || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-cyan"
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[99] flex items-center justify-center rounded-full border transition-[width,height,border-color,background-color] duration-200 ${
          recall
            ? "h-14 w-14 border-amber bg-amber/10"
            : "h-8 w-8 border-indigo/60 bg-transparent"
        }`}
      >
        {recall && (
          <span className="font-mono text-[9px] tracking-[0.2em] text-amber">RECALL</span>
        )}
      </div>
    </>
  );
}
