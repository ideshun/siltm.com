// GSAP 全量包体较大（gzip 约 70KB），统一从这里按需动态加载，
// 保证其不进入首屏 bundle（性能红线：首屏 JS ≤ 200KB gzip）。
import type gsapType from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type GsapModules = {
  gsap: typeof gsapType;
  ScrollTrigger: typeof ScrollTriggerType;
};

let cached: Promise<GsapModules> | null = null;

export function loadGsap(): Promise<GsapModules> {
  if (!cached) {
    cached = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([g, st]) => {
        const gsap = g.default;
        const ScrollTrigger = st.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      }
    );
  }
  return cached;
}
