/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { Marquee } from './Marquee';
import { ParticleBackground } from './ParticleBackground';
import { InteractivePortrait } from './InteractivePortrait';
import { useParallax } from '../hooks/useParallax';
import { calculateHeroScrollProgress, calculateHeroParallax } from '../utils/about';
import {
  HERO_ROTATING_PHRASES,
  HERO_STATIC_DESCRIPTION,
  getNextPhraseIndex,
} from '../utils/typewriter';

// Crisp brand vector icons matching reference design
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

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function Hero({ isIntroReady, onOpenInquiry }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const parallaxOffset = useParallax({ maxOffsetX: 12, maxOffsetY: 8 });

  // Typewriter state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('I am a Web Developer');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
          const progress = calculateHeroScrollProgress(window.scrollY, heroHeight);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setDisplayedText(HERO_ROTATING_PHRASES[0]);
      return;
    }

    const currentFullPhrase = HERO_ROTATING_PHRASES[phraseIndex];
    let timer;

    if (!isDeleting) {
      if (displayedText.length < currentFullPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullPhrase.slice(0, displayedText.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullPhrase.slice(0, displayedText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => getNextPhraseIndex(prev));
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  const heroParallax = calculateHeroParallax(scrollProgress);

  return (
    <div className="relative w-full bg-[#FAF8F5] text-[#121214]">
      <section
        id="hero"
        ref={heroRef}
        className="relative h-[100dvh] w-full overflow-hidden bg-[#FAF8F5] select-none flex flex-col justify-between"
      >
        {/* Layer 1: Top Navigation Bar */}
        <header className="absolute inset-x-0 top-0 z-40 flex items-start md:items-center justify-between px-8 sm:px-12 md:px-16 lg:px-20 pt-6 sm:pt-8 md:pt-10 pointer-events-auto">
          {/* Brand Logo: MA Malik Abubakkar (Enlarged on PC, intact on mobile, moved inward) */}
          <a
            href="/"
            className="inline-flex items-center group transition-transform duration-300 hover:scale-[1.02] z-50"
            aria-label="Malik Abubakkar Portfolio"
          >
            <Logo className="w-24 sm:w-28 md:w-36 lg:w-44 h-auto" />
          </a>

          {/* Social Icons: Horizontal on PC with larger size, Vertical on Mobile */}
          <div
            className="flex flex-col md:flex-row items-center gap-2 sm:gap-2.5 md:gap-3 text-[#121214] z-50"
            aria-label="Social Profiles"
          >
            <a
              href="https://github.com/malikabubakkar523"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 md:p-3 rounded-full bg-white/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-neutral-300/60 md:border-transparent hover:bg-neutral-200/80 transition-all duration-200 shadow-sm md:shadow-none"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </a>

            <a
              href="https://linkedin.com/in/malikabubakkar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 md:p-3 rounded-full bg-white/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-neutral-300/60 md:border-transparent hover:bg-neutral-200/80 transition-all duration-200 shadow-sm md:shadow-none"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 md:p-3 rounded-full bg-white/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-neutral-300/60 md:border-transparent hover:bg-neutral-200/80 transition-all duration-200 shadow-sm md:shadow-none"
              title="X (Twitter)"
              aria-label="X"
            >
              <XIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 md:p-3 rounded-full bg-white/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-neutral-300/60 md:border-transparent hover:bg-neutral-200/80 transition-all duration-200 shadow-sm md:shadow-none"
              title="Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </a>
          </div>
        </header>

        {/* Layer 2: Giant Marquee Moving Watermark Text */}
        <Marquee
          style={{
            transform: `translate3d(0, ${heroParallax.marqueeY}px, 0)`,
            opacity: heroParallax.heroOpacity,
          }}
        />

        {/* Layer 2.5: Ambient Floating Dust Particles */}
        <div style={{ opacity: heroParallax.heroOpacity }}>
          <ParticleBackground />
        </div>

        {/* Layer 2.8: Warm Beige Organic Backdrop Glow behind Centered Portrait */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[22%] sm:top-[20%] md:top-[18%] w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[540px] lg:h-[540px] bg-gradient-to-tr from-[#EBE0D2]/80 via-[#F3EBE0]/60 to-[#FAF8F5]/30 rounded-full blur-2xl pointer-events-none z-10"
          style={{ opacity: heroParallax.heroOpacity }}
          aria-hidden="true"
        />

        {/* Layer 2.9: 4-Point Golden Star Accent */}
        <span
          className="absolute left-[54%] sm:left-[58%] md:left-[62%] top-[38%] text-[#BA9B70] text-xl sm:text-2xl select-none pointer-events-none z-10 font-serif"
          style={{ opacity: heroParallax.heroOpacity }}
          aria-hidden="true"
        >
          ✦
        </span>

        {/* Layer 3: Interactive Head-Tracking Portrait (Centered on Both PC & Mobile) */}
        <div
          className="absolute left-1/2 bottom-0 z-20 h-[50vh] sm:h-[60vh] md:h-[74vh] lg:h-[82vh] xl:h-[86vh] flex items-end justify-center pointer-events-none will-change-transform"
          style={{
            transform: `translate3d(calc(-50% + ${parallaxOffset.x}px), ${
              parallaxOffset.y + heroParallax.portraitY
            }px, 0) scale(${heroParallax.portraitScale})`,
            opacity: heroParallax.heroOpacity,
          }}
          data-testid="portrait-parallax-container"
        >
          <div className="anim-rise-in flex items-end justify-center h-full w-auto pointer-events-none">
            <InteractivePortrait heroRef={heroRef} />
          </div>
        </div>

        {/* Layer 4: Main Content Container (Hero Details vertically centered alongside the portrait) */}
        <div className="relative z-30 flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 pointer-events-none max-w-7xl w-full mx-auto">
          {/* Details Block positioned comfortably alongside image, away from top logo */}
          <div className="max-w-md lg:max-w-lg xl:max-w-xl pointer-events-auto text-left">
            {/* Availability Badge */}
            <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4 anim-fade-up">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-neutral-800">
                AVAILABLE FOR NEW PROJECTS
              </span>
              <span className="h-[1px] w-12 sm:w-16 bg-neutral-300 ml-1"></span>
            </div>

            {/* Main Typewriter Heading */}
            <div className="min-h-[3rem] sm:min-h-[3.6rem] md:min-h-[4.2rem] flex items-center anim-fade-up">
              <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#121214] leading-[1.18]">
                <span>{displayedText}</span>
                <span
                  className="inline-block w-[3px] h-[0.9em] bg-[#121214] ml-2 align-middle animate-pulse opacity-90"
                  aria-hidden="true"
                />
              </h1>
            </div>

            {/* Static Description */}
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md sm:max-w-lg mt-3 sm:mt-4 anim-fade-up">
              {HERO_STATIC_DESCRIPTION}
            </p>
          </div>
        </div>

        {/* Layer 5: Bottom Architectural Chrome Bar */}
        <footer
          className="relative z-40 flex items-center justify-between px-8 sm:px-12 md:px-16 lg:px-20 pb-4 sm:pb-6 pointer-events-auto select-none w-full transition-opacity duration-200"
          style={{
            opacity: heroParallax.footerOpacity,
            pointerEvents: heroParallax.footerOpacity < 0.1 ? 'none' : 'auto',
          }}
        >
          {/* Left: Scroll Down indicator */}
          <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-neutral-500 shrink-0">
            <span>SCROLL DOWN</span>
            <div
              className="w-3.5 h-5 rounded-full border border-neutral-400 flex items-start justify-center pt-1"
              aria-hidden="true"
            >
              <div className="w-0.5 h-1 bg-neutral-600 rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Center: Thin horizontal rule with down-chevron button */}
          <div className="flex-1 flex items-center mx-4 sm:mx-8 md:mx-12">
            <div className="h-[1px] bg-neutral-300 flex-1"></div>
            <a
              href="#statement"
              aria-label="Scroll to Next Section"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-neutral-300 bg-[#FAF8F5] flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-colors shrink-0 mx-2"
            >
              <ChevronDown className="w-4 h-4" />
            </a>
            <div className="h-[1px] bg-neutral-300 flex-1"></div>
          </div>

          {/* Right: Portfolio Malik Abubakkar */}
          <div className="text-right shrink-0">
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
              PORTFOLIO
            </span>
            <span className="block text-xs sm:text-sm font-semibold text-[#121214]">
              Malik Abubakkar
            </span>
          </div>
        </footer>
      </section>
    </div>
  );
}
