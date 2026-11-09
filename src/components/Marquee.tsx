/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MarqueeProps {
  style?: React.CSSProperties;
}

export const Marquee: React.FC<MarqueeProps> = ({ style }) => {
  return (
    <div
      className="anim-fade-up absolute inset-x-0 top-[14vh] sm:top-[12vh] z-10 overflow-hidden pointer-events-none select-none will-change-transform"
      style={{ animationDelay: '500ms', ...style }}
      aria-hidden="true"
    >
      <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] sm:text-[26vh] font-normal tracking-tight leading-none text-[#121214]/[0.08]">
        <span className="pr-[6vw]">Malik &mdash; Abubakkar{'\u00A0'}</span>
        <span className="pr-[6vw]">Malik &mdash; Abubakkar{'\u00A0'}</span>
      </div>
    </div>
  );
};
