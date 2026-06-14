"use client";

import { useEffect, useRef } from "react";

/**
 * A soft glow that lags behind the cursor for an ambient, interactive feel.
 * Pointer-driven via rAF (no React re-renders). It starts invisible and is
 * only ever revealed on devices with a fine pointer (mouse / trackpad);
 * touch devices leave it at opacity 0, and reduced-motion users hide it via CSS.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Only animate on devices with a fine pointer (mouse / trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" style={{ opacity: 0 }} />;
}
