"use client";

import { useMemo } from "react";
import { Typewriter } from "@/components/ui/Typewriter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLang, dict } from "@/lib/i18n";

export function Hero() {
  const { lang } = useLang();
  const t = dict.hero;
  const typeLines = useMemo(() => [t.typeA[lang], t.typeB[lang]], [lang, t]);

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-center px-6"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="mb-6 font-mono text-xs tracking-[0.35em] text-fog">
          {t.kicker[lang]}
        </p>
        <h1 className="max-w-[12ch] font-display text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
          {t.titleA[lang]}
          <br />
          <span className="text-gradient">{t.titleB[lang]}</span>
        </h1>
        <p className="mt-8 min-h-8 max-w-[62ch] font-mono text-base leading-[1.65] text-fog md:text-lg">
          <Typewriter lines={typeLines} />
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton
            variant="primary"
            onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t.ctaPrimary[lang]}
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t.ctaGhost[lang]}
          </MagneticButton>
        </div>
      </div>

      {/* 向下引导：滚动 = 时间流逝 */}
      <a
        href="#problem"
        aria-label="Scroll to next section"
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fog transition-colors hover:text-cyan md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">{t.flowDown[lang]}</span>
        <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-cyan to-transparent" />
      </a>
    </section>
  );
}
