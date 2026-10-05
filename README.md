# SILTM — Super Intelligence Long-Term Memory

> Your AI remembers. · 让智能，记得住。

SILTM 产品官网。单页滚动叙事：遗忘 → 沉积 → 检索 → 涌现。
设计方案见 [`docs/website-design-proposal.md`](docs/website-design-proposal.md)。

## 技术栈

- Next.js 16.3 + React 19.3 + TypeScript（静态导出，`output: "export"`）
- Three.js 0.186 + @react-three/fiber 9：记忆云粒子场景（动态加载，不进首屏）
- GSAP 3.15 ScrollTrigger：滚动叙事（按需动态加载）
- Lenis：平滑滚动
- Tailwind CSS 4 + CSS 变量设计令牌
- 字体：Space Grotesk / Inter / JetBrains Mono（npm 自托管可变字体，零外部请求）

## 开发

```bash
npm install
npm run dev      # 本地开发
npm run build    # 静态导出至 out/
npm run typecheck
```

## 目录

```
app/                 # App Router：layout + 单页组装
components/
  three/             # MemoryScene / SceneInner（记忆云粒子，~9k 粒子）
  sections/          # Hero, Problem, River, HowItWorks, Demo, Numbers, Manifesto, Footer
  ui/                # Cursor, Nav, MagneticButton, Typewriter, Reveal
lib/                 # 设计令牌、动效预设、Lenis/GSAP 加载器、hooks
```

## 性能与无障碍

- 首屏 JS ≈ 182KB gzip（3D/GSAP/Lenis 全部动态加载；红线 ≤200KB）
- 移动端（<768px）不渲染 3D 场景，横向滚动画廊降级为纵向堆叠
- `prefers-reduced-motion`：全站动效降级为静态
- 触控目标 ≥44px；章节指示点带 `aria-current`
