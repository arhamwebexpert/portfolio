"use client";

import { useRef, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  /** max rotation in degrees (default 8) */
  max?: number;
  /** scale on hover (default 1.02) */
  scale?: number;
  /** show the moving glare highlight (default true) */
  glare?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Mouse-tracking 3D tilt wrapper. Drives CSS custom properties consumed by
 * `.tilt-card` in globals.css, so it stays cheap (no re-renders, no layout).
 * Disabled automatically for users who prefer reduced motion via CSS.
 */
export default function TiltCard({
  children,
  max = 8,
  scale = 1.02,
  glare = true,
  className,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * 2 * max; // rotateY
    const rx = -(py - 0.5) * 2 * max; // rotateX
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--glare-x", `${px * 100}%`);
    el.style.setProperty("--glare-y", `${py * 100}%`);
    el.style.setProperty("--glare-o", glare ? "1" : "0");
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare-o", "0");
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      className={`tilt-card${className ? ` ${className}` : ""}`}
      style={{ height: "100%", ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
      {glare && <span className="tilt-glare" />}
    </div>
  );
}
