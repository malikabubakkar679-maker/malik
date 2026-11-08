/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { calculateParallaxOffset, lerp, ParallaxIntensity, DEFAULT_PARALLAX_INTENSITY } from '../utils/parallax';

export function useParallax(intensity: ParallaxIntensity = DEFAULT_PARALLAX_INTENSITY) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion or is on touch-only device
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || isTouchOnly) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const calculated = calculateParallaxOffset(
        e.clientX,
        e.clientY,
        window.innerWidth,
        window.innerHeight,
        intensity
      );
      targetRef.current = calculated;
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      // Smooth interpolation for silky motion
      const newX = lerp(currentRef.current.x, targetRef.current.x, 0.08);
      const newY = lerp(currentRef.current.y, targetRef.current.y, 0.08);

      currentRef.current = { x: newX, y: newY };

      // Update state with rounded values to avoid micro re-renders
      setOffset({
        x: Math.round(newX * 100) / 100,
        y: Math.round(newY * 100) / 100,
      });

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [intensity]);

  return offset;
}
