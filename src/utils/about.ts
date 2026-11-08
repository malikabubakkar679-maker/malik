/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HighlightItem {
  number: string;
  title: string;
  description: string;
}

export const ABOUT_CONTENT = {
  sectionNumber: '01',
  sectionTag: '01 / ABOUT',
  heading: 'ABOUT',
  italicHeading:
    'I enjoy turning complex ideas into simple, useful and visually engaging digital experiences.',
  details: [
    'I am a Software Engineer and Creative Web Developer passionate about building robust, scalable applications and high-fidelity digital products.',
    'My workflow bridges software engineering discipline with modern editorial design, crafting accessible interfaces, high-performance web systems, and interactive motion that elevate user experiences.',
    'From conceptual wireframing in Figma to full-stack implementation with React, Next.js, and WebGL, I focus on clean architecture, precision performance, and problem solving.',
  ],
  mainStatement:
    "I'm a Software Engineer, Web Developer, and Digital Creator passionate about building meaningful digital experiences.",
  supportingParagraph:
    'I enjoy transforming ideas into functional, modern, and user-friendly digital solutions. My focus is on writing clean code, solving complex problems, exploring new technologies, and creating products that deliver real value.',
  highlights: [
    {
      number: '01',
      title: 'Software Engineering',
      description: 'Robust architectures, scalable systems, and clean maintainable code.',
    },
    {
      number: '02',
      title: 'Web Development',
      description: 'High-performance interactive web applications with modern frontend stacks.',
    },
    {
      number: '03',
      title: 'App Development',
      description: 'Cross-platform and mobile applications built for seamless user journeys.',
    },
    {
      number: '04',
      title: 'Problem Solving',
      description: 'Deconstructing complex engineering challenges into elegant solutions.',
    },
    {
      number: '05',
      title: 'Creative Thinking',
      description: 'Bridging design aesthetics with technical execution and motion fidelity.',
    },
    {
      number: '06',
      title: 'Modern Digital Experiences',
      description: 'Fluid animations, micro-interactions, and accessible, responsive interfaces.',
    },
  ] as HighlightItem[],
};

export function calculateHeroScrollProgress(
  scrollY: number,
  heroHeight: number
): number {
  if (heroHeight <= 0) return 0;
  return Math.max(0, Math.min(1, scrollY / heroHeight));
}

export function calculateHeroParallax(progress: number) {
  return {
    marqueeY: Math.round(progress * 120),
    portraitY: Math.round(progress * 80),
    portraitScale: 1 - progress * 0.04,
    heroOpacity: Math.max(0, 1 - progress * 1.15),
    footerOpacity: Math.max(0, 1 - progress * 2.2),
  };
}
