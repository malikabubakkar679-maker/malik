import React from "react";
import { EXPERIENCE_TIMELINE } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="experience-section">
      <div style={{ marginBottom: "3rem" }}>
        <div className="badge-tag" style={{ marginBottom: "0.85rem" }}>
          <Briefcase size={13} color="var(--accent-gold)" />
          CAREER & COMMISSIONS
        </div>
        <h2 className="heading-section">EXPERIENCE & BACKGROUND</h2>
      </div>

      <div className="timeline-list">
        {EXPERIENCE_TIMELINE.map((item, idx) => (
          <div
            key={idx}
            className="timeline-item"
            onMouseEnter={() => soundEngine.playHover()}
            data-cursor="link"
          >
            <div className="timeline-year">{item.year}</div>

            <div>
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-org">
                {item.organization} • <span style={{ color: "var(--accent-gold)" }}>{item.period}</span>
              </div>
            </div>

            <div>
              <p className="timeline-desc">{item.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.85rem" }}>
                {item.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="badge-tag" style={{ fontSize: "0.7rem", padding: "0.2rem 0.55rem" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
