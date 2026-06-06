"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const ParticlesBackground = dynamic(() => import("./ParticlesBackground"), { ssr: false });
const GridMotionBackground = dynamic(() => import("./GridMotionBackground"), { ssr: false });

const roles = [
  "Full-Stack Developer",
  ".NET & React Engineer",
  "AI/ML Enthusiast",
  "Odoo Developer",
  "Problem Solver",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = orbRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false;
    controls.enablePan = false;

    scene.add(new THREE.AmbientLight(0x0066ff, 0.6));
    const light1 = new THREE.PointLight(0x00d4ff, 4, 12);
    light1.position.set(3, 3, 3);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x7c3aed, 3, 12);
    light2.position.set(-3, -3, -2);
    scene.add(light2);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({ color: 0x050f1e, emissive: 0x002244, shininess: 120, specular: 0x00d4ff }),
    );
    scene.add(core);

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(1.06, 22, 22),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.13 }),
    );
    scene.add(wire);

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.018, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.65 }),
    );
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.78, 0.012, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.55 }),
    );
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.008, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.4 }),
    );
    ring3.rotation.x = Math.PI / 6;
    ring3.rotation.z = Math.PI / 4;
    scene.add(ring3);

    const pCount = 220;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 2.4 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const dots = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.028, transparent: true, opacity: 0.75 }));
    scene.add(dots);

    const timer = new THREE.Timer();
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      timer.update();
      const t = timer.getElapsed();
      core.rotation.y = t * 0.18;
      wire.rotation.y = -t * 0.12;
      wire.rotation.x = t * 0.04;
      ring1.rotation.z = t * 0.45;
      ring2.rotation.y = t * 0.32;
      ring3.rotation.x = t * 0.22;
      dots.rotation.y = t * 0.06;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 35);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [charIndex, typing, roleIndex]);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #020b18 0%, #0a1628 50%, #020b18 100%)",
      }}
    >
      {/* Layer 1 — GridMotion scrolling tech grid (deepest) */}
      <GridMotionBackground />

      {/* Layer 2 — Particles with repulse/bubble on top of grid */}
      <ParticlesBackground />

      {/* Ambient glow blobs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          bottom: "-5%",
          right: "5%",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px 40px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 48,
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p
              style={{
                color: "#00d4ff",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Hello, World! 👋
            </p>

            <h1
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 16,
                color: "#e2e8f0",
                letterSpacing: "-1px",
              }}
            >
              I&apos;m{" "}
              <span className="gradient-text">Arham</span>
              <br />
              <span className="gradient-text">Mehmood</span>
            </h1>

            <div
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                fontWeight: 600,
                color: "#94a3b8",
                marginBottom: 24,
                height: 40,
                display: "flex",
                alignItems: "center",
                gap: 0,
              }}
            >
              <span style={{ color: "#e2e8f0" }}>{displayed}</span>
              <span
                className="typing-cursor"
                style={{
                  display: "inline-block",
                  width: 3,
                  height: "1.2em",
                  background: "#00d4ff",
                  marginLeft: 2,
                  borderRadius: 2,
                  verticalAlign: "middle",
                }}
              />
            </div>

            <p
              style={{
                color: "#64748b",
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: 520,
                marginBottom: 36,
              }}
            >
              CS graduate from FAST University with hands-on experience in full-stack
              development, AI/ML systems, and enterprise ERP platforms. Passionate about
              building scalable, impactful software.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
              <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
                View Projects
              </a>
              <a href="#contact" className="btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                Get In Touch
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {[
                {
                  href: "https://github.com/arhamwebexpert",
                  label: "GitHub",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/arham-mehmood-565667247",
                  label: "LinkedIn",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  href: "mailto:arhammehmood122@gmail.com",
                  label: "Email",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  title={s.label}
                  style={{
                    color: "#64748b",
                    transition: "color 0.2s, transform 0.2s",
                    display: "inline-flex",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#64748b";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: 3D Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          style={{ height: 500, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
          className="hero-orb"
        >
          {/* Outer glow pulse */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(0,102,255,0.06) 50%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Rotating dashed rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", width: 470, height: 470, borderRadius: "50%", border: "1.5px dashed rgba(0,212,255,0.2)", pointerEvents: "none" }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", width: 510, height: 510, borderRadius: "50%", border: "1px dashed rgba(124,58,237,0.15)", pointerEvents: "none" }}
          />

          {/* 3D Orb canvas */}
          <div
            ref={orbRef}
            style={{ width: 420, height: 420, position: "relative", zIndex: 1, cursor: "grab" }}
          />

          {/* Badge overlays */}
          {[
            { label: "React 18", top: "8%", left: "0%" },
            { label: "ASP.NET", top: "42%", right: "-2%", left: undefined },
            { label: "Python AI", bottom: "10%", left: "5%" },
            { label: "Next.js", top: "10%", right: "6%", left: undefined },
          ].map((b) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                position: "absolute",
                top: b.top,
                bottom: b.bottom,
                left: b.left,
                right: b.right,
                background: "rgba(10, 22, 40, 0.88)",
                border: "1px solid rgba(0,212,255,0.3)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#00d4ff",
                backdropFilter: "blur(8px)",
                whiteSpace: "nowrap",
                zIndex: 2,
              }}
            >
              {b.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "#334155",
          fontSize: "0.75rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(180deg, #00d4ff, transparent)",
          }}
        />
      </motion.div>

      <style>{`
        .hero-grid {
          grid-template-columns: 1fr 420px;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-orb {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
