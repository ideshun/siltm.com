"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Reveal } from "@/components/ui/Reveal";

const MEMORIES = [
  {
    tag: "EPISODIC",
    name: "Episodic",
    desc: "What happened, when it happened. Every conversation, every decision — replayable on demand.",
    zh: "情景记忆 · 每一次对话皆成往事，皆可回放",
  },
  {
    tag: "SEMANTIC",
    name: "Semantic",
    desc: "Facts, concepts, relationships. The distilled knowledge your agent reasons with.",
    zh: "语义记忆 · 事实与关系，沉淀为可推理的知识",
  },
  {
    tag: "PROCEDURAL",
    name: "Procedural",
    desc: "How things get done. Workflows and preferences, compiled into instinct.",
    zh: "程序记忆 · 流程与偏好，编译成本能",
  },
  {
    tag: "WORKING",
    name: "Working",
    desc: "The live current. What's relevant right now, surfaced in milliseconds.",
    zh: "工作记忆 · 当下的洪流，毫秒级浮现",
  },
] as const;

/** 记忆流河：桌面端 GSAP 横向滚动画廊，移动端纵向堆叠 */
export function River() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || window.innerWidth < 768) return;
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const distance = track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
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
    <section id="river" className="relative">
      <div className="px-6 pt-[160px]">
        <Reveal className="mx-auto max-w-[1200px]">
          <p className="mb-4 font-mono text-xs tracking-[0.35em] text-fog">02 / STORING</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Memory is a river,
            <br />
            <span className="text-gradient">not a warehouse.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] leading-[1.65] text-fog">
            Four currents, one flow. SILTM organizes every kind of memory as it
            streams in — no tables, no silos, no forgetting.
          </p>
        </Reveal>
      </div>

      <div ref={wrapRef} className="mt-16 md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 pb-[160px] md:w-max md:flex-row md:gap-8 md:pl-[max(24px,calc(50vw-600px))]"
        >
          {MEMORIES.map((m, i) => (
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
              <p className="mt-6 font-mono text-xs leading-[1.8] text-fog/70">{m.zh}</p>
              <span className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo/10 blur-3xl transition-opacity duration-500 group-hover:bg-cyan/15" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
