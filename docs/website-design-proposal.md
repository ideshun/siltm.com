# SILTM 官网设计方案

> **SILTM — Super Intelligence Long-Term Memory**：让智能，记得住。

- 版本：v1.0（定稿）
- 概念定调：**记忆流体（Memory Fluid）**
- 来源：Issue #1 调研结论，技术栈版本已于 2026-10 经 npm registry 实时核验

---

## 一、创意概念：记忆流体

SI Agent 的记忆不是数据库表格，而是一条流动的、可塑的、有生命的时间河。整个官网体验围绕这一隐喻展开：

- 用户滚动 = 时间流逝 = 记忆沉积与检索
- 首屏 3D 场景是一团**缓慢脉动的神经记忆云**（粒子 + 流动曲线），随鼠标轻微扰动，像在「回忆」
- 页面叙事线：**遗忘（Forgetting）→ 沉积（Storing）→ 检索（Recalling）→ 涌现（Emerging）**，恰好对应产品能力：写入 → 组织 → 检索 → 推理增强

该叙事天然避开「企业站三件套」（Hero + Features 九宫格 + Pricing），具备品牌辨识度。

## 二、页面结构（单页滚动叙事）

| 区块 | 内容 | 交互亮点 |
|---|---|---|
| 00 Hero | 「Your AI remembers.」超大无衬线标题 + 记忆云 3D 场景 | 鼠标扰动粒子；打字机式副标 |
| 01 The Problem | AI 的失忆困境：统计文字逐帧浮现（context window 崩溃可视化） | 滚动驱动的 token 计数器爆表动画 |
| 02 The River | 记忆流河：水平滚动画廊展示记忆类型（情景/语义/程序性/工作记忆） | GSAP ScrollTrigger 横向滚动 |
| 03 How It Works | 写入 / 组织 / 检索三阶段 | 滚动到对应位置，3D 场景切换形态 |
| 04 Live Demo | 嵌入式交互演示：输入一句话，看记忆被「存入」并可视化成节点 | 真实交互，停留时长杀手锏 |
| 05 Numbers | 指标区（召回率、延迟、压缩比） | 数字滚动 + 计数微交互 |
| 06 Manifesto | 品牌宣言，大字排版呼吸感 | 文字随滚动逐句点亮 |
| 07 CTA / Footer | 等待名单 / API 申请 | 输入框微交互（提交后粒子吸入动画） |

## 三、八大维度设计规范

### 1. 排版

- 标题：Neue Montreal / PP Neue Machina（免费可商用，科技感且不烂大街），字距 -0.03em，行高 0.95–1.1
- 正文：Inter 17px / 1.65 行高，最大行长 62ch
- 等宽字体点缀：JetBrains Mono 用于数据、代码、记忆片段（暗示「机器记忆」）
- 层级：H1 `clamp(3.5rem, 9vw, 8rem)` → H2 → Body → Caption，比例 1.618 级进

### 2. 留白

- 区块间距节奏：240 / 160 / 120px 三段呼吸
- 内容区最大宽 1200px，两侧大留白
- 宣言区整屏只放一句话——敢空才高级

### 3. 视觉层级

- Z 字视线引导：首屏标题左上 → 3D 场景右 → CTA 左下
- 对比关系：大字 vs 小字、黑 vs 荧光色、静止 vs 运动

### 4. 色彩

- 基调：深空黑 `#0A0A0F`（非纯黑，带一点紫调，情绪 = 深邃记忆）
- 主色：记忆蓝紫 `#6C5CE7` → 荧光青 `#00F0FF` 渐变（数据流动感）
- 强调色：琥珀 `#FFB800` 仅用于 CTA 和关键数据（单页不超过 3 处）
- 正文对比度 ≥ 7:1（WCAG AAA）

### 5. 动效

- 曲线：自定义 `cubic-bezier(0.16, 1, 0.3, 1)`（expo out），入场快、收尾缓
- 时长：微交互 200ms / 区块过渡 600–900ms / 场景切换 1200ms
- 滚动：Lenis 平滑滚动 + ScrollTrigger 同步驱动 3D
- `prefers-reduced-motion` 全部降级为静态

### 6. 微交互

- 按钮：hover 时内部流光扫过 + 磁吸跟随（magnetic button）
- 导航：滚动时毛玻璃浮现，当前章节指示点
- 加载：首屏粒子先聚合出 SILTM 字样再散开（< 1.5s）
- 光标：桌面端自定义光标，悬停可交互元素时变形为「RECALL」圆环

### 7. 响应式

- 断点：480 / 768 / 1024 / 1440
- 移动端：3D 场景降级为预渲染 WebM 循环视频 + 静态粒子图；横向滚动改纵向堆叠
- 触控目标 ≥ 44px；hover 态全部映射为 `:active` 视觉反馈

### 8. 原创性

- 设计语言命名：**「Sediment UI」（沉积式 UI）**——所有元素都像记忆沉积层一样，从底部/深处浮现，而非企业站惯用的 fade-in-from-top
- 专属视觉资产：记忆云粒子系统、沉积纹理噪点（shader 程序化生成，非素材库贴图）

## 四、技术栈（版本均经 npm registry 实时核验，2026-10）

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | **Next.js 16.3 + React 19.3 + TypeScript** | SSG 静态导出，SEO 友好，获奖向项目主流组合 |
| 样式 | **Tailwind CSS 4.3** + CSS 变量设计令牌 | 快速迭代，与动效库配合好 |
| 3D | **Three.js 0.186 + @react-three/fiber 9 + drei 10**（WebGPURenderer + TSL，WebGL2 自动回退） | 记忆云粒子 / 流线场景；一码双编译，前沿且可回退 |
| 动效 | **GSAP 3.15（ScrollTrigger）+ Motion 14** | GSAP 管滚动叙事，Motion 管组件微交互 |
| 平滑滚动 | **Lenis 1.3** | 获奖站标配 |
| 字体 | 本地托管 woff2（Neue Montreal + Inter + JetBrains Mono） | 无外部依赖，CLS = 0 |
| 部署 | 静态导出 + CDN（Vercel / CNB Pages） | 全球加速 |
| 质检 | Lighthouse：Perf ≥ 90、A11y = 100、SEO = 100 | 3D 场景懒加载后达标 |

**性能红线**：首屏 JS ≤ 200KB（gzip，3D 包动态 import）；粒子数桌面 ≤ 60k、移动端 ≤ 15k 或降级视频；LCP ≤ 2.5s。

## 五、模板文件结构

```
siltm/
├─ app/                # Next.js App Router
│  ├─ page.tsx         # 单页叙事组装
│  └─ layout.tsx       # 字体 / SEO / Lenis Provider
├─ components/
│  ├─ three/           # MemoryCloud, MemoryRiver, ParticleField
│  ├─ sections/        # Hero, Problem, River, HowItWorks, Demo, Numbers, Manifesto, Footer
│  └─ ui/              # MagneticButton, GlowCard, TypewriterText, Cursor
├─ lib/                # 设计令牌、动效预设、hooks
├─ public/fonts/       # 本地字体
└─ styles/tokens.css   # 色彩 / 间距 / 字级系统
```

## 六、文案

- 主标：**Your AI remembers.**（三个词，现在时，笃定）
- 中文定调：**让智能，记得住。**（六字，对仗，口语可传播）
- 宣言备选：
  - *「Memory is not storage. Memory is gravity.」*——记忆不是仓库，是引力。
  - 中文对应：*「记忆不是储存，是引力。」*
- CTA：**Start remembering.** / **开始铭记。**

## 七、里程碑

1. **M1** 设计令牌 + Hero + 3D 记忆云（视觉定调，先惊艳）
2. **M2** 全页面叙事滚动（Problem → River → How It Works）
3. **M3** 交互 Demo + 响应式 + 性能优化 + 无障碍收官
