"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generates random points distributed on a sphere surface.
function generateSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.6 + Math.random() * 0.4);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => generateSpherePoints(1400, 2.2), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Slow dual-axis rotation for a floating effect
    ref.current.rotation.x = t * 0.04;
    ref.current.rotation.y = t * 0.06;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

// Secondary sparse ring for depth
function OuterRing() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => generateSpherePoints(400, 3.6), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = -t * 0.025;
    ref.current.rotation.y = t * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        opacity={0.25}
      />
    </Points>
  );
}

// HeroCanvas renders the Three.js particle field behind the hero section.
// Wrapped in Suspense-ready Canvas; pointer events disabled so it never
// intercepts clicks on the hero text/buttons.
export function HeroCanvas() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleField />
        <OuterRing />
      </Canvas>
    </div>
  );
}
