"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Live", href: "#live" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(2, 11, 24, 0.9)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(0, 212, 255, 0.1)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav("#home"); }}
          whileHover={{ scale: 1.05 }}
          style={{
            fontWeight: 700,
            fontSize: "1.3rem",
            textDecoration: "none",
            background: "linear-gradient(135deg, #00d4ff, #0066ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.5px",
          }}
        >
          AM<span style={{ color: "#00d4ff", WebkitTextFillColor: "#00d4ff" }}>.</span>
        </motion.a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              className="nav-link"
              style={{
                color: active === link.href.slice(1) ? "#00d4ff" : undefined,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/arhamwebexpert"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ padding: "8px 20px", fontSize: "0.85rem", borderRadius: 6 }}
          >
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "#00d4ff",
                borderRadius: 2,
                transition: "all 0.3s",
                transform:
                  mobileOpen && i === 0
                    ? "rotate(45deg) translate(5px, 5px)"
                    : mobileOpen && i === 1
                    ? "scaleX(0)"
                    : mobileOpen && i === 2
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: "hidden",
              background: "rgba(2, 11, 24, 0.97)",
              borderTop: "1px solid rgba(0, 212, 255, 0.1)",
              padding: "0 24px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 0, padding: "8px 0" }}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  style={{
                    color: active === link.href.slice(1) ? "#00d4ff" : "#94a3b8",
                    textDecoration: "none",
                    padding: "12px 0",
                    fontSize: "1rem",
                    fontWeight: 500,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
