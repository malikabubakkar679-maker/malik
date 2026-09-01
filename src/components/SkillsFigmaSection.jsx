import React, { useState } from "react";
import { SKILLS_CATEGORIES, FIGMA_WORKFLOW } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { PenTool, Code2, Layers, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

export default function SkillsFigmaSection() {
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "code"

  return (
    <section id="skills" className="skills-figma-section">
      {/* Skills Categories Grid */}
      <div>
        <div style={{ marginBottom: "2.5rem" }}>
          <div className="badge-tag" style={{ marginBottom: "0.85rem" }}>
            <Code2 size={13} color="var(--accent-gold)" />
            TECHNICAL ARSENAL
          </div>
          <h2 className="heading-section">SKILLS & TECHNOLOGIES</h2>
        </div>

        <div className="skills-category-grid">
          {SKILLS_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="skills-cat-card">
              <div>
                <h3 className="heading-sub" style={{ fontSize: "1.2rem", marginBottom: "0.3rem" }}>
                  {cat.category}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{cat.description}</p>
              </div>

              <div className="skills-pill-tags">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skills-pill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Figma Design Workflow & Interactive Canvas Card */}
      <div className="figma-workflow-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="badge-tag" style={{ marginBottom: "0.6rem" }}>
              <PenTool size={13} color="#A87938" />
              FIGMA & DESIGN TO CODE PIPELINE
            </div>
            <h3 className="heading-editorial" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
              From Wireframe to Production Code.
            </h3>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: "flex", background: "var(--bg-muted)", padding: "4px", borderRadius: "999px", border: "1px solid var(--border-subtle)" }}>
            <button
              className={`category-filter-btn ${activeTab === "preview" ? "active" : ""}`}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("preview");
              }}
              data-cursor="link"
            >
              UI Preview
            </button>
            <button
              className={`category-filter-btn ${activeTab === "code" ? "active" : ""}`}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("code");
              }}
              data-cursor="link"
            >
              React / TS Code
            </button>
          </div>
        </div>

        {/* Interactive Mockup Container */}
        <div
          style={{
            marginTop: "2rem",
            background: "var(--bg-muted)",
            borderRadius: "16px",
            border: "1px solid var(--border-subtle)",
            padding: "1.5rem",
            minHeight: "220px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {activeTab === "preview" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div style={{ background: "#fff", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                <span className="text-meta" style={{ color: "var(--accent-gold)" }}>FIGMA COMPONENT</span>
                <h4 style={{ margin: "0.4rem 0 0.2rem" }}>Interactive Hero Spec</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Auto-layout: Vertical (16px), Tokens: #FAF8F5 / #121214</p>
              </div>

              <div style={{ background: "#fff", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                <span className="text-meta" style={{ color: "#10b981" }}>EXPORT READY</span>
                <h4 style={{ margin: "0.4rem 0 0.2rem" }}>Design System Tokens</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Typography scales, responsive breakpoints, fluid clamp functions</p>
              </div>
            </div>
          ) : (
            <pre
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                color: "var(--text-primary)",
                lineHeight: "1.6",
                overflowX: "auto",
              }}
            >
              {`// Malik Abubakkar Design-to-Code Pipeline
export const HeroComponent = ({ title, subtitle }) => {
  return (
    <section className="editorial-hero">
      <KineticTypography text={title} ease="expo.out" />
      <LiquidMaskImage src="/images/malik-abubakkar.webp" />
    </section>
  );
};`}
            </pre>
          )}
        </div>

        {/* 5-Step Workflow */}
        <div className="workflow-steps-grid">
          {FIGMA_WORKFLOW.map((step) => (
            <div key={step.step} className="workflow-step-col">
              <span className="workflow-step-num">{step.step}</span>
              <h4 className="workflow-step-title">{step.title}</h4>
              <p className="workflow-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
