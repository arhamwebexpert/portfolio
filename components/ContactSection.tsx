"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { RevealItem } from "./ScrollReveal";
import TiltCard from "@/components/TiltCard";

const contactLinks = [
  {
    label: "Email",
    value: "arhammehmood122@gmail.com",
    href: "mailto:arhammehmood122@gmail.com",
    color: "#00d4ff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "03363032935",
    href: "tel:03363032935",
    color: "#0066ff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "arham-mehmood-565667247",
    href: "https://www.linkedin.com/in/arham-mehmood-565667247",
    color: "#0a66c2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "arhamwebexpert",
    href: "https://github.com/arhamwebexpert",
    color: "#e2e8f0",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

/* Per-field focus state key */
type FieldKey = "name" | "email" | "subject" | "message";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focusedField, setFocusedField] = useState<FieldKey | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:arhammehmood122@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  /* Base input style — focus glow is applied via focusedField state */
  const getInputStyle = (field: FieldKey): React.CSSProperties => ({
    width: "100%",
    background: focusedField === field ? "rgba(0,212,255,0.05)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focusedField === field ? "rgba(0,212,255,0.55)" : "rgba(0,212,255,0.15)"}`,
    borderRadius: 8,
    padding: "12px 16px",
    color: "#e2e8f0",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
    fontFamily: "inherit",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(0,212,255,0.1), 0 0 16px rgba(0,212,255,0.08)" : "none",
  });

  const getTextareaStyle = (field: FieldKey): React.CSSProperties => ({
    ...getInputStyle(field),
    resize: "vertical",
    minHeight: 130,
  });

  const getLabelStyle = (field: FieldKey): React.CSSProperties => ({
    display: "block",
    fontSize: "0.8rem",
    marginBottom: 6,
    fontWeight: 500,
    transition: "color 0.2s",
    color: focusedField === field ? "#00d4ff" : "#64748b",
  });

  return (
    <section
      id="contact"
      style={{
        padding: "100px 24px 60px",
        background: "linear-gradient(180deg, #0a1628 0%, #020b18 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient blobs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 30% 70%, rgba(124,58,237,0.06) 0%, transparent 50%), radial-gradient(circle at 75% 20%, rgba(0,102,255,0.05) 0%, transparent 45%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <ScrollReveal variant="blur" style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ color: "#00d4ff", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            Get In Touch
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.5px" }}>
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p style={{ color: "#475569", marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>
            Open to full-time roles, freelance projects, and collaboration. Let&apos;s build something great together.
          </p>
        </ScrollReveal>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}
          className="contact-grid"
        >
          {/* Left: contact info cards */}
          <ScrollReveal variant="left" delay={0.1}>
            <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1.2rem", marginBottom: 8 }}>
              Ready to collaborate?
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.75, marginBottom: 36, fontSize: "0.95rem" }}>
              Whether you have an opportunity, a project idea, or just want to say hi — my inbox is always open. I typically respond within 24 hours.
            </p>

            <ScrollReveal stagger staggerDelay={0.1} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {contactLinks.map((link) => (
                <RevealItem key={link.label} variant="left" as="div">
                  <TiltCard max={4} scale={1.03} glare={false} style={{ borderRadius: 12 }}>
                    <motion.a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="card-glass"
                      style={{
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        textDecoration: "none",
                        cursor: "pointer",
                        borderRadius: 12,
                        position: "relative",
                        overflow: "hidden",
                        transition: "border-color 0.25s, box-shadow 0.25s",
                      }}
                      whileHover="hovered"
                      initial="rest"
                      animate="rest"
                    >
                      {/* Hover tinted backdrop */}
                      <motion.span
                        aria-hidden
                        variants={{
                          rest: { opacity: 0 },
                          hovered: { opacity: 1 },
                        }}
                        transition={{ duration: 0.25 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(135deg, ${link.color}0a 0%, transparent 70%)`,
                          borderRadius: 12,
                          pointerEvents: "none",
                        }}
                      />

                      {/* Icon container */}
                      <motion.div
                        variants={{
                          rest: { scale: 1, rotate: 0, borderColor: `${link.color}30`, background: `${link.color}14` },
                          hovered: { scale: 1.12, rotate: -8, borderColor: `${link.color}70`, background: `${link.color}22` },
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 22 }}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          border: `1px solid ${link.color}30`,
                          background: `${link.color}14`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: link.color,
                          flexShrink: 0,
                        }}
                      >
                        {link.icon}
                      </motion.div>

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ color: "#475569", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 2 }}>
                          {link.label}
                        </div>
                        <motion.div
                          variants={{
                            rest: { color: link.color, x: 0 },
                            hovered: { color: link.color, x: 4 },
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 24 }}
                          style={{
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: link.color,
                          }}
                        >
                          {link.value}
                        </motion.div>
                      </div>

                      {/* Arrow chevron */}
                      <motion.svg
                        variants={{
                          rest: { opacity: 0, x: -6 },
                          hovered: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={link.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </motion.svg>
                    </motion.a>
                  </TiltCard>
                </RevealItem>
              ))}
            </ScrollReveal>
          </ScrollReveal>

          {/* Right: contact form */}
          <ScrollReveal variant="right" delay={0.2}>
            <motion.div
              className="card-glass hover-lift"
              style={{ padding: "32px 28px", borderRadius: 16, position: "relative" }}
              whileHover={{ boxShadow: "0 8px 40px rgba(0,212,255,0.08), 0 2px 12px rgba(0,0,0,0.4)" }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1.1rem", marginBottom: 24 }}>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={getLabelStyle("name")}>Your Name</label>
                    <input
                      style={getInputStyle("name")}
                      type="text"
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <label style={getLabelStyle("email")}>Email Address</label>
                    <input
                      style={getInputStyle("email")}
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div>
                  <label style={getLabelStyle("subject")}>Subject</label>
                  <input
                    style={getInputStyle("subject")}
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div>
                  <label style={getLabelStyle("message")}>Message</label>
                  <textarea
                    style={getTextareaStyle("message")}
                    placeholder="Tell me about your project or opportunity..."
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Submit button with AnimatePresence success swap */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <AnimatePresence mode="wait" initial={false}>
                    {sent ? (
                      <motion.button
                        key="sent"
                        type="button"
                        className="btn-primary"
                        disabled
                        initial={{ opacity: 0, y: 14, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -14, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          justifyContent: "center",
                          width: "100%",
                          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                          borderColor: "rgba(5,150,105,0.4)",
                          cursor: "default",
                        }}
                      >
                        <motion.span
                          initial={{ rotate: -90, scale: 0.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
                          style={{ display: "inline-block", marginRight: 8 }}
                        >
                          ✓
                        </motion.span>
                        Opening mail client...
                      </motion.button>
                    ) : (
                      <motion.button
                        key="idle"
                        type="submit"
                        className="btn-primary"
                        initial={{ opacity: 0, y: 14, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -14, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ justifyContent: "center", width: "100%" }}
                      >
                        Send Message
                        <motion.span
                          style={{ display: "inline-block", marginLeft: 8 }}
                          variants={{
                            rest: { x: 0 },
                            hovered: { x: 4 },
                          }}
                          initial="rest"
                          whileHover="hovered"
                        >
                          →
                        </motion.span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 1200,
          margin: "80px auto 0",
          padding: "32px 0 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ color: "#1e293b", fontSize: "0.85rem" }}>
          © 2025 Arham Mehmood. Built with Next.js, Three.js &amp; particles.
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {[
            { href: "https://github.com/arhamwebexpert", label: "GitHub" },
            { href: "https://www.linkedin.com/in/arham-mehmood-565667247", label: "LinkedIn" },
            { href: "mailto:arhammehmood122@gmail.com", label: "Email" },
          ].map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{ color: "#334155", fontSize: "0.82rem", textDecoration: "none" }}
              whileHover={{ color: "#00d4ff", y: -2 }}
              transition={{ duration: 0.18 }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
