import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PERSONAL_INFO } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { ArrowDown, ArrowUpRight, User, Code2, Rocket, Users } from "lucide-react";

// Crisp SVG Logos for Trusted Clients & Partners (Desktop)
const PARTNER_LOGOS = [
  {
    name: "Google",
    svg: (
      <svg viewBox="0 0 92 30" className="partner-logo-svg" fill="currentColor" aria-label="Google">
        <path d="M14.2 14.5v-3.7h8.8c.1.5.1 1 .1 1.6 0 2-.5 4.5-2.3 6.3-1.8 1.8-4 2.8-6.9 2.8-5.4 0-9.9-4.4-9.9-9.8s4.5-9.8 9.9-9.8c2.9 0 5.1 1.1 6.7 2.7l-2.6 2.6c-1.1-1.1-2.6-1.9-4.1-1.9-3.5 0-6.4 2.8-6.4 6.4s2.9 6.4 6.4 6.4c2.3 0 3.6-.9 4.4-1.7.7-.7 1.1-1.7 1.3-3.1h-5.4z" />
        <path d="M29.5 13.8c0 4.2 3.2 7.2 7.2 7.2s7.2-3 7.2-7.2-3.2-7.2-7.2-7.2-7.2 3-7.2 7.2zm11.3 0c0 2.7-1.9 4.5-4.1 4.5s-4.1-1.8-4.1-4.5 1.9-4.5 4.1-4.5 4.1 1.8 4.1 4.5z" />
        <path d="M45.5 13.8c0 4.2 3.2 7.2 7.2 7.2s7.2-3 7.2-7.2-3.2-7.2-7.2-7.2-7.2 3-7.2 7.2zm11.3 0c0 2.7-1.9 4.5-4.1 4.5s-4.1-1.8-4.1-4.5 1.9-4.5 4.1-4.5 4.1 1.8 4.1 4.5z" />
        <path d="M69.8 7.1v1.1h-.1c-.6-.7-1.7-1.4-3.2-1.4-3 0-5.8 2.7-5.8 7s2.7 7 5.8 7c1.4 0 2.6-.6 3.2-1.4h.1v.9c0 2.7-1.4 4.1-3.7 4.1-1.9 0-3-1.3-3.5-2.5l-2.7 1.1c.8 1.9 2.9 4.1 6.2 4.1 3.6 0 6.6-2.1 6.6-7.3V7.1h-2.9zm-2.8 11.2c-2 0-3.6-1.7-3.6-4.5s1.6-4.5 3.6-4.5c2 0 3.5 1.7 3.5 4.5s-1.5 4.5-3.5 4.5z" />
        <path d="M74.8 2.4h3.1v18.2h-3.1V2.4z" />
        <path d="M86.8 16.5c-1.4 0-2.4-.6-3-1.8l8.3-3.4-.3-.7c-.5-1.4-2.1-4-5.3-4-3.2 0-5.9 2.5-5.9 7 0 4 2.9 7.2 6.9 7.2 3.2 0 5.1-2 5.9-3.1l-2.4-1.6c-.8 1.1-1.9 1.8-3.2 1.8zm-.2-7.4c1.1 0 2 .6 2.3 1.4L83.7 13c0-2.4 1.7-3.9 2.9-3.9z" />
      </svg>
    ),
  },
  {
    name: "Microsoft",
    svg: (
      <svg viewBox="0 0 118 28" className="partner-logo-svg" fill="currentColor" aria-label="Microsoft">
        <rect x="2" y="6" width="7.5" height="7.5" fill="#737373" />
        <rect x="11.5" y="6" width="7.5" height="7.5" fill="#737373" />
        <rect x="2" y="15.5" width="7.5" height="7.5" fill="#737373" />
        <rect x="11.5" y="15.5" width="7.5" height="7.5" fill="#737373" />
        <text x="25" y="20.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="15" letterSpacing="-0.3px">Microsoft</text>
      </svg>
    ),
  },
  {
    name: "Netflix",
    svg: (
      <svg viewBox="0 0 90 26" className="partner-logo-svg" fill="currentColor" aria-label="Netflix">
        <text x="2" y="20.5" fontFamily="'Impact', 'Arial Black', sans-serif" fontWeight="900" fontSize="19" letterSpacing="2.5px">NETFLIX</text>
      </svg>
    ),
  },
  {
    name: "Airbnb",
    svg: (
      <svg viewBox="0 0 95 28" className="partner-logo-svg" fill="currentColor" aria-label="Airbnb">
        <path d="M10.8 19.3c-1.4 0-2.4-.8-2.4-2.1 0-1.8 1.7-3.2 4.4-3.5 1.1-.1 2.2 0 3.1.2-.5 3.3-2.6 5.4-5.1 5.4zm7.4-8.8c-.8-2.6-2.4-4.8-4.7-6.2-1.3-.8-2.7-1.3-4.1-1.3-1.5 0-2.9.5-4.2 1.3-2.3 1.5-3.9 3.6-4.7 6.2-.9 3-.4 6.3 1.5 9.1 1.7 2.6 4.3 4.4 7.4 4.4 3.1 0 5.7-1.8 7.4-4.4 1.9-2.8 2.4-6.1 1.4-9.1zm-8.8-4.6c.9 0 1.8.4 2.5 1 1.4 1.2 2.3 2.9 2.8 4.7-1.2-.3-2.5-.4-3.8-.4-1.3 0-2.6.1-3.8.4.5-1.8 1.4-3.5 2.8-4.7.7-.6 1.5-1 2.5-1z" transform="translate(0, -1)" />
        <text x="25" y="20" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="16" letterSpacing="-0.5px">airbnb</text>
      </svg>
    ),
  },
  {
    name: "HubSpot",
    svg: (
      <svg viewBox="0 0 96 28" className="partner-logo-svg" fill="currentColor" aria-label="HubSpot">
        <circle cx="10" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="10" cy="7" r="2" fill="currentColor" />
        <line x1="10" y1="9" x2="10" y2="12" stroke="currentColor" strokeWidth="2.2" />
        <text x="21" y="20" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="16" letterSpacing="-0.4px">HubSpot</text>
      </svg>
    ),
  },
  {
    name: "Slack",
    svg: (
      <svg viewBox="0 0 85 28" className="partner-logo-svg" fill="currentColor" aria-label="Slack">
        <g transform="translate(2, 6) scale(0.65)">
          <path d="M6 15a3 3 0 0 1-3-3 3 3 0 0 1 3-3h3v3a3 3 0 0 1-3 3zm7.5 0a3 3 0 0 1-3-3V4.5a3 3 0 0 1 3-3 3 3 0 0 1 3 3V12a3 3 0 0 1-3 3z" />
          <path d="M10.5 6a3 3 0 0 1 3-3 3 3 0 0 1 3 3v3h-3a3 3 0 0 1-3-3zm0 7.5a3 3 0 0 1 3-3h7.5a3 3 0 0 1 3 3 3 3 0 0 1-3 3H13.5a3 3 0 0 1-3-3z" />
          <path d="M19.5 10.5a3 3 0 0 1 3 3 3 3 0 0 1-3 3h-3v-3a3 3 0 0 1 3-3zm-7.5 0a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3 3 3 0 0 1-3-3V13.5a3 3 0 0 1 3-3z" />
          <path d="M15 19.5a3 3 0 0 1-3 3 3 3 0 0 1-3-3v-3h3a3 3 0 0 1 3 3zm0-7.5a3 3 0 0 1-3 3H4.5a3 3 0 0 1-3-3 3 3 0 0 1 3-3H12a3 3 0 0 1 3 3z" />
        </g>
        <text x="23" y="20.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="16" letterSpacing="-0.5px">slack</text>
      </svg>
    ),
  },
];

const ROTATING_ROLES = [
  "Software Engineer",
  "Web Developer",
  "App Developer",
  "Problem Solver",
];

function useTypewriter(words, {
  typingSpeed = 85,
  deletingSpeed = 45,
  pauseAfterType = 1800,
  pauseAfterDelete = 350,
} = {}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(words[0] ? words[0].length : 0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[index];

    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterType);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, pauseAfterDelete);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

  const currentWord = words[index] || "";
  const displayedText = currentWord.substring(0, subIndex);

  return {
    text: displayedText,
    isDeleting,
    currentWord,
  };
}

export default function Hero({ isIntroReady }) {
  const heroRef = useRef(null);
  const { text: roleText, currentWord } = useTypewriter(ROTATING_ROLES);
  const portraitFrameRef = useRef(null);
  const statsCardRef = useRef(null);
  const backdropDiskRef = useRef(null);

  // Entrance Choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-pill-badge",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.7 }
      );

      tl.fromTo(
        ".hero-mobile-serif",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      tl.fromTo(
        ".hero-editorial-greeting",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-editorial-name, .hero-mobile-fullname",
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power4.out" },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-editorial-role, .hero-mobile-role",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-editorial-desc, .hero-mobile-desc",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      );

      tl.fromTo(
        ".hero-editorial-ctas, .hero-mobile-ctas",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );

      tl.fromTo(
        ".hero-portrait-disk-backdrop, .hero-mobile-portrait-glow",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
        "-=0.9"
      );

      tl.fromTo(
        ".hero-cutout-image",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" },
        "-=0.9"
      );

      tl.fromTo(
        ".hero-floating-stats-card",
        { opacity: 0, x: 30, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.7"
      );

      tl.fromTo(
        ".hero-bottom-proof-bar, .hero-mobile-scroll-wrap",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isIntroReady]);

  // Subtle Interactive Parallax Tilt on Desktop
  useEffect(() => {
    const heroEl = heroRef.current;
    const portrait = portraitFrameRef.current;
    const stats = statsCardRef.current;
    const disk = backdropDiskRef.current;
    if (!heroEl || !portrait) return;
    if (window.matchMedia("(pointer: coarse), (max-width: 960px)").matches) return;

    const handleMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      portrait.style.transform = `perspective(1000px) rotateY(${deltaX * 2.5}deg) rotateX(${-deltaY * 2.5}deg) translateY(-2px)`;
      if (stats) {
        stats.style.transform = `translate3d(${deltaX * 8}px, ${deltaY * 6}px, 0)`;
      }
      if (disk) {
        disk.style.transform = `translate3d(${-deltaX * 6}px, ${-deltaY * 5}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      portrait.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
      if (stats) stats.style.transform = "translate3d(0, 0, 0)";
      if (disk) disk.style.transform = "translate3d(0, 0, 0)";
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollToSection = (id) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={heroRef} className="editorial-hero-section">
      {/* 1. Ambient Warm Champagne Glows */}
      <div className="hero-amber-glow left-halo" aria-hidden="true" />
      <div className="hero-amber-glow right-halo" aria-hidden="true" />

      {/* =========================================================================
         2A. DESKTOP STAGE (Two-Column Layout)
         ========================================================================= */}
      <div className="editorial-hero-stage hero-desktop-stage">
        {/* Left Column: Headline, Bio & Action Buttons */}
        <div className="editorial-hero-left">
          {/* Availability Badge */}
          <div className="hero-pill-badge" data-cursor="badge">
            <span className="hero-amber-dot-wrap">
              <span className="hero-amber-dot-glow" />
              <span className="hero-amber-dot-core" />
            </span>
            <span className="hero-pill-badge-label">Available for new opportunities</span>
          </div>

          {/* Typography Group */}
          <div className="hero-typography-group">
            <h1 className="hero-editorial-headline">
              <span className="hero-editorial-greeting">Hi, I'm</span>
              <span className="hero-editorial-name">Malik Abubakkar</span>
            </h1>

            <div
              className="hero-editorial-role"
              role="region"
              aria-label={`Role: ${currentWord}`}
            >
              <span className="hero-role-text">{roleText}</span>
              <span className="hero-typewriter-cursor" aria-hidden="true" />
            </div>

            <p className="hero-editorial-desc">
              I design and build scalable, user-centered digital products that solve real problems and deliver measurable results.
            </p>
          </div>

          {/* CTA Action Buttons */}
          <div className="hero-editorial-ctas">
            <button
              onClick={() => scrollToSection("work")}
              className="hero-btn-primary"
              data-cursor="link"
            >
              <span>VIEW PROJECTS</span>
              <ArrowUpRight size={15} />
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="hero-btn-secondary"
              data-cursor="link"
            >
              <User size={14} />
              <span>ABOUT ME</span>
            </button>
          </div>
        </div>

        {/* Right Column: Portrait, Radial Backdrop & Floating Stats Card */}
        <div className="editorial-hero-right">
          {/* Subtle Dot Grid Pattern in Top-Right */}
          <div className="hero-dot-grid-accent" aria-hidden="true">
            <div className="dot-grid-pattern" />
          </div>

          {/* Warm Circular / Radial Backdrop */}
          <div ref={backdropDiskRef} className="hero-portrait-disk-backdrop" aria-hidden="true" />

          {/* Cutout Portrait Frame */}
          <div ref={portraitFrameRef} className="hero-portrait-stage" data-cursor="explore">
            <img
              src="/images/malik-cutout-transparent.png"
              alt={PERSONAL_INFO.name}
              className="hero-cutout-image"
              loading="eager"
            />
          </div>

          {/* Floating Stats Card */}
          <div ref={statsCardRef} className="hero-floating-stats-card">
            <div className="hero-stat-item">
              <div className="hero-stat-icon-wrap">
                <Code2 size={16} />
              </div>
              <div className="hero-stat-info">
                <div className="hero-stat-num">3+</div>
                <div className="hero-stat-text">Years Experience</div>
              </div>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat-item">
              <div className="hero-stat-icon-wrap">
                <Rocket size={16} />
              </div>
              <div className="hero-stat-info">
                <div className="hero-stat-num">15+</div>
                <div className="hero-stat-text">Projects Completed</div>
              </div>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat-item">
              <div className="hero-stat-icon-wrap">
                <Users size={16} />
              </div>
              <div className="hero-stat-info">
                <div className="hero-stat-num">10+</div>
                <div className="hero-stat-text">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
         2B. MOBILE STAGE (Artistic Editorial Vertical Flow)
         ========================================================================= */}
      <div className="editorial-hero-mobile-stage hero-mobile-stage">
        {/* 1. Availability Badge */}
        <div className="hero-pill-badge" data-cursor="badge">
          <span className="hero-amber-dot-wrap">
            <span className="hero-amber-dot-glow" />
            <span className="hero-amber-dot-core" />
          </span>
          <span className="hero-pill-badge-label">Available for new opportunities</span>
        </div>

        {/* 2. Editorial Greeting "Hey, there" */}
        <div className="hero-mobile-greeting-wrap" aria-label="Hey, there">
          <span className="hero-mobile-serif">Hey, there</span>
        </div>

        {/* 3. Centered Portrait with Subtle Glow Backdrop & Soft Bottom Fade */}
        <div className="hero-mobile-portrait-wrapper">
          <div className="hero-mobile-portrait-glow" aria-hidden="true" />
          <div className="hero-mobile-portrait-frame">
            <img
              src="/images/malik-cutout-transparent.png"
              alt={PERSONAL_INFO.name}
              className="hero-cutout-image hero-mobile-portrait-img"
              loading="eager"
            />
          </div>
        </div>

        {/* 4. Name Block: "I AM MALIK ABUBAKKAR" */}
        <div className="hero-mobile-name-group">
          <div className="hero-mobile-iam">I AM</div>
          <h1 className="hero-mobile-fullname">MALIK ABUBAKKAR</h1>
        </div>

        {/* 5. Professional Title */}
        <div
          className="hero-mobile-role"
          role="region"
          aria-label={`Role: ${currentWord}`}
        >
          <span className="hero-role-text">{roleText}</span>
          <span className="hero-typewriter-cursor" aria-hidden="true" />
        </div>

        {/* 6. Description */}
        <p className="hero-mobile-desc">
          Specialized in Web Design, UX / UI, Webflow, and Front End Development.
        </p>

        {/* 7. Action Buttons */}
        <div className="hero-mobile-ctas">
          <button
            onClick={() => scrollToSection("work")}
            className="hero-btn-primary"
            data-cursor="link"
          >
            <span>VIEW PROJECTS</span>
            <ArrowUpRight size={15} />
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="hero-btn-secondary"
            data-cursor="link"
          >
            <User size={14} />
            <span>ABOUT ME</span>
          </button>
        </div>

        {/* 8. Mobile Scroll Indicator */}
        <div className="hero-mobile-scroll-wrap">
          <button
            className="hero-scroll-indicator-btn"
            onClick={() => scrollToSection("statement")}
            data-cursor="link"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={14} className="hero-scroll-bounce-arrow" />
          </button>
        </div>
      </div>

      {/* =========================================================================
         3. DESKTOP BOTTOM PROOF BAR (Trusted Clients & Scroll Indicator)
         ========================================================================= */}
      <div className="hero-bottom-proof-bar hero-desktop-proof">
        <div className="hero-trusted-container">
          <div className="hero-trusted-label">TRUSTED BY CLIENTS & PARTNERS</div>
          <div className="hero-partner-logos-row">
            {PARTNER_LOGOS.map((partner) => (
              <div key={partner.name} className="hero-partner-logo-item" title={partner.name}>
                {partner.svg}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator-wrap">
          <button
            className="hero-scroll-indicator-btn"
            onClick={() => scrollToSection("statement")}
            data-cursor="link"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={14} className="hero-scroll-bounce-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
