import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Cpu } from "lucide-react";
import { soundEngine } from "../utils/audioUtils";

export default function MotionShowcase() {
  const canvasRef = useRef(null);
  const [fps, setFps] = useState(60);
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false });

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

    // Particle nodes
    const particleCount = 180;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      originX: Math.random() * width,
      originY: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 2.5 + 1.2,
      color: Math.random() > 0.4 ? "#121214" : "#A87938",
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
      soundEngine.playChime(520, 0.12, "sine");
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let lastTime = performance.now();
    let frameCount = 0;

    const render = (now) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }

      ctx.fillStyle = "rgba(250, 248, 245, 0.35)";
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isDown = mouseRef.current.isDown;
      const forceRadius = isDown ? 200 : 120;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < forceRadius) {
          const force = (1 - dist / forceRadius) * (isDown ? -6 : 3.5);
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
        }

        // Return to home
        p.vx += (p.originX - p.x) * 0.03;
        p.vy += (p.originY - p.y) * 0.03;
        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby points
        for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 80) {
            ctx.strokeStyle = `rgba(18, 18, 20, ${0.08 * (1 - d / 80)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="editorial-statement-section" style={{ paddingBottom: 0 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "380px",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid var(--border-medium)",
          background: "#FAF8F5",
        }}
        data-cursor="explore"
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            left: "1.5rem",
            right: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div className="badge-tag">
            <Sparkles size={13} color="var(--accent-gold)" />
            KINETIC LAB • MOTION PLAYGROUND
          </div>

          <div className="badge-tag">
            <Cpu size={12} color="var(--accent-gold)" />
            <span>GPU: {fps} FPS</span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "1.5rem",
            pointerEvents: "none",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            MOTION IS PART OF THE EXPERIENCE.
          </h3>
          <span className="text-meta">[ HOVER OR CLICK TO DISPLACE KINETIC NODES ]</span>
        </div>
      </div>
    </section>
  );
}
