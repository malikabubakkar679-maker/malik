import React from 'react';

export default function Logo({
  className = "w-24 sm:w-28 md:w-32 h-auto",
  bgStroke = "#FAF7F0",
  color = "#20232B",
  colorM,
  colorA,
  monogramOnly = false,
}) {
  const mFill = colorM || color;
  const aFill = colorA || color;

  if (monogramOnly) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="60 30 290 180"
        className={className}
        aria-label="Malik Abubakkar Monogram"
      >
        <defs>
          <style>
            {`
              .logo-mono-m {
                font-family: 'Playfair Display', 'Cinzel', Georgia, serif;
                font-size: 210px;
                font-weight: 800;
                fill: ${mFill};
              }
              .logo-mono-a {
                font-family: 'Playfair Display', 'Cinzel', Georgia, serif;
                font-size: 210px;
                font-weight: 800;
                fill: ${aFill};
              }
            `}
          </style>
        </defs>

        <g transform="translate(45, 10)">
          <text x="25" y="190" className="logo-mono-m" letterSpacing="-0.04em">M</text>
          <text x="175" y="190" className="logo-mono-a" letterSpacing="-0.04em">A</text>
          <line x1="184" y1="25" x2="252" y2="195" stroke={bgStroke} strokeWidth="7" />
          <line x1="182" y1="25" x2="250" y2="195" stroke={mFill} strokeWidth="2.5" />
        </g>
      </svg>
    );
  }

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
            .logo-mono-m {
              font-family: 'Playfair Display', 'Cinzel', Georgia, serif;
              font-size: 225px;
              font-weight: 800;
              fill: ${mFill};
            }
            .logo-mono-a {
              font-family: 'Playfair Display', 'Cinzel', Georgia, serif;
              font-size: 225px;
              font-weight: 800;
              fill: ${aFill};
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
        <text x="25" y="200" className="logo-mono-m" letterSpacing="-0.04em">M</text>
        <text x="180" y="200" className="logo-mono-a" letterSpacing="-0.04em">A</text>
        <line x1="188" y1="30" x2="258" y2="205" stroke={bgStroke} strokeWidth="7" />
        <line x1="186" y1="30" x2="256" y2="205" stroke={mFill} strokeWidth="2.5" />
      </g>

      {/* Subtitle Text: MALIK ABUBAKKAR */}
      <text x="250" y="280" textAnchor="middle" className="logo-name-text">
        MALIK ABUBAKKAR
      </text>
    </svg>
  );
}
