/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TypewriterHeading } from './TypewriterHeading';
import { MagneticLink } from './MagneticLink';
import { SOCIAL_LINKS } from '../utils/portfolio';

interface FooterProps {
  style?: React.CSSProperties;
}

export const Footer: React.FC<FooterProps> = ({ style }) => {
  return (
    <div style={style} className="transition-opacity duration-200">
      {/* Horizontal rule: bottom-[6rem] on mobile, sm:bottom-28 on desktop */}
      <div
        className="anim-line absolute inset-x-6 sm:inset-x-10 bottom-[6.2rem] sm:bottom-28 z-10 h-[1px] bg-neutral-300 origin-left"
        style={{ animationDelay: '1200ms' }}
        aria-hidden="true"
      />

      {/* Footer chrome: animated heading + static description on left, homage & socials on right */}
      <footer className="absolute inset-x-0 bottom-0 z-30 sm:z-10 flex items-end justify-between px-6 pb-4 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn text-[#121214] select-none gap-6">
        {/* Left block: Animated Typewriter Heading + Fixed Static Description */}
        <div
          className="anim-fade-up flex-1 max-w-xs sm:max-w-md lg:max-w-lg z-20 pointer-events-auto"
          style={{ animationDelay: '1400ms' }}
        >
          <TypewriterHeading />
        </div>

        {/* Right block: Homage copy + subtle magnetic interactive links */}
        <div
          className="anim-fade-up flex flex-col text-right tracking-normal items-end gap-1.5 shrink-0 z-20 pointer-events-auto"
          style={{ animationDelay: '1550ms' }}
        >
          {/* Social Links with subtle magnetic pull on cursor hover */}
          <div
            className="hidden sm:flex items-center gap-4 text-xs font-hn mb-0.5"
            aria-label="Footer Social Links"
          >
            {SOCIAL_LINKS.map((item) => (
              <MagneticLink
                key={item.label}
                href={item.href}
                className="text-neutral-500 hover:text-[#121214] transition-colors"
              >
                {item.label}
              </MagneticLink>
            ))}
          </div>

          {/* Homage text */}
          <div className="flex flex-col text-right">
            <span className="text-neutral-400 text-[11px] sm:text-xs">A homage to</span>
            <MagneticLink
              href="#"
              className="text-[#121214] font-semibold hover:opacity-75 transition-opacity"
            >
              Malik Abubakkar
            </MagneticLink>
          </div>
        </div>
      </footer>
    </div>
  );
};
