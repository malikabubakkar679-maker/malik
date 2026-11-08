/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HERO_ROTATING_PHRASES,
  HERO_STATIC_DESCRIPTION,
  getNextPhraseIndex,
} from './typewriter';

test('HERO_ROTATING_PHRASES contains the exact 4 requested phrases in order', () => {
  assert.equal(HERO_ROTATING_PHRASES.length, 4);
  assert.equal(HERO_ROTATING_PHRASES[0], 'I am a Software Engineer');
  assert.equal(HERO_ROTATING_PHRASES[1], 'I am a Problem Solver');
  assert.equal(HERO_ROTATING_PHRASES[2], 'I am a Web Developer');
  assert.equal(HERO_ROTATING_PHRASES[3], 'I am an App Developer');
});

test('HERO_STATIC_DESCRIPTION matches exact required text', () => {
  assert.equal(
    HERO_STATIC_DESCRIPTION,
    'I build modern digital experiences by turning complex ideas into simple, functional, and beautiful solutions.'
  );
});

test('getNextPhraseIndex cycles sequentially and wraps around', () => {
  assert.equal(getNextPhraseIndex(0), 1);
  assert.equal(getNextPhraseIndex(1), 2);
  assert.equal(getNextPhraseIndex(2), 3);
  assert.equal(getNextPhraseIndex(3), 0);
});
