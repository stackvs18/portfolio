"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Fibonacci-sphere point distribution — reads like a halftone/engraving dot
// pattern rather than the wireframe lines used elsewhere, on purpose.
function useSpherePoints(count: number, radius: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      positions.set([x * radius, y * radius, z * radius], i * 3);
    }
    return positions;
  }, [count, radius]);
}

function DotSphere({ color }: { color: string }) {
  const points = useRef<THREE.Points>(null);
  const positions = useSpherePoints(900, 1.6);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.14;
    points.current.rotation.x += delta * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.028} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

/** Halftone-style rotating dot sphere. `tone="light"` = dark dots for paper
 *  sections; `tone="dark"` = pale dots for OLED-black / blue sections. */
export default function SketchScene2({ tone = "light" }: { tone?: "light" | "dark" }) {
  const color = tone === "light" ? "#0000ff" : "#ffffff";
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <DotSphere color={color} />
      </Canvas>
    </div>
  );
}
