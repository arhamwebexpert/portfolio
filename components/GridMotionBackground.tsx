"use client";

import { useRef, useEffect } from "react";

/* ── cell definitions per row ──────────────────────────────────────────── */
const ROW_DATA = [
  // row 0 — languages & runtimes
  [
    { label: "React 18",     accent: "#61dafb" },
    { label: "Python",       accent: "#f7d26c" },
    { label: "ASP.NET Core", accent: "#512bd4" },
    { label: "TypeScript",   accent: "#3178c6" },
    { label: "Docker",       accent: "#2496ed" },
    { label: "MongoDB",      accent: "#47a248" },
    { label: "SQL Server",   accent: "#cc2927" },
    { label: "Next.js",      accent: "#ffffff" },
    { label: "C++",          accent: "#00599c" },
    { label: "PostgreSQL",   accent: "#336791" },
  ],
  // row 1 — code symbols
  [
    { label: "{ }",          accent: "#00d4ff" },
    { label: "</>",          accent: "#7c3aed" },
    { label: "() =>",        accent: "#f59e0b" },
    { label: "async/await",  accent: "#10b981" },
    { label: "class {}",     accent: "#ef4444" },
    { label: "import",       accent: "#06b6d4" },
    { label: "interface",    accent: "#8b5cf6" },
    { label: "#include",     accent: "#0066ff" },
    { label: "SELECT *",     accent: "#f97316" },
    { label: "@decorator",   accent: "#a855f7" },
  ],
  // row 2 — ai / ml stack
  [
    { label: "TensorFlow",   accent: "#ff6f00" },
    { label: "PyTorch",      accent: "#ee4c2c" },
    { label: "CNN Model",    accent: "#7c3aed" },
    { label: "Flask API",    accent: "#10b981" },
    { label: "OpenCV",       accent: "#5c3317" },
    { label: "Scikit-learn", accent: "#f89939" },
    { label: "REST API",     accent: "#00d4ff" },
    { label: "JWT Auth",     accent: "#d946ef" },
    { label: "WebSocket",    accent: "#22d3ee" },
    { label: "Deep Learning",accent: "#a78bfa" },
  ],
  // row 3 — devops / erp
  [
    { label: "Odoo ERP",     accent: "#714b67" },
    { label: "D365 FO",      accent: "#002050" },
    { label: "Prometheus",   accent: "#e6522c" },
    { label: "Grafana",      accent: "#f46800" },
    { label: "Git",          accent: "#f05032" },
    { label: "Linux",        accent: "#fcc624" },
    { label: "Redis",        accent: "#dc382d" },
    { label: "EF Core",      accent: "#512bd4" },
    { label: "Loki",         accent: "#f9e537" },
    { label: "CI/CD",        accent: "#06b6d4" },
  ],
  // row 4 — frontend / design
  [
    { label: "Tailwind CSS", accent: "#38bdf8" },
    { label: "Three.js",     accent: "#049ef4" },
    { label: "Framer Motion",accent: "#bb4be0" },
    { label: "MUI v5",       accent: "#007fff" },
    { label: "WebGL",        accent: "#990000" },
    { label: "React Router", accent: "#ca4245" },
    { label: "Axios",        accent: "#5a29e4" },
    { label: "Webpack",      accent: "#8dd6f9" },
    { label: "Vite",         accent: "#646cff" },
    { label: "GSAP",         accent: "#88ce02" },
  ],
];

/* row scroll directions and speeds */
const ROW_CONFIG = [
  { dir: "left",  duration: 32 },
  { dir: "right", duration: 28 },
  { dir: "left",  duration: 38 },
  { dir: "right", duration: 30 },
  { dir: "left",  duration: 26 },
];

export default function GridMotionBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);

  /* mouse parallax */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;  // -1 … 1
      const dy = (e.clientY - cy) / cy;
      wrap.style.transform = `translate(${dx * 18}px, ${dy * 12}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Moving grid */}
      <div
        ref={wrapRef}
        style={{
          position: "absolute",
          inset: "-40px",
          transition: "transform 0.12s ease-out",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {ROW_DATA.map((items, rowIdx) => {
          const cfg = ROW_CONFIG[rowIdx];
          /* duplicate items × 3 for seamless infinite scroll */
          const cells = [...items, ...items, ...items];

          return (
            <div
              key={rowIdx}
              style={{
                display: "flex",
                gap: 10,
                /* pause animation on reduced-motion */
                animationPlayState: "running",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  animation: `gridScroll${cfg.dir === "left" ? "Left" : "Right"} ${cfg.duration}s linear infinite`,
                  willChange: "transform",
                }}
              >
                {cells.map((cell, ci) => (
                  <div
                    key={ci}
                    style={{
                      flexShrink: 0,
                      width: 148,
                      height: 64,
                      borderRadius: 10,
                      background: `rgba(${hexToRgb(cell.accent)}, 0.04)`,
                      border: `1px solid rgba(${hexToRgb(cell.accent)}, 0.12)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: `rgba(${hexToRgb(cell.accent)}, 0.35)`,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      letterSpacing: "0.5px",
                      whiteSpace: "nowrap",
                      userSelect: "none",
                    }}
                  >
                    {cell.label}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edge fade overlays */}
      {/* top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(180deg, #020b18 0%, transparent 100%)", zIndex: 2 }} />
      {/* bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(0deg, #020b18 0%, transparent 100%)", zIndex: 2 }} />
      {/* left */}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "15%", background: "linear-gradient(90deg, #020b18 0%, transparent 100%)", zIndex: 2 }} />
      {/* right */}
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "15%", background: "linear-gradient(270deg, #020b18 0%, transparent 100%)", zIndex: 2 }} />
      {/* center radial darkener so the hero text stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(2,11,24,0.55) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      <style>{`
        @keyframes gridScrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-33.333%)); }
        }
        @keyframes gridScrollRight {
          from { transform: translateX(calc(-33.333%)); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ── tiny helper: "#rrggbb" → "r, g, b" ─────────────────────────────── */
function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
