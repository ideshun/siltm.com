export type Lang = "en" | "zh";

/** 全站文案字典：en 与 zh 键一一对应 */
export const dict = {
  nav: {
    join: { en: "JOIN WAITLIST", zh: "加入等候名单" },
  },
  hero: {
    kicker: { en: "SUPER INTELLIGENCE LONG-TERM MEMORY", zh: "超级智能 · 长期记忆" },
    titleA: { en: "Your AI", zh: "让你的 AI" },
    titleB: { en: "remembers.", zh: "记得住。" },
    typeA: { en: "Long-term memory infrastructure for AI agents.", zh: "让智能，记得住。" },
    typeB: { en: "让智能，记得住。", zh: "Long-term memory infrastructure for AI agents." },
    ctaPrimary: { en: "Start remembering", zh: "开始记住" },
    ctaGhost: { en: "How it works", zh: "了解原理" },
    flowDown: { en: "FLOW DOWN", zh: "向下流动" },
  },
  problem: {
    kicker: { en: "01 / FORGETTING", zh: "01 / 遗忘" },
    titleA: { en: "Every session,", zh: "每次会话，" },
    titleB: { en: "your AI starts", zh: "你的 AI" },
    titleC: { en: "from zero.", zh: "从零开始。" },
    desc: {
      en: "Context windows overflow. Conversations evaporate. What your agent learned yesterday is gone today — brilliance, amnesiac.",
      zh: "上下文窗口溢出，对话蒸发殆尽。昨天学会的一切，今天荡然无存——纵有才智，却患失忆。",
    },
    filling: { en: "FILLING", zh: "填充中" },
    overflow: { en: "OVERFLOW", zh: "溢出" },
    lost: { en: "LOST", zh: "已丢失" },
    fragments: {
      en: [
        "user prefers dark mode",
        "project deadline is Friday",
        "allergic to peanuts",
        "use pnpm, not npm",
        "my daughter's name is…",
      ],
      zh: [
        "用户偏好深色模式",
        "项目截止日是周五",
        "对花生过敏",
        "用 pnpm，别用 npm",
        "我女儿的名字叫……",
      ],
    },
  },
  river: {
    kicker: { en: "02 / STORING", zh: "02 / 沉积" },
    titleA: { en: "Memory is a river,", zh: "记忆是河流，" },
    titleB: { en: "not a warehouse.", zh: "而非仓库。" },
    desc: {
      en: "Four currents, one flow. SILTM organizes every kind of memory as it streams in — no tables, no silos, no forgetting.",
      zh: "四股水流，同一条河。SILTM 在记忆流入时即刻组织——无表格，无孤岛，无遗忘。",
    },
    cards: {
      en: [
        { tag: "EPISODIC", name: "Episodic", desc: "What happened, when it happened. Every conversation, every decision — replayable on demand.", sub: "情景记忆 · 每一次对话皆成往事，皆可回放" },
        { tag: "SEMANTIC", name: "Semantic", desc: "Facts, concepts, relationships. The distilled knowledge your agent reasons with.", sub: "语义记忆 · 事实与关系，沉淀为可推理的知识" },
        { tag: "PROCEDURAL", name: "Procedural", desc: "How things get done. Workflows and preferences, compiled into instinct.", sub: "程序记忆 · 流程与偏好，编译成本能" },
        { tag: "WORKING", name: "Working", desc: "The live current. What's relevant right now, surfaced in milliseconds.", sub: "工作记忆 · 当下的洪流，毫秒级浮现" },
      ],
      zh: [
        { tag: "EPISODIC", name: "情景记忆", desc: "发生了什么、何时发生。每一次对话、每一个决定——随时可回放。", sub: "EPISODIC · REPLAYABLE ON DEMAND" },
        { tag: "SEMANTIC", name: "语义记忆", desc: "事实、概念与关系。被蒸馏提纯，成为智能体推理所用的知识。", sub: "SEMANTIC · DISTILLED KNOWLEDGE" },
        { tag: "PROCEDURAL", name: "程序记忆", desc: "事情如何完成。流程与偏好，被编译成本能。", sub: "PROCEDURAL · COMPILED INSTINCT" },
        { tag: "WORKING", name: "工作记忆", desc: "鲜活的当下。此刻相关的一切，毫秒级浮现。", sub: "WORKING · THE LIVE CURRENT" },
      ],
    },
  },
  how: {
    kicker: { en: "03 / RECALLING", zh: "03 / 检索" },
    titleA: { en: "Three motions.", zh: "三个动作。" },
    titleB: { en: "One memory.", zh: "同一条记忆。" },
    stages: {
      en: [
        { step: "WRITE", title: "Everything flows in.", desc: "Conversations, files, tool calls, sensor streams — SILTM ingests raw experience without schemas or upfront structure.", sub: "写入 · 原始经历如溪水入河，无需预设表结构" },
        { step: "ORGANIZE", title: "The current sorts itself.", desc: "Memories are compressed, indexed and woven together as they flow — hot near the surface, deep knowledge settling below.", sub: "组织 · 压缩、索引、交织，热的浮于表层，深的沉入底部" },
        { step: "RECALL", title: "The right memory rises.", desc: "At inference time, exactly what's relevant surfaces in under 10ms — ranked, contextualized, citation-ready.", sub: "检索 · 推理瞬间，恰好的记忆毫秒级涌现，可溯源" },
      ],
      zh: [
        { step: "WRITE", title: "一切流入。", desc: "对话、文件、工具调用、传感数据流——SILTM 直接摄入原始经历，无需表结构，无需预先设计。", sub: "WRITE · RAW EXPERIENCE INGESTED" },
        { step: "ORGANIZE", title: "水流自有序。", desc: "记忆在流动中被压缩、索引、交织——热的浮于表层，深层知识缓缓沉降。", sub: "ORGANIZE · COMPRESSED & WOVEN" },
        { step: "RECALL", title: "恰好的记忆浮现。", desc: "推理瞬间，恰好的记忆在 10ms 内浮现——带排序、带上下文、可溯源。", sub: "RECALL · SURFACES IN <10MS" },
      ],
    },
  },
  demo: {
    kicker: { en: "04 / LIVE", zh: "04 / 演示" },
    titleA: { en: "Watch a memory", zh: "看一条记忆" },
    titleB: { en: "take root.", zh: "落地生根。" },
    desc: {
      en: "Type a sentence. See it sink into the stream, settle into long-term memory — then surface again the instant it matters.",
      zh: "输入一句话。看它沉入记忆流，沉积为长期记忆——在重要的瞬间，再次浮现。",
    },
    placeholder: { en: "Tell your AI something worth remembering…", zh: "告诉你的 AI 一件值得记住的事……" },
    store: { en: "STORE", zh: "存入" },
    recall: { en: "RECALL", zh: "召回" },
    suggestions: {
      en: [
        "I prefer concise answers in Chinese",
        "My API rate limit is 1000 req/min",
        "Always deploy on Friday mornings",
      ],
      zh: [
        "我偏好简洁的中文回答",
        "我的 API 限速是 1000 次/分钟",
        "总在周五上午发布",
      ],
    },
    surface: { en: "SURFACE · NOW", zh: "表层 · 当下" },
    deep: { en: "DEEP · LONG-TERM", zh: "深层 · 长期" },
    empty: { en: "The stream is waiting. Store something.", zh: "河流正在等待。存入点什么吧。" },
    inputAria: { en: "Memory to store", zh: "要存入的记忆" },
  },
  numbers: {
    kicker: { en: "05 / EMERGING", zh: "05 / 涌现" },
    titleA: { en: "Memory,", zh: "记忆，" },
    titleB: { en: "measured.", zh: "可度量。" },
    metrics: {
      en: [
        { label: "Recall accuracy", desc: "跨会话长期召回准确率" },
        { label: "Retrieval latency", desc: "P95 检索延迟" },
        { label: "Compression ratio", desc: "记忆压缩比" },
      ],
      zh: [
        { label: "召回准确率", desc: "RECALL ACCURACY · CROSS-SESSION" },
        { label: "检索延迟", desc: "RETRIEVAL LATENCY · P95" },
        { label: "压缩比", desc: "COMPRESSION RATIO" },
      ],
    },
  },
  manifesto: {
    kicker: { en: "06 / MANIFESTO", zh: "06 / 宣言" },
    line: { en: "Memory is not storage. Memory is gravity.", zh: "记忆不是储存，是引力。" },
    sub: { en: "记忆不是储存，是引力。", zh: "MEMORY IS NOT STORAGE. MEMORY IS GRAVITY." },
  },
  footer: {
    kicker: { en: "07 / BEGIN", zh: "07 / 启程" },
    titleA: { en: "Start", zh: "开始" },
    titleB: { en: "remembering.", zh: "记住。" },
    desc: {
      en: "SILTM is in private preview. Join the waitlist for API access — give your agent a memory that outlives the session.",
      zh: "SILTM 正在内测。加入等候名单获取 API 访问资格——给你的智能体一份超越会话的记忆。",
    },
    done: { en: "Remembered. We'll surface soon.", zh: "已记住。我们很快会浮现。" },
    join: { en: "Join waitlist", zh: "加入等候名单" },
    emailAria: { en: "Email address", zh: "邮箱地址" },
    tagline: { en: "Super Intelligence Long-Term Memory · 让智能，记得住。", zh: "Super Intelligence Long-Term Memory · Your AI remembers." },
  },
} as const;
