"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ScrollRef { velocity: number; }

// ─── Jet constants ───────────────────────────────────────────────────────────
const JET_COUNT  = 2000;
const JET_HEIGHT = 6;
const JET_SPEED  = 0.04;

// ─── Galaxy matching example.html ───────────────────────────────────────────
function buildGalaxy() {
  const count = 20_000, radius = 8, branches = 4, spin = 1, rand = 0.3, randPow = 3;
  const cIn  = new THREE.Color("#ff6030");
  const cOut = new THREE.Color("#1b3984");
  const pos  = new Float32Array(count * 3);
  const col  = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    let r = Math.random() * radius; if (r < 1) r += 1;
    const sa = r * spin, ba = ((i % branches) / branches) * Math.PI * 2;
    const rx = Math.pow(Math.random(), randPow) * (Math.random() < .5 ? 1 : -1) * rand * r;
    const ry = Math.pow(Math.random(), randPow) * (Math.random() < .5 ? 1 : -1) * rand * r;
    const rz = Math.pow(Math.random(), randPow) * (Math.random() < .5 ? 1 : -1) * rand * r;
    pos[i3] = Math.cos(ba + sa) * r + rx; pos[i3+1] = ry / 2; pos[i3+2] = Math.sin(ba + sa) * r + rz;
    const m = cIn.clone().lerp(cOut, r / radius);
    col[i3] = m.r; col[i3+1] = m.g; col[i3+2] = m.b;
  }
  return { pos, col };
}

// ─── Colorful background stars ───────────────────────────────────────────────
function buildStars() {
  const count = 3000;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  // palette: yellow, orange, pink, blue, white — matching example.html
  const palette = [[1,.9,.2],[1,.5,.12],[1,.28,.65],[.25,.55,1],[1,1,1]] as const;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = 15 + Math.random() * 90, t = 2*Math.PI*Math.random(), phi = Math.acos(2*Math.random()-1);
    pos[i3] = r*Math.sin(phi)*Math.cos(t); pos[i3+1] = r*Math.sin(phi)*Math.sin(t); pos[i3+2] = r*Math.cos(phi);
    const c = palette[Math.floor(Math.random() * palette.length)];
    const b = 0.85 + Math.random() * 0.15;
    col[i3] = c[0]*b; col[i3+1] = c[1]*b; col[i3+2] = c[2]*b;
  }
  return { pos, col };
}

// ─── Accretion disk particles ────────────────────────────────────────────────
function buildAccretion() {
  const count = 2500, base = new THREE.Color(0xffaa55);
  const pos = new Float32Array(count * 3), col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3, r = 0.26 + Math.random() * 0.25, a = Math.random() * Math.PI * 2;
    pos[i3] = Math.cos(a)*r; pos[i3+1] = (Math.random()-.5)*.015; pos[i3+2] = Math.sin(a)*r;
    const c = base.clone(); c.offsetHSL(0, 0, (1-(r-.26)/.25)*.5);
    col[i3] = c.r; col[i3+1] = c.g; col[i3+2] = c.b;
  }
  return { pos, col };
}

// ─── Jet particles ───────────────────────────────────────────────────────────
function buildJet() {
  const pos = new Float32Array(JET_COUNT * 3), col = new Float32Array(JET_COUNT * 3);
  const vel: { vx: number; vy: number; vz: number; dir: number }[] = [];
  for (let i = 0; i < JET_COUNT; i++) {
    const i3 = i*3, rS = Math.random()*.08, a = Math.random()*Math.PI*2, dir = Math.random()>.5 ? 1 : -1;
    pos[i3] = Math.cos(a)*rS; pos[i3+1] = dir*.25; pos[i3+2] = Math.sin(a)*rS;
    vel.push({ vx:(Math.random()-.5)*.004, vy:(Math.random()*.2+1.2)*JET_SPEED*dir, vz:(Math.random()-.5)*.004, dir });
    col[i3]=.67; col[i3+1]=.8; col[i3+2]=1;
  }
  return { pos, col, vel };
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function GalaxyScene({ sr }: { sr: React.MutableRefObject<ScrollRef> }) {
  const { scene, camera } = useThree();
  const galaxyRef = useRef<THREE.Group>(null);
  const diskRef   = useRef<THREE.Mesh>(null);
  const haloRef   = useRef<THREE.Mesh>(null);
  const accRef    = useRef<THREE.Points>(null);
  const jetRef    = useRef<THREE.Points>(null);
  const rotation  = useRef(0);

  const { pos: gP, col: gC }   = useMemo(buildGalaxy,   []);
  const { pos: sP, col: sC }   = useMemo(buildStars,    []);
  const { pos: aP, col: aC }   = useMemo(buildAccretion,[]);
  const jetData                  = useMemo(buildJet,      []);

  const starGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(sP, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(sC, 3));
    return g;
  }, [sP, sC]);

  const starMat = useMemo(() => new THREE.PointsMaterial({
    size: 0.15, sizeAttenuation: true, depthWrite: false,
    blending: THREE.AdditiveBlending, vertexColors: true,
    transparent: true, opacity: 0.95, fog: false,
  }), []);

  const accGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(aP, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(aC, 3));
    return g;
  }, [aP, aC]);

  const jetGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(jetData.pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(jetData.col, 3));
    return g;
  }, [jetData]);

  const jetMat = useMemo(() => new THREE.PointsMaterial({
    size: 0.025, sizeAttenuation: true, depthWrite: false,
    blending: THREE.AdditiveBlending, vertexColors: true, transparent: true, opacity: 0.8,
  }), []);

  useEffect(() => {
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.03);
    camera.lookAt(0, 0, 0);
  }, [scene, camera]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // ── Pure velocity-based rotation — no spring, no overshoot ──────────────
    rotation.current += (0.05 + sr.current.velocity * 0.30) * delta;
    if (galaxyRef.current) galaxyRef.current.rotation.y = rotation.current;

    // ── Accretion disk (independent rotation) ───────────────────────────────
    if (diskRef.current) diskRef.current.rotation.set(Math.PI / 2, 0, elapsed * 1.5);
    if (haloRef.current) haloRef.current.rotation.set(0, Math.PI / 3, -elapsed * 0.5);
    if (accRef.current)  accRef.current.rotation.y = elapsed * 2.0;

    // ── Jet particle simulation ──────────────────────────────────────────────
    if (jetRef.current) {
      jetRef.current.rotation.y = elapsed * 0.05;
      const p = jetData.pos, c = jetData.col;
      for (let i = 0; i < JET_COUNT; i++) {
        const i3 = i*3, v = jetData.vel[i];
        p[i3] += v.vx + p[i3]*.01; p[i3+1] += v.vy; p[i3+2] += v.vz + p[i3+2]*.01;
        const life = Math.max(0, 1 - Math.abs(p[i3+1]) / JET_HEIGHT);
        c[i3] = 1-.4*life; c[i3+1] = .8*life; c[i3+2] = life+.3;
        if (Math.abs(p[i3+1]) > JET_HEIGHT || Math.random() < .002) {
          const rS = Math.random()*.04, a = Math.random()*Math.PI*2;
          p[i3] = Math.cos(a)*rS; p[i3+1] = v.dir*.14; p[i3+2] = Math.sin(a)*rS;
        }
      }
      jetRef.current.geometry.attributes.position.needsUpdate = true;
      jetRef.current.geometry.attributes.color.needsUpdate    = true;
    }
  });

  return (
    <>
      {/* Background stars — fixed, NOT inside galaxy group so they don't rotate */}
      <points geometry={starGeo} material={starMat} />

      <group ref={galaxyRef}>
        <Points positions={gP} colors={gC} frustumCulled={false}>
          <PointMaterial vertexColors size={0.015} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} transparent />
        </Points>
      </group>

      {/* Black hole */}
      <mesh><sphereGeometry args={[0.25, 64, 64]} /><meshBasicMaterial color={0x000000} /></mesh>

      {/* Accretion disk */}
      <mesh ref={diskRef}>
        <ringGeometry args={[0.28, 0.55, 64, 8]} />
        <meshBasicMaterial color={0xffaa00} side={THREE.DoubleSide} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Accretion halo */}
      <mesh ref={haloRef}>
        <ringGeometry args={[0.26, 0.4, 64, 8]} />
        <meshBasicMaterial color={0xff4400} side={THREE.DoubleSide} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Accretion particles */}
      <points ref={accRef} geometry={accGeo}>
        <pointsMaterial vertexColors size={0.01} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} transparent />
      </points>

      {/* Jet pillars */}
      <points ref={jetRef} geometry={jetGeo} material={jetMat} />
    </>
  );
}

// ─── Public component ────────────────────────────────────────────────────────
export function SpaceBackground() {
  const sr = useRef<ScrollRef>({ velocity: 0 });

  useEffect(() => {
    let lastY = 0, lastTime = performance.now(), raf = 0;

    const decay = () => { sr.current.velocity *= 0.92; raf = requestAnimationFrame(decay); };
    raf = requestAnimationFrame(decay);

    const onScroll = () => {
      const now = performance.now(), dt = Math.max(now - lastTime, 8);
      const dy = window.scrollY - lastY;
      sr.current.velocity = Math.max(-8, Math.min((dy / dt) * 12, 8));
      lastY = window.scrollY; lastTime = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}>
      <Canvas camera={{ position: [4, 3, 6], fov: 75, near: 0.1, far: 200 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
        <GalaxyScene sr={sr} />
      </Canvas>
    </div>
  );
}
