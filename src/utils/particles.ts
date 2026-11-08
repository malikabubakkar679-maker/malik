/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  vy: number;
  vx: number;
  swaySpeed: number;
  swayOffset: number;
  pulseSpeed: number;
}

export interface ParticleBounds {
  width: number;
  height: number;
}

export function createParticle(width: number, height: number, randomFn = Math.random): Particle {
  const baseOpacity = 0.08 + randomFn() * 0.22; // subtle opacity between 0.08 and 0.30
  return {
    x: randomFn() * width,
    y: randomFn() * height,
    radius: 0.8 + randomFn() * 1.8, // subtle radius between 0.8px and 2.6px
    opacity: baseOpacity,
    baseOpacity,
    vy: -(0.15 + randomFn() * 0.35), // gentle upward float
    vx: (randomFn() - 0.5) * 0.2, // slight drift
    swaySpeed: 0.001 + randomFn() * 0.002,
    swayOffset: randomFn() * Math.PI * 2,
    pulseSpeed: 0.002 + randomFn() * 0.003,
  };
}

export function createParticleSystem(
  count: number,
  width: number,
  height: number,
  randomFn = Math.random
): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(width, height, randomFn));
  }
  return particles;
}

export function updateParticle(
  particle: Particle,
  bounds: ParticleBounds,
  time: number
): Particle {
  const sway = Math.sin(time * particle.swaySpeed + particle.swayOffset) * 0.35;
  const pulse = Math.sin(time * particle.pulseSpeed + particle.swayOffset) * 0.08;

  let newY = particle.y + particle.vy;
  let newX = particle.x + particle.vx + sway;

  // Wrap around boundaries smoothly
  if (newY < -10) {
    newY = bounds.height + 10;
    newX = Math.random() * bounds.width;
  } else if (newY > bounds.height + 10) {
    newY = -10;
  }

  if (newX < -10) {
    newX = bounds.width + 10;
  } else if (newX > bounds.width + 10) {
    newX = -10;
  }

  const newOpacity = Math.max(0.04, Math.min(0.4, particle.baseOpacity + pulse));

  return {
    ...particle,
    x: newX,
    y: newY,
    opacity: newOpacity,
  };
}
