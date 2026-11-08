/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNormalizedCursor,
  calculateTargetPose,
  updateHeadPose,
  DEFAULT_HEAD_CONFIG,
} from './headTracking';

test('calculateNormalizedCursor maps center to 0,0 and clamps edges', () => {
  const rect = { left: 100, top: 50, width: 800, height: 600 };

  // Center
  const center = calculateNormalizedCursor(500, 350, rect);
  assert.equal(center.u, 0);
  assert.equal(center.v, 0);

  // Top-left
  const topLeft = calculateNormalizedCursor(100, 50, rect);
  assert.equal(topLeft.u, -1);
  assert.equal(topLeft.v, -1);

  // Bottom-right
  const bottomRight = calculateNormalizedCursor(900, 650, rect);
  assert.equal(bottomRight.u, 1);
  assert.equal(bottomRight.v, 1);

  // Far outside clamped
  const outside = calculateNormalizedCursor(2000, 2000, rect);
  assert.equal(outside.u, 1);
  assert.equal(outside.v, 1);
});

test('calculateTargetPose stays within human rotation limits', () => {
  const leftPose = calculateTargetPose(-1, 0, 0, false);
  assert.ok(Math.abs(leftPose.yaw) <= DEFAULT_HEAD_CONFIG.maxYaw + 0.5);
  assert.ok(leftPose.yaw < 0, 'Looking left produces negative yaw');
  assert.ok(leftPose.eyeX < 0, 'Looking left shifts pupils left');

  const rightPose = calculateTargetPose(1, 0, 0, false);
  assert.ok(rightPose.yaw > 0, 'Looking right produces positive yaw');
  assert.ok(rightPose.eyeX > 0, 'Looking right shifts pupils right');

  const upPose = calculateTargetPose(0, -1, 0, false);
  assert.ok(upPose.pitch > 0, 'Looking up produces positive pitch');
  assert.ok(upPose.eyeY < 0, 'Looking up shifts pupils up');
});

test('updateHeadPose smooths movement toward target with eye leading', () => {
  const current = { yaw: 0, pitch: 0, roll: 0, neckX: 0, neckY: 0, eyeX: 0, eyeY: 0 };
  const target = { yaw: 10, pitch: 5, roll: 1, neckX: 4, neckY: 2, eyeX: 3, eyeY: 2 };

  const step1 = updateHeadPose(current, target);
  // Head uses headLerpFactor (0.08), eyes use eyeLerpFactor (0.18)
  assert.ok(step1.yaw > 0 && step1.yaw < 10);
  // Eyes should lead (higher relative percentage moved)
  const eyeProgress = step1.eyeX / target.eyeX;
  const headProgress = step1.yaw / target.yaw;
  assert.ok(eyeProgress > headProgress, 'Eyes should lead head rotation');
});
