/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import malikHead from '../assets/images/malik_head.png';
import malikBody from '../assets/images/malik_body.png';
import malikCollar from '../assets/images/malik_collar.png';
import malikPupils from '../assets/images/malik_pupils.png';
import {
  calculateNormalizedCursor,
  calculateTargetPose,
  updateHeadPose,
  DEFAULT_HEAD_CONFIG,
  HeadPose,
} from '../utils/headTracking';

interface InteractivePortraitProps {
  heroRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export const InteractivePortrait: React.FC<InteractivePortraitProps> = ({
  heroRef,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const eyesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion or is on mobile
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.matchMedia('(max-width: 639px)').matches;
    const isTouchOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || isMobile || isTouchOnly) {
      // Resting natural pose
      return;
    }

    let animId: number;
    const currentPose: HeadPose = {
      yaw: 0,
      pitch: 0,
      roll: 0,
      neckX: 0,
      neckY: 0,
      eyeX: 0,
      eyeY: 0,
    };

    let targetU = 0;
    let targetV = 0;
    let isIdle = true;
    let lastMouseMoveTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const heroEl = heroRef.current || document.body;
      const rect = heroEl.getBoundingClientRect();
      const norm = calculateNormalizedCursor(e.clientX, e.clientY, rect);

      targetU = norm.u;
      targetV = norm.v;
      isIdle = false;
      lastMouseMoveTime = performance.now();
    };

    const handleMouseLeave = () => {
      targetU = 0;
      targetV = 0;
      isIdle = true;
    };

    const targetHero = heroRef.current || window;
    targetHero.addEventListener(
      'mousemove',
      handleMouseMove as EventListener,
      { passive: true }
    );
    targetHero.addEventListener(
      'mouseleave',
      handleMouseLeave as EventListener
    );

    let isPortraitVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isPortraitVisible;
        isPortraitVisible = entry.isIntersecting;
        if (!wasVisible && isPortraitVisible) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.02 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const animate = (timestamp: number) => {
      if (!isPortraitVisible) return;
      const timeSec = timestamp / 1000;

      // If no mouse movement for > 1.8 seconds, enter natural idle breathing
      if (!isIdle && timestamp - lastMouseMoveTime > 1800) {
        targetU = targetU * 0.95;
        targetV = targetV * 0.95;
        if (Math.hypot(targetU, targetV) < 0.05) {
          isIdle = true;
        }
      }

      const targetPose = calculateTargetPose(
        targetU,
        targetV,
        timeSec,
        isIdle,
        DEFAULT_HEAD_CONFIG
      );

      const updated = updateHeadPose(
        currentPose,
        targetPose,
        DEFAULT_HEAD_CONFIG
      );
      Object.assign(currentPose, updated);

      // Direct DOM update on refs: 60fps butter with zero React re-renders
      if (headRef.current) {
        // Transform origin at base of the neck: x=49.61% (508/1024), y=51.27% (525/1024)
        headRef.current.style.transform = `translate3d(${currentPose.neckX.toFixed(
          2
        )}px, ${currentPose.neckY.toFixed(2)}px, 0px) rotateY(${currentPose.yaw.toFixed(
          2
        )}deg) rotateX(${currentPose.pitch.toFixed(
          2
        )}deg) rotateZ(${currentPose.roll.toFixed(2)}deg)`;
      }

      if (eyesRef.current) {
        eyesRef.current.style.transform = `translate3d(${currentPose.eyeX.toFixed(
          2
        )}px, ${currentPose.eyeY.toFixed(2)}px, 0px)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      targetHero.removeEventListener(
        'mousemove',
        handleMouseMove as EventListener
      );
      targetHero.removeEventListener(
        'mouseleave',
        handleMouseLeave as EventListener
      );
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, [heroRef]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-auto aspect-square select-none pointer-events-none [perspective:1000px] ${className}`}
      data-testid="interactive-portrait-container"
    >
      {/* 1. Stationary Body Layer: Torso, shoulders, folded arms (never moves) */}
      <img
        src={malikBody}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none select-none z-10"
        loading="eager"
      />

      {/* 2. Interactive Head & Neck Layer: Pivots naturally from the neck base */}
      <div
        ref={headRef}
        className="absolute inset-0 h-full w-full pointer-events-none select-none z-20 will-change-transform"
        style={{
          transformOrigin: '49.61% 51.27%',
          transformStyle: 'preserve-3d',
        }}
        data-testid="interactive-head"
      >
        <img
          src={malikHead}
          alt="Portrait of Malik Abubakkar"
          className="absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none select-none"
          loading="eager"
        />

        {/* 2b. Interactive Eyes / Pupils: Leads head movement slightly */}
        <div
          ref={eyesRef}
          className="absolute inset-0 h-full w-full pointer-events-none select-none will-change-transform"
          data-testid="interactive-eyes"
        >
          <img
            src={malikPupils}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none select-none"
            loading="eager"
          />
        </div>
      </div>

      {/* 3. Stationary Front Collar Rim Overlay: Anchors neck inside the sweater collar with zero seam */}
      <img
        src={malikCollar}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none select-none z-30"
        loading="eager"
      />
    </div>
  );
};
