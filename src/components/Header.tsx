/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  NAV_LINKS,
  SOCIAL_LINKS,
  getDesktopNavDelay,
  getDesktopSocialDelay,
} from '../utils/portfolio';
import { MagneticLink } from './MagneticLink';

interface HeaderProps {
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
  isScrolled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isDrawerOpen,
  onToggleDrawer,
  isScrolled = false,
}) => {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 flex items-start justify-between px-6 sm:px-10 transition-all duration-500 ${
        isScrolled
          ? 'py-4 sm:py-5 bg-[#0b0b0b]/85 backdrop-blur-md border-b border-cream/10 shadow-lg'
          : 'pt-6 sm:pt-8 bg-transparent'
      }`}
    >
      {/* Brand / logo link */}
      <MagneticLink
        href="#"
        className="anim-fade-up font-hn text-lg tracking-wide text-cream transition-opacity duration-300 hover:opacity-60"
        style={{ animationDelay: '800ms' }}
      >
        Malik
      </MagneticLink>

      {/* Desktop Cluster: Year, Nav, Social */}
      <div className="hidden sm:flex items-start gap-16 lg:gap-24 text-cream font-hn">
        {/* Year */}
        <span
          className="anim-fade-up text-sm text-cream select-none"
          style={{ animationDelay: '900ms' }}
        >
          2025
        </span>

        {/* Nav column */}
        <nav
          className="flex flex-col gap-0.5 text-sm"
          aria-label="Desktop Navigation"
        >
          {NAV_LINKS.map((item, idx) => (
            <MagneticLink
              key={item.label}
              href={item.href}
              className="anim-fade-up text-cream transition-opacity duration-300 hover:opacity-60"
              style={{ animationDelay: `${getDesktopNavDelay(idx)}ms` }}
            >
              {item.label}
            </MagneticLink>
          ))}
        </nav>

        {/* Social column */}
        <div
          className="flex flex-col gap-0.5 text-sm"
          aria-label="Desktop Social Links"
        >
          {SOCIAL_LINKS.map((item, idx) => (
            <MagneticLink
              key={item.label}
              href={item.href}
              className="anim-fade-up text-cream transition-opacity duration-300 hover:opacity-60"
              style={{ animationDelay: `${getDesktopSocialDelay(idx)}ms` }}
            >
              {item.label}
            </MagneticLink>
          ))}
        </div>
      </div>

      {/* Mobile-only hamburger */}
      <button
        type="button"
        onClick={onToggleDrawer}
        aria-label={isDrawerOpen ? 'Toggle menu' : 'Open menu'}
        aria-expanded={isDrawerOpen}
        className="anim-fade-up sm:hidden z-50 flex h-10 w-10 items-center justify-center -mr-2 -mt-2 p-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-cream/50"
        style={{ animationDelay: '900ms' }}
      >
        <div className="relative flex h-4 w-6 flex-col justify-between">
          <span
            className={`h-0.5 w-6 rounded-full bg-cream transition-all duration-500 origin-center [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
              isDrawerOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-cream transition-opacity duration-300 ${
              isDrawerOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-cream transition-all duration-500 origin-center [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
              isDrawerOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </div>
      </button>
    </header>
  );
};
