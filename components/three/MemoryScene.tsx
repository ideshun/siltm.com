"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** 场景形态：随滚动进度在 聚合(写入) → 河流(组织) → 涌现(检索) 之间演化 */
export type ScenePhase = "cloud" | "river" | "burst";

const SceneInner = dynamic(() => import("./SceneInner"), { ssr: false });

/**
 * 全页固定 3D 记忆云。滚动进度经 Lenis/ScrollTrigger 写入 window 上的
 * 共享 ref（避免每帧触发 React 重渲染），由 r3f 帧循环读取。
 */
export function MemoryScene() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
    >
      <SceneInner />
    </div>
  );
}
