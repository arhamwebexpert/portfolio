"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import ScrollReveal from "./ScrollReveal";

/* ─── Data ─────────────────────────────────────────────────────────────── */
const liveProjects = [
  {
    id: 1,
    title: "Food Delivery System",
    tagline: "Full-Stack Delivery Platform",
    description:
      "Production food delivery app with React, cart management, real-time order tracking, restaurant browsing, and a smooth checkout experience.",
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    liveUrl: "https://food-delivery-sytstem.vercel.app/",
    githubUrl: "https://github.com/arhamwebexpert",
    status: "Live",
    statusColor: "#10b981",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 60%, #0a1628 100%)",
    accent: "#f59e0b",
    icon: "🍔",
    floatDelay: 0,
  },
  {
    id: 2,
    title: "Introsocial",
    tagline: "Private Group Social Network",
    description:
      "Private social network for close groups — real-time chat with threading, event creation with RSVP-gated chat rooms, moments media sharing, and a group news feed.",
    tech: ["Next.js", "MongoDB", "React", "JWT", "Vercel"],
    liveUrl: "https://introsocial-website.vercel.app/login",
    githubUrl: "https://github.com/arhamwebexpert",
    status: "Live",
    statusColor: "#1877f2",
    gradient: "linear-gradient(135deg, #1877f2 0%, #00d4ff 60%, #0a1628 100%)",
    accent: "#00d4ff",
    icon: "💬",
    floatDelay: 0.4,
  },
  {
    id: 3,
    title: "Skin Progress Tracker",
    tagline: "AI Skin Health Analysis — Baqai Hospital",
    description:
      "Deep learning skin analysis using CNN models trained with TensorFlow to score pores, texture, and hydration from face images. Built for and validated by Baqai Hospital dermatologists.",
    tech: ["TensorFlow", "Python", "CNN", "Flask", "Computer Vision"],
    liveUrl: "https://arham2001-skincareapp.hf.space/",
    githubUrl: "https://github.com/arhamwebexpert",
    status: "Live",
    statusColor: "#a855f7",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #00d4ff 60%, #0a1628 100%)",
    accent: "#7c3aed",
    icon: "🧬",
    floatDelay: 0.8,
  },
];

/* ─── Three.js floating geometry background ────────────────────────────── */
function ThreeBackground({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const container = containerRef.current;
    if (!mount || !container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* floating wireframe shapes */
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.IcosahedronGeometry(0.9, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(0.7, 1),
      new THREE.IcosahedronGeometry(1.4, 1),
      new THREE.TetrahedronGeometry(0.6, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(1.3, 0),
      new THREE.OctahedronGeometry(0.8, 1),
      new THREE.IcosahedronGeometry(0.6, 1),
      new THREE.TetrahedronGeometry(0.9, 0),
    ];
    const colors = [0x00d4ff, 0x0066ff, 0x7c3aed, 0x10b981, 0x06b6d4, 0xf59e0b];

    geometries.forEach((geo, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      (mesh as unknown as { _speed: THREE.Vector3 })._speed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.002,
        0
      );
      (mesh as unknown as { _rotSpeed: THREE.Vector3 })._rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.01,
        0
      );
      scene.add(mesh);
      shapes.push(mesh);
    });

    /* ambient light */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    let animId: number;
    const timer = new THREE.Timer();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      timer.update();
      const elapsed = timer.getElapsed();

      shapes.forEach((mesh, i) => {
        const s = mesh as unknown as { _speed: THREE.Vector3; _rotSpeed: THREE.Vector3 };
        mesh.position.x += s._speed.x;
        mesh.position.y += Math.sin(elapsed * 0.3 + i) * 0.003;
        mesh.rotation.x += s._rotSpeed.x;
        mesh.rotation.y += s._rotSpeed.y;

        /* wrap around edges */
        if (mesh.position.x > 32) mesh.position.x = -32;
        if (mesh.position.x < -32) mesh.position.x = 32;
      });

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
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [containerRef]);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/* ─── 3D tilt card ──────────────────────────────────────────────────────── */
function TiltCard({
  project,
  index,
  inView,
}: {
  project: (typeof liveProjects)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -12;
    const ry = ((x - cx) / cx) * 12;
    setTilt({ rx, ry });

    /* move glow to cursor */
    if (glowRef.current) {
      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setHovered(false);
  }, []);

  /* floating vertical animation offset per card */
  const floatY = [0, -14, -8, -18][index % 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000, zIndex: 1 }}
    >
      {/* Float animation wrapper */}
      <motion.div
        animate={{ y: [floatY, floatY - 12, floatY] }}
        transition={{
          duration: 4 + project.floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: project.floatDelay,
        }}
        style={{ perspective: 1000 }}
      >
        {/* 3D tilt wrapper */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            background: "rgba(8, 18, 36, 0.85)",
            border: `1px solid ${hovered ? project.accent + "60" : "rgba(0,212,255,0.12)"}`,
            boxShadow: hovered
              ? `0 30px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accent}22, inset 0 1px 0 ${project.accent}20`
              : "0 10px 30px rgba(0,0,0,0.3)",
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${hovered ? 8 : 0}px)`,
            transition: hovered
              ? "transform 0.05s linear, box-shadow 0.3s, border-color 0.3s"
              : "transform 0.5s ease, box-shadow 0.3s, border-color 0.3s",
            cursor: "pointer",
            willChange: "transform",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Cursor glow */}
          <div
            ref={glowRef}
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${project.accent}25 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 10,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />

          {/* Card header — gradient "preview" */}
          <div
            style={{
              height: 140,
              background: project.gradient,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Grid pattern overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Floating icon */}
            <motion.div
              animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: project.floatDelay }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
              }}
            >
              {project.icon}
            </motion.div>

            {/* Status badge */}
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: `${project.statusColor}22`,
                border: `1px solid ${project.statusColor}60`,
                borderRadius: 20,
                padding: "4px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.72rem",
                fontWeight: 700,
                color: project.statusColor,
                backdropFilter: "blur(8px)",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: project.statusColor,
                  boxShadow: `0 0 6px ${project.statusColor}`,
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              {project.status}
            </div>

            {/* Top-left number */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 16,
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "2px",
                fontFamily: "monospace",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Card body */}
          <div style={{ padding: "22px 22px 20px" }}>
            <h3
              style={{
                color: "#e2e8f0",
                fontWeight: 800,
                fontSize: "1.1rem",
                marginBottom: 4,
                letterSpacing: "-0.3px",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                color: project.accent,
                fontSize: "0.78rem",
                fontWeight: 600,
                marginBottom: 12,
                letterSpacing: "0.3px",
              }}
            >
              {project.tagline}
            </p>
            <p
              style={{
                color: "#475569",
                fontSize: "0.85rem",
                lineHeight: 1.65,
                marginBottom: 16,
              }}
            >
              {project.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    background: `${project.accent}10`,
                    border: `1px solid ${project.accent}25`,
                    color: project.accent,
                    padding: "3px 9px",
                    borderRadius: 20,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  background: `linear-gradient(135deg, ${project.accent}cc, ${project.accent}88)`,
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 0",
                  color: "#fff",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textAlign: "center",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "9px 0",
                  color: "#94a3b8",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textAlign: "center",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  transition: "color 0.2s, border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Source
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────── */
export default function LiveProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  /* merge refs */
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  return (
    <section
      ref={setRefs}
      id="live"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #020b18 0%, #060f1e 50%, #020b18 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Three.js wireframe geometry background */}
      <ThreeBackground containerRef={sectionRef} />

      {/* Radial ambient glows */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
          top: "10%",
          left: "-15%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          bottom: "5%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <ScrollReveal variant="blur" style={{ textAlign: "center", marginBottom: 80 }}>
          <p
            style={{
              color: "#00d4ff",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            In Production
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#e2e8f0",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            Live <span className="gradient-text">Projects</span>
          </h2>
          <p
            style={{
              color: "#475569",
              marginTop: 16,
              maxWidth: 540,
              margin: "16px auto 0",
              fontSize: "0.95rem",
              lineHeight: 1.7,
            }}
          >
            Hover the cards to interact with the 3D perspective effect. Each card represents a shipped, real-world project.
          </p>

          {/* Animated divider */}
          <div
            style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, #00d4ff55, transparent)",
              maxWidth: 400,
              margin: "28px auto 0",
            }}
          />
        </ScrollReveal>

        {/* 3D floating cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 32,
            alignItems: "start",
          }}
        >
          {liveProjects.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal variant="up" delay={0.3} style={{ textAlign: "center", marginTop: 64 }}>
          <p style={{ color: "#334155", fontSize: "0.88rem", marginBottom: 20 }}>
            Want to see more work or discuss a project?
          </p>
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Let&apos;s Build Something →
          </a>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
