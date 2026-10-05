"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const LINE = "Memory is not storage. Memory is gravity.";
const SUB = "记忆不是储存，是引力。";

/** 宣言区：整屏一句话，随滚动逐词点亮 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(1, total))));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const words = LINE.split(" ");
  const litCount = Math.floor(progress * 1.15 * words.length);

  return (
    <section id="manifesto" ref={ref} className="relative min-h-[200svh]">
      <div className="sticky top-0 flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <p className="mb-8 font-mono text-xs tracking-[0.35em] text-fog">06 / MANIFESTO</p>
        <h2 className="max-w-[16ch] font-display text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          {words.map((w, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-500"
              style={{
                opacity: i < litCount ? 1 : 0.14,
                filter: i < litCount ? "none" : "blur(1px)",
              }}
            >
              {i === words.length - 1 ? (
                <span className="text-gradient">{w}</span>
              ) : (
                w
              )}
              {"\u00A0"}
            </span>
          ))}
        </h2>
        <p
          className="mt-8 font-mono text-sm tracking-[0.2em] text-fog transition-opacity duration-700"
          style={{ opacity: progress > 0.85 ? 0.9 : 0 }}
        >
          {SUB}
        </p>
      </div>
    </section>
  );
}
