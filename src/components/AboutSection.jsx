import React from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { User, Code, Layers, Cpu, Compass } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="editorial-about-section">
      <div className="about-editorial-layout">
        {/* Left: Malik Working Portrait */}
        <div className="about-portrait-frame" data-cursor="explore">
          <img
            src={PERSONAL_INFO.workingImage}
            alt="Malik Abubakkar Engineering"
            className="about-portrait-img"
            loading="lazy"
          />
        </div>

        {/* Right: Editorial Narrative */}
        <div className="about-text-column">
          <div className="badge-tag" style={{ alignSelf: "flex-start" }}>
            <User size={13} color="var(--accent-gold)" />
            ABOUT THE ENGINEER
          </div>

          <h2 className="heading-section">
            MALIK ABUBAKKAR <br />
            <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "0.85em", textTransform: "none" }}>
              Software Engineer & Web Developer
            </span>
          </h2>

          {/* Quote Block */}
          <blockquote className="about-quote-box">
            "{PERSONAL_INFO.aboutStatement}"
          </blockquote>

          {/* Detailed Paragraphs */}
          <div className="about-bio-text">
            {PERSONAL_INFO.aboutParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Core Focus Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "0.5rem" }}>
            {[
              "Scalable Systems",
              "Full-Stack Web Dev",
              "UI/UX Implementation",
              "Creative Motion",
              "Performance Auditing",
              "Problem Solving",
            ].map((tag, idx) => (
              <span key={idx} className="badge-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
