"use client";

import ScrollReveal, { RevealItem } from "./ScrollReveal";

const experiences = [
  {
    role: "Software Engineer", company: "Advantest", period: "2025 — Present", type: "Full-Time", color: "#10b981",
    bullets: [
      "Built automation scripts to streamline testing and internal workflows",
      "Developed desktop application features using .NET Windows Forms",
      "Built a full-stack website using Next.js and Node.js with PostgreSQL as the database",
      "Created database views in MySQL to expose structured data for reporting and analytics",
    ],
    tags: ["Next.js", "Node.js", "PostgreSQL", ".NET", "Windows Forms", "Automation"],
  },
  {
    role: "Odoo Developer", company: "Shispare", period: "2024 — Present", type: "Full-Time", color: "#00d4ff",
    bullets: [
      "Implemented annual and monthly tax calculation logic in the Odoo payroll module",
      "Customized the Helpdesk app — modified team relations and built advanced dashboard filters",
      "Developed a score-based candidate ranking system within the recruitment module",
      "Integrated an automated resume parser to streamline HR workflows",
      "Built an HR analytics dashboard tracking open positions and recruitment pipeline insights",
    ],
    tags: ["Odoo 16/17", "Python", "OWL", "PostgreSQL", "XML", "QWeb"],
  },
  {
    role: "Dynamics 365 Developer Intern", company: "GuruGroup, LLC", period: "2023", type: "Internship", color: "#0066ff",
    bullets: [
      "Gained hands-on experience in the Microsoft Dynamics 365 Finance & Operations development stack",
      "Studied and analyzed key business flows including Procure-to-Pay (P2P) and Order-to-Cash (O2C)",
      "Worked with Chain of Command (CoC), event handlers, forms, and data entities",
      "Built and modified tables, classes, and reports within the D365 FO framework (X++)",
    ],
    tags: ["D365 FO", "X++", "Chain of Command", "SQL Server", "Azure DevOps"],
  },
  {
    role: "PHP Developer", company: "GoProAlpha", period: "2022 — 2023", type: "Contract", color: "#7c3aed",
    bullets: [
      "Developed a complete News Management System for a broadcasting media client",
      "Built the full content lifecycle: creation, editorial review, scheduling, and publishing",
      "Implemented a role-based permission system distinguishing reporters from editors",
      "Used PHP, MySQL, JavaScript, and HTML/CSS for full-stack feature delivery",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Apache"],
  },
];

const education = [
  {
    degree: "BS in Computer Science", institution: "FAST National University", period: "2021 — 2025", grade: "Graduated June 2025", color: "#10b981", icon: "🎓",
    courses: ["Data Structures & Algorithms", "OOP", "Operating Systems", "Databases", "Software Engineering", "AI/ML"],
  },
  { degree: "A Levels", institution: "WHALES School", period: "2019 — 2021", grade: "A Levels Completed", color: "#f59e0b", icon: "📚", courses: [] },
  { degree: "O Levels", institution: "WHSS School", period: "2017 — 2019", grade: "O Levels Completed", color: "#ef4444", icon: "🏫", courses: [] },
];

export default function ExperienceSection() {
  return (
    <section id="experience" style={{ padding: "100px 24px", background: "#020b18", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 60%, rgba(0,102,255,0.04) 0%, transparent 50%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <ScrollReveal variant="blur" style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ color: "#00d4ff", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            My Journey
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.5px" }}>
            Experience &amp; <span className="gradient-text">Education</span>
          </h2>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 48, alignItems: "start" }} className="exp-grid">

          {/* ── Left: timeline ── */}
          <div>
            <ScrollReveal variant="fade">
              <h3 style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 32 }}>
                Work Experience
              </h3>
            </ScrollReveal>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 6, top: 8, bottom: 0, width: 2, background: "linear-gradient(180deg, #00d4ff 0%, #0066ff 50%, #7c3aed 100%)", opacity: 0.3 }} />

              <ScrollReveal stagger staggerDelay={0.2} style={{ display: "flex", flexDirection: "column", gap: 40, paddingLeft: 36 }}>
                {experiences.map((exp) => (
                  <RevealItem key={exp.company} variant="left">
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: -36, top: 4, width: 14, height: 14, borderRadius: "50%", background: exp.color, boxShadow: `0 0 12px ${exp.color}80`, border: "3px solid #020b18" }} />
                      <div className="card-glass" style={{ padding: "22px 24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
                          <div>
                            <h4 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1.05rem" }}>{exp.role}</h4>
                            <p style={{ color: exp.color, fontWeight: 600, fontSize: "0.88rem", marginTop: 2 }}>{exp.company}</p>
                          </div>
                          <div style={{ display: "flex", gap: 8, flexDirection: "column", alignItems: "flex-end" }}>
                            <span style={{ color: "#475569", fontSize: "0.8rem" }}>{exp.period}</span>
                            <span style={{ background: `${exp.color}18`, border: `1px solid ${exp.color}30`, color: exp.color, padding: "2px 10px", borderRadius: 12, fontSize: "0.72rem", fontWeight: 600 }}>
                              {exp.type}
                            </span>
                          </div>
                        </div>
                        <ul style={{ marginTop: 14, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                          {exp.bullets.map((b) => (
                            <li key={b} style={{ display: "flex", gap: 10, color: "#64748b", fontSize: "0.87rem", lineHeight: 1.6 }}>
                              <span style={{ color: exp.color, flexShrink: 0, marginTop: 2 }}>▸</span>{b}
                            </li>
                          ))}
                        </ul>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                          {exp.tags.map((tag) => (
                            <span key={tag} className="skill-pill" style={{ fontSize: "0.75rem", borderColor: `${exp.color}25`, color: exp.color, background: `${exp.color}0d` }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </ScrollReveal>
            </div>
          </div>

          {/* ── Right: Education ── */}
          <div>
            <ScrollReveal variant="fade">
              <h3 style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 32 }}>
                Education
              </h3>
            </ScrollReveal>

            <ScrollReveal stagger staggerDelay={0.18} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {education.map((edu) => (
                <RevealItem key={edu.degree} variant="right">
                  <div className="card-glass" style={{ padding: "20px 22px", borderLeft: `3px solid ${edu.color}` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{edu.icon}</span>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>{edu.degree}</h4>
                        <p style={{ color: edu.color, fontSize: "0.82rem", fontWeight: 600, marginBottom: 4 }}>{edu.institution}</p>
                        <p style={{ color: "#475569", fontSize: "0.78rem" }}>{edu.period}</p>
                        <p style={{ color: "#334155", fontSize: "0.76rem", marginTop: 2 }}>{edu.grade}</p>
                        {edu.courses.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
                            {edu.courses.map((c) => <span key={c} className="skill-pill" style={{ fontSize: "0.7rem" }}>{c}</span>)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </div>

      <style>{`
        .exp-grid { grid-template-columns: 3fr 2fr; }
        @media (max-width: 900px) { .exp-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
