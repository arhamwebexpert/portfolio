"use client";

import { motion } from "framer-motion";
import ScrollReveal, { RevealItem } from "./ScrollReveal";

const stats = [
  { value: "1+", label: "Years Experience" },
  { value: "10+", label: "Projects Shipped" },
  { value: "3", label: "Companies Worked" },
  { value: "CS", label: "FAST University" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #020b18 0%, #0a1628 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(0,102,255,0.05) 0%, transparent 50%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <ScrollReveal variant="blur" style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: "#00d4ff", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            Who I Am
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.5px" }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">

          {/* ── Left: avatar + stats ── */}
          <ScrollReveal variant="left" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
            {/* 3D Floating card */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ perspective: 1000 }}
            >
              <div style={{
                width: 290,
                borderRadius: 20,
                overflow: "hidden",
                background: "#0d1a2d",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.6), -10px 10px 40px rgba(0,212,255,0.08), 4px -4px 20px rgba(124,58,237,0.08)",
              }}>

                {/* Photo header */}
                <div style={{
                  height: 420,
                  position: "relative",
                  overflow: "hidden",
                  background: "#070f20",
                }}>

                  {/* number */}
                  <span style={{ position: "absolute", top: 12, left: 16, color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", fontFamily: "monospace", fontWeight: 600 }}>01</span>

                  {/* badge */}
                  <div style={{
                    position: "absolute", top: 10, right: 12,
                    background: "rgba(16,185,129,0.18)", border: "1px solid rgba(16,185,129,0.5)",
                    borderRadius: 20, padding: "4px 11px",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                    <span style={{ color: "#10b981", fontSize: "0.72rem", fontWeight: 600 }}>Open to Work</span>
                  </div>

                  {/* photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/arham.jpg"
                    alt="Arham Mehmood"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                  />
                </div>

              </div>
            </motion.div>

            {/* Stats — staggered scale-in */}
            <ScrollReveal
              stagger
              staggerDelay={0.12}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%", maxWidth: 340 }}
            >
              {stats.map((s) => (
                <RevealItem key={s.label} variant="scale">
                  <div className="card-glass" style={{ padding: "20px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, background: "linear-gradient(135deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {s.value}
                    </div>
                    <div style={{ color: "#64748b", fontSize: "0.78rem", marginTop: 4 }}>{s.label}</div>
                  </div>
                </RevealItem>
              ))}
            </ScrollReveal>
          </ScrollReveal>

          {/* ── Right: text ── */}
          <ScrollReveal variant="right" delay={0.1}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0", marginBottom: 16 }}>
              Full-Stack Developer &amp;{" "}
              <span className="gradient-text">AI/ML Enthusiast</span>
            </h3>

            {[
              "I graduated from FAST University in 2025 with a CS degree, but I've been building things long before that. I genuinely enjoy the full stack  getting a React UI to feel just right, wiring up a clean .NET API, or figuring out why a model isn't converging at 2am. I like that no two problems are ever the same.",
              "I've worked across a few companies and domains  automation and web development at Advantest, ERP customization at Shispare, enterprise finance systems at GuruGroup, and media platforms at GoProAlpha. Each role threw me into a different tech stack, which honestly I've come to enjoy.",
              "For my final year project I built a CNN-based skin analysis tool with Baqai Hospital  the kind of project where you realise software can actually matter beyond screens. That's the kind of stuff that keeps me going.",
            ].map((para, i) => (
              <p key={i} style={{ color: "#64748b", lineHeight: 1.8, fontSize: "0.96rem", marginBottom: 16 }}>
                {para}
              </p>
            ))}

            <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
              <a href="mailto:arhammehmood122@gmail.com" className="btn-primary">Hire Me</a>
              <a href="https://www.linkedin.com/in/arham-mehmood-565667247" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn</a>
            </div>

            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { label: "Location", value: "Pakistan" },
                { label: "Degree", value: "BS CS — FAST" },
                { label: "Status", value: "Open to Work" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ color: "#475569", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</div>
                  <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem", marginTop: 2 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .about-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
