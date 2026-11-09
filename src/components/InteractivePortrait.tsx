/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import malikPortraitCutout from '../assets/images/malik_portrait_cutout.png';

interface InteractivePortraitProps {
  heroRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export const InteractivePortrait: React.FC<InteractivePortraitProps> = ({
  heroRef,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check reduced motion or touch devices
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.matchMedia('(max-width: 639px)').matches;

    if (prefersReducedMotion || isMobile) {
      return;
    }

    let animId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Subtle, high-end 3D parallax tilt range
      targetX = Math.max(-1, Math.min(1, x)) * 7; // max 7 deg yaw
      targetY = Math.max(-1, Math.min(1, y)) * -6; // max 6 deg pitch
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateMotion = () => {
      // Smooth lerp interpolation
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (portraitRef.current) {
        portraitRef.current.style.transform = `perspective(900px) rotateY(${currentX}deg) rotateX(${currentY}deg) translateZ(10px)`;
      }

      animId = requestAnimationFrame(updateMotion);
    };

    const heroEl = heroRef.current || window;
    heroEl.addEventListener('mousemove', handleMouseMove as EventListener);
    heroEl.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(updateMotion);

    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove as EventListener);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [heroRef]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-auto aspect-[3/4] sm:aspect-square select-none pointer-events-none flex items-end justify-center ${className}`}
      data-testid="interactive-portrait-container"
    >
      {/* Unified High-Performance Portrait with Smooth Fade-in */}
      <img
        ref={portraitRef}
        src={malikPortraitCutout}
        alt="Portrait of Malik Abubakkar"
        onLoad={() => setIsLoaded(true)}
        className={`h-full w-auto max-h-full object-contain object-bottom pointer-events-none select-none will-change-transform drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
        decoding="async"
        // @ts-expect-error fetchpriority attribute
        fetchpriority="high"
      />
    </div>
  );
};
