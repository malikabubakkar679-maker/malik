import React, { useEffect, useState, useRef } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { ArrowDown, ArrowUpRight, User, Sparkles, CheckCircle2, MapPin, Zap } from "lucide-react";

export default function Hero({ isIntroReady }) {
  const [revealed, setRevealed] = useState(true);
  const imageFrameRef = useRef(null);

  // Typewriter roles rotation list
  const rolesList = [
    "SOFTWARE ENGINEER",
    "WEB DEVELOPER",
    "PROBLEM SOLVER",
    "CREATIVE DEVELOPER",
    "FULL-STACK ARCHITECT",
    "UI/UX SPECIALIST",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("SOFTWARE ENGINEER");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setRevealed(true);
  }, [isIntroReady]);

  // Typewriter Character-by-Character Typing & Deleting Loop
  useEffect(() => {
    if (!revealed) return;

    const currentRole = rolesList[currentRoleIndex];
    let typingSpeed = isDeleting ? 40 : 75;

    if (!isDeleting && displayedText === currentRole) {
      // Pause at full text before deleting
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(pauseTimer);
    } else if (isDeleting && displayedText === "") {
      // Move to next role
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % rolesList.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => {
        if (isDeleting) {
          return currentRole.substring(0, prev.length - 1);
        } else {
          return currentRole.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, revealed]);

  // Subtle liquid / fluid mouse tilt on portrait
  useEffect(() => {
    const frame = imageFrameRef.current;
    if (!frame) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      const rect = frame.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      frame.style.transform = `perspective(800px) rotateY(${deltaX * 4}deg) rotateX(${-deltaY * 4}deg) translateY(-2px)`;
    };

    const handleMouseLeave = () => {
      frame.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    frame.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      frame.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const nameWords = ["MALIK", "ABUBAKKAR"];

  const handleLetterHover = () => {
    soundEngine.playHover();
  };

  const scrollToSection = (id) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-section">
      {/* Top Status Meta Row */}
      <div className="hero-top-meta">
        <div className="badge-tag">
          <span className="status-dot" />
          {PERSONAL_INFO.status}
        </div>
        <div className="text-meta" style={{ display: "none", md: "block" }}>
          <MapPin size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
          {PERSONAL_INFO.location}
        </div>
      </div>

      {/* Main Hero Split Grid — Perfectly Leveled on One Stage */}
      <div className="hero-main-grid">
        {/* Left: Heading, Typewriter, Rich Details & Buttons */}
        <div className="hero-typography-wrap">
          {/* Main Kinetic Heading — Regular Instant Display with Fast Hover */}
          <h1 className="kinetic-title">
            {nameWords.map((word, wordIdx) => (
              <span key={wordIdx} className="kinetic-title-row">
                {word.split("").map((letter, letterIdx) => (
                  <span
                    key={letterIdx}
                    className="kinetic-char"
                    onMouseEnter={handleLetterHover}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Dynamic Typewriter Rotating Roles Subtitle */}
          <div className="hero-typewriter-container">
            <div className="hero-typewriter-pill">
              <span className="status-dot" />
              <span className="hero-typewriter-text">
                {displayedText}
                <span className="typewriter-cursor">|</span>
              </span>
            </div>
          </div>

          {/* Enriched Editorial Description */}
          <p className="hero-intro-paragraph">
            {PERSONAL_INFO.heroIntro} Specializing in building high-performance web applications, scalable architectures, and bespoke interactive systems with extreme attention to detail and clean engineering.
          </p>

          {/* Core Technical Highlights & Badges */}
          <div className="hero-specialties-row">
            {["React & Next.js", "TypeScript", "Node.js & APIs", "GSAP & WebGL", "Clean Architecture"].map(
              (spec, idx) => (
                <span key={idx} className="hero-spec-pill">
                  <Zap size={11} color="var(--accent-gold)" />
                  {spec}
                </span>
              )
            )}
          </div>

          {/* Premium CTA Buttons */}
          <div className="hero-cta-group">
            <button
              onClick={() => scrollToSection("work")}
              className="btn-primary-editorial"
              data-cursor="link"
            >
              <span>VIEW PROJECTS</span>
              <ArrowUpRight size={16} />
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="btn-secondary-editorial"
              data-cursor="link"
            >
              <User size={15} />
              <span>ABOUT ME</span>
            </button>
          </div>
        </div>

        {/* Right: Malik Abubakkar Standing Portrait on Same Stage */}
        <div className="hero-image-liquid-container" data-cursor="explore">
          <div ref={imageFrameRef} className="liquid-image-frame">
            <img
              src={PERSONAL_INFO.heroImage}
              alt={PERSONAL_INFO.name}
              className="hero-portrait-img"
              loading="eager"
            />
            <div className="hero-image-badge-pill">
              <Sparkles size={13} color="var(--accent-gold)" />
              <span>MALIK ABUBAKKAR • SOFTWARE ENGINEER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar & Scroll Indicator */}
      <div className="hero-bottom-status">
        <div className="text-meta">
          DISCIPLINES: SOFTWARE • WEB • CREATIVE ARCHITECTURE
        </div>

        <div
          className="hero-scroll-btn"
          onClick={() => scrollToSection("statement")}
          data-cursor="link"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} className="scroll-arrow-bounce" />
        </div>
      </div>
    </section>
  );
}
