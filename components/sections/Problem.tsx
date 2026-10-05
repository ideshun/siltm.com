"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useLang, dict } from "@/lib/i18n";

/** 失忆之痛：滚动驱动 token 计数器爆表，记忆片段逐条消散 */
export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const { lang } = useLang();
  const t = dict.problem;
  const fragments = t.fragments[lang];

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // 计数器随滚动飙升直至爆表
  const exploded = progress > 0.72;
  const tokens = Math.round(Math.pow(progress, 2.2) * 131072);

  return (
    <section id="problem" ref={sectionRef} className="relative min-h-[220svh]">
      <div className="sticky top-0 flex min-h-svh items-center px-6">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <Reveal>
              <p className="mb-4 font-mono text-xs tracking-[0.35em] text-fog">
                {t.kicker[lang]}
              </p>
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                {t.titleA[lang]}
                <br />
                {t.titleB[lang]}
                <br />
                <span className="text-fog">{t.titleC[lang]}</span>
              </h2>
              <p className="mt-6 max-w-[52ch] leading-[1.65] text-fog">
                {t.desc[lang]}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center gap-8">
            {/* token 计数器 */}
            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-abyss-2/70 p-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-fog">
                    CONTEXT WINDOW
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-[0.3em] ${
                      exploded ? "text-amber" : "text-fog"
                    }`}
                  >
                    {exploded ? t.overflow[lang] : t.filling[lang]}
                  </span>
                </div>
                <div
                  className={`mt-3 font-mono text-4xl tabular-nums md:text-5xl ${
                    exploded ? "text-amber" : "text-ice"
                  }`}
                  aria-live="off"
                >
                  {exploded ? "131,072+" : tokens.toLocaleString("en-US")}
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className={`h-full rounded-full transition-[width] duration-100 ${
                      exploded ? "bg-amber" : "bg-gradient-to-r from-indigo to-cyan"
                    }`}
                    style={{ width: `${Math.min(100, progress * 138)}%` }}
                  />
                </div>
              </div>
            </Reveal>

            {/* 消散的记忆片段 */}
            <div className="flex flex-col gap-2">
              {fragments.map((f, i) => {
                const gone = progress > 0.35 + i * 0.09;
                return (
                  <div
                    key={f}
                    className="flex items-center gap-3 rounded-lg border border-line/60 px-4 py-2.5 font-mono text-sm transition-all duration-700"
                    style={{
                      opacity: gone ? 0.12 : 0.85,
                      filter: gone ? "blur(3px)" : "none",
                      transform: gone ? "translateY(-6px)" : "none",
                    }}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${gone ? "bg-line" : "bg-cyan"}`} />
                    <span className="text-fog">{f}</span>
                    {gone && (
                      <span className="ml-auto text-[10px] tracking-widest text-line">
                        {t.lost[lang]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
