/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ABOUT_CONTENT,
  calculateHeroScrollProgress,
  calculateHeroParallax,
} from './about';

test('ABOUT_CONTENT contains exact required text strings', () => {
  assert.equal(ABOUT_CONTENT.heading, 'ABOUT');
  assert.equal(
    ABOUT_CONTENT.italicHeading,
    'I enjoy turning complex ideas into simple, useful and visually engaging digital experiences.'
  );
  assert.equal(ABOUT_CONTENT.details.length, 3);
  assert.equal(
    ABOUT_CONTENT.details[0],
    'I am a Software Engineer and Creative Web Developer passionate about building robust, scalable applications and high-fidelity digital products.'
  );
  assert.equal(
    ABOUT_CONTENT.details[1],
    'My workflow bridges software engineering discipline with modern editorial design, crafting accessible interfaces, high-performance web systems, and interactive motion that elevate user experiences.'
  );
  assert.equal(
    ABOUT_CONTENT.details[2],
    'From conceptual wireframing in Figma to full-stack implementation with React, Next.js, and WebGL, I focus on clean architecture, precision performance, and problem solving.'
  );

  const titles = ABOUT_CONTENT.highlights.map((h) => h.title);
  assert.deepEqual(titles, [
    'Software Engineering',
    'Web Development',
    'App Development',
    'Problem Solving',
    'Creative Thinking',
    'Modern Digital Experiences',
  ]);
});

test('calculateHeroScrollProgress clamps between 0 and 1', () => {
  assert.equal(calculateHeroScrollProgress(0, 800), 0);
  assert.equal(calculateHeroScrollProgress(400, 800), 0.5);
  assert.equal(calculateHeroScrollProgress(800, 800), 1);
  assert.equal(calculateHeroScrollProgress(1200, 800), 1);
  assert.equal(calculateHeroScrollProgress(100, 0), 0);
});

test('calculateHeroParallax produces smooth attenuation', () => {
  const atZero = calculateHeroParallax(0);
  assert.equal(atZero.marqueeY, 0);
  assert.equal(atZero.portraitY, 0);
  assert.equal(atZero.heroOpacity, 1);
  assert.equal(atZero.footerOpacity, 1);

  const atMid = calculateHeroParallax(0.5);
  assert.ok(atMid.marqueeY > 0);
  assert.ok(atMid.portraitY > 0);
  assert.ok(atMid.heroOpacity < 1 && atMid.heroOpacity > 0);
  assert.equal(atMid.footerOpacity, 0); // Fades out first cleanly
});
