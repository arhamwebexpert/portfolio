"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";
import ScrollReveal, { RevealItem } from "./ScrollReveal";
import TiltCard from "@/components/TiltCard";

const projects = [
  {
    id: 1,
    title: "Food Delivery System",
    subtitle: "Full-Stack Delivery Platform — Live on Vercel",
    description:
      "A production food delivery web app built with React and a Node.js/Express backend. Users can browse restaurants, add items to cart, and place orders with a smooth checkout flow. JWT authentication secures user sessions and order history.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vercel"],
    accent: "#f59e0b",
    github: "https://github.com/arhamwebexpert",
    live: "https://food-delivery-sytstem.vercel.app/",
    highlights: [
      "Restaurant browsing with category filtering",
      "Add-to-cart with live quantity management",
      "JWT-secured user auth and order history",
      "Responsive mobile-first UI",
      "Deployed and live on Vercel",
    ],
    icon: "🍔",
  },
  {
    id: 2,
    title: "Introsocial",
    subtitle: "Private Group Social Network — Live on Vercel",
    description:
      "A private social network for close-knit groups. Features real-time group chat with Slack-style threading, event creation with RSVP-gated event chat rooms (only 'Going' attendees can join), moments/media sharing, and a group news feed.",
    tags: ["Next.js", "React", "MongoDB", "JWT", "REST API", "Vercel"],
    accent: "#1877f2",
    github: "https://github.com/arhamwebexpert",
    live: "https://introsocial-website.vercel.app/login",
    highlights: [
      "Group chat with Slack-style message threading",
      "Event creation with RSVP (Going / Maybe / Can't go)",
      "Event-specific chat locked to RSVP'd attendees",
      "Moments media sharing with likes and comments",
      "Mobile-responsive dark UI deployed on Vercel",
    ],
    icon: "💬",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Web Application",
    description:
      "A production-grade e-commerce system with a fully decoupled architecture. Backend built with ASP.NET Core 8.0 and Entity Framework Core on SQL Server, serving RESTful APIs consumed by a React 18 + TypeScript frontend. Includes JWT-based auth, product catalog management, shopping cart, order management, and Prometheus metrics at /metrics.",
    tags: ["ASP.NET Core 8", "React 18", "TypeScript", "EF Core", "SQL Server", "JWT", "MUI", "Prometheus"],
    accent: "#0066ff",
    github: "https://github.com/arhamwebexpert",
    highlights: [
      "JWT authentication & role-based authorization",
      "RESTful API with Swagger documentation",
      "Prometheus metrics endpoint for observability",
      "Modular React component/page architecture",
      "Axios + React Router for API integration",
    ],
    icon: "🛒",
  },
  {
    id: 4,
    title: "Skin Progress Tracker",
    subtitle: "Final Year Project — Baqai Hospital",
    description:
      "A deep learning–powered skin health analysis system commissioned by Baqai Hospital. Three separate CNN models trained with TensorFlow evaluate pores, texture, and hydration levels from patient face images. Dermatologists validated accuracy throughout development.",
    tags: ["TensorFlow", "Python", "CNN", "Deep Learning", "Computer Vision", "Medical AI", "Flask"],
    accent: "#7c3aed",
    github: "https://github.com/arhamwebexpert",
    highlights: [
      "3 specialized CNN models (pores, texture, hydration)",
      "Collaborated with Baqai Hospital dermatologists",
      "Automated skin health scoring from camera images",
      "Visual progress tracking over time per patient",
      "Customizable PDF reports for clinical use",
    ],
    icon: "🧬",
  },
  {
    id: 5,
    title: "News Management System",
    subtitle: "Broadcasting Media Platform",
    description:
      "A full-featured content management system built for broadcasting media using PHP, MySQL, and JavaScript. Features a role-based permission system distinguishing reporters (create/edit) from editors (publish/delete). Includes article versioning, category management, and a real-time dashboard.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Role-Based Auth", "CMS"],
    accent: "#10b981",
    github: "https://github.com/arhamwebexpert",
    highlights: [
      "Role management for reporters and editors",
      "Article creation, review, and publishing workflow",
      "Category and tag-based content organization",
      "Real-time news dashboard",
      "Responsive admin interface",
    ],
    icon: "📰",
  },
];

/* Stagger variants for the highlight list */
const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -8, transition: { duration: 0.15, ease: "easeIn" as const } },
};

function ProjectCardInner({ project }: { project: typeof projects[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-glass"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 0,
        overflow: "hidden",
        height: "100%",
        borderColor: expanded || hovered ? `${project.accent}55` : undefined,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        /* Subtle accent glow on hover */
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.45), 0 0 40px ${project.accent}18, 0 0 0 1px ${project.accent}20`
          : undefined,
        position: "relative",
      }}
    >
      {/* Accent top-bar — brightens on hover */}
      <div
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0.65,
          transition: "opacity 0.3s ease",
        }}
      />

      <div style={{ padding: "24px 24px 20px" }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Animated icon */}
            <motion.div
              whileHover={{ scale: 1.18, rotate: 8 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: `${project.accent}18`,
                border: `1px solid ${project.accent}35`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                cursor: "default",
              }}
            >
              {project.icon}
            </motion.div>
            <div>
              <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1.1rem", marginBottom: 2 }}>{project.title}</h3>
              <p style={{ color: project.accent, fontSize: "0.8rem", fontWeight: 600 }}>{project.subtitle}</p>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {"live" in project && project.live && (
              <motion.a
                href={(project as { live: string }).live}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  color: project.accent,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  border: `1px solid ${project.accent}40`,
                  borderRadius: 6,
                  padding: "3px 8px",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                ↗ Live
              </motion.a>
            )}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, color: "#00d4ff" }}
              whileTap={{ scale: 0.93 }}
              style={{ color: "#475569", display: "flex", transition: "color 0.2s" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Description */}
        <p style={{ color: "#64748b", fontSize: "0.91rem", lineHeight: 1.75, marginBottom: 20 }}>{project.description}</p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.08, backgroundColor: `${project.accent}22`, borderColor: `${project.accent}60` }}
              transition={{ duration: 0.15 }}
              style={{
                background: `${project.accent}12`,
                border: `1px solid ${project.accent}28`,
                color: project.accent,
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: "0.78rem",
                fontWeight: 500,
                display: "inline-block",
                cursor: "default",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            border: "none",
            color: "#00d4ff",
            fontSize: "0.85rem",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 500,
          }}
        >
          {expanded ? "Hide details" : "Key highlights"}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ display: "inline-block", originY: 0.5 }}
          >
            ▾
          </motion.span>
        </button>

        {/* Animated expand/collapse with AnimatePresence */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="highlights"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  marginTop: 14,
                  paddingLeft: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {project.highlights.map((h) => (
                  <motion.li
                    key={h}
                    variants={itemVariants}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      color: "#94a3b8",
                      fontSize: "0.88rem",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: project.accent, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>→</span>
                    {h}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #0a1628 0%, #020b18 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 60% 40%, rgba(0,212,255,0.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <ScrollReveal variant="blur" style={{ textAlign: "center", marginBottom: 72 }}>
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
            What I&apos;ve Built
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#e2e8f0",
              letterSpacing: "-0.5px",
            }}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: "#475569", marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>
            Production projects spanning AI/ML, full-stack web, and content management.
          </p>
        </ScrollReveal>

        <ScrollReveal
          stagger
          staggerDelay={0.15}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 28,
          }}
        >
          {projects.map((p) => (
            <RevealItem key={p.id} variant="blur">
              <TiltCard max={6} style={{ height: "100%" }}>
                <ProjectCardInner project={p} />
              </TiltCard>
            </RevealItem>
          ))}
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={0.3} style={{ textAlign: "center", marginTop: 48 }}>
          <a href="https://github.com/arhamwebexpert" target="_blank" rel="noreferrer" className="btn-outline">
            View All on GitHub
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
