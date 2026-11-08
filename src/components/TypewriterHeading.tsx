/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  HERO_ROTATING_PHRASES,
  HERO_STATIC_DESCRIPTION,
  getNextPhraseIndex,
} from '../utils/typewriter';

export const TypewriterHeading: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setDisplayedText(HERO_ROTATING_PHRASES[0]);
      return;
    }

    const currentFullPhrase = HERO_ROTATING_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < currentFullPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullPhrase.slice(0, displayedText.length + 1));
        }, 55);
      } else {
        // Finished typing phrase: pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullPhrase.slice(0, displayedText.length - 1));
        }, 30);
      } else {
        // Finished deleting: pause then switch to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => getNextPhraseIndex(prev));
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <div className="flex flex-col select-none max-w-lg">
      {/* 1. Animated Heading with reserved height to eliminate any layout shift */}
      <div
        className="flex items-center min-h-[1.75rem] sm:min-h-[2.1rem]"
        aria-live="polite"
      >
        <h2 className="font-hn text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#121214]">
          <span>{displayedText}</span>
          <span
            className="inline-block w-[2px] h-[0.9em] bg-[#121214] ml-1.5 align-middle animate-pulse opacity-90"
            aria-hidden="true"
          />
        </h2>
      </div>

      {/* 2. Important: Completely Static Description below heading (never shifts position) */}
      <p className="font-hn text-xs sm:text-[13px] text-neutral-600 leading-relaxed max-w-sm sm:max-w-md mt-1.5 tracking-normal">
        {HERO_STATIC_DESCRIPTION}
      </p>
    </div>
  );
};
