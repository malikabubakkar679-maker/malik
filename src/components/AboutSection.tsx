/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ABOUT_CONTENT } from '../utils/about';
import { MagneticLink } from './MagneticLink';

const CINEMATIC_FACE_IMG = '/assets/about-cinematic-face.jpg';
const ORIGINAL_PORTRAIT_IMG = '/assets/aistudio/a4cb53d4-3d28-438f-938c-7a77c1bab524_1d795b2f.png';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollYOffset, setScrollYOffset] = useState(0);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Subtle parallax effect on scroll for the cinematic banner
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (bannerRef.current) {
            const rect = bannerRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            // Calculate relative offset when banner is near viewport
            const offset = (rect.top - viewHeight / 2) * 0.08;
            setScrollYOffset(offset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0b0b0b] text-cream px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-28 sm:pb-36 overflow-hidden select-none"
    >
      {/* Background ambient lighting vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_20%,rgba(239,238,233,0.08),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Top Tag */}
        <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-cream/15">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/50">
              {ABOUT_CONTENT.sectionTag}
            </span>
            <span className="h-1 w-1 rounded-full bg-cream/40" />
            <span className="font-hn text-xs uppercase tracking-wider text-cream/70">
              Malik Abubakkar
            </span>
          </div>

          <span className="font-mono text-xs text-cream/40 uppercase tracking-widest hidden sm:inline-block">
            [ EDITORIAL PROFILE · 2025 ]
          </span>
        </div>

        {/* 1. CINEMATIC HEADER BANNER WITH GIANT 'ABOUT' TEXT EFFECT (Inspired by Screenshot) */}
        <div
          ref={bannerRef}
          className="relative w-full mt-10 sm:mt-16 flex flex-col items-center group"
        >
          {/* Giant Monumental 'ABOUT' Typography Overlapping the Top of the Banner */}
          <div
            className={`w-full text-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2
              className="font-hn font-black text-[18vw] sm:text-[21vw] lg:text-[22vw] leading-[0.78] tracking-[-0.05em] uppercase text-cream/90 text-center select-none will-change-transform -mb-[7vw] sm:-mb-[9vw] lg:-mb-[9.5vw] relative z-20 pointer-events-none drop-shadow-2xl"
              style={{
                transform: `translate3d(0, ${-scrollYOffset * 0.4}px, 0)`,
              }}
            >
              {ABOUT_CONTENT.heading}
            </h2>
          </div>

          {/* Panoramic Cinematic Photo Banner (Focused Closely on Malik's Face) */}
          <div
            className={`relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.4/1] rounded-sm sm:rounded-md overflow-hidden border border-cream/20 bg-[#121212] shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 z-10 ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
            }`}
          >
            {/* Corner Crosshairs for Luxury Fashion Aesthetic */}
            <span className="absolute top-3 left-3 text-cream/50 text-xs font-mono select-none z-30">
              +
            </span>
            <span className="absolute top-3 right-3 text-cream/50 text-xs font-mono select-none z-30">
              +
            </span>
            <span className="absolute bottom-3 left-3 text-cream/50 text-xs font-mono select-none z-30">
              +
            </span>
            <span className="absolute bottom-3 right-3 text-cream/50 text-xs font-mono select-none z-30">
              +
            </span>

            {/* Cinematic Portrait focused tightly on face, eyes and hair with warm studio side-lighting */}
            <img
              src={CINEMATIC_FACE_IMG}
              alt="Malik Abubakkar — Cinematic Close-up"
              onError={(e) => {
                // Fallback to original image if needed
                (e.currentTarget as HTMLImageElement).src = ORIGINAL_PORTRAIT_IMG;
              }}
              className="w-full h-full object-cover object-[center_35%] transition-transform duration-1000 ease-out group-hover:scale-105 will-change-transform filter brightness-95 contrast-105"
              style={{
                transform: `translate3d(0, ${scrollYOffset * 0.25}px, 0) scale(1.05)`,
              }}
              loading="lazy"
            />

            {/* Dark gradient vignettes top & bottom to ensure seamless typographic blend */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-[#0b0b0b]/60 pointer-events-none"
              aria-hidden="true"
            />

            {/* Subtle luxury caption at the bottom of the photo (like reference screenshot) */}
            <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-20 flex flex-col items-center justify-center text-center px-4">
              <p className="font-hn text-[11px] sm:text-xs uppercase tracking-[0.25em] text-cream/90 font-medium drop-shadow-md">
                ENGINEERED WITH PASSION &amp; ARCHITECTURAL PRECISION
              </p>
              <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-cream/60">
                <span>MALIK ABUBAKKAR</span>
                <span>•</span>
                <span>SOFTWARE CRAFTER &amp; WEB DEVELOPER</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CENTER ITALIC HEADLINE DIRECTLY BENEATH IMAGE */}
        <div
          className={`mt-16 sm:mt-24 lg:mt-28 max-w-4xl mx-auto text-center transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Subtle quotation accent */}
          <span className="block font-serif text-3xl sm:text-4xl text-cream/30 italic mb-2 select-none">
            &ldquo;
          </span>

          <h3 className="font-serif italic text-2xl sm:text-4xl lg:text-5xl font-light text-cream leading-[1.35] tracking-tight px-4 sm:px-6">
            {ABOUT_CONTENT.italicHeading}
          </h3>

          {/* Minimalist central line divider */}
          <div className="w-16 h-[1px] bg-cream/30 mx-auto mt-8 sm:mt-10" />
        </div>

        {/* 3. THREE DETAILED EDITORIAL PARAGRAPHS */}
        <div
          className={`mt-12 sm:mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {ABOUT_CONTENT.details.map((paragraph, index) => (
            <div
              key={index}
              className="relative p-6 sm:p-7 rounded-sm border border-cream/15 bg-cream/[0.02] hover:bg-cream/[0.04] transition-all duration-500 group flex flex-col justify-between"
            >
              {/* Card Index Marker */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-cream/10">
                  <span className="font-mono text-xs text-cream/40 uppercase tracking-widest group-hover:text-cream/80 transition-colors">
                    0{index + 1} // FOCUS
                  </span>
                  <span className="h-1 w-1 rounded-full bg-cream/30 group-hover:bg-cream transition-colors" />
                </div>

                <p className="font-hn text-sm sm:text-base text-cream/80 leading-relaxed font-light group-hover:text-cream transition-colors">
                  {paragraph}
                </p>
              </div>

              {/* Bottom hairline indicator */}
              <div className="w-full h-[1px] bg-cream/10 group-hover:bg-cream/30 transition-colors mt-6" />
            </div>
          ))}
        </div>

        {/* 4. CORE DISCIPLINES & HIGHLIGHTS */}
        <div
          className={`mt-20 sm:mt-28 transition-all duration-1000 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-cream/15 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/50">
                CAPABILITIES
              </span>
              <h4 className="font-hn text-2xl sm:text-3xl font-light text-cream mt-1 tracking-tight">
                Core Disciplines &amp; Highlights
              </h4>
            </div>

            <p className="font-hn text-xs sm:text-sm text-cream/50 max-w-xs font-light">
              Structured engineering methodologies built for scalable modern web ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1 mt-4">
            {ABOUT_CONTENT.highlights.map((item, idx) => {
              const isHovered = activeHighlight === idx;
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setActiveHighlight(idx)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  className="group border-b border-cream/10 py-5 flex items-start gap-4 transition-colors duration-300 hover:bg-cream/[0.02] px-3 -mx-3 cursor-default"
                >
                  <span
                    className={`font-mono text-xs pt-1 transition-colors duration-300 ${
                      isHovered ? 'text-cream' : 'text-cream/40'
                    }`}
                  >
                    {item.number}
                  </span>

                  <div>
                    <h5
                      className={`font-hn text-base tracking-tight transition-colors duration-300 ${
                        isHovered ? 'text-cream' : 'text-cream/90'
                      }`}
                    >
                      {item.title}
                    </h5>
                    <p className="font-hn text-xs text-cream/60 mt-1 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. COLLABORATION / CONNECT CALLOUT CARD */}
        <div
          className={`mt-16 sm:mt-20 p-8 sm:p-10 rounded-sm border border-cream/15 bg-gradient-to-r from-cream/[0.03] to-cream/[0.01] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-1000 ease-out delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cream/50">
              AVAILABLE FOR COLLABORATION
            </span>
            <h4 className="font-hn text-xl sm:text-2xl text-cream font-normal mt-1 tracking-tight">
              Let&apos;s build impactful digital experiences together.
            </h4>
            <p className="font-hn text-xs sm:text-sm text-cream/60 mt-1 font-light">
              Open to senior software engineering roles, web development architecture, and visionary digital projects.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <MagneticLink
              href="mailto:malikabubakkar523@gmail.com"
              className="px-6 py-3 bg-cream text-[#0b0b0b] font-hn text-xs uppercase tracking-widest font-medium hover:bg-cream/90 transition-all rounded-sm shadow-md"
            >
              Get In Touch
            </MagneticLink>

            <MagneticLink
              href="#hero"
              className="px-4 py-3 border border-cream/20 text-cream font-hn text-xs uppercase tracking-widest hover:border-cream/50 transition-all rounded-sm"
            >
              Back To Top
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
};
