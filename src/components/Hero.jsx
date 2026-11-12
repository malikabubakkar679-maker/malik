/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Premium Editorial Hero Section
 * Fully responsive, tailored precisely to user specifications:
 * - Top-left: Clean enlarged MA logo only (no extra name text beside it)
 * - Top-right: Enlarged social icons with rich hover effects & "Let's Talk →" button
 * - Center desktop navigation: About, Work, Skills, Services, Contact
 * - "Hi, I'm" refined and well-proportioned
 * - "Malik Abubakkar" heading size scaled down for balanced, elegant typography
 * - Dynamic typewriter effect cycling: Software Engineer, Web Developer, Problem Solver, App Developer
 * - Removed explore and scroll down buttons from the left block
 * - Mobile responsive: Image anchored to the side, text in its own place, all elements proportionally scaled down
 * - Warm cream (#FAF7F0) & champagne gold (#D6A13D) palette with ambient glows and layered bottom waves
 */

import React, { useState, useEffect } from 'react';
import Logo from './Logo';

// Crisp brand vector icons
const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.7.75-1.7 1.7 0 .94.75 1.7 1.7 1.7.94 0 1.7-.76 1.7-1.7 0-.95-.76-1.7-1.7-1.7z" />
  </svg>
);

const GlobeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// Subtle golden dotted decorative grid
const DottedGrid = ({ className = "w-20 h-14" }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <pattern id="dot-pattern" x="0" y="0" width="16" height="15" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="#D6A13D" fillOpacity="0.45" />
    </pattern>
    <rect width="100" height="60" fill="url(#dot-pattern)" />
  </svg>
);

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/malikabubakkar523', icon: GithubIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/malikabubakkar', icon: LinkedinIcon },
  { name: 'Web', href: 'https://github.com/malikabubakkar523', icon: GlobeIcon },
  { name: 'Email', href: 'mailto:malikabubakkar523@gmail.com', icon: MailIcon },
];

const ROTATING_ROLES = [
  { prefix: 'I am a', role: 'Software Engineer' },
  { prefix: 'I am a', role: 'Web Developer' },
  { prefix: 'I am a', role: 'Problem Solver' },
  { prefix: 'I am an', role: 'App Developer' },
];

export default function Hero({ isIntroReady: _isIntroReady, onOpenInquiry }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Typewriter rotation state
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('Software Engineer');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetTitle = ROTATING_ROLES[roleIndex].role;
    let timer;

    if (!isDeleting) {
      if (currentText.length < targetTitle.length) {
        timer = setTimeout(() => {
          setCurrentText(targetTitle.slice(0, currentText.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 35);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
        }, 250);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] bg-[#FAF7F0] text-[#20232B] select-none overflow-hidden flex flex-col justify-between"
      style={{
        background: 'radial-gradient(ellipse at 50% 38%, #FFFDF8 0%, #FAF7F0 52%, #F3E9D8 100%)',
      }}
    >
      {/* =========================================================================
          BACKGROUND DECORATIVE ELEMENTS (Abstract Circles & Dotted Grids)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Oversized background curved outlines (desktop) */}
        <div className="hidden lg:block absolute -top-[120px] -right-[100px] w-[620px] h-[620px] rounded-full border border-[#D6A13D]/15" />
        <div className="hidden lg:block absolute top-[25%] -right-[160px] w-[540px] h-[540px] rounded-full border border-[#D6A13D]/10" />
        <div className="hidden lg:block absolute -bottom-[140px] -left-[120px] w-[580px] h-[580px] rounded-full border border-[#D6A13D]/12" />

        {/* Desktop Dotted Pattern: Top Left */}
        <div className="hidden lg:block absolute left-8 xl:left-14 top-28 opacity-75">
          <DottedGrid className="w-24 h-16" />
        </div>

        {/* Desktop Dotted Pattern: Bottom Right */}
        <div className="hidden lg:block absolute right-10 xl:right-16 bottom-24 opacity-80">
          <DottedGrid className="w-24 h-16" />
        </div>

        {/* Mobile Dotted Pattern: Top Right */}
        <div className="lg:hidden absolute right-4 top-16 opacity-60">
          <DottedGrid className="w-20 h-14" />
        </div>
      </div>

      {/* =========================================================================
          LAYER 1: HEADER
          - Left: Enlarged Logo ONLY (no text beside it)
          - Center: Minimal Navigation
          - Right: Larger Social Icons with Hover Effects + "Let's Talk →"
          ========================================================================= */}
      <header className="relative z-40 w-full px-5 sm:px-10 lg:px-16 xl:px-20 pt-4 sm:pt-6 lg:pt-8 flex items-center justify-between pointer-events-auto shrink-0">
        
        {/* Brand Logo ONLY (Enlarged, no name text beside it) */}
        <a
          href="/"
          className="inline-flex items-center group transition-transform duration-300 hover:scale-105"
          aria-label="Malik Abubakkar — Home"
        >
          <Logo
            monogramOnly
            bgStroke="#FAF7F0"
            colorM="#20232B"
            colorA="#D6A13D"
            className="w-14 sm:w-16 md:w-20 lg:w-24 h-auto drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Primary Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-xs font-semibold uppercase tracking-wider text-[#686868] hover:text-[#20232B] transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D6A13D] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Section: Larger Social Icons with Rich Hover + "Let's Talk →" / Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Social Icons with Larger Size & Premium Hover Animation */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="p-2 sm:p-2.5 lg:p-3 rounded-full border border-[#20232B]/15 bg-white/60 backdrop-blur-sm text-[#20232B] hover:text-[#D6A13D] hover:border-[#D6A13D]/60 hover:bg-white/95 hover:scale-115 hover:shadow-md hover:shadow-[#D6A13D]/20 transition-all duration-300"
                aria-label={item.name}
                title={item.name}
              >
                <item.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>

          {/* "Let's Talk →" Pill Button (Desktop) */}
          <button
            onClick={() => {
              if (onOpenInquiry) {
                onOpenInquiry();
              } else {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 lg:px-5 py-2 rounded-full border border-[#20232B]/20 bg-white/60 hover:bg-[#20232B] hover:text-white text-[#20232B] text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer"
          >
            <span>Let's Talk</span>
            <span className="text-[#D6A13D] group-hover:text-white group-hover:translate-x-0.5 transition-all">→</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#20232B] hover:bg-[#20232B]/5 transition-colors focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-[2px] w-full bg-[#20232B] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[2px] w-full bg-[#20232B] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-full bg-[#20232B] transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>

      </header>

      {/* Mobile Drawer Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] z-50 bg-[#FAF7F0]/98 backdrop-blur-md px-8 py-8 flex flex-col justify-between animate-fade-in border-t border-[#D6A13D]/20">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-lg font-serif font-bold text-[#20232B] hover:text-[#D6A13D] transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-sm font-sans text-[#D6A13D]">→</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-5 pt-6 border-t border-[#D6A13D]/20">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenInquiry) {
                  onOpenInquiry();
                } else {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full py-3 rounded-full bg-[#20232B] text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-[#D6A13D] transition-colors cursor-pointer"
              style={{ color: '#FFFFFF' }}
            >
              <span>Let's Talk</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          LAYER 2: DESKTOP HERO VIEWPORT (3-COLUMN COMPOSITION >= 1024px)
          - Left: Scaled-down name, typewriter role, description (no buttons)
          - Center: Main Focus Portrait + Ambient Glow & Golden Ring
          - Right: "Turning Ideas Into Reality"
          ========================================================================= */}
      <div className="hidden lg:grid relative z-20 flex-1 w-full max-w-6xl mx-auto px-6 grid-cols-12 items-center gap-6 xl:gap-8 min-h-0 pt-1 pb-4">
        
        {/* ---------- LEFT COLUMN: INTRODUCTION (Cols 1-4) ---------- */}
        <div className="col-span-4 lg:col-span-4 flex flex-col justify-center items-start text-left z-20 pr-2">
          
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#D6A13D]/30 backdrop-blur-sm text-xs font-medium text-[#20232B] shadow-sm mb-3.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11.5px] font-medium text-[#20232B]/90">
              Available for new opportunities
            </span>
          </div>

          {/* "Hi, I'm" - Refined Italic Serif */}
          <span className="block font-serif italic text-xl lg:text-2xl text-[#20232B]/90 leading-none mb-1.5">
            Hi, I'm
          </span>

          {/* Scaled-down Name: Malik (Charcoal) / Abubakkar (Champagne Gold) */}
          <h1 className="font-serif leading-[0.96] tracking-tight mb-2.5">
            <span className="block text-4xl lg:text-[2.75rem] font-bold text-[#20232B]">
              Malik
            </span>
            <span className="block text-4xl lg:text-[2.75rem] font-bold text-[#D6A13D]">
              Abubakkar
            </span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div className="text-lg lg:text-xl font-bold tracking-tight mb-2.5 flex items-center min-h-[2rem]">
            <span className="text-[#20232B]">{ROTATING_ROLES[roleIndex].prefix}&nbsp;</span>
            <span className="text-[#D6A13D]">{currentText}</span>
            <span className="inline-block w-[2px] h-[0.85em] bg-[#D6A13D] ml-1.5 align-middle animate-pulse" />
          </div>

          {/* Short Professional Description */}
          <p className="text-[#686868] text-sm lg:text-[0.92rem] leading-relaxed max-w-sm font-normal">
            I design and build scalable web solutions that make an impact.
          </p>

        </div>

        {/* ---------- CENTER COLUMN: MAIN FOCUS PORTRAIT (Cols 5-8) ---------- */}
        <div className="col-span-4 lg:col-span-4 relative flex items-center justify-center h-full min-h-[500px] xl:min-h-[560px] pointer-events-none">
          {/* Subtle Warm Circular Ambient Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] xl:w-[480px] xl:h-[480px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(243, 233, 216, 0.95) 0%, rgba(250, 247, 240, 0.35) 60%, transparent 75%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Thin, Soft Golden Circular Outline Ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] xl:w-[490px] xl:h-[490px] rounded-full border border-[#D6A13D]/45 pointer-events-none z-10"
            style={{
              boxShadow: 'inset 0 0 20px rgba(214, 161, 61, 0.08), 0 0 24px rgba(214, 161, 61, 0.08)',
            }}
          />

          {/* Portrait Image with Natural Cutout & Soft Bottom Fade - Perfectly Scaled & Centered */}
          <img
            src="/images/hero-portrait-cutout.png"
            alt="Malik Abubakkar Portrait"
            className="relative z-20 w-[460px] xl:w-[520px] max-w-none h-auto object-contain pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(32,35,43,0.16)] translate-y-2"
            style={{
              maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* ---------- RIGHT COLUMN: SUPPORTING MESSAGE (Cols 9-12) ---------- */}
        <div className="col-span-4 lg:col-span-4 flex flex-col justify-center items-start text-left pl-2 xl:pl-4 z-20">
          {/* Thin Gold Horizontal Accent Rule */}
          <span className="block w-14 h-[2px] bg-[#D6A13D]/80 mb-4 rounded-full" aria-hidden="true" />

          {/* Headline: "Turning Ideas Into Reality" */}
          <h2 className="font-serif text-[2.2rem] lg:text-[2.5rem] xl:text-[2.8rem] font-bold leading-[1.08] tracking-tight text-[#20232B]">
            Turning Ideas
            <span className="block text-[#D6A13D]">
              Into Reality
            </span>
          </h2>

          {/* Subtitle: "Build. Innovate. Grow." */}
          <p className="mt-3.5 text-sm lg:text-[0.95rem] font-medium tracking-wide text-[#686868]">
            Build. Innovate. Grow.
          </p>

          {/* Delicate Curved Flourish Line Underneath */}
          <svg className="w-28 h-4 text-[#D6A13D]/70 mt-3" viewBox="0 0 120 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2 12C35 4 75 14 118 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

      </div>

      {/* =========================================================================
          LAYER 3: MOBILE HERO VIEWPORT (< 1024px)
          Side-by-side balanced composition with scaled-down text and side portrait
          ========================================================================= */}
      <div className="lg:hidden relative z-20 flex-1 w-full min-h-0 flex items-center justify-between px-4 sm:px-8 py-3 overflow-hidden">
        
        {/* Left Side Content Block (~54% width, cleanly proportioned) */}
        <div className="relative z-30 w-[54%] sm:w-[50%] flex flex-col justify-center items-start text-left pl-1 sm:pl-3">
          
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-[#D6A13D]/30 backdrop-blur-sm text-[10px] sm:text-xs font-medium text-[#20232B] shadow-sm mb-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-[#20232B]/90 whitespace-nowrap">Available for opportunities</span>
          </div>

          {/* "Hi, I'm" */}
          <span className="block font-serif italic text-base sm:text-lg text-[#20232B]/90 leading-none mb-1">
            Hi, I'm
          </span>

          {/* Scaled-down Name: Malik Abubakkar */}
          <h1 className="font-serif leading-[0.96] tracking-tight mb-2">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-[#20232B]">
              Malik
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-[#D6A13D]">
              Abubakkar
            </span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div className="text-xs sm:text-sm md:text-base font-bold tracking-tight mb-1 flex items-center min-h-[1.5rem]">
            <span className="text-[#20232B]">{ROTATING_ROLES[roleIndex].prefix}&nbsp;</span>
            <span className="text-[#D6A13D]">{currentText}</span>
            <span className="inline-block w-[1.5px] h-[0.8em] bg-[#D6A13D] ml-1 align-middle animate-pulse" />
          </div>

          {/* Gold Accent Rule */}
          <span className="block w-10 sm:w-12 h-[2px] bg-[#D6A13D] rounded-full my-2" aria-hidden="true" />

          {/* Short Description */}
          <p className="text-[#686868] text-[10.5px] sm:text-xs md:text-sm leading-relaxed max-w-[200px] sm:max-w-[240px] font-normal">
            I design and build scalable web solutions that make an impact.
          </p>

        </div>

        {/* Right Side Portrait (Vertically aligned with text block, surrounded by golden circle halo) */}
        <div className="relative z-20 w-[46%] sm:w-[50%] h-full max-h-[480px] flex items-center justify-center">
          {/* Mobile Ambient Glow centered right behind head & chest */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(243, 233, 216, 0.95) 0%, rgba(250, 247, 240, 0.35) 60%, transparent 75%)',
              filter: 'blur(14px)',
            }}
          />

          {/* Mobile Golden Circle Outline centered right behind head & chest */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] rounded-full border border-[#D6A13D]/45 pointer-events-none z-10"
            style={{
              boxShadow: 'inset 0 0 16px rgba(214, 161, 61, 0.1), 0 0 20px rgba(214, 161, 61, 0.1)',
            }}
          />

          {/* Portrait Image */}
          <img
            src="/images/hero-portrait-cutout.png"
            alt="Malik Abubakkar Portrait"
            className="relative z-20 w-full max-w-[260px] sm:max-w-[320px] max-h-[420px] sm:max-h-[460px] h-auto object-contain pointer-events-none select-none drop-shadow-[0_16px_32px_rgba(32,35,43,0.18)]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)',
            }}
            loading="eager"
            decoding="async"
          />
        </div>

      </div>

      {/* =========================================================================
          LAYER 4: BOTTOM SECTION FRAMING & CHEVRON
          - Centered down chevron button with thin vertical accent line
          - Layered warm golden organic wave dunes
          ========================================================================= */}
      <div className="relative w-full flex flex-col items-center pointer-events-none z-20 shrink-0">
        
        {/* Centered Scroll Down Chevron with Vertical Line */}
        <div className="flex flex-col items-center mb-1 pointer-events-auto">
          <span className="h-4 sm:h-5 w-[1px] bg-[#D6A13D]/60" aria-hidden="true" />
          <a
            href="#statement"
            onClick={(e) => handleSmoothScroll(e, '#statement')}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D6A13D]/60 bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#20232B] hover:bg-[#20232B] hover:text-white hover:border-[#20232B] transition-all duration-300 shadow-sm cursor-pointer"
            aria-label="Scroll down to Next Section"
          >
            <span className="text-xs leading-none">⌄</span>
          </a>
          <span className="h-3 sm:h-4 w-[1px] bg-[#D6A13D]/60" aria-hidden="true" />
        </div>

        {/* Organic Wave Curves Framing Base */}
        <div className="w-full h-[40px] sm:h-[55px] lg:h-[70px] overflow-hidden pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 180"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120 C 320 60, 680 160, 1100 80 C 1260 50, 1380 90, 1440 110 L 1440 180 L 0 180 Z"
              fill="#F3EDE1"
              fillOpacity="0.85"
            />
            <path
              d="M0 140 C 260 90, 580 170, 940 110 C 1180 70, 1340 130, 1440 135 L 1440 180 L 0 180 Z"
              fill="#EDE2CE"
              fillOpacity="0.75"
            />
            <path
              d="M0 165 C 380 130, 820 180, 1220 145 C 1340 135, 1400 155, 1440 160 L 1440 180 L 0 180 Z"
              fill="#E8DEC8"
              fillOpacity="0.9"
            />
          </svg>
        </div>
      </div>

    </section>
  );
}
