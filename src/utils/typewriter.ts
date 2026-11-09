/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const HERO_ROTATING_PHRASES = [
  'I am a Web Developer',
  'I am a Software Engineer',
  'I am a Problem Solver',
  'I am an App Developer',
] as const;

export const HERO_STATIC_DESCRIPTION =
  'I design and build scalable, user-centered digital products that solve real problems and deliver measurable results.';

export function getNextPhraseIndex(currentIndex: number, totalPhrases = HERO_ROTATING_PHRASES.length): number {
  if (totalPhrases <= 0) return 0;
  return (currentIndex + 1) % totalPhrases;
}

export function getSubheadingMinHeight(): string {
  // Returns safe min-height to prevent layout shifts across viewports
  return 'min-h-[1.75rem] sm:min-h-[2rem]';
}
