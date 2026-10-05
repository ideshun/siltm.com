"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useLang, dict } from "@/lib/i18n";

interface MemoryNode {
  id: number;
  text: string;
  x: number;
  y: number;
  state: "sinking" | "stored" | "recalled";
}

/** 活体演示：输入一句话，看它沉入记忆流，再被召回点亮 */
export function Demo() {
  const [input, setInput] = useState("");
  const [nodes, setNodes] = useState<MemoryNode[]>([]);
  const [recalling, setRecalling] = useState(false);
  const { lang } = useLang();
  const t = dict.demo;

  const store = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const id = Date.now();
    setNodes((ns) => [
      ...ns,
      {
        id,
        text: t,
        x: 12 + Math.random() * 76,
        y: 10 + Math.random() * 20,
        state: "sinking",
      },
    ]);
    setInput("");
    // 沉入地层 → 沉积为长期记忆
    setTimeout(() => {
      setNodes((ns) =>
        ns.map((n) =>
          n.id === id
            ? { ...n, y: 55 + Math.random() * 30, state: "stored" }
            : n
        )
      );
    }, 900);
  };

  const recall = () => {
    if (!nodes.length || recalling) return;
    setRecalling(true);
    setNodes((ns) => ns.map((n) => ({ ...n, state: "stored" })));
    // 涟漪式逐个点亮
    nodes.forEach((_, i) => {
      setTimeout(() => {
        setNodes((ns) =>
          ns.map((n, j) => (j === i ? { ...n, state: "recalled" } : n))
        );
      }, 300 + i * 260);
    });
    setTimeout(() => {
      setNodes((ns) => ns.map((n) => ({ ...n, state: "stored" })));
      setRecalling(false);
    }, 600 + nodes.length * 260);
  };

  return (
    <section id="demo" className="relative px-6 py-[160px] md:py-[240px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="mb-4 font-mono text-xs tracking-[0.35em] text-fog">{t.kicker[lang]}</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {t.titleA[lang]}
            <br />
            <span className="text-gradient">{t.titleB[lang]}</span>
          </h2>
          <p className="mt-6 max-w-[52ch] leading-[1.65] text-fog">
            {t.desc[lang]}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-abyss-2/60">
            {/* 输入区 */}
            <form
              className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                store(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={80}
                placeholder={t.placeholder[lang]}
                aria-label={t.inputAria[lang]}
                className="min-h-11 flex-1 rounded-lg border border-line bg-abyss px-4 font-mono text-sm text-ice placeholder:text-fog/50 focus:border-cyan/60 focus:outline-none"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn-sheen min-h-11 rounded-lg bg-indigo px-5 font-mono text-xs tracking-widest text-ice transition-colors hover:bg-indigo/80"
                >
                  STORE
                </button>
                <button
                  type="button"
                  onClick={recall}
                  disabled={!nodes.length || recalling}
                  className="btn-sheen min-h-11 rounded-lg border border-amber/50 px-5 font-mono text-xs tracking-widest text-amber transition-colors hover:border-amber disabled:opacity-30"
                >
                  RECALL
                </button>
              </div>
            </form>

            {/* 快捷记忆 */}
            <div className="flex flex-wrap gap-2 px-4 pt-3">
              {t.suggestions[lang].map((s) => (
                <button
                  key={s}
                  onClick={() => store(s)}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-fog transition-colors hover:border-cyan/50 hover:text-ice"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* 记忆流域 */}
            <div
              className="relative m-4 h-[320px] overflow-hidden rounded-xl border border-line/60 bg-abyss"
              aria-live="polite"
            >
              {/* 分层参考线：表层鲜活 → 深层长期 */}
              {[25, 50, 75].map((y) => (
                <div
                  key={y}
                  className="absolute inset-x-0 border-t border-dashed border-line/40"
                  style={{ top: `${y}%` }}
                />
              ))}
              <span className="absolute left-3 top-2 font-mono text-[9px] tracking-[0.25em] text-fog/50">
                {t.surface[lang]}
              </span>
              <span className="absolute bottom-2 left-3 font-mono text-[9px] tracking-[0.25em] text-fog/50">
                {t.deep[lang]}
              </span>

              {nodes.length === 0 && (
                <p className="absolute inset-0 flex items-center justify-center font-mono text-xs text-fog/40">
                  {t.empty[lang]}
                </p>
              )}

              {nodes.map((n) => (
                <div
                  key={n.id}
                  className="absolute max-w-[70%] transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-[11px] backdrop-blur transition-all duration-500 ${
                      n.state === "recalled"
                        ? "border-amber bg-amber/15 text-amber shadow-[0_0_24px_rgba(255,184,0,0.25)]"
                        : n.state === "stored"
                          ? "border-indigo/40 bg-indigo/10 text-fog"
                          : "border-cyan/60 bg-cyan/10 text-cyan"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        n.state === "recalled"
                          ? "animate-ping bg-amber"
                          : n.state === "stored"
                            ? "bg-indigo"
                            : "animate-pulse bg-cyan"
                      }`}
                    />
                    <span className="truncate">{n.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
