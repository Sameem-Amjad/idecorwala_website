import React from "react";

/* ============================================================
   STAT STRIP ICONS
   All gold stroke, no fill, ~28px viewBox
   ============================================================ */

const iconStyle = {
  stroke: "var(--color-gold)",
  strokeWidth: "1.2",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ProjectsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
      {/* Two buildings */}
      <rect x="2"  y="10" width="10" height="16" {...iconStyle} />
      <rect x="16" y="6"  width="10" height="20" {...iconStyle} />
      {/* Windows on left building */}
      <rect x="4"  y="13" width="2"  height="2"  {...iconStyle} />
      <rect x="8"  y="13" width="2"  height="2"  {...iconStyle} />
      <rect x="4"  y="18" width="2"  height="2"  {...iconStyle} />
      <rect x="8"  y="18" width="2"  height="2"  {...iconStyle} />
      {/* Windows on right building */}
      <rect x="18" y="9"  width="2"  height="2"  {...iconStyle} />
      <rect x="22" y="9"  width="2"  height="2"  {...iconStyle} />
      <rect x="18" y="14" width="2"  height="2"  {...iconStyle} />
      <rect x="22" y="14" width="2"  height="2"  {...iconStyle} />
      {/* Ground line */}
      <line x1="1" y1="26" x2="27" y2="26" {...iconStyle} />
    </svg>
  );
}

export function SqFtIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
      {/* Floor plan outline */}
      <rect x="3" y="3" width="22" height="22" {...iconStyle} />
      {/* Interior grid lines — floor plan feel */}
      <line x1="3"  y1="13" x2="14" y2="13" {...iconStyle} />
      <line x1="14" y1="3"  x2="14" y2="25" {...iconStyle} />
      <line x1="14" y1="18" x2="25" y2="18" {...iconStyle} />
      {/* Measurement arrows */}
      <line x1="5"  y1="2"  x2="23" y2="2"  {...iconStyle} strokeOpacity="0.5" />
      <line x1="5"  y1="1.5" x2="5" y2="2.5" {...iconStyle} strokeOpacity="0.5" />
      <line x1="23" y1="1.5" x2="23" y2="2.5" {...iconStyle} strokeOpacity="0.5" />
    </svg>
  );
}

export function ClientsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
      {/* Center person */}
      <circle cx="14" cy="9"  r="3.5" {...iconStyle} />
      <path d="M7 26c0-3.866 3.134-7 7-7s7 3.134 7 7" {...iconStyle} />
      {/* Left person */}
      <circle cx="6"  cy="11" r="2.5" {...iconStyle} strokeOpacity="0.7" />
      <path d="M1 26c0-2.761 2.239-5 5-5" {...iconStyle} strokeOpacity="0.7" />
      {/* Right person */}
      <circle cx="22" cy="11" r="2.5" {...iconStyle} strokeOpacity="0.7" />
      <path d="M27 26c0-2.761-2.239-5-5-5" {...iconStyle} strokeOpacity="0.7" />
    </svg>
  );
}

export function YearsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
      {/* Badge / seal outer shape */}
      <path
        d="M14 2 L16.5 5.5 L21 4.5 L21.5 9 L26 10.5 L24 14 L26 17.5 L21.5 19 L21 23.5 L16.5 22.5 L14 26 L11.5 22.5 L7 23.5 L6.5 19 L2 17.5 L4 14 L2 10.5 L6.5 9 L7 4.5 L11.5 5.5 Z"
        {...iconStyle}
      />
      {/* Checkmark inside */}
      <polyline points="9,14 12.5,17.5 19,10.5" {...iconStyle} />
    </svg>
  );
}

export function LocationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
      {/* Pin shape */}
      <path
        d="M14 3C10.134 3 7 6.134 7 10c0 5.25 7 15 7 15s7-9.75 7-15c0-3.866-3.134-7-7-7z"
        {...iconStyle}
      />
      {/* Center dot */}
      <circle cx="14" cy="10" r="2.5" {...iconStyle} />
      {/* Ground shadow ellipse */}
      <ellipse cx="14" cy="25" rx="4" ry="1.2" {...iconStyle} strokeOpacity="0.4" />
    </svg>
  );
}
