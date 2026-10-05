"use client";

import { useEffect, useState } from "react";
import { useLang, dict } from "@/lib/i18n";

const SECTIONS = [
  { id: "hero", label: "00" },
  { id: "problem", label: "01" },
  { id: "river", label: "02" },
  { id: "how", label: "03" },
  { id: "demo", label: "04" },
  { id: "numbers", label: "05" },
  { id: "manifesto", label: "06" },
  { id: "join", label: "07" },
] as const;

/** 导航：滚动后毛玻璃浮现，右侧章节指示点标记当前位置 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const { lang, toggle } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "glass border-b border-line/60" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <a
            href="#hero"
            className="font-display text-lg font-semibold tracking-[-0.03em]"
            aria-label="SILTM home"
          >
            SILTM<span className="text-cyan">.</span>
          </a>
          <div className="flex items-center gap-3">
            {/* 中英切换：EN 态提示可切中文，反之亦然 */}
            <button
              type="button"
              onClick={toggle}
              aria-label={lang === "en" ? "切换到中文" : "Switch to English"}
              className="flex min-h-11 items-center rounded-full border border-line px-4 font-mono text-xs tracking-widest text-fog transition-colors hover:border-cyan/60 hover:text-ice"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <a
              href="#join"
              className="btn-sheen hidden rounded-full border border-amber/50 px-5 py-2 font-mono text-xs tracking-widest text-amber transition-colors hover:border-amber sm:inline-block"
            >
              {dict.nav.join[lang]}
            </a>
          </div>
        </nav>
      </header>

      {/* 章节指示点（桌面端） */}
      <nav
        aria-label="Sections"
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Section ${label}`}
            aria-current={active === id ? "true" : undefined}
            className="group flex items-center justify-end gap-2"
          >
            <span
              className={`font-mono text-[9px] tracking-widest transition-opacity ${
                active === id ? "text-cyan opacity-100" : "text-fog opacity-0 group-hover:opacity-70"
              }`}
            >
              {label}
            </span>
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                active === id ? "w-6 bg-cyan" : "w-1.5 bg-line group-hover:bg-fog"
              }`}
            />
          </a>
        ))}
      </nav>
    </>
  );
}
