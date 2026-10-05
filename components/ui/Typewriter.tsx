"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface TypewriterProps {
  lines: string[];
  className?: string;
  startDelay?: number;
}

/** 打字机式副标：逐行键入，行间短暂停顿；减弱动效时直接全量呈现 */
export function Typewriter({ lines, className = "", startDelay = 600 }: TypewriterProps) {
  const reduced = useReducedMotion();
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduced) {
      setText(lines.join(" "));
      return;
    }
    let li = 0;
    let ci = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const line = lines[li];
      ci++;
      setText(line.slice(0, ci));
      if (ci >= line.length) {
        if (li < lines.length - 1) {
          li++;
          ci = 0;
          timer = setTimeout(tick, 420);
        }
      } else {
        timer = setTimeout(tick, 34 + Math.random() * 40);
      }
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [lines, reduced, startDelay]);

  return (
    <span className={className} aria-label={lines.join(" ")}>
      <span aria-hidden>{text}</span>
      {!reduced && (
        <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-cyan align-text-bottom" />
      )}
    </span>
  );
}
