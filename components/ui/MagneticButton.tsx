"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

/** 磁吸按钮：指针靠近时轻微跟随，hover 时内部流光扫过 */
export function MagneticButton({
  variant = "primary",
  className = "",
  children,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`btn-sheen min-h-11 rounded-full px-7 py-3 font-display text-sm font-medium tracking-wide transition-[transform,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        variant === "primary"
          ? "bg-amber text-abyss hover:shadow-[0_0_32px_rgba(255,184,0,0.35)]"
          : "border border-line text-ice hover:border-cyan/60"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
