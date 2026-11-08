/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import {
  NAV_LINKS,
  SOCIAL_LINKS,
  getMobileNavDelay,
  getMobileSocialDelay,
} from '../utils/portfolio';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className="sm:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-in panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={`fixed right-0 top-0 bottom-0 z-40 w-[80%] max-w-sm bg-[#FAF8F5] text-[#121214] px-8 py-10 shadow-2xl flex flex-col justify-between transition-transform duration-600 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button with Lucide X */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className={`absolute right-6 top-6 text-[#121214] p-1 transition-all duration-300 focus:outline-none ${
            isOpen
              ? 'rotate-0 opacity-100 delay-300 pointer-events-auto'
              : 'rotate-90 opacity-0 pointer-events-none'
          }`}
        >
          <X size={26} strokeWidth={1.5} />
        </button>

        {/* Top Section: Site Index & Nav links */}
        <div className="pt-10">
          <p
            className={`font-hn text-xs uppercase tracking-[0.2em] text-neutral-400 transition-all duration-500 ${
              isOpen
                ? 'translate-y-0 opacity-100 delay-[250ms]'
                : 'translate-y-4 opacity-0'
            }`}
          >
            Site Index
          </p>

          <nav className="mt-8 flex flex-col gap-5" aria-label="Mobile Site Index">
            {NAV_LINKS.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`font-hn text-4xl text-[#121214] transition-all duration-500 hover:opacity-60 active:opacity-40 ${
                  isOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen ? `${getMobileNavDelay(idx)}ms` : '0ms',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Find Me & Social links */}
        <div className="pb-4">
          <p
            className={`font-hn text-xs uppercase tracking-[0.2em] text-neutral-400 transition-all duration-500 ${
              isOpen
                ? 'translate-y-0 opacity-100 delay-[500ms]'
                : 'translate-y-4 opacity-0'
            }`}
          >
            Find Me
          </p>

          <div
            className="mt-4 flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Mobile Social Links"
          >
            {SOCIAL_LINKS.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`font-hn text-sm text-[#121214] transition-all duration-500 hover:opacity-60 active:opacity-40 ${
                  isOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen
                    ? `${getMobileSocialDelay(idx)}ms`
                    : '0ms',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
