// 动效全局约定：曲线与时长取自设计规范（docs/website-design-proposal.md §3.5）
export const EASE_FLUID = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  /** 微交互 200ms */
  micro: 0.2,
  /** 区块过渡 600–900ms */
  block: 0.8,
  /** 场景切换 1200ms */
  scene: 1.2,
} as const;
