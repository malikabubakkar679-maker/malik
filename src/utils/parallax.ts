/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ParallaxIntensity {
  maxOffsetX: number;
  maxOffsetY: number;
}

export const DEFAULT_PARALLAX_INTENSITY: ParallaxIntensity = {
  maxOffsetX: 16, // subtle horizontal drift (px)
  maxOffsetY: 10, // subtle vertical drift (px)
};

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Calculates normalized offset from cursor position relative to screen center.
 * Returns subtle x and y pixel offsets for parallax effect.
 */
export function calculateParallaxOffset(
  clientX: number,
  clientY: number,
  innerWidth: number,
  innerHeight: number,
  intensity: ParallaxIntensity = DEFAULT_PARALLAX_INTENSITY
): { x: number; y: number } {
  if (innerWidth <= 0 || innerHeight <= 0) {
    return { x: 0, y: 0 };
  }

  // Normalized cursor coordinates from -0.5 to 0.5 (center is 0, 0)
  const normX = clamp(clientX / innerWidth - 0.5, -0.5, 0.5);
  const normY = clamp(clientY / innerHeight - 0.5, -0.5, 0.5);

  return {
    x: Math.round(normX * intensity.maxOffsetX * 100) / 100,
    y: Math.round(normY * intensity.maxOffsetY * 100) / 100,
  };
}
