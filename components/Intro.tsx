"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * 开场：SILTM 字样短暂聚合后向四周散开沉底，露出 Hero（< 1.5s）。
 * 减弱动效偏好与重复访问（sessionStorage）时跳过。
 */
export function Intro() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"show" | "scatter" | "gone">("show");

  useEffect(() => {
    if (reduced || sessionStorage.getItem("siltm-intro") === "1") {
      setPhase("gone");
      return;
    }
    sessionStorage.setItem("siltm-intro", "1");
    const t1 = setTimeout(() => setPhase("scatter"), 700);
    const t2 = setTimeout(() => setPhase("gone"), 1450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  if (phase === "gone") return null;

  const letters = "SILTM".split("");
  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[90] flex items-center justify-center bg-abyss transition-opacity duration-700 ${
        phase === "scatter" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex font-display text-[clamp(3rem,10vw,7rem)] font-semibold tracking-[-0.03em]">
        {letters.map((ch, i) => (
          <span
            key={i}
            className="inline-block text-gradient transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
            style={
              phase === "scatter"
                ? {
                    transform: `translate(${(i - 2) * 60}px, ${80 + i * 14}px) rotate(${(i - 2) * 8}deg)`,
                    opacity: 0,
                    transitionDelay: `${i * 40}ms`,
                  }
                : { animation: `intro-in 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both` }
            }
          >
            {ch}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes intro-in {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.92);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
}
