"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Main sphere (wireframe outer shell)
    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeMesh = new THREE.Mesh(sphereGeo, wireframeMat);
    scene.add(wireframeMesh);

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0044bb,
      emissive: 0x0088ff,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Floating ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.008, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.25 })
    );
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Floating particles around orb
    const particlesCount = 120;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 1.2;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x111133, 2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00d4ff, 4, 8);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0x7c3aed, 3, 8);
    pointLight2.position.set(-2, -1, 1);
    scene.add(pointLight2);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animate
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      wireframeMesh.rotation.x = elapsed * 0.12 + mouseY * 0.3;
      wireframeMesh.rotation.y = elapsed * 0.18 + mouseX * 0.3;

      coreMesh.rotation.y = elapsed * 0.25;
      coreMesh.rotation.x = elapsed * 0.1;

      ring.rotation.z = elapsed * 0.2;
      ring2.rotation.z = -elapsed * 0.15;
      ring2.rotation.y = elapsed * 0.08;

      particlesMesh.rotation.y = elapsed * 0.06;
      particlesMesh.rotation.x = elapsed * 0.04;

      // Float animation
      wireframeMesh.position.y = Math.sin(elapsed * 0.7) * 0.12;
      coreMesh.position.y = Math.sin(elapsed * 0.7) * 0.12;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
