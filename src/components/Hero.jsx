/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Premium Editorial Hero Section
 * Fully responsive, tailored precisely to user specifications:
 * - Viewport-contained height (100dvh) so zero scrolling is required to see full hero contents
 * - Logo with generous padding, enlarged and shifted inward from screen edges for maximum clarity
 * - Top-right social icons (GitHub, LinkedIn, X, Email) prominently styled
 * - Animated kinetic marquee momentum motion for background "Malik — Abubakkar"
 * - Heading & details shifted towards the portrait image and positioned comfortably lower
 * - Interactive typewriter effect cycling: Problem Solver, Software Engineer, Web Developer, App Developer
 * - Handwritten signature positioned along bottom with details towards the portrait
 * - Mobile responsive composition with side-anchored portrait and front-facing bottom details
 * - Warm cream (#F8F4EA) & champagne gold (#C6A66B) aesthetic with layered SVG bottom waves
 */

import React, { useState, useEffect } from 'react';
import Logo from './Logo';

// Crisp vector social icons
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

const XIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MailIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/malikabubakkar523', icon: GithubIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/malikabubakkar', icon: LinkedinIcon },
  { name: 'X', href: 'https://x.com', icon: XIcon },
  { name: 'Email', href: 'mailto:malikabubakkar523@gmail.com', icon: MailIcon },
];

const ROTATING_ROLES = [
  { prefix: 'I am a', role: 'Problem Solver' },
  { prefix: 'I am a', role: 'Software Engineer' },
  { prefix: 'I am a', role: 'Web Developer' },
  { prefix: 'I am an', role: 'App Developer' },
];

export default function Hero({ isIntroReady: _isIntroReady, onOpenInquiry: _onOpenInquiry }) {
  // Typewriter rotation state
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('Problem Solver');
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
        }, 2100);
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

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] max-h-[100dvh] bg-[#F8F4EA] text-[#292C35] select-none overflow-hidden flex flex-col justify-between"
      style={{
        background: 'radial-gradient(ellipse at 70% 30%, #FFFDF8 0%, #F8F4EA 60%, #F4EEDF 100%)',
      }}
    >
      {/* =========================================================================
          LAYER 1: ANIMATED BACKGROUND WATERMARK MARQUEE (Continuous Momentum Motion)
          ========================================================================= */}
      <div
        className="absolute top-[12%] sm:top-[14%] lg:top-[15%] inset-x-0 z-0 pointer-events-none select-none overflow-hidden opacity-[0.09]"
        aria-hidden="true"
      >
        <div className="marquee flex w-max whitespace-nowrap font-serif text-[14vh] sm:text-[18vh] lg:text-[23vh] font-bold text-[#C6A66B] leading-none tracking-tight">
          <span className="pr-12">Malik &mdash; Abubakkar&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="pr-12">Malik &mdash; Abubakkar&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="pr-12">Malik &mdash; Abubakkar&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="pr-12">Malik &mdash; Abubakkar&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* Subtle Golden 4-Point Star Sparkles (✦) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <span className="absolute left-[7%] sm:left-[9%] top-[19%] text-[#C6A66B] text-xs sm:text-sm font-serif opacity-70 animate-pulse">
          ✦
        </span>
        <span className="absolute left-[44%] lg:left-[48%] top-[34%] text-[#C6A66B] text-sm sm:text-base font-serif opacity-75">
          ✦
        </span>
        <span className="absolute right-[14%] lg:right-[18%] top-[18%] text-[#C6A66B] text-xs sm:text-sm font-serif opacity-60">
          ✦
        </span>
        <span className="absolute right-[6%] sm:right-[8%] top-[40%] text-[#C6A66B] text-sm font-serif opacity-50">
          ✦
        </span>
      </div>

      {/* =========================================================================
          LAYER 2: HEADER (Logo on Left with generous padding, Socials on Right)
          ========================================================================= */}
      <header className="relative z-30 w-full px-8 sm:px-12 md:px-16 lg:px-24 pt-6 sm:pt-8 flex items-center justify-between pointer-events-auto shrink-0">
        {/* Logo: Padded, enlarged and shifted inward from screen edge */}
        <a
          href="/"
          className="inline-flex items-center group transition-transform duration-300 hover:scale-[1.03]"
          aria-label="Malik Abubakkar Portfolio"
        >
          <Logo
            className="w-28 sm:w-32 md:w-36 lg:w-40 h-auto drop-shadow-sm"
            bgStroke="#F8F4EA"
            color="#292C35"
          />
        </a>

        {/* Social Icons at Top Right as requested in reference annotation */}
        <div className="flex items-center gap-2 sm:gap-3">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="p-2 sm:p-2.5 lg:p-3 rounded-full border border-[#292C35]/20 bg-white/55 backdrop-blur-sm text-[#292C35] hover:text-[#C6A66B] hover:border-[#C6A66B]/60 hover:bg-white/90 transition-all duration-300 shadow-sm hover:scale-110"
              aria-label={item.name}
              title={item.name}
            >
              <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5" />
            </a>
          ))}
        </div>
      </header>

      {/* =========================================================================
          LAYER 3: MAIN VIEWPORT CONTENT
          - Desktop (lg:): Shifted towards portrait, lowered position, signature near bottom/image
          - Mobile (< lg): Portrait anchored to side, heading and details in lower front area
          ========================================================================= */}
      
      {/* ----------------- 3A. DESKTOP VIEWPORT LAYOUT (>= 1024px) ----------------- */}
      <div className="hidden lg:grid relative z-20 flex-1 w-full max-w-7xl mx-auto px-12 lg:px-20 xl:px-24 grid-cols-12 items-center gap-8 min-h-0 pb-4">
        
        {/* Left Column (7 cols): Shifted towards the image and positioned lower */}
        <div className="col-span-7 flex flex-col justify-center items-start text-left z-20 lg:pl-10 xl:pl-16 translate-y-4 xl:translate-y-8">
          {/* Small Professional Label */}
          <div className="flex items-center gap-3 mb-3.5 xl:mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-semibold text-[#292C35]/90">
              SOFTWARE ENGINEER
            </span>
            <span className="h-[1px] w-12 xl:w-16 bg-[#C6A66B]/70" />
          </div>

          {/* Main Name Heading: Malik (Charcoal) / Abubakkar (Champagne Gold) */}
          <h1 className="font-serif leading-[0.95] tracking-tight">
            <span className="block text-[4.2rem] lg:text-[5.1rem] xl:text-[6.2rem] font-bold text-[#292C35]">
              Malik
            </span>
            <span className="block text-[4.2rem] lg:text-[5.1rem] xl:text-[6.2rem] font-bold text-[#C6A66B]">
              Abubakkar
            </span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div className="mt-3.5 xl:mt-4 text-2xl lg:text-[1.8rem] xl:text-[2.1rem] font-bold tracking-tight min-h-[2.4rem] flex items-center">
            <span className="text-[#292C35]">{ROTATING_ROLES[roleIndex].prefix}&nbsp;</span>
            <span className="text-[#C6A66B]">{currentText}</span>
            <span
              className="inline-block w-[2.5px] h-[0.9em] bg-[#C6A66B] ml-1.5 align-middle animate-pulse"
              aria-hidden="true"
            />
          </div>

          {/* Description */}
          <p className="text-[#4A4D57] text-sm lg:text-[0.95rem] xl:text-base leading-relaxed max-w-md xl:max-w-lg mt-3 xl:mt-4 font-normal">
            I design and build scalable, user-centered digital products that solve real problems and deliver measurable results.
          </p>

          {/* Handwritten Signature: Shifted towards the bottom & image as indicated by arrow */}
          <div className="mt-5 xl:mt-6 flex items-center justify-start lg:translate-x-14 xl:translate-x-20">
            <img
              src="/images/signature.png"
              alt="Malik Abubakkar Signature"
              className="h-10 xl:h-12 w-auto object-contain pointer-events-none select-none opacity-95"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Right Column (5 cols): Profile Portrait with Glow & Golden Ring */}
        <div className="col-span-5 relative flex items-end justify-center h-full min-h-0 pointer-events-none">
          {/* Warm Circular Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] xl:w-[460px] xl:h-[460px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(235, 224, 204, 0.9) 0%, rgba(248, 244, 234, 0.35) 60%, transparent 75%)',
              filter: 'blur(16px)',
            }}
          />

          {/* Golden Circular Outline Ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] xl:w-[480px] xl:h-[480px] rounded-full border border-[#C6A66B]/50 pointer-events-none z-10"
            style={{
              boxShadow: 'inset 0 0 20px rgba(198, 166, 107, 0.08), 0 0 24px rgba(198, 166, 107, 0.1)',
            }}
          />

          {/* Portrait: Sized to fit comfortably inside 100vh with no scroll */}
          <img
            src="/images/hero-portrait-cutout.png"
            alt="Malik Abubakkar Portrait"
            className="relative z-20 h-[58vh] xl:h-[66vh] max-h-[580px] w-auto object-contain object-bottom pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(41,44,53,0.14)]"
            loading="eager"
            decoding="async"
          />
        </div>

      </div>

      {/* ----------------- 3B. MOBILE VIEWPORT LAYOUT (< 1024px) ----------------- */}
      {/* Side-anchored portrait + Lower front-facing details, fitting completely within 100dvh */}
      <div className="lg:hidden relative z-20 flex-1 w-full min-h-0 flex flex-col justify-between px-5 sm:px-8 pb-3 pt-1 overflow-hidden">
        
        {/* Background Portrait Stage: Shifted to the right side */}
        <div className="absolute -right-10 sm:-right-4 bottom-8 sm:bottom-12 h-[52vh] sm:h-[58vh] max-h-[460px] w-[75%] sm:w-[65%] flex items-end justify-end pointer-events-none z-10 overflow-hidden">
          {/* Mobile Glow */}
          <div
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(235, 224, 204, 0.95) 0%, rgba(248, 244, 234, 0.25) 60%, transparent 75%)',
              filter: 'blur(14px)',
            }}
          />
          {/* Mobile Golden Outline */}
          <div
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border border-[#C6A66B]/50 pointer-events-none z-0"
          />
          {/* Portrait Cutout Image */}
          <img
            src="/images/hero-portrait-cutout.png"
            alt="Malik Abubakkar Portrait"
            className="relative z-10 h-full w-auto max-w-none object-contain object-bottom pointer-events-none select-none drop-shadow-[0_16px_32px_rgba(41,44,53,0.18)] translate-x-8 sm:translate-x-4"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Foreground Content: Heading, Typewriter, Description & Signature */}
        {/* Anchored at the bottom, directly facing the image with smooth contrast */}
        <div className="relative z-20 flex-1 flex flex-col justify-end w-full max-w-[70%] sm:max-w-[62%] pb-2 sm:pb-4 pointer-events-auto">
          {/* Soft scrim backdrop so text is crystal clear */}
          <div className="bg-gradient-to-r from-[#F8F4EA]/95 via-[#F8F4EA]/85 to-transparent pr-4 py-2 -ml-2 rounded-2xl">
            {/* Software Engineer Label */}
            <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#292C35]/90">
                SOFTWARE ENGINEER
              </span>
              <span className="h-[1px] w-8 sm:w-12 bg-[#C6A66B]/70" />
            </div>

            {/* Name Display */}
            <h1 className="font-serif leading-[0.95] tracking-tight">
              <span className="block text-[2.5rem] sm:text-[3.2rem] font-bold text-[#292C35]">
                Malik
              </span>
              <span className="block text-[2.5rem] sm:text-[3.2rem] font-bold text-[#C6A66B]">
                Abubakkar
              </span>
            </h1>

            {/* Typewriter Role */}
            <div className="mt-1.5 sm:mt-2 text-sm sm:text-base font-bold tracking-tight min-h-[1.6rem] flex items-center">
              <span className="text-[#292C35]">{ROTATING_ROLES[roleIndex].prefix}&nbsp;</span>
              <span className="text-[#C6A66B]">{currentText}</span>
              <span className="inline-block w-[2px] h-[0.85em] bg-[#C6A66B] ml-1 align-middle animate-pulse" />
            </div>

            {/* Short Description */}
            <p className="text-[#3F424C] text-[11px] sm:text-xs leading-relaxed mt-1 sm:mt-1.5 font-normal max-w-[260px] sm:max-w-xs">
              I design and build scalable, user-centered digital products that solve real problems.
            </p>

            {/* Signature */}
            <div className="mt-2.5 sm:mt-3">
              <img
                src="/images/signature.png"
                alt="Malik Abubakkar Signature"
                className="h-7 sm:h-8.5 w-auto object-contain pointer-events-none select-none opacity-95"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          LAYER 4: LAYERED WARM GOLDEN BOTTOM WAVES
          Framing the base of the hero without consuming extra viewport height
          ========================================================================= */}
      <div className="relative w-full h-[50px] sm:h-[65px] lg:h-[80px] overflow-hidden pointer-events-none z-10 shrink-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 180"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back Wave Layer */}
          <path
            d="M0 120 C 320 60, 680 160, 1100 80 C 1260 50, 1380 90, 1440 110 L 1440 180 L 0 180 Z"
            fill="#F3EDE1"
            fillOpacity="0.85"
          />
          {/* Middle Wave Layer */}
          <path
            d="M0 140 C 260 90, 580 170, 940 110 C 1180 70, 1340 130, 1440 135 L 1440 180 L 0 180 Z"
            fill="#EDE2CE"
            fillOpacity="0.75"
          />
          {/* Foreground Wave Layer */}
          <path
            d="M0 165 C 380 130, 820 180, 1220 145 C 1340 135, 1400 155, 1440 160 L 1440 180 L 0 180 Z"
            fill="#E8DEC8"
            fillOpacity="0.9"
          />
        </svg>
      </div>
    </section>
  );
}
