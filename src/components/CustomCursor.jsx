import React, { useEffect, useRef, useState } from "react";
import { soundEngine } from "../utils/audioUtils";

export default function CustomCursor() {
  const followerRef = useRef(null);
  const dotRef = useRef(null);
  const [cursorState, setCursorState] = useState("");
  const [cursorLabel, setCursorLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Touch screen check
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global event delegation for cursor states
    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor], a, button, input, textarea, .clickable");
      if (!target) {
        setCursorState("");
        setCursorLabel("");
        return;
      }

      const customType = target.getAttribute("data-cursor");
      if (customType === "project") {
        setCursorState("hover-project");
        setCursorLabel("VIEW");
        soundEngine.playHover();
      } else if (customType === "explore") {
        setCursorState("hover-explore");
        setCursorLabel("EXPLORE");
        soundEngine.playHover();
      } else if (customType === "drag") {
        setCursorState("hover-drag");
        setCursorLabel("DRAG");
      } else if (customType === "open") {
        setCursorState("hover-project");
        setCursorLabel("OPEN");
        soundEngine.playHover();
      } else {
        setCursorState("hover-link");
        setCursorLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Lerp loop for follower
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const render = () => {
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.16);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.16);

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: isVisible ? 1 : 0,
          left: 0,
          top: 0,
        }}
      />

      {/* Fluid Lerp Follower with stateful context labels */}
      <div
        ref={followerRef}
        className={`cursor-follower ${cursorState}`}
        style={{
          opacity: isVisible ? 1 : 0,
          left: 0,
          top: 0,
        }}
      >
        {cursorLabel && <span className="cursor-label">{cursorLabel}</span>}
      </div>
    </>
  );
}
