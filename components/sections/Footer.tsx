"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer id="join" className="relative border-t border-line px-6 pb-12 pt-[160px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="flex flex-col items-center text-center">
          <p className="mb-4 font-mono text-xs tracking-[0.35em] text-fog">07 / BEGIN</p>
          <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Start <span className="text-gradient">remembering.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] leading-[1.65] text-fog">
            SILTM is in private preview. Join the waitlist for API access —
            give your agent a memory that outlives the session.
          </p>

          {done ? (
            <div className="mt-12 flex items-center gap-3 rounded-full border border-cyan/40 bg-cyan/10 px-8 py-4 font-mono text-sm text-cyan">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
              Remembered. We&apos;ll surface soon.
            </div>
          ) : (
            <form
              className="mt-12 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="min-h-11 flex-1 rounded-full border border-line bg-abyss px-6 font-mono text-sm text-ice placeholder:text-fog/50 focus:border-amber/60 focus:outline-none"
              />
              <MagneticButton type="submit" variant="primary">
                Join waitlist
              </MagneticButton>
            </form>
          )}
        </Reveal>

        <div className="mt-[120px] flex flex-col items-center justify-between gap-6 border-t border-line/60 pt-8 md:flex-row">
          <p className="font-display text-lg font-semibold tracking-[-0.03em]">
            SILTM<span className="text-cyan">.</span>
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-fog">
            Super Intelligence Long-Term Memory · 让智能，记得住。
          </p>
          <p className="font-mono text-[11px] text-fog">
            © {new Date().getFullYear()} siltm.com
          </p>
        </div>
      </div>
    </footer>
  );
}
