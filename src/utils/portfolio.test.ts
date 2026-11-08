/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  NAV_LINKS,
  SOCIAL_LINKS,
  FOOTER_COPY,
  getDesktopNavDelay,
  getDesktopSocialDelay,
  getMobileNavDelay,
  getMobileSocialDelay,
  formatMarqueeText,
} from './portfolio';

test('exact nav and social links copy', () => {
  assert.deepEqual(
    NAV_LINKS.map((n) => n.label),
    ['Story', 'Jobs', 'Message']
  );
  assert.deepEqual(
    SOCIAL_LINKS.map((s) => s.label),
    ['Instagram', 'TikTok', 'YouTube']
  );
  assert.deepEqual(FOOTER_COPY.left, [
    'Software Engineer',
    'Digital Crafter',
    'Visuals Composer',
  ]);
  assert.deepEqual(FOOTER_COPY.right, ['A homage to', 'Malik Abubakkar']);
});

test('desktop animation delays meet specifications', () => {
  // Nav links: 1000 + i*80 ms (Story/Jobs/Message)
  assert.equal(getDesktopNavDelay(0), 1000);
  assert.equal(getDesktopNavDelay(1), 1080);
  assert.equal(getDesktopNavDelay(2), 1160);

  // Social links: 1150 + i*80 ms
  assert.equal(getDesktopSocialDelay(0), 1150);
  assert.equal(getDesktopSocialDelay(1), 1230);
  assert.equal(getDesktopSocialDelay(2), 1310);
});

test('mobile animation delays meet specifications', () => {
  // Mobile nav: staggered 300 + i*80 ms
  assert.equal(getMobileNavDelay(0), 300);
  assert.equal(getMobileNavDelay(1), 380);
  assert.equal(getMobileNavDelay(2), 460);

  // Mobile social: staggered 550 + i*60 ms
  assert.equal(getMobileSocialDelay(0), 550);
  assert.equal(getMobileSocialDelay(1), 610);
  assert.equal(getMobileSocialDelay(2), 670);
});

test('marquee text contains em dash and trailing non-breaking space', () => {
  const marquee = formatMarqueeText();
  assert.equal(marquee, 'Malik — Abubakkar\u00A0');
  assert.ok(marquee.includes('—'));
  assert.ok(marquee.endsWith('\u00A0'));
});
