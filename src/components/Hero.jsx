/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Premium Editorial Hero Section
 * Faithfully crafted to match Reference Image 1 (Desktop) and Reference Image 2 (Mobile):
 * - Warm cream (#FAF7F0) & soft ivory (#FFFDF8) background with subtle beige gradients
 * - Champagne gold (#D6A13D) & deep charcoal (#20232B) typography
 * - Original MA monogram logo + "Malik Abubakkar / Software Engineer" brand label
 * - Minimal center navigation on desktop + social icons & "Let's Talk →" button
 * - Mobile header with social icons & functional hamburger menu
 * - Desktop 3-part layout:
 *     Left: Dotted grid, Availability badge, "Hi, I'm", "Malik Abubakkar", "I am a Software Engineer", description, "Explore My Work →" + "Scroll Down ⤓"
 *     Center: Centered portrait with golden circular outline ring, ambient warm glow, and soft bottom blend
 *     Right: "Turning Ideas Into Reality", "Build. Innovate. Grow.", curved flourish accent, bottom-right dotted grid
 * - Mobile vertical flow matching Reference Image 2:
 *     Dotted pattern, Availability badge, "Hi, I'm", "Malik Abubakkar", "I am a Software Engineer", gold accent bar, description, CTA, prominent portrait with ring/glow, down-chevron and bottom waves
 */

import React, { useState } from 'react';
import Logo from './Logo';

// Crisp brand & utility vector icons
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.7.75-1.7 1.7 0 .94.75 1.7 1.7 1.7.94 0 1.7-.76 1.7-1.7 0-.95-.76-1.7-1.7-1.7z" />
  </svg>
);

const GlobeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const MailIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// Subtle golden dotted decorative grid
const DottedGrid = ({ className = "w-20 h-14" }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <pattern id="dot-pattern" x="0" y="0" width="16" height="15" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="#D6A13D" fillOpacity="0.5" />
    </pattern>
    <rect width="100" height="60" fill="url(#dot-pattern)" />
  </svg>
);

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/malikabubakkar523', icon: GithubIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/malikabubakkar', icon: LinkedinIcon },
  { name: 'Web', href: 'https://github.com/malikabubakkar523', icon: GlobeIcon },
  { name: 'Email', href: 'mailto:malikabubakkar523@gmail.com', icon: MailIcon },
];

export default function Hero({ isIntroReady: _isIntroReady, onOpenInquiry }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        {/* Oversized background curved outlines */}
        <div className="absolute -top-[120px] -right-[100px] w-[620px] h-[620px] rounded-full border border-[#D6A13D]/15" />
        <div className="absolute top-[25%] -right-[160px] w-[540px] h-[540px] rounded-full border border-[#D6A13D]/10" />
        <div className="absolute -bottom-[140px] -left-[120px] w-[580px] h-[580px] rounded-full border border-[#D6A13D]/12" />

        {/* Desktop Dotted Pattern: Top Left */}
        <div className="hidden lg:block absolute left-8 xl:left-14 top-28 opacity-75">
          <DottedGrid className="w-24 h-16" />
        </div>

        {/* Desktop Dotted Pattern: Bottom Right */}
        <div className="hidden lg:block absolute right-10 xl:right-16 bottom-24 opacity-80">
          <DottedGrid className="w-24 h-16" />
        </div>

        {/* Mobile Dotted Pattern: Top Right (Reference Image 2) */}
        <div className="lg:hidden absolute right-6 top-24 opacity-70">
          <DottedGrid className="w-20 h-14" />
        </div>
      </div>

      {/* =========================================================================
          LAYER 1: HEADER
          - Desktop: Logo + Identity | Minimal Center Nav | Socials + "Let's Talk →"
          - Mobile: Logo + Identity | Socials + Hamburger Menu Button
          ========================================================================= */}
      <header className="relative z-40 w-full px-5 sm:px-10 lg:px-16 xl:px-20 pt-4 sm:pt-6 lg:pt-8 flex items-center justify-between pointer-events-auto shrink-0">
        
        {/* Brand Identity: Monogram + Divider + Text */}
        <a
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group transition-transform duration-300 hover:scale-[1.02]"
          aria-label="Malik Abubakkar — Home"
        >
          <Logo
            monogramOnly
            bgStroke="#FAF7F0"
            colorM="#20232B"
            colorA="#D6A13D"
            className="w-10 sm:w-12 lg:w-13 h-auto drop-shadow-sm"
          />
          <span className="h-7 sm:h-8 w-[1.5px] bg-[#D6A13D]/70" aria-hidden="true" />
          <div className="flex flex-col text-left">
            <span className="text-[13px] sm:text-[14.5px] lg:text-[15px] font-bold text-[#20232B] tracking-tight leading-none">
              Malik Abubakkar
            </span>
            <span className="text-[10px] sm:text-[11.5px] text-[#686868] font-medium tracking-normal mt-1 leading-none">
              Software Engineer
            </span>
          </div>
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

        {/* Right Section: Social Icons + "Let's Talk →" / Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Social Icons (Visible on Desktop and Mobile matching Reference 1 & 2) */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="p-1.5 sm:p-2 lg:p-2.5 rounded-full text-[#20232B] hover:text-[#D6A13D] hover:bg-[#D6A13D]/10 transition-all duration-200"
                aria-label={item.name}
                title={item.name}
              >
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5" />
              </a>
            ))}
          </div>

          {/* "Let's Talk →" Pill Button (Desktop) */}
          <button
            onClick={() => {
              if (onOpenInquiry) {
                onOpenInquiry();
              } else {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 lg:px-5 py-2 rounded-full border border-[#20232B]/20 bg-white/60 hover:bg-[#20232B] hover:text-white text-[#20232B] text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <span>Let's Talk</span>
            <span className="text-[#D6A13D] group-hover:text-white group-hover:translate-x-0.5 transition-all">→</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-lg text-[#20232B] hover:bg-[#20232B]/5 transition-colors focus:outline-none"
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
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full py-3 rounded-full bg-[#20232B] text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-[#D6A13D] transition-colors"
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
          - Left: Introduction & CTA Buttons
          - Center: Main Focus Portrait + Ambient Glow & Golden Ring
          - Right: Supporting Message ("Turning Ideas Into Reality")
          ========================================================================= */}
      <div className="hidden lg:grid relative z-20 flex-1 w-full max-w-7xl mx-auto px-8 lg:px-14 xl:px-18 grid-cols-12 items-center gap-4 xl:gap-8 min-h-0 pt-2 pb-6">
        
        {/* ---------- LEFT COLUMN: INTRODUCTION (Cols 1-4) ---------- */}
        <div className="col-span-4 xl:col-span-4 flex flex-col justify-center items-start text-left z-20">
          
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#D6A13D]/30 backdrop-blur-sm text-xs font-medium text-[#20232B] shadow-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11.5px] font-medium text-[#20232B]/90">
              Available for new opportunities
            </span>
          </div>

          {/* Elegant "Hi, I'm" Serif Italic */}
          <span className="block font-serif italic text-2xl lg:text-[1.75rem] text-[#20232B] leading-none mb-2">
            Hi, I'm
          </span>

          {/* Name Display: Malik (Charcoal) / Abubakkar (Champagne Gold) */}
          <h1 className="font-serif leading-[0.92] tracking-tight mb-3">
            <span className="block text-[3.8rem] lg:text-[4.8rem] xl:text-[5.8rem] font-bold text-[#20232B]">
              Malik
            </span>
            <span className="block text-[3.8rem] lg:text-[4.8rem] xl:text-[5.8rem] font-bold text-[#D6A13D]">
              Abubakkar
            </span>
          </h1>

          {/* Job Title */}
          <div className="text-xl lg:text-[1.4rem] xl:text-2xl font-bold tracking-tight mb-3">
            <span className="text-[#20232B]">I am a </span>
            <span className="text-[#D6A13D]">Software Engineer</span>
          </div>

          {/* Short Professional Description */}
          <p className="text-[#686868] text-sm lg:text-[0.92rem] leading-relaxed max-w-sm mb-6 font-normal">
            I design and build scalable web solutions that make an impact.
          </p>

          {/* Action Area: "Explore My Work →" + "Scroll Down ⤓" */}
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, '#projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#20232B] hover:bg-[#D6A13D] hover:shadow-lg hover:shadow-[#D6A13D]/25 transition-all duration-300 group cursor-pointer shadow-sm"
              style={{ color: '#FFFFFF' }}
            >
              <span className="text-xs lg:text-[13px] font-semibold tracking-wide" style={{ color: '#FFFFFF' }}>
                Explore My Work
              </span>
              <span style={{ color: '#D6A13D' }} className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            <span className="h-6 w-[1px] bg-[#20232B]/15 mx-1" aria-hidden="true" />

            <a
              href="#statement"
              onClick={(e) => handleSmoothScroll(e, '#statement')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#686868] hover:text-[#20232B] transition-colors py-2 cursor-pointer"
            >
              <span>Scroll Down</span>
              <span className="w-5 h-5 rounded-full border border-[#20232B]/25 flex items-center justify-center text-[10px] text-[#20232B]">
                ↓
              </span>
            </a>
          </div>

        </div>

        {/* ---------- CENTER COLUMN: MAIN FOCUS PORTRAIT (Cols 5-9) ---------- */}
        <div className="col-span-5 xl:col-span-5 relative flex items-end justify-center h-full min-h-[480px] xl:min-h-[560px] pointer-events-none">
          {/* Subtle Warm Circular Ambient Glow */}
          <div
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] xl:w-[480px] xl:h-[480px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(243, 233, 216, 0.95) 0%, rgba(250, 247, 240, 0.35) 60%, transparent 75%)',
              filter: 'blur(16px)',
            }}
          />

          {/* Thin, Soft Golden Circular Outline Ring */}
          <div
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[390px] h-[390px] xl:w-[490px] xl:h-[490px] rounded-full border border-[#D6A13D]/45 pointer-events-none z-10"
            style={{
              boxShadow: 'inset 0 0 20px rgba(214, 161, 61, 0.08), 0 0 24px rgba(214, 161, 61, 0.08)',
            }}
          />

          {/* Portrait Image with Natural Cutout & Soft Bottom Fade */}
          <img
            src="/images/hero-portrait-cutout.png"
            alt="Malik Abubakkar Portrait"
            className="relative z-20 h-[62vh] xl:h-[72vh] max-h-[620px] w-auto object-contain object-bottom pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(32,35,43,0.14)]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* ---------- RIGHT COLUMN: SUPPORTING MESSAGE (Cols 10-12) ---------- */}
        <div className="col-span-3 xl:col-span-3 flex flex-col justify-center items-start text-left pl-2 xl:pl-6 z-20">
          {/* Thin Gold Horizontal Accent Rule */}
          <span className="block w-14 h-[2px] bg-[#D6A13D]/80 mb-4 rounded-full" aria-hidden="true" />

          {/* Headline: "Turning Ideas Into Reality" */}
          <h2 className="font-serif text-[2.2rem] lg:text-[2.6rem] xl:text-[3.2rem] font-bold leading-[1.08] tracking-tight text-[#20232B]">
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
          Faithful to Reference Image 2:
          - Availability badge
          - "Hi, I'm Malik Abubakkar"
          - "I am a Software Engineer" + Gold bar
          - Short description
          - "Explore My Work →" + "Scroll Down"
          - Prominent portrait with golden circle and ambient glow
          - Down-chevron and bottom waves
          ========================================================================= */}
      <div className="lg:hidden relative z-20 flex-1 w-full flex flex-col justify-between px-6 sm:px-10 pt-4 pb-2">
        
        {/* Top Text Content */}
        <div className="flex flex-col items-start text-left z-20 max-w-md">
          
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D6A13D]/30 backdrop-blur-sm text-[11px] font-medium text-[#20232B] shadow-sm mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for new opportunities</span>
          </div>

          {/* "Hi, I'm" */}
          <span className="block font-serif italic text-xl sm:text-2xl text-[#20232B] leading-none mb-1">
            Hi, I'm
          </span>

          {/* Name Display: Malik Abubakkar */}
          <h1 className="font-serif leading-[0.94] tracking-tight mb-2">
            <span className="block text-[3.2rem] sm:text-[4.2rem] font-bold text-[#20232B]">
              Malik
            </span>
            <span className="block text-[3.2rem] sm:text-[4.2rem] font-bold text-[#D6A13D]">
              Abubakkar
            </span>
          </h1>

          {/* Role */}
          <div className="text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-[#20232B]">I am a </span>
            <span className="text-[#D6A13D]">Software Engineer</span>
          </div>

          {/* Gold Accent Rule matching Reference Image 2 */}
          <span className="block w-12 h-[3px] bg-[#D6A13D] rounded-full my-2.5" aria-hidden="true" />

          {/* Short Description */}
          <p className="text-[#686868] text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-sm mb-4 font-normal">
            I design and build scalable web solutions that make an impact.
          </p>

          {/* Action Area: Explore My Work button + Scroll Down indicator */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, '#projects')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#20232B] hover:bg-[#D6A13D] transition-colors shadow-sm cursor-pointer"
              style={{ color: '#FFFFFF' }}
            >
              <span className="text-xs font-semibold tracking-wide" style={{ color: '#FFFFFF' }}>
                Explore My Work
              </span>
              <span style={{ color: '#D6A13D' }}>→</span>
            </a>

            <a
              href="#statement"
              onClick={(e) => handleSmoothScroll(e, '#statement')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#686868] hover:text-[#20232B] transition-colors py-1 cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full border border-[#20232B]/30 flex items-center justify-center text-[10px]">
                ▷
              </span>
              <span>Scroll Down</span>
            </a>
          </div>

        </div>

        {/* Mobile Portrait Stage with Golden Ring & Ambient Glow */}
        <div className="relative flex items-end justify-center w-full mt-4 sm:mt-6 pointer-events-none">
          {/* Ambient Circular Glow */}
          <div
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(243, 233, 216, 0.95) 0%, rgba(250, 247, 240, 0.3) 60%, transparent 75%)',
              filter: 'blur(14px)',
            }}
          />

          {/* Golden Circle Outline */}
          <div
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] rounded-full border border-[#D6A13D]/45 pointer-events-none z-10"
            style={{
              boxShadow: 'inset 0 0 16px rgba(214, 161, 61, 0.08)',
            }}
          />

          {/* Centered Cutout Portrait with Soft Fade */}
          <img
            src="/images/hero-portrait-cutout.png"
            alt="Malik Abubakkar Portrait"
            className="relative z-20 h-[340px] sm:h-[400px] max-h-[50vh] w-auto object-contain object-bottom pointer-events-none select-none drop-shadow-[0_16px_32px_rgba(32,35,43,0.16)]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
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
        
        {/* Centered Scroll Down Chevron with Vertical Line (Reference Image 2) */}
        <div className="flex flex-col items-center mb-1 pointer-events-auto">
          <span className="h-5 w-[1px] bg-[#D6A13D]/60" aria-hidden="true" />
          <a
            href="#statement"
            onClick={(e) => handleSmoothScroll(e, '#statement')}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D6A13D]/60 bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#20232B] hover:bg-[#20232B] hover:text-white hover:border-[#20232B] transition-all duration-300 shadow-sm cursor-pointer"
            aria-label="Scroll down to Next Section"
          >
            <span className="text-xs leading-none">⌄</span>
          </a>
          <span className="h-4 w-[1px] bg-[#D6A13D]/60" aria-hidden="true" />
        </div>

        {/* Organic Wave Curves Framing Base */}
        <div className="w-full h-[45px] sm:h-[60px] lg:h-[75px] overflow-hidden pointer-events-none">
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
