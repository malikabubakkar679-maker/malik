/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createParticle,
  createParticleSystem,
  updateParticle,
} from './particles';

test('createParticle initializes within subtle opacity and size bounds', () => {
  const p = createParticle(1000, 800, () => 0.5);
  assert.ok(p.opacity >= 0.05 && p.opacity <= 0.35, 'Opacity should be subtle and low');
  assert.ok(p.radius >= 0.5 && p.radius <= 3.0, 'Radius should be delicate');
  assert.ok(p.vy < 0, 'Velocity Y should be negative for upward drift');
  assert.equal(p.x, 500);
  assert.equal(p.y, 400);
});

test('createParticleSystem creates expected number of particles', () => {
  const system = createParticleSystem(35, 1440, 900);
  assert.equal(system.length, 35);
  for (const particle of system) {
    assert.ok(particle.x >= 0 && particle.x <= 1440);
    assert.ok(particle.y >= 0 && particle.y <= 900);
  }
});

test('updateParticle moves particle upward and wraps around top boundary', () => {
  const bounds = { width: 1000, height: 800 };
  const particle = {
    x: 500,
    y: -15, // past top boundary
    radius: 1.5,
    opacity: 0.2,
    baseOpacity: 0.2,
    vy: -0.3,
    vx: 0,
    swaySpeed: 0.001,
    swayOffset: 0,
    pulseSpeed: 0.002,
  };

  const updated = updateParticle(particle, bounds, 1000);
  assert.ok(updated.y >= bounds.height, 'Particle should wrap to bottom when crossing top');
});
