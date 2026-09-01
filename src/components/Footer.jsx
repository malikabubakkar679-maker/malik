import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Karachi",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-wrap">
      <div className="footer-inner">
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", textTransform: "uppercase" }}>
            {PERSONAL_INFO.name}
          </h4>
          <span className="text-meta" style={{ display: "block", marginTop: "0.25rem" }}>
            {PERSONAL_INFO.role}
          </span>
        </div>

        {/* Center Editorial Slogan */}
        <div className="text-meta" style={{ color: "var(--text-primary)", fontWeight: 600 }}>
          DESIGN • CODE • SOLVE • CREATE
        </div>

        {/* Right Info & Back to Top */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span className="text-meta">PKT {timeStr}</span>
          <button
            onClick={scrollToTop}
            className="text-meta"
            style={{ color: "var(--accent-gold)", fontWeight: 700, cursor: "pointer" }}
            data-cursor="link"
          >
            TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
