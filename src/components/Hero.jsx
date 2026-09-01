import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { PERSONAL_INFO } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { ArrowDown, ArrowUpRight, User, Sparkles } from "lucide-react";

export default function Hero({ isIntroReady }) {
  const heroRef = useRef(null);
  const portraitFrameRef = useRef(null);
  const watermarkRef = useRef(null);

  const rolesList = [
    "SOFTWARE ENGINEER",
    "FULL-STACK DEVELOPER",
    "UI/UX SPECIALIST",
    "PROBLEM SOLVER",
    "CREATIVE ARCHITECT",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("SOFTWARE ENGINEER");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Loop
  useEffect(() => {
    const currentRole = rolesList[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    if (!isDeleting && displayedRole === currentRole) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    } else if (isDeleting && displayedRole === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % rolesList.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedRole((prev) => {
        if (isDeleting) {
          return currentRole.substring(0, prev.length - 1);
        } else {
          return currentRole.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, currentRoleIndex]);

  // Entrance Stagger Choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".serif-word",
        { opacity: 0, y: -30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, stagger: 0.1 }
      );

      tl.fromTo(
        ".hero-center-portrait-anchor",
        { opacity: 0, y: 60, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "power4.out" },
        "-=0.9"
      );

      tl.fromTo(
        ".hero-pill-badge",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.8"
      );

      tl.fromTo(
        ".hero-specialization-card",
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.8"
      );

      tl.fromTo(
        ".hero-name-block",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.7"
      );

      tl.fromTo(
        ".hero-role-block",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.8"
      );

      tl.fromTo(
        ".hero-action-row",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-typewriter-subbadge",
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
        "-=0.6"
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isIntroReady]);

  // Interactive 3D mouse parallax tilt
  useEffect(() => {
    const heroEl = heroRef.current;
    const frame = portraitFrameRef.current;
    const watermark = watermarkRef.current;
    if (!heroEl || !frame) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      frame.style.transform = `perspective(1000px) rotateY(${deltaX * 3.5}deg) rotateX(${-deltaY * 3.5}deg) translateY(-2px)`;
      if (watermark) {
        watermark.style.transform = `translate3d(${-deltaX * 5}px, ${-deltaY * 3}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      frame.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
      if (watermark) {
        watermark.style.transform = "translate3d(0, 0, 0)";
      }
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleLetterHover = () => {
    soundEngine.playHover();
  };

  const scrollToSection = (id) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={heroRef} className="reference-hero-section">
      {/* 1. Ambient Warm Golden / Champagne Halo Glows */}
      <div className="hero-amber-glow left-halo" aria-hidden="true" />
      <div className="hero-amber-glow right-halo" aria-hidden="true" />

      {/* 2. Main Hero Stage */}
      <div className="reference-hero-stage">
        {/* Layer 1 (Background): "Hey," [Head in Center] "there" */}
        <div ref={watermarkRef} className="hero-serif-watermark" aria-hidden="true">
          <span className="serif-word word-hey">Hey,</span>
          <span className="serif-word word-there">there</span>
        </div>

        {/* Layer 2 (Center Stage): Large Dominant Cutout Portrait of Malik */}
        <div className="hero-center-portrait-anchor" data-cursor="explore">
          <div ref={portraitFrameRef} className="hero-portrait-frame">
            <img
              src="/images/malik-cutout-transparent.png"
              alt={PERSONAL_INFO.name}
              className="hero-cutout-image"
              loading="eager"
            />
          </div>
        </div>

        {/* Layer 3: Left & Right Content Grid */}
        <div className="hero-stage-content-grid">
          {/* Left Column: Available Badge + 'I AM MALIK ABUBAKKAR' + CTA Buttons */}
          <div className="hero-side-column hero-left-column">
            {/* Top Left: Availability Pill Badge */}
            <div className="hero-pill-badge" data-cursor="badge">
              <span className="hero-amber-dot-wrap">
                <span className="hero-amber-dot-glow" />
                <span className="hero-amber-dot-core" />
              </span>
              <span className="hero-pill-badge-label">Available for new opportunities</span>
            </div>

            {/* Bottom Left: Huge Condensed Name & Action Buttons */}
            <div className="hero-bottom-left-group">
              <div className="hero-name-block">
                <h1 className="hero-condensed-headline" onMouseEnter={handleLetterHover}>
                  <span className="headline-row">I AM</span>
                  <span className="headline-row headline-name">MALIK</span>
                  <span className="headline-row headline-subname">ABUBAKKAR</span>
                </h1>
              </div>

              {/* Action CTA Buttons */}
              <div className="hero-action-row">
                <button
                  onClick={() => scrollToSection("work")}
                  className="hero-pill-btn-dark"
                  data-cursor="link"
                >
                  <span>VIEW PROJECTS</span>
                  <ArrowUpRight size={15} />
                </button>

                <button
                  onClick={() => scrollToSection("about")}
                  className="hero-pill-btn-glass"
                  data-cursor="link"
                >
                  <User size={14} />
                  <span>ABOUT ME</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Specialization Statement + Stacked Role & Dynamic Typewriter */}
          <div className="hero-side-column hero-right-column">
            {/* Top Right: Specialization Statement */}
            <div className="hero-specialization-card">
              <p className="hero-specialization-text">
                Specialized in Software Engineering, Full-Stack Web Development, UI / UX Systems, and Creative Interaction.
              </p>
            </div>

            {/* Bottom Right: Stacked Role & Dynamic Rotating Typewriter */}
            <div className="hero-bottom-right-group">
              <div className="hero-role-block">
                <h2 className="hero-condensed-role">
                  <span className="role-stack-line">DIGITAL</span>
                  <span className="role-stack-line">PRODUCT</span>
                  <span className="role-stack-line">ENGINEER</span>
                </h2>

                {/* Dynamic Typewriter Pill */}
                <div className="hero-typewriter-subbadge">
                  <Sparkles size={13} color="#d97706" />
                  <span className="hero-typewriter-dynamic-text">
                    {displayedRole}
                    <span className="typewriter-blink-bar">|</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Subtle Bottom Scroll Indicator */}
      <div className="reference-hero-scroll-bar">
        <div
          className="reference-scroll-btn"
          onClick={() => scrollToSection("statement")}
          data-cursor="link"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} className="scroll-arrow-anim" />
        </div>
      </div>
    </section>
  );
}
