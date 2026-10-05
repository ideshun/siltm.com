"use client";

import { Reveal } from "@/components/ui/Reveal";

const STAGES = [
  {
    step: "WRITE",
    title: "Everything flows in.",
    desc: "Conversations, files, tool calls, sensor streams — SILTM ingests raw experience without schemas or upfront structure.",
    zh: "写入 · 原始经历如溪水入河，无需预设表结构",
  },
  {
    step: "ORGANIZE",
    title: "The current sorts itself.",
    desc: "Memories are compressed, indexed and woven together as they flow — hot near the surface, deep knowledge settling below.",
    zh: "组织 · 压缩、索引、交织，热的浮于表层，深的沉入底部",
  },
  {
    step: "RECALL",
    title: "The right memory rises.",
    desc: "At inference time, exactly what's relevant surfaces in under 10ms — ranked, contextualized, citation-ready.",
    zh: "检索 · 推理瞬间，恰好的记忆毫秒级涌现，可溯源",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-[160px] md:py-[240px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="mb-4 font-mono text-xs tracking-[0.35em] text-fog">03 / RECALLING</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Three motions.
            <br />
            <span className="text-gradient">One memory.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-8">
          {STAGES.map((s, i) => (
            <Reveal key={s.step} delay={i * 140}>
              <div className="group relative border-t border-line pt-8">
                <span className="absolute -top-px left-0 h-px w-0 bg-gradient-to-r from-indigo to-cyan transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                <p className="font-mono text-[10px] tracking-[0.3em] text-cyan">
                  {String(i + 1).padStart(2, "0")} · {s.step}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em]">
                  {s.title}
                </h3>
                <p className="mt-4 leading-[1.65] text-fog">{s.desc}</p>
                <p className="mt-5 font-mono text-xs leading-[1.8] text-fog/70">{s.zh}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
