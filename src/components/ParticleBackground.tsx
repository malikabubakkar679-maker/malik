/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import {
  Particle,
  ParticleBounds,
  createParticleSystem,
  updateParticle,
} from '../utils/particles';

interface ParticleBackgroundProps {
  count?: number;
  className?: string;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 42,
  className = 'absolute inset-0 z-[15] pointer-events-none h-full w-full',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const bounds: ParticleBounds = { width: 0, height: 0 };

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      bounds.width = width;
      bounds.height = height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-initialize particles across the new bounds if empty or resized significantly
      if (particles.length === 0) {
        particles = createParticleSystem(count, width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (!wasVisible && isVisible && !prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    }, { threshold: 0.02 });
    observer.observe(canvas);

    const render = (time: number) => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, bounds.width, bounds.height);

      for (let i = 0; i < particles.length; i++) {
        if (!prefersReducedMotion) {
          particles[i] = updateParticle(particles[i], bounds, time);
        }

        const p = particles[i];

        // Draw soft warm ambient dust mote
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 121, 56, ${p.opacity.toFixed(3)})`;
        ctx.fill();

        // Very subtle ambient glow halo around slightly larger particles
        if (p.radius > 1.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 121, 56, ${(p.opacity * 0.25).toFixed(3)})`;
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      data-testid="floating-particles-canvas"
    />
  );
};
