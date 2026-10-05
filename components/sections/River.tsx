"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useLang, dict } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 记忆流河：桌面端 GSAP 横向滚动画廊，移动端纵向堆叠。
 * pin 整个 section（一屏高）：进入即钉住，纵向滚动距离严格等于
 * 轨道超宽部分，保证 pin 结束时 04 卡片完整停在最右、随即可见下一区块。
 */
export function River() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { lang } = useLang();
  const t = dict.river;
  const cards = t.cards[lang];

  useEffect(() => {
    if (reduced || window.innerWidth < 768) return;
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          // 略加 10% 余量：确保松开 pin 前 04 卡片已完整入画
          end: () => `+=${distance() * 1.1}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      // 字体/图片加载后再校准一次，避免 pin 距离算早
      const refresh = () => ScrollTrigger.refresh();
      if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);

  return (
    <section id="river" ref={wrapRef} className="relative pt-[120px] md:flex md:min-h-svh md:flex-col md:justify-center md:pt-0">
      <div className="px-6">
        <Reveal className="mx-auto max-w-[1200px]">
          <p className="mb-4 font-mono text-xs tracking-[0.35em] text-fog">{t.kicker[lang]}</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {t.titleA[lang]}
            <br />
            <span className="text-gradient">{t.titleB[lang]}</span>
          </h2>
          <p className="mt-6 max-w-[52ch] leading-[1.65] text-fog">{t.desc[lang]}</p>
        </Reveal>
      </div>

      <div className="mt-12 md:mt-16 md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 pb-[160px] md:w-max md:flex-row md:gap-8 md:pb-0 md:pl-[max(24px,calc(50vw-600px))] md:pr-[max(24px,calc(50vw-600px))]"
        >
          {cards.map((m, i) => (
            <article
              key={m.tag}
              className="group relative w-full shrink-0 overflow-hidden rounded-2xl border border-line bg-abyss-2/60 p-8 transition-colors duration-300 hover:border-indigo/60 md:w-[420px]"
            >
              <span className="font-mono text-[64px] font-bold leading-none text-line transition-colors duration-500 group-hover:text-indigo/40">
                0{i + 1}
              </span>
              <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-cyan">{m.tag}</p>
              <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em]">
                {m.name}
              </h3>
              <p className="mt-4 leading-[1.65] text-fog">{m.desc}</p>
              <p className="mt-6 font-mono text-xs leading-[1.8] text-fog/70">{m.sub}</p>
              <span className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo/10 blur-3xl transition-opacity duration-500 group-hover:bg-cyan/15" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
