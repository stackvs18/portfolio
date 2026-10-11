"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireIcosahedron({ base, accent }: { base: string; accent: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x += delta * 0.07;
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color={base} wireframe wireframeLinewidth={1} />
      </mesh>
      <mesh scale={1.001}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function WireTorus({ base }: { base: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.z += delta * 0.1;
    mesh.current.rotation.x -= delta * 0.05;
  });
  return (
    <mesh ref={mesh} position={[1.6, -0.9, -1.2]} scale={0.55}>
      <torusGeometry args={[1.1, 0.05, 8, 64]} />
      <meshBasicMaterial color={base} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

/** Two rotating wireframe objects. `tone="light"` = dark lines for the paper
 *  section; `tone="dark"` = pale/blue lines for OLED-black sections. */
export default function SketchScene({ tone = "light" }: { tone?: "light" | "dark" }) {
  const base = tone === "light" ? "#0d0f12" : "#e7e9ec";
  const accent = "#3d63ff";
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <WireIcosahedron base={base} accent={accent} />
        <WireTorus base={base} />
      </Canvas>
    </div>
  );
}
