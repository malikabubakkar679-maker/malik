/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeadTrackingConfig {
  maxYaw: number; // Max horizontal head rotation in degrees (default 12)
  maxPitch: number; // Max vertical head rotation in degrees (default 6)
  maxRoll: number; // Max subtle head tilt in degrees (default 1.5)
  maxNeckX: number; // Max horizontal neck translation in px (default 5)
  maxNeckY: number; // Max vertical neck translation in px (default 3)
  maxEyeX: number; // Max pupil horizontal translation in px (default 3.2)
  maxEyeY: number; // Max pupil vertical translation in px (default 2.0)
  headLerpFactor: number; // Smoothing factor for head rotation (default 0.08)
  eyeLerpFactor: number; // Smoothing factor for eyes leading movement (default 0.18)
}

export const DEFAULT_HEAD_CONFIG: HeadTrackingConfig = {
  maxYaw: 11.5,
  maxPitch: 6.0,
  maxRoll: 1.2,
  maxNeckX: 4.8,
  maxNeckY: 2.8,
  maxEyeX: 3.2,
  maxEyeY: 2.0,
  headLerpFactor: 0.08,
  eyeLerpFactor: 0.18,
};

export interface HeadPose {
  yaw: number; // RotateY (deg)
  pitch: number; // RotateX (deg)
  roll: number; // RotateZ (deg)
  neckX: number; // TranslateX (px)
  neckY: number; // TranslateY (px)
  eyeX: number; // Pupil translateX (px)
  eyeY: number; // Pupil translateY (px)
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Calculates normalized coordinates (-1 to 1) relative to an element's bounding rect.
 */
export function calculateNormalizedCursor(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): { u: number; v: number } {
  if (rect.width <= 0 || rect.height <= 0) {
    return { u: 0, v: 0 };
  }

  // Center of hero is (0, 0), left/top is (-1, -1), right/bottom is (1, 1)
  const normX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
  const normY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

  return {
    u: clamp(normX, -1, 1),
    v: clamp(normY, -1, 1),
  };
}

/**
 * Computes target pose from normalized coordinates and idle time.
 */
export function calculateTargetPose(
  u: number,
  v: number,
  timeSec: number,
  isIdle: boolean,
  config: HeadTrackingConfig = DEFAULT_HEAD_CONFIG
): HeadPose {
  // Idle organic micro-movement (breathing & natural head micro-shifts)
  const idleBreath = isIdle ? Math.sin(timeSec * 1.3) * 0.35 : Math.sin(timeSec * 1.3) * 0.1;
  const idleRoll = isIdle ? Math.sin(timeSec * 0.8) * 0.2 : 0;
  const idleEyeX = isIdle ? Math.sin(timeSec * 0.5) * 0.3 : 0;
  const idleEyeY = isIdle ? Math.cos(timeSec * 0.6) * 0.2 : 0;

  // Head yaw: turning left/right
  const yaw = u * config.maxYaw;

  // Head pitch: looking up/down (cursor up -> looking up -> negative rotateX)
  const pitch = -v * config.maxPitch + idleBreath;

  // Subtle roll: head tilts slightly in the direction of turn
  const roll = u * config.maxRoll + idleRoll;

  // Subtle neck translation
  const neckX = u * config.maxNeckX;
  const neckY = v * config.maxNeckY;

  // Eyes lead: pupil offset proportional to cursor
  const eyeX = u * config.maxEyeX + idleEyeX;
  const eyeY = v * config.maxEyeY + idleEyeY;

  return {
    yaw: Math.round(yaw * 100) / 100,
    pitch: Math.round(pitch * 100) / 100,
    roll: Math.round(roll * 100) / 100,
    neckX: Math.round(neckX * 100) / 100,
    neckY: Math.round(neckY * 100) / 100,
    eyeX: Math.round(eyeX * 100) / 100,
    eyeY: Math.round(eyeY * 100) / 100,
  };
}

/**
 * Smoothly interpolates current pose toward target pose using lerp.
 */
export function updateHeadPose(
  current: HeadPose,
  target: HeadPose,
  config: HeadTrackingConfig = DEFAULT_HEAD_CONFIG
): HeadPose {
  return {
    yaw: lerp(current.yaw, target.yaw, config.headLerpFactor),
    pitch: lerp(current.pitch, target.pitch, config.headLerpFactor),
    roll: lerp(current.roll, target.roll, config.headLerpFactor),
    neckX: lerp(current.neckX, target.neckX, config.headLerpFactor),
    neckY: lerp(current.neckY, target.neckY, config.headLerpFactor),
    eyeX: lerp(current.eyeX, target.eyeX, config.eyeLerpFactor),
    eyeY: lerp(current.eyeY, target.eyeY, config.eyeLerpFactor),
  };
}
