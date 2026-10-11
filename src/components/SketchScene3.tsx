"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useNetwork(count: number, radius: number, linkDist: number) {
  return useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * radius,
          (Math.random() - 0.5) * radius,
          (Math.random() - 0.5) * radius
        )
      );
    }
    const nodePositions = new Float32Array(count * 3);
    nodes.forEach((n, i) => n.toArray(nodePositions, i * 3));

    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < linkDist) {
          linePositions.push(...nodes[i].toArray(), ...nodes[j].toArray());
        }
      }
    }
    return { nodePositions, linePositions: new Float32Array(linePositions) };
  }, [count, radius, linkDist]);
}

function Network({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  const { nodePositions, linePositions } = useNetwork(26, 3.2, 1.5);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x += delta * 0.025;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.35} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.06} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  );
}

/** Rotating node/network graph — a nod to the actual graph-engine work,
 *  and a third distinct visual language alongside the wireframe + dot-sphere. */
export default function SketchScene3({
  tone = "light",
  color,
}: {
  tone?: "light" | "dark";
  color?: string;
}) {
  const resolved = color ?? (tone === "light" ? "#0000ff" : "#ffffff");
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Network color={resolved} />
      </Canvas>
    </div>
  );
}
