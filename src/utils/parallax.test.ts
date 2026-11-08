/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateParallaxOffset,
  lerp,
  clamp,
} from './parallax';

test('calculateParallaxOffset returns 0,0 at screen center', () => {
  const offset = calculateParallaxOffset(500, 400, 1000, 800);
  assert.equal(offset.x, 0);
  assert.equal(offset.y, 0);
});

test('calculateParallaxOffset calculates subtle bounds at screen edges', () => {
  const topEdge = calculateParallaxOffset(0, 0, 1000, 800);
  assert.equal(topEdge.x, -8); // -0.5 * 16
  assert.equal(topEdge.y, -5); // -0.5 * 10

  const bottomEdge = calculateParallaxOffset(1000, 800, 1000, 800);
  assert.equal(bottomEdge.x, 8); // 0.5 * 16
  assert.equal(bottomEdge.y, 5); // 0.5 * 10
});

test('calculateParallaxOffset handles invalid dimensions safely', () => {
  const offset = calculateParallaxOffset(100, 100, 0, 0);
  assert.deepEqual(offset, { x: 0, y: 0 });
});

test('lerp smoothly interpolates between values', () => {
  assert.equal(lerp(0, 10, 0.5), 5);
  assert.equal(lerp(0, 10, 0.1), 1);
  assert.equal(lerp(10, 20, 1), 20);
});

test('clamp restricts values to min and max', () => {
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(5, 0, 10), 5);
});
