"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrollReveal, { RevealItem } from "./ScrollReveal";

const skillGroups = [
  { category: "Languages",       color: "#00d4ff", icon: "{ }", skills: ["Python","JavaScript","TypeScript","C++","C","SQL","PHP","X++"] },
  { category: "Frontend",        color: "#0066ff", icon: "</>", skills: ["React 18","Next.js","HTML5","CSS3","TypeScript","MUI","Tailwind"] },
  { category: "Backend & APIs",  color: "#7c3aed", icon: "⚙",  skills: ["ASP.NET Core","Web API","Flask","REST","JWT Auth","EF Core"] },
  { category: "Databases",       color: "#10b981", icon: "🗄",  skills: ["SQL Server","SQLite","MongoDB","PostgreSQL"] },
  { category: "AI / ML",         color: "#f59e0b", icon: "🧠",  skills: ["TensorFlow","PyTorch","CNN","Deep Learning","Scikit-learn"] },
  { category: "DevOps & Tools",  color: "#ef4444", icon: "🔧",  skills: ["Git","Docker","Prometheus","Grafana","Loki","Linux"] },
  { category: "ERP Platforms",   color: "#06b6d4", icon: "🏢",  skills: ["Odoo 16/17","D365 FO","Payroll Module","Helpdesk Module"] },
];

const techBar = [
  { name: "React / Next.js",   pct: 88 },
  { name: "ASP.NET Core",      pct: 85 },
  { name: "Python / ML",       pct: 82 },
  { name: "SQL / Databases",   pct: 80 },
  { name: "Docker / DevOps",   pct: 72 },
  { name: "Odoo / D365 ERP",   pct: 78 },
];

export default function SkillsSection() {
  /* still need inView for the progress bar width animation */
  const { ref: barRef, inView: barInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="skills"
      style={{ padding: "100px 24px", background: "#020b18", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 80%, rgba(124,58,237,0.05) 0%, transparent 50%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <ScrollReveal variant="blur" style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ color: "#00d4ff", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            What I Know
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.5px" }}>
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p style={{ color: "#475569", marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>
            A broad skill set spanning frontend, backend, databases, ML, and enterprise ERP systems.
          </p>
        </ScrollReveal>

        {/* ── Skill cards — staggered blur-up ── */}
        <ScrollReveal
          stagger
          staggerDelay={0.08}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, marginBottom: 72 }}
        >
          {skillGroups.map((group) => (
            <RevealItem key={group.category} variant="blur">
              <div className="card-glass" style={{ padding: "24px", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: `${group.color}18`, border: `1px solid ${group.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1rem", fontWeight: 700, color: group.color, fontFamily: "monospace", flexShrink: 0,
                    }}
                  >
                    {group.icon}
                  </div>
                  <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1rem" }}>{group.category}</h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-pill" style={{ borderColor: `${group.color}30`, color: group.color, background: `${group.color}10` }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>

        {/* ── Proficiency bars ── */}
        <ScrollReveal variant="up" delay={0.1}>
          <div ref={barRef} className="card-glass" style={{ padding: "36px 40px" }}>
            <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1.15rem", marginBottom: 32 }}>
              Proficiency Levels
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {techBar.map((item, i) => (
                <div key={item.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 500 }}>{item.name}</span>
                    <span style={{ color: "#00d4ff", fontSize: "0.85rem", fontWeight: 700 }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 8, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={barInView ? { width: `${item.pct}%` } : {}}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                      style={{ height: "100%", borderRadius: 8, background: "linear-gradient(90deg, #0066ff, #00d4ff)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
