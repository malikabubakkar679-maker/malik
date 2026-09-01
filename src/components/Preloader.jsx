import React, { useEffect, useState } from "react";
import { soundEngine } from "../utils/audioUtils";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let current = 0;
    // Loading duration (~2.5s)
    const interval = setInterval(() => {
      // Smooth realistic non-linear increment
      const step = Math.floor(Math.random() * 4) + 2;
      current += step;

      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);

        setTimeout(() => {
          setIsFinished(true);
          soundEngine.playWhoosh("open");
          onComplete?.();

          // Fully unmount from DOM after transition
          setTimeout(() => {
            setIsRemoved(true);
          }, 950);
        }, 300);
      } else {
        setPercent(current);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div className={`editorial-preloader ${isFinished ? "finished" : ""}`}>
      <div className="preloader-box">
        {/* Animated MA Monogram */}
        <div className="preloader-monogram">{PERSONAL_INFO.initials}</div>

        {/* Animated Full Name: MALIK ABUBAKKAR */}
        <div className="preloader-name">{PERSONAL_INFO.name}</div>

        {/* Progress Track & Numeric Counter */}
        <div className="preloader-divider-wrap">
          <div className="preloader-progress-track">
            <div
              className="preloader-progress-bar"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="preloader-counter-text">
            {percent.toString().padStart(2, "0")}%
          </div>
        </div>

        {/* Animated Subtitle */}
        <div className="preloader-sub">SOFTWARE ENGINEER / WEB DEVELOPER</div>
      </div>
    </div>
  );
}
