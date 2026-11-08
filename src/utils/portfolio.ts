/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Story', href: '#about' },
  { label: 'Jobs', href: '#' },
  { label: 'Message', href: '#' },
];

export const SOCIAL_LINKS: NavItem[] = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'YouTube', href: '#' },
];

export const FOOTER_COPY = {
  left: ['Software Engineer', 'Digital Crafter', 'Visuals Composer'],
  right: ['A homage to', 'Malik Abubakkar'],
};

export function getDesktopNavDelay(index: number): number {
  return 1000 + index * 80;
}

export function getDesktopSocialDelay(index: number): number {
  return 1150 + index * 80;
}

export function getMobileNavDelay(index: number): number {
  return 300 + index * 80;
}

export function getMobileSocialDelay(index: number): number {
  return 550 + index * 60;
}

export function formatMarqueeText(): string {
  // Malik — Abubakkar with non-breaking space
  return 'Malik — Abubakkar\u00A0';
}
