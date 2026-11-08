/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Marquee } from './Marquee';
import { Footer } from './Footer';
import { MobileDrawer } from './MobileDrawer';
import { ParticleBackground } from './ParticleBackground';
import { InteractivePortrait } from './InteractivePortrait';
import { useParallax } from '../hooks/useParallax';
import { calculateHeroScrollProgress, calculateHeroParallax } from '../utils/about';

const BG_IMAGE_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85';

export default function Hero() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const parallaxOffset = useParallax({ maxOffsetX: 12, maxOffsetY: 8 });

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

  const heroParallax = calculateHeroParallax(scrollProgress);
  const isScrolled = scrollProgress > 0.15;

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="relative w-full bg-[#FAF8F5] text-[#121214]">
      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative h-[100dvh] w-full overflow-hidden bg-[#FAF8F5] select-none"
      >
        {/* Layer 1 (z-0): Full-bleed background studio image */}
        <img
          src={BG_IMAGE_URL}
          alt=""
          className="anim-fade-in absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-25 transition-opacity duration-300"
          style={{
            opacity: 0.25 * heroParallax.heroOpacity,
          }}
          loading="eager"
        />

        {/* Layer 2 (z-10): Giant scrolling marquee name with cinematic scroll parallax */}
        <Marquee
          style={{
            transform: `translate3d(0, ${heroParallax.marqueeY}px, 0)`,
            opacity: heroParallax.heroOpacity,
          }}
        />

        {/* Layer 2.5 (z-[15]): Subtle floating ambient particles behind the portrait */}
        <div style={{ opacity: heroParallax.heroOpacity }}>
          <ParticleBackground />
        </div>

        {/* Layer 3 (z-20): Front portrait overlay with natural 3D head and eye tracking */}
        <div
          className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none will-change-transform"
          style={{
            transform: `translate3d(${parallaxOffset.x}px, ${
              parallaxOffset.y + heroParallax.portraitY
            }px, 0) scale(${heroParallax.portraitScale})`,
            opacity: heroParallax.heroOpacity,
          }}
          data-testid="portrait-parallax-container"
        >
          <div className="anim-rise-in flex items-end justify-center h-full w-full pointer-events-none">
            <InteractivePortrait heroRef={heroRef} />
          </div>
        </div>

        {/* Layer 4 (z-30 / sm:z-10): Horizontal cream rule & Footer */}
        <Footer
          style={{
            opacity: heroParallax.footerOpacity,
            pointerEvents: heroParallax.footerOpacity < 0.1 ? 'none' : 'auto',
          }}
        />
      </section>

      {/* Mobile Drawer backdrop and panel */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
}
