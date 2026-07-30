type SketchType = "flatlay" | "building-portrait" | "building-landscape";

interface ArchSketchPlaceholderProps {
  caption: string;
  sketchType: SketchType;
  className?: string;
}

const baseStroke = {
  stroke: "#8B7550",
  strokeWidth: 0.8,
  fill: "none",
  opacity: 0.5,
};

function FlatlaySketch() {
  return (
    <svg aria-hidden="true" viewBox="0 0 640 480" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="flatlay-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" stroke="#A89060" strokeWidth="0.45" fill="none" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="640" height="480" fill="url(#flatlay-grid)" opacity="0.7" />
      <g {...baseStroke}>
        <rect x="330" y="64" width="190" height="250" transform="rotate(10 425 189)" />
        <rect x="350" y="88" width="56" height="70" transform="rotate(10 378 123)" />
        <rect x="420" y="96" width="64" height="84" transform="rotate(10 452 138)" />
        <path d="M360 230h135M370 260h98M380 190h82M405 104v206M455 116v188" />
        <rect x="120" y="92" width="180" height="150" />
        <path d="M120 152h180M180 92v150M240 92v150M142 116h42v36h-42zM202 168h70v48h-70z" />
        <path d="M150 360 252 302 364 360 260 420Z" />
        <path d="M252 302v-82l112 60v80M150 360v-86l102-54" />
        <path d="M196 330l112-62M222 374l106-60" />
        <path d="M82 300h104v86H82zM108 322h78M108 344h78M108 366h78" />
        <path d="M506 352 168 96" strokeWidth="2" opacity="0.35" />
        <path d="M492 340 522 374M500 332 534 368" />
      </g>
      <g stroke="#A89060" strokeWidth="0.8" opacity="0.35">
        <path d="M74 404h130M74 420h130M74 436h130" />
        <path d="M540 54l46 70M554 50l46 70M568 48l46 70" />
      </g>
    </svg>
  );
}

function BuildingPortraitSketch() {
  return (
    <svg aria-hidden="true" viewBox="0 0 480 640" className="absolute inset-0 h-full w-full">
      <g {...baseStroke}>
        <path d="M128 504V146l170-58 84 58v358" />
        <path d="M128 146l170 58 84-58M298 88v416" />
        {Array.from({ length: 8 }).map((_, index) => (
          <path key={`floor-${index}`} d={`M128 ${188 + index * 38}h254M150 ${178 + index * 38}l148 50 62-42`} />
        ))}
        {Array.from({ length: 5 }).map((_, index) => (
          <path key={`vertical-${index}`} d={`M${160 + index * 34} 156v334M${322 + index * 12} 168v320`} />
        ))}
        <path d="M92 504h330M108 544h300" />
        <path d="M80 504c18-54 70-54 88 0M74 506c28-24 64-24 100 0" />
        <path d="M342 504c18-48 64-48 80 0M336 506c22-22 58-22 92 0" />
      </g>
      <g stroke="#6B5A3A" strokeWidth="0.6" opacity="0.35">
        <path d="M150 190l186 114M150 232l186 114M150 274l186 114M150 316l186 114" />
        <path d="M332 188l36 20M332 226l36 20M332 264l36 20M332 302l36 20" />
      </g>
    </svg>
  );
}

function BuildingLandscapeSketch() {
  return (
    <svg aria-hidden="true" viewBox="0 0 640 480" className="absolute inset-0 h-full w-full">
      <g {...baseStroke}>
        <path d="M116 326V176l164-70 240 82v138" />
        <path d="M116 176l244 72 160-60M360 248v116M280 106v222" />
        <path d="M148 214h356M148 250h356M148 286h356" />
        {Array.from({ length: 9 }).map((_, index) => (
          <path key={`facade-${index}`} d={`M${168 + index * 38} 194v128`} />
        ))}
        <path d="M72 326h508M120 362h430" />
        <path d="M92 326c12-42 48-42 62 0M82 328c24-22 56-22 82 0" />
        <path d="M526 326c12-42 48-42 62 0M516 328c24-22 56-22 82 0" />
        <path d="M218 326v-56h72v56M386 326v-72h80v72" />
      </g>
      <g stroke="#8B7550" strokeWidth="0.7" opacity="0.35">
        <path d="M150 214l166 92M190 200l166 92M230 188l166 92M270 176l166 92" />
      </g>
    </svg>
  );
}

export default function ArchSketchPlaceholder({
  caption,
  sketchType,
  className = "",
}: ArchSketchPlaceholderProps) {
  const gradient =
    sketchType === "building-portrait"
      ? "linear-gradient(180deg, #C8BDA0 0%, #9A8A6A 100%)"
      : sketchType === "building-landscape"
        ? "linear-gradient(135deg, #E8E0D0 0%, #CFC4A8 100%)"
        : "linear-gradient(135deg, #E8E0D0 0%, #D4C9B0 50%, #C8BDA0 100%)";

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: gradient,
        boxShadow: "inset 0 0 60px rgba(139,105,20,0.08)",
      }}
    >
      {sketchType === "flatlay" && <FlatlaySketch />}
      {sketchType === "building-portrait" && <BuildingPortraitSketch />}
      {sketchType === "building-landscape" && <BuildingLandscapeSketch />}
      <p className="absolute bottom-4 left-4 max-w-[82%] font-sans text-[11px] leading-relaxed text-[var(--ink-mid)] opacity-70">
        {caption}
      </p>
    </div>
  );
}
