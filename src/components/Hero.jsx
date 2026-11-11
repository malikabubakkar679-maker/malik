/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Premium Editorial Hero Section
 * Carefully crafted to match the exact visual reference design:
 * - Warm cream (#F8F4EA) & soft ivory (#FFFDF8) background
 * - Champagne gold (#C6A66B) & deep charcoal (#292C35) typography
 * - Original MA monogram logo at top-left
 * - Large low-opacity "Malik — Abubakkar" background watermark
 * - Clean editorial left section with SOFTWARE ENGINEER label, Main Name, Role, Description, and Signature
 * - Right section with profile portrait, warm circular glow, circular golden outline, and 4-point star sparkles
 * - Layered organic wave shapes at bottom
 * - Dedicated responsive mobile flow (Logo -> Label -> Heading -> Role -> Description -> Signature -> Centered Portrait)
 */

import React from 'react';
import Logo from './Logo';

export default function Hero({ isIntroReady: _isIntroReady, onOpenInquiry: _onOpenInquiry }) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] bg-[#F8F4EA] text-[#292C35] select-none overflow-hidden flex flex-col justify-between"
      style={{
        background: 'radial-gradient(ellipse at 70% 30%, #FFFDF8 0%, #F8F4EA 60%, #F4EEDF 100%)',
      }}
    >
      {/* =========================================================================
          LAYER 1: BACKGROUND WATERMARK TYPOGRAPHY & SUBTLE GOLDEN SPARKLES
          ========================================================================= */}
      
      {/* Desktop Background Watermark: "Malik — Abubakkar" (Oversized, low opacity) */}
      <div
        className="hidden lg:flex absolute top-[18%] xl:top-[16%] left-0 right-0 z-0 pointer-events-none select-none overflow-hidden px-8 lg:px-16 justify-start items-center opacity-[0.11]"
        aria-hidden="true"
      >
        <span className="font-serif text-[7.5rem] xl:text-[9.5rem] 2xl:text-[11.5rem] font-bold text-[#C6A66B] leading-none tracking-tight whitespace-nowrap">
          Malik — Abubakkar
        </span>
      </div>

      {/* Mobile Background Watermark: Stacked "Malik — / Abubakkar" (Very low opacity) */}
      <div
        className="lg:hidden absolute top-[13%] sm:top-[15%] left-0 right-0 z-0 pointer-events-none select-none overflow-hidden px-5 sm:px-8 opacity-[0.09]"
        aria-hidden="true"
      >
        <span className="block font-serif text-[4.8rem] sm:text-[6rem] font-bold text-[#C6A66B] leading-[0.95] tracking-tight">
          Malik —
        </span>
        <span className="block font-serif text-[4.8rem] sm:text-[6rem] font-bold text-[#C6A66B] leading-[0.95] tracking-tight">
          Abubakkar
        </span>
      </div>

      {/* Subtle Golden 4-Point Star Sparkles (✦) Matching Reference */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        {/* Star 1: Upper-left above text */}
        <span className="absolute left-[6%] sm:left-[8%] top-[19%] text-[#C6A66B] text-xs sm:text-sm font-serif opacity-70 animate-pulse">
          ✦
        </span>
        {/* Star 2: Beside main heading */}
        <span className="absolute left-[38%] sm:left-[36%] lg:left-[42%] top-[33%] text-[#C6A66B] text-sm sm:text-base font-serif opacity-75">
          ✦
        </span>
        {/* Star 3: Upper right beside portrait */}
        <span className="absolute right-[12%] sm:right-[15%] lg:right-[16%] top-[18%] text-[#C6A66B] text-xs sm:text-sm font-serif opacity-60">
          ✦
        </span>
        {/* Star 4: Mid-right flanking portrait ring */}
        <span className="absolute right-[5%] sm:right-[7%] top-[38%] text-[#C6A66B] text-sm font-serif opacity-50">
          ✦
        </span>
      </div>

      {/* =========================================================================
          LAYER 2: TOP BRAND LOGO (Original MA Monogram Logo, No Extra Nav/Buttons)
          ========================================================================= */}
      <header className="relative z-30 w-full px-6 sm:px-10 md:px-16 lg:px-20 pt-6 sm:pt-8 md:pt-10 flex items-center justify-between pointer-events-auto shrink-0">
        <a
          href="/"
          className="inline-flex items-center group transition-transform duration-300 hover:scale-[1.02]"
          aria-label="Malik Abubakkar Portfolio"
        >
          <Logo
            className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto"
            bgStroke="#F8F4EA"
            color="#292C35"
          />
        </a>
      </header>

      {/* =========================================================================
          LAYER 3: MAIN HERO CONTENT
          - Desktop (lg:): Two-column side-by-side grid
          - Mobile (< lg): Dedicated sequential vertical flow
          ========================================================================= */}
      
      {/* ----------------- 3A. DESKTOP VIEWPORT LAYOUT (>= 1024px) ----------------- */}
      <div className="hidden lg:grid relative z-20 flex-1 w-full max-w-7xl mx-auto px-10 md:px-16 lg:px-20 grid-cols-12 items-center gap-8 lg:gap-12 pb-8">
        
        {/* Left Column (7 cols): Introduction, Typography & Signature */}
        <div className="col-span-7 flex flex-col justify-center items-start text-left z-20">
          {/* Small Professional Label */}
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="text-xs font-mono uppercase tracking-[0.24em] font-semibold text-[#292C35]/90">
              SOFTWARE ENGINEER
            </span>
            <span className="h-[1px] w-12 xl:w-16 bg-[#C6A66B]/70" />
          </div>

          {/* Main Heading: Malik (Charcoal) / Abubakkar (Champagne Gold) */}
          <h1 className="font-serif leading-[0.96] tracking-tight">
            <span className="block text-[4.4rem] lg:text-[5.4rem] xl:text-[6.6rem] font-bold text-[#292C35]">
              Malik
            </span>
            <span className="block text-[4.4rem] lg:text-[5.4rem] xl:text-[6.6rem] font-bold text-[#C6A66B]">
              Abubakkar
            </span>
          </h1>

          {/* Role Heading */}
          <div className="mt-4 sm:mt-5 text-2xl lg:text-[1.85rem] xl:text-3xl font-bold tracking-tight">
            <span className="text-[#292C35]">I am a </span>
            <span className="text-[#C6A66B]">Problem Solver</span>
          </div>

          {/* Description */}
          <p className="text-[#4A4D57] text-sm lg:text-base leading-relaxed max-w-md xl:max-w-lg mt-3 sm:mt-4 font-normal">
            I design and build scalable, user-centered digital products that solve real problems and deliver measurable results.
          </p>

          {/* Handwritten Signature */}
          <div className="mt-6 sm:mt-7">
            <img
              src="/images/signature.png"
              alt="Malik Abubakkar"
              className="h-11 xl:h-13 w-auto object-contain pointer-events-none select-none opacity-95"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Right Column (5 cols): Profile Portrait with Circular Glow & Outline */}
        <div className="col-span-5 relative flex items-end justify-center h-full min-h-[520px] xl:min-h-[620px] pointer-events-none">
          {/* Soft Warm Circular Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(235, 224, 204, 0.9) 0%, rgba(248, 244, 234, 0.35) 60%, transparent 75%)',
              filter: 'blur(16px)',
            }}
          />

          {/* Subtle Circular Golden Outline */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] xl:w-[520px] xl:h-[520px] rounded-full border border-[#C6A66B]/50 pointer-events-none z-10"
            style={{
              boxShadow: 'inset 0 0 20px rgba(198, 166, 107, 0.08), 0 0 24px rgba(198, 166, 107, 0.1)',
            }}
          />

          {/* Portrait Image (Upper body naturally visible, arms crossed, green sweater) */}
          <img
            src="/images/hero-portrait-cutout.png"
            alt="Malik Abubakkar Portrait"
            className="relative z-20 h-[68vh] xl:h-[80vh] max-h-[780px] w-auto object-contain object-bottom pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(41,44,53,0.15)]"
            loading="eager"
            decoding="async"
          />
        </div>

      </div>

      {/* ----------------- 3B. MOBILE VIEWPORT LAYOUT (< 1024px) ----------------- */}
      <div className="lg:hidden relative z-20 flex-1 flex flex-col justify-start gap-4 sm:gap-6 w-full px-6 sm:px-10 pt-4 sm:pt-6 pb-0">
        
        {/* Top/Text Flow */}
        <div className="flex flex-col items-start text-left z-20">
          {/* Small Professional Label */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] font-semibold text-[#292C35]/90">
              SOFTWARE ENGINEER
            </span>
            <span className="h-[1px] w-10 sm:w-14 bg-[#C6A66B]/70" />
          </div>

          {/* Main Heading: Responsive Clamp Sizing for 320px - 430px+ */}
          <h1 className="font-serif leading-[0.98] tracking-tight">
            <span className="block text-[3.1rem] sm:text-[4rem] font-bold text-[#292C35]">
              Malik
            </span>
            <span className="block text-[3.1rem] sm:text-[4rem] font-bold text-[#C6A66B]">
              Abubakkar
            </span>
          </h1>

          {/* Role Heading */}
          <div className="mt-2.5 sm:mt-3.5 text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-[#292C35]">I am a </span>
            <span className="text-[#C6A66B]">Problem Solver</span>
          </div>

          {/* Description */}
          <p className="text-[#4A4D57] text-xs sm:text-sm leading-relaxed max-w-sm sm:max-w-md mt-2 sm:mt-3 font-normal">
            I design and build scalable, user-centered digital products that solve real problems and deliver measurable results.
          </p>

          {/* Handwritten Signature */}
          <div className="mt-3.5 sm:mt-4">
            <img
              src="/images/signature.png"
              alt="Malik Abubakkar"
              className="h-8 sm:h-10 w-auto object-contain pointer-events-none select-none opacity-95"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Bottom/Centered Portrait Flow (Positioned right below signature, centered horizontally) */}
        <div className="relative flex items-end justify-center w-full mt-2 sm:mt-4 pointer-events-none overflow-hidden">
          {/* Mobile Soft Warm Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(235, 224, 204, 0.9) 0%, rgba(248, 244, 234, 0.35) 60%, transparent 75%)',
              filter: 'blur(12px)',
            }}
          />

          {/* Mobile Subtle Golden Outline */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#C6A66B]/50 pointer-events-none z-10"
            style={{
              boxShadow: 'inset 0 0 16px rgba(198, 166, 107, 0.08)',
            }}
          />

          {/* Star sparkle near mobile portrait */}
          <span className="absolute left-[12%] sm:left-[16%] top-[30%] text-[#C6A66B] text-xs font-serif opacity-75 z-10">
            ✦
          </span>

          {/* Centered Portrait Image (Head completely intact, natural proportions, object-contain) */}
          <img
            src="/images/hero-portrait-cutout.png"
            alt="Malik Abubakkar Portrait"
            className="relative z-20 h-[340px] sm:h-[400px] max-h-[52vh] w-auto max-w-[340px] sm:max-w-[420px] object-contain object-bottom pointer-events-none select-none drop-shadow-[0_15px_30px_rgba(41,44,53,0.14)]"
            loading="eager"
            decoding="async"
          />
        </div>

      </div>

      {/* =========================================================================
          LAYER 4: LAYERED WARM GOLDEN BOTTOM WAVES
          Smooth SVG dunes/waves framing the base of the hero section
          ========================================================================= */}
      <div className="absolute bottom-0 left-0 w-full h-[65px] sm:h-[90px] md:h-[115px] lg:h-[140px] overflow-hidden pointer-events-none z-10">
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
