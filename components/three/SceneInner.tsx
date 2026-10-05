"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { loadGsap } from "@/lib/gsap";

export const SCROLL = { progress: 0, mouseX: 0, mouseY: 0 };

const COUNT = 9000;
const INDIGO = new THREE.Color("#6c5ce7");
const CYAN = new THREE.Color("#00f0ff");
const AMBER = new THREE.Color("#ffb800");

/** 记忆云粒子：一团缓慢脉动、随鼠标轻微扰动的神经云 */
function MemoryCloud() {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, seeds, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const c = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      // 球壳内非均匀分布：外密内疏，像星云
      const r = 6 + Math.pow(Math.random(), 0.6) * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      seeds[i] = Math.random() * 1000;
      // 主体蓝紫→青渐变，约 2% 琥珀点缀（全站强调色限额）
      const t = Math.random();
      if (t > 0.98) c.copy(AMBER);
      else c.copy(INDIGO).lerp(CYAN, Math.pow(t, 1.6));
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, seeds, colors };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uSize: { value: 2.2 },
        },
        vertexShader: /* glsl */ `
          uniform float uTime;
          uniform float uProgress;
          uniform vec2 uMouse;
          uniform float uSize;
          attribute float aSeed;
          attribute vec3 aColor;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vec3 p = position;
            float t = uTime * 0.12 + aSeed;

            // 缓慢脉动：像云在"回忆"
            p.x += sin(t * 0.7 + p.y * 0.4) * 0.35;
            p.y += cos(t * 0.5 + p.x * 0.3) * 0.3;
            p.z += sin(t * 0.6 + p.x * 0.2) * 0.35;

            // 鼠标扰动：近处粒子被轻推
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vec2 ndc = mv.xy / max(1.0, -mv.z) * 8.0;
            float d = distance(ndc, uMouse * 6.0);
            float push = smoothstep(2.5, 0.0, d);
            p.xy += normalize(ndc - uMouse * 6.0 + 0.0001) * push * 0.8;

            // 滚动形态：progress 0→0.5 收拢成流河，0.5→1 向外涌现
            float river = smoothstep(0.15, 0.5, uProgress) * (1.0 - smoothstep(0.55, 0.85, uProgress));
            float burst = smoothstep(0.6, 0.95, uProgress);
            p.y *= mix(1.0, 0.12, river);           // 压扁成河
            p.x *= mix(1.0, 2.6, river);            // 拉宽成流
            p *= mix(1.0, 2.2, burst);              // 涌现扩散

            vColor = aColor;
            vAlpha = 0.55 + 0.45 * sin(t + aSeed);

            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            // 相机后方的粒子 -mvPosition.z<=0，除法会让点尺寸爆炸成巨块，直接藏掉
            if (mvPosition.z >= -0.1) vAlpha = 0.0;
            float perspective = 300.0 / max(4.0, -mvPosition.z);
            gl_PointSize = clamp(uSize * (1.0 + push * 0.8) * perspective, 1.0, 9.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5 || vAlpha <= 0.0) discard;
            float glow = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(vColor, glow * glow * vAlpha * 0.7);
          }
        `,
      }),
    []
  );

  useEffect(() => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const onMove = (e: PointerEvent) => {
      SCROLL.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      SCROLL.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let kill: (() => void) | undefined;
    let cancelled = false;
    loadGsap().then(({ ScrollTrigger }) => {
      if (cancelled) return;
      const st = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          SCROLL.progress = self.progress;
        },
      });
      kill = () => st.kill();
    });
    return () => {
      cancelled = true;
      kill?.();
      window.removeEventListener("pointermove", onMove);
      material.dispose();
      geo.dispose();
    };
  }, [seeds, colors, material]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uProgress.value = SCROLL.progress;
    material.uniforms.uMouse.value.set(SCROLL.mouseX, SCROLL.mouseY);
    const sizeBase = viewport.width < 12 ? 1.6 : 2.2;
    material.uniforms.uSize.value = sizeBase * state.gl.getPixelRatio();
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref} material={material} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
    </points>
  );
}

export default function SceneInner() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 18], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <MemoryCloud />
    </Canvas>
  );
}
