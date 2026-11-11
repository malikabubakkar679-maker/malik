import React from 'react';

export default function Logo({
  className = "w-24 sm:w-28 md:w-32 h-auto",
  bgStroke = "#F8F4EA",
  color = "#292C35"
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 25 500 270"
      className={className}
      aria-label="Malik Abubakkar Monogram Logo"
    >
      <defs>
        <style>
          {`
            .logo-monogram {
              font-family: 'Playfair Display', 'Cinzel', Georgia, serif;
              font-size: 225px;
              font-weight: 800;
              fill: ${color};
            }
            .logo-name-text {
              font-family: 'Playfair Display', 'Cinzel', Georgia, serif;
              font-size: 36px;
              font-weight: 800;
              letter-spacing: 0.18em;
              fill: ${color};
            }
          `}
        </style>
      </defs>

      {/* Interlocking MA Monogram */}
      <g transform="translate(45, 10)">
        <text x="25" y="200" className="logo-monogram" letterSpacing="-0.04em">M</text>
        <text x="180" y="200" className="logo-monogram" letterSpacing="-0.04em">A</text>
        <line x1="188" y1="30" x2="258" y2="205" stroke={bgStroke} strokeWidth="7" />
        <line x1="186" y1="30" x2="256" y2="205" stroke={color} strokeWidth="2.5" />
      </g>

      {/* Subtitle Text: MALIK ABUBAKKAR */}
      <text x="250" y="280" textAnchor="middle" className="logo-name-text">
        MALIK ABUBAKKAR
      </text>
    </svg>
  );
}

