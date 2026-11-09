import React, { useEffect, useRef, useState } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";

function AnimatedCounter({ targetNumber, suffix, isVisible, delay = 0 }) {
  const [count, setCount] = useState(0);
  const target = parseInt(targetNumber, 10) || 0;

  useEffect(() => {
    if (!isVisible) return;

    let timer;
    let animTimer;
    
    // Start count animation slightly after the box fans out to position
    timer = setTimeout(() => {
      let frame = 0;
      const duration = 1900; // ms
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);

      animTimer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(easeOut * target);

        if (frame >= totalFrames) {
          setCount(target);
          clearInterval(animTimer);
        } else {
          setCount(current);
        }
      }, frameRate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animTimer) clearInterval(animTimer);
    };
  }, [isVisible, target, delay]);

  return (
    <div className="stat-editorial-number">
      {count.toString().padStart(targetNumber.length, "0")}
      <span>{suffix}</span>
    </div>
  );
}

// Initial cluster offsets so all boxes start as one gathered group in center
const CLUSTER_OFFSETS = [
  { x: "70px", y: "35px", rotate: "-4deg" },
  { x: "24px", y: "15px", rotate: "-1.5deg" },
  { x: "-24px", y: "15px", rotate: "1.5deg" },
  { x: "-70px", y: "35px", rotate: "4deg" },
];

export default function IntroStatement() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.18 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="statement" ref={sectionRef} className="editorial-statement-section relative overflow-hidden py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#FAF8F5]">
      {/* Background Subtle Ambience */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(235,224,210,0.4)_0%,transparent_70%)]" 
        aria-hidden="true" 
      />

      {/* Stats / Numbers Editorial Grid with Fan-Out Assembly Animation */}
      <div className="stats-editorial-grid max-w-7xl mx-auto relative z-10">
        {PERSONAL_INFO.stats.map((stat, idx) => {
          const rawNum = stat.number.replace(/[^0-9]/g, "");
          const suffix = stat.number.replace(/[0-9]/g, "") || "+";
          const offset = CLUSTER_OFFSETS[idx % CLUSTER_OFFSETS.length];

          return (
            <div
              key={idx}
              className="stat-editorial-card bg-white/75 backdrop-blur-sm border border-neutral-200/90 rounded-2xl p-5 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#BA9B70]/80 hover:shadow-lg transition-transform duration-300 will-change-transform"
              style={{
                transform: isInView
                  ? "translate3d(0, 0, 0) scale(1) rotate(0deg)"
                  : `translate3d(${offset.x}, ${offset.y}, 0) scale(0.8) rotate(${offset.rotate})`,
                opacity: isInView ? 1 : 0,
                transition: `transform 950ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 130}ms, opacity 800ms ease-out ${idx * 130}ms`,
              }}
            >
              <AnimatedCounter
                targetNumber={rawNum}
                suffix={suffix}
                isVisible={isInView}
                delay={idx * 130 + 350}
              />
              <div className="stat-editorial-label mt-2 font-bold text-neutral-900 text-sm sm:text-base">
                {stat.label}
              </div>
              <div className="stat-editorial-detail text-neutral-500 text-xs sm:text-sm mt-1">
                {stat.detail}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
