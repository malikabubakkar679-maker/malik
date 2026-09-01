import React, { useEffect, useRef, useState } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";

function AnimatedCounter({ targetNumber, suffix, isVisible }) {
  const [count, setCount] = useState(0);
  const target = parseInt(targetNumber, 10) || 0;

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1800; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Ease out quad
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * target);

      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div className="stat-editorial-number">
      {count.toString().padStart(targetNumber.length, "0")}
      <span>{suffix}</span>
    </div>
  );
}

export default function IntroStatement() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const statementWords = PERSONAL_INFO.editorialStatement.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="statement" ref={sectionRef} className="editorial-statement-section">
      <div className="badge-tag" style={{ alignSelf: "flex-start" }}>
        <span className="status-dot" />
        CORE PHILOSOPHY
      </div>

      {/* Large Editorial Headline */}
      <h2 className="statement-giant-heading">
        {statementWords.map((word, idx) => (
          <React.Fragment key={idx}>
            <span
              className={`word ${isInView ? "active" : ""}`}
              style={{
                transitionDelay: `${idx * 0.04 + 0.1}s`,
              }}
            >
              {word}
            </span>{" "}
          </React.Fragment>
        ))}
      </h2>

      {/* Stats / Numbers Editorial Grid with Live Animated Counters */}
      <div className="stats-editorial-grid">
        {PERSONAL_INFO.stats.map((stat, idx) => {
          const rawNum = stat.number.replace(/[^0-9]/g, "");
          const suffix = stat.number.replace(/[0-9]/g, "") || "+";

          return (
            <div key={idx} className="stat-editorial-card">
              <AnimatedCounter
                targetNumber={rawNum}
                suffix={suffix}
                isVisible={isInView}
              />
              <div className="stat-editorial-label">{stat.label}</div>
              <div className="stat-editorial-detail">{stat.detail}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
