import React, { useEffect, useRef } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { soundEngine } from "../utils/audioUtils";

export default function DarkFeatureSection({ onOpenInquiry }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle wave points
    let step = 0;
    const lines = 5;

    const render = () => {
      step += 0.015;
      ctx.clearRect(0, 0, width, height);

      for (let l = 0; l < lines; l++) {
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(168, 121, 56, ${0.15 + l * 0.06})`;

        for (let x = 0; x < width; x += 15) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.005 + step + l * 0.8) * 45 +
            Math.cos(x * 0.003 - step) * 25;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="dark-feature-section">
      <div className="dark-canvas-container">
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>

      <div className="dark-feature-inner">
        <div className="badge-tag-dark" style={{ alignSelf: "flex-start" }}>
          <Sparkles size={13} color="var(--accent-gold)" />
          CREATIVE TECH & EXPERIMENTAL WORK
        </div>

        <h2 className="dark-feature-title">
          BUILDING DIGITAL <br />
          <span style={{ color: "var(--accent-gold)" }}>EXPERIENCES.</span>
        </h2>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
          <p style={{ maxWidth: 620, color: "var(--text-dark-secondary)", fontSize: "1.1rem", lineHeight: "1.7" }}>
            Combining high-performance software architecture with cinematic motion and real-time graphics to turn ideas into memorable digital products.
          </p>

          <button
            onClick={() => {
              soundEngine.playWhoosh("open");
              onOpenInquiry?.();
            }}
            className="btn-primary-editorial"
            style={{ background: "var(--accent-gold)", color: "#000", fontWeight: 700 }}
            data-cursor="link"
          >
            <span>START A CONVERSATION</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
