"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Float,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

type RiskZoneProps = {
  label: string;
  value: string;
  position: [number, number, number];
  color: string;
};

function StadiumBowl() {
  return (
    <group rotation={[0, 0, 0]}>
      {/* lower bowl */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[5.2, 4.1, 0.9, 96, 1, true]} />
        <meshStandardMaterial
          color="#0f2742"
          roughness={0.35}
          metalness={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* upper bowl */}
      <mesh position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[6.3, 5.25, 0.9, 96, 1, true]} />
        <meshStandardMaterial
          color="#132f55"
          roughness={0.32}
          metalness={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* rim */}
      <mesh position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.75, 0.08, 16, 160]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0891b2"
          emissiveIntensity={0.45}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function Pitch() {
  return (
    <group position={[0, -0.53, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.3, 3.8]} />
        <meshStandardMaterial
          color="#0f5f3c"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* field lines */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.48, 0.5, 64]} />
        <meshBasicMaterial color="#9fffd0" transparent opacity={0.55} />
      </mesh>

      <mesh position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.035, 3.8]} />
        <meshBasicMaterial color="#9fffd0" transparent opacity={0.45} />
      </mesh>

      <mesh position={[-2.7, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.035, 1.4]} />
        <meshBasicMaterial color="#9fffd0" transparent opacity={0.45} />
      </mesh>

      <mesh position={[2.7, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.035, 1.4]} />
        <meshBasicMaterial color="#9fffd0" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function CrowdDots() {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];

    for (let i = 0; i < 420; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 4.25 + Math.random() * 1.65;
      const y = 0.05 + Math.random() * 0.75;

      arr.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }

    return arr;
  }, []);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color={i % 7 === 0 ? "#f87171" : i % 5 === 0 ? "#facc15" : "#22d3ee"}
            emissive={i % 7 === 0 ? "#ef4444" : "#0891b2"}
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

function RiskZone({ label, value, position, color }: RiskZoneProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const scale = 1 + Math.sin(clock.elapsedTime * 3) * 0.08;
    ref.current.scale.setScalar(scale);
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2.2 : 1.25}
          roughness={0.2}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.38, 0.42, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>

      <Html distanceFactor={8} position={[0, 0.55, 0]} center>
        <div className="rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-center shadow-2xl backdrop-blur-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            {label}
          </p>
          <p className="text-lg font-black" style={{ color }}>
            {value}
          </p>
        </div>
      </Html>
    </group>
  );
}

function ScanningRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.45;
  });

  return (
    <mesh ref={ref} position={[0, -0.47, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[6.75, 0.018, 8, 180]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
    </mesh>
  );
}

function StadiumScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} />
      <pointLight position={[0, 5, 0]} intensity={3} color="#22d3ee" />
      <pointLight position={[-4, 3, -3]} intensity={2} color="#a855f7" />

      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.25}>
        <group rotation={[0.2, -0.35, 0]}>
          <StadiumBowl />
          <Pitch />
          <CrowdDots />
          <ScanningRing />

          <RiskZone
            label="Gate A"
            value="84%"
            position={[-4.8, 0.85, -1.6]}
            color="#fb7185"
          />

          <RiskZone
            label="East Rail"
            value="77%"
            position={[4.75, 0.85, -1.1]}
            color="#facc15"
          />

          <RiskZone
            label="Food Court"
            value="64%"
            position={[2.9, 0.65, 3.65]}
            color="#22d3ee"
          />
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.35}
        scale={12}
        blur={2.8}
      />

      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.15}
      />
    </>
  );
}

export default function Stadium3DHero() {
  return (
    <section className="relative mb-12 overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-[#020617] shadow-[0_0_140px_rgba(34,211,238,0.16)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.18),transparent_30%)]" />

      <div className="relative z-10 grid min-h-[680px] grid-cols-1 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center p-10 xl:p-14">
          <p className="text-xs uppercase tracking-[0.6em] text-cyan-300">
            CrowdMind Command OS
          </p>

          <h2 className="mt-6 text-6xl font-black leading-[0.92] tracking-tight text-white md:text-8xl">
            Live Stadium
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-300 bg-clip-text text-transparent">
              Digital Twin
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            Interactive 3D operations layer for World Cup crowd intelligence,
            powered by Gemini reasoning and Elastic memory.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                AI Command
              </p>
              <p className="mt-2 text-2xl font-black text-emerald-300">
                ACTIVE
              </p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Crowd Risk
              </p>
              <p className="mt-2 text-2xl font-black text-red-300">
                10/10
              </p>
            </div>

            <div className="rounded-2xl border border-purple-400/20 bg-purple-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Mongo Memory
              </p>
              <p className="mt-2 text-2xl font-black text-purple-300">
                SYNCED
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Mode
              </p>
              <p className="mt-2 text-2xl font-black text-cyan-300">
                LIVE
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Drag the stadium to inspect active crowd-risk zones.
          </p>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_45%)]" />

          <Canvas
            camera={{ position: [0, 5.2, 9.5], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <StadiumScene />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}