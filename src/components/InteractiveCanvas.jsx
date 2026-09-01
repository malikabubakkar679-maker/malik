import React, { useEffect, useRef, useState } from "react";
import { soundEngine } from "../utils/audioUtils";
import { Sparkles, RefreshCw, Cpu } from "lucide-react";

export default function InteractiveCanvas() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("fluid"); // "fluid" | "type" | "grid"
  const [fps, setFps] = useState(60);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, isDown: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // Particle collection
    let particles = [];

    const initParticles = () => {
      particles = [];
      const count = mode === "grid" ? 400 : 250;

      if (mode === "fluid") {
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            originX: Math.random() * width,
            originY: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 2.5 + 1.2,
            color: i % 3 === 0 ? "#e5b97c" : i % 3 === 1 ? "#ffffff" : "#4f8cff",
          });
        }
      } else if (mode === "type") {
        // Sample points from typography "CREATIVE"
        const offscreen = document.createElement("canvas");
        const offCtx = offscreen.getContext("2d");
        offscreen.width = width;
        offscreen.height = height;

        offCtx.fillStyle = "#ffffff";
        offCtx.font = `bold ${Math.min(width * 0.12, 100)}px 'Syne', sans-serif`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.fillText("MALIK . DEV", width / 2, height / 2);

        const imgData = offCtx.getImageData(0, 0, width, height).data;
        const gap = Math.max(Math.floor(width / 160), 6);

        for (let y = 0; y < height; y += gap) {
          for (let x = 0; x < width; x += gap) {
            const alpha = imgData[(y * width + x) * 4 + 3];
            if (alpha > 128) {
              particles.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                originX: x,
                originY: y,
                vx: 0,
                vy: 0,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.3 ? "#e5b97c" : "#ffffff",
              });
            }
          }
        }
      } else if (mode === "grid") {
        const cols = Math.floor(width / 45);
        const rows = Math.floor(height / 45);
        const colGap = width / (cols + 1);
        const rowGap = height / (rows + 1);

        for (let c = 1; c <= cols; c++) {
          for (let r = 1; r <= rows; r++) {
            const x = c * colGap;
            const y = r * rowGap;
            particles.push({
              x,
              y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              size: 2,
              color: "#e5b97c",
            });
          }
        }
      }
    };

    initParticles();

    // Mouse telemetry
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      mouseRef.current.vx = currentX - lastMouseX;
      mouseRef.current.vy = currentY - lastMouseY;
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;

      lastMouseX = currentX;
      lastMouseY = currentY;
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
      soundEngine.playChime(440, 0.15, "triangle");
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

    // FPS Meter
    let lastTime = performance.now();
    let frameCount = 0;

    const render = (now) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }

      ctx.fillStyle = "rgba(4, 4, 6, 0.35)";
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isDown = mouseRef.current.isDown;
      const forceRadius = isDown ? 240 : 130;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Distance to cursor
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < forceRadius) {
          const force = (1 - dist / forceRadius) * (isDown ? -8 : 4.5);
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
        }

        // Return to origin with spring physics
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.04;
        p.vy += homeDy * 0.04;

        // Friction damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        // Render particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect adjacent points in grid mode
        if (mode === "grid") {
          for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
            const p2 = particles[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (d < 50) {
              ctx.strokeStyle = `rgba(229, 185, 124, ${0.2 * (1 - d / 50)})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [mode]);

  return (
    <section className="interactive-experiment-section">
      <div className="experiment-card" data-cursor="explore">
        <canvas ref={canvasRef} className="experiment-canvas" />

        {/* Top HUD */}
        <div className="experiment-hud">
          <div className="badge-tag experiment-badge">
            <Sparkles size={14} color="var(--accent-gold)" />
            INTERACTIVE LAB • EXPERIMENTAL
          </div>

          <div className="experiment-controls">
            <button
              className={`exp-control-btn ${mode === "fluid" ? "active" : ""}`}
              onClick={() => {
                soundEngine.playClick();
                setMode("fluid");
              }}
              data-cursor="link"
            >
              Fluid Field
            </button>
            <button
              className={`exp-control-btn ${mode === "type" ? "active" : ""}`}
              onClick={() => {
                soundEngine.playClick();
                setMode("type");
              }}
              data-cursor="link"
            >
              Kinetic Type
            </button>
            <button
              className={`exp-control-btn ${mode === "grid" ? "active" : ""}`}
              onClick={() => {
                soundEngine.playClick();
                setMode("grid");
              }}
              data-cursor="link"
            >
              Quantum Grid
            </button>
          </div>
        </div>

        {/* Bottom Telemetry HUD */}
        <div className="experiment-bottom-hud">
          <div className="experiment-instructions">
            <span>[ MOVE MOUSE OR CLICK TO APPLY GRAVITATIONAL FIELD ]</span>
          </div>

          <div className="badge-tag" style={{ background: "rgba(0,0,0,0.6)" }}>
            <Cpu size={12} color="var(--accent-gold)" />
            <span>GPU PIPELINE: {fps} FPS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
