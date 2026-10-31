"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HolographicCore() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Plasma Core (Glowing Icosahedron)
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 2. Central High-Density Nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0x9b5cff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // 3. Outer Cyber Ring 1 (Cyan Orbit)
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 4. Outer Cyber Ring 2 (Purple Orbit)
    const ring2Geo = new THREE.TorusGeometry(2.4, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x9b5cff,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    coreGroup.add(ring2);

    // 5. Data Node Rings / Concentric Gyroscope Ring 3
    const ring3Geo = new THREE.TorusGeometry(2.7, 0.01, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 4;
    coreGroup.add(ring3);

    // 6. Orbital Data Satellites (Tiny Cubes traveling around rings)
    const satelliteCount = 8;
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });

    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      coreGroup.add(sat);
      satellites.push(sat);
    }

    // 7. Ambient Particle Field (Data Cloud)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f5ff);
    const purpleColor = new THREE.Color(0x9b5cff);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const radius = 1.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? (Math.random() > 0.5 ? cyanColor : purpleColor) : whiteColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Core rotation
      innerMesh.rotation.y = elapsedTime * 0.35;
      innerMesh.rotation.x = elapsedTime * 0.2;

      nucleusMesh.rotation.y = -elapsedTime * 0.5;
      nucleusMesh.rotation.z = elapsedTime * 0.3;

      // Ring rotations
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.x = elapsedTime * 0.3;
      ring3.rotation.y = elapsedTime * 0.25;

      // Pulse nucleus scale
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      nucleusMesh.scale.set(pulse, pulse, pulse);

      // Satellites orbiting
      satellites.forEach((sat, idx) => {
        const angle = elapsedTime * 0.8 + (idx * Math.PI * 2) / satelliteCount;
        const orbitRadius = idx % 2 === 0 ? 2.1 : 2.4;
        if (idx % 2 === 0) {
          sat.position.x = Math.cos(angle) * orbitRadius;
          sat.position.y = Math.sin(angle) * orbitRadius * 0.5;
          sat.position.z = Math.sin(angle) * orbitRadius * 0.86;
        } else {
          sat.position.x = Math.sin(angle) * orbitRadius * 0.86;
          sat.position.y = Math.cos(angle) * orbitRadius;
          sat.position.z = Math.cos(angle) * orbitRadius * 0.5;
        }
      });

      // Ambient particle cloud rotation
      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.x = elapsedTime * 0.04;

      // Smooth mouse parallax lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      coreGroup.rotation.y = mouseX * 0.7;
      coreGroup.rotation.x = -mouseY * 0.7;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up geometries and materials
      innerGeo.dispose();
      innerMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      />

      {/* Cyber Floating Hologram HUD Overlays */}
      <div className="absolute top-4 left-4 font-mono text-[11px] text-cyan-400/80 bg-black/60 border border-cyan-500/30 px-2.5 py-1 rounded backdrop-blur-md pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>CORE_ONLINE // 60 FPS</span>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[11px] text-purple-400/80 bg-black/60 border border-purple-500/30 px-2.5 py-1 rounded backdrop-blur-md pointer-events-none">
        <span>MATRIX: ACTIVE // 1200 NODES</span>
      </div>

      {/* Floating 3D Code Glyphs */}
      <div className="absolute -top-2 right-8 font-mono text-cyan-400/60 text-sm font-bold animate-pulse pointer-events-none select-none">
        &lt;develop /&gt;
      </div>
      <div className="absolute bottom-12 -left-2 font-mono text-purple-400/60 text-xs font-bold pointer-events-none select-none">
        {"{ code: 'future' }"}
      </div>
      <div className="absolute top-1/2 -right-4 font-mono text-blue-400/50 text-xs pointer-events-none select-none">
        01000001
      </div>
    </div>
  );
}
