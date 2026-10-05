"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useLang, dict } from "@/lib/i18n";

const VALUES = [
  { value: 98.7, suffix: "%" },
  { value: 8, suffix: "ms" },
  { value: 40, suffix: "×" },
] as const;

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setDisplay(String(target));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          const v = target * eased;
          setDisplay(Number.isInteger(target) ? String(Math.round(v)) : v.toFixed(1));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, reduced]);

  return (
    <span ref={ref} className="font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold tabular-nums tracking-[-0.03em]">
      {display}
      <span className="text-gradient">{suffix}</span>
    </span>
  );
}

export function Numbers() {
  const { lang } = useLang();
  const t = dict.numbers;
  const metrics = t.metrics[lang];

  return (
    <section id="numbers" className="relative px-6 py-[160px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="mb-4 font-mono text-xs tracking-[0.35em] text-fog">{t.kicker[lang]}</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {t.titleA[lang]} <span className="text-gradient">{t.titleB[lang]}</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {VALUES.map((v, i) => (
            <Reveal key={metrics[i].label} delay={i * 120}>
              <div className="border-l border-line pl-6">
                <CountUp target={v.value} suffix={v.suffix} />
                <p className="mt-2 font-mono text-xs tracking-[0.2em] text-ice">{metrics[i].label}</p>
                <p className="mt-1 font-mono text-[11px] text-fog">{metrics[i].desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
