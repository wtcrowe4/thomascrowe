"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Cylinder } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Shot, ShotOutcome } from "@/lib/types";

const OUTCOME_COLOR: Record<ShotOutcome, string> = {
  birdie: "#10b981",
  par: "#a3a3a3",
  bogey: "#fbbf24",
  "double+": "#ef4444",
  water: "#3b82f6",
};

// 1 yard -> world units
const Y2W = 0.3;

function parabola(
  tee: THREE.Vector3,
  landing: THREE.Vector3,
  apexFactor = 0.55,
  segments = 64
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const dist = tee.distanceTo(landing);
  const apex = Math.max(dist * apexFactor, 6);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = THREE.MathUtils.lerp(tee.x, landing.x, t);
    const z = THREE.MathUtils.lerp(tee.z, landing.z, t);
    const y = 4 * apex * t * (1 - t);
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

function Tracer({
  shot,
  delay,
  onHover,
}: {
  shot: Shot;
  delay: number;
  onHover: (s: Shot | null) => void;
}) {
  const ballRef = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const startedRef = useRef(false);

  const points = useMemo(() => {
    const tee = new THREE.Vector3(shot.tee.x * Y2W, 0.4, shot.tee.y * Y2W);
    const land = new THREE.Vector3(shot.landing.x * Y2W, 0.05, shot.landing.y * Y2W);
    return parabola(tee, land);
  }, [shot]);

  const color = OUTCOME_COLOR[shot.outcome];

  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    g.setDrawRange(0, 0);
    const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85 });
    return { geometry: g, material: m };
  }, [points, color]);

  const lineObj = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useFrame((state) => {
    const t = state.clock.elapsedTime - delay;
    const p = Math.max(0, Math.min(1, t / 1.6));
    const drawCount = Math.floor(p * (points.length - 1));
    geometry.setDrawRange(0, drawCount);
    if (ballRef.current) {
      if (drawCount > 0 && p < 1) {
        ballRef.current.visible = true;
        ballRef.current.position.copy(points[drawCount]);
      } else {
        ballRef.current.visible = false;
      }
    }
    if (dotRef.current) dotRef.current.visible = p >= 1;
    if (p > 0 && !startedRef.current) startedRef.current = true;
  });

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(shot);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = "default";
      }}
    >
      <primitive object={lineObj} />
      <mesh ref={ballRef} visible={false}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={dotRef} position={points[points.length - 1]} visible={false}>
        <sphereGeometry args={[0.38, 14, 14]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function Hole() {
  const greenGeo = useMemo(() => {
    const shape = new THREE.Shape();
    const segs = 80;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const wobble = 1 + Math.sin(a * 3) * 0.08 + Math.cos(a * 2) * 0.05;
      const x = Math.cos(a) * 13 * Y2W * wobble;
      const z = Math.sin(a) * 14 * Y2W * wobble;
      if (i === 0) shape.moveTo(x, z);
      else shape.lineTo(x, z);
    }
    const geo = new THREE.ShapeGeometry(shape, 80);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#0f2742" roughness={0.35} metalness={0.5} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[4.5, 5, 64]} />
        <meshBasicMaterial color="#1e4a7a" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.018, 0]}>
        <ringGeometry args={[5.5, 6.2, 64]} />
        <meshBasicMaterial color="#1e4a7a" transparent opacity={0.35} />
      </mesh>

      <mesh geometry={greenGeo} position={[0, 0.02, 0]} receiveShadow>
        <meshStandardMaterial color="#5d8b4c" roughness={0.9} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[3.85, 4.15, 80]} />
        <meshBasicMaterial color="#3d5a3f" transparent opacity={0.8} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -3.2]}>
        <planeGeometry args={[1.6, 1.4]} />
        <meshStandardMaterial color="#c9b386" roughness={1} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -137 * Y2W]}>
        <planeGeometry args={[1.4, 1]} />
        <meshStandardMaterial color="#3d5a3f" />
      </mesh>

      <Cylinder args={[0.04, 0.04, 4.5, 8]} position={[0.6, 2.3, 1.8]}>
        <meshStandardMaterial color="#e5e5e5" />
      </Cylinder>
      <mesh position={[1.05, 4.3, 1.8]}>
        <planeGeometry args={[0.9, 0.55]} />
        <meshStandardMaterial color="#ff6b1a" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function Sawgrass3D({
  shots,
  onHover,
}: {
  shots: Shot[];
  onHover: (s: Shot | null) => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 22, -38], fov: 42 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "linear-gradient(180deg, #0a1424 0%, #07080a 100%)" }}
    >
      <fog attach="fog" args={["#07080a", 40, 110]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[20, 40, 10]} intensity={1.2} castShadow />
      <directionalLight position={[-20, 20, -10]} intensity={0.35} color="#22d3ee" />

      <Hole />
      {shots.map((s, i) => (
        <Tracer key={s.id} shot={s} delay={0.6 + i * 0.08} onHover={onHover} />
      ))}

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={15}
        maxDistance={90}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0, -5]}
      />
    </Canvas>
  );
}
