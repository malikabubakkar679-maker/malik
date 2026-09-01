import React, { useState } from "react";
import { SKILLS_DATA } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { Code2 } from "lucide-react";

export default function SkillsMatrix() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const currentCategory = SKILLS_DATA[activeCategoryIndex];

  return (
    <section className="skills-section">
      <div style={{ marginBottom: "2rem" }}>
        <div className="badge-tag" style={{ marginBottom: "1rem" }}>
          <Code2 size={14} color="var(--accent-gold)" />
          TECHNICAL ARSENAL & TOOLING
        </div>
        <h2 className="heading-lg">ENGINEERING STACK</h2>
      </div>

      {/* Category Tabs */}
      <div className="skills-tabs">
        {SKILLS_DATA.map((cat, idx) => (
          <button
            key={idx}
            className={`skills-tab-btn ${activeCategoryIndex === idx ? "active" : ""}`}
            onClick={() => {
              soundEngine.playClick();
              setActiveCategoryIndex(idx);
            }}
            data-cursor="link"
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Active Skills Grid */}
      <div className="skills-grid">
        {currentCategory.skills.map((skill, idx) => (
          <div key={idx} className="skill-card" data-cursor="link">
            <div className="skill-card-top">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-tag">{skill.tag}</span>
            </div>

            <div className="skill-bar-track">
              <div
                className="skill-bar-fill"
                style={{
                  width: skill.level,
                  transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s`,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}
            >
              <span>PROFICIENCY</span>
              <span style={{ color: "var(--text-secondary)" }}>{skill.level}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
