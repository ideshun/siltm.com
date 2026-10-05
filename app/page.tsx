import { MemoryScene } from "@/components/three/MemoryScene";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { River } from "@/components/sections/River";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Demo } from "@/components/sections/Demo";
import { Numbers } from "@/components/sections/Numbers";
import { Manifesto } from "@/components/sections/Manifesto";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main className="relative">
      {/* 记忆流体贯穿全页：滚动即时间流逝，场景随之切换形态 */}
      <MemoryScene />
      <Hero />
      <Problem />
      <River />
      <HowItWorks />
      <Demo />
      <Numbers />
      <Manifesto />
      <Footer />
    </main>
  );
}
