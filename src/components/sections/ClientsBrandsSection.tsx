"use client";

import React from "react";

// Color Tokens
const COLORS = {
  bgBase: "#15110D",
  bgPanel: "#1B1714",
  gold: "#C9A96E",
  goldBright: "#E8C988",
  crimson: "#9A1B1B",
  parchment: "#F2EAE0",
};

// Brand Data
interface LogoItem {
  brand: string;
  alt: string;
  src: string;
}

const LOGO_HOSPITALITY: LogoItem[] = [
  { brand: "TAJ", src: "/logos/taj.png", alt: "Taj Hotels logo" },
  { brand: "IHCL", src: "/logos/ihcl.png", alt: "IHCL logo" },
  { brand: "The Leela", src: "/logos/the-leela.png", alt: "The Leela logo" },
  { brand: "Radisson Blu", src: "/logos/radisson.png", alt: "Radisson Blu logo" },
  { brand: "Accor", src: "/logos/accor.png", alt: "Accor logo" },
  { brand: "Royal Orchid Hotels", src: "/logos/royal-orchid.png", alt: "Royal Orchid Hotels logo" },
  { brand: "Lemon Tree Hotels", src: "/logos/lemontree.png", alt: "Lemon Tree Hotels logo" },
  { brand: "Ramada by Wyndham", src: "/logos/ramada.png", alt: "Ramada by Wyndham logo" },
  { brand: "Sarovar Hotels & Resorts", src: "/logos/sarovar.png", alt: "Sarovar Hotels logo" },
  { brand: "Sterling Holidays", src: "/logos/sterling.png", alt: "Sterling Holidays logo" }
];

const LOGO_CONSULTING: LogoItem[] = [
  { brand: "Synergy Consulting", src: "/logos/synergy.png", alt: "Synergy Consulting logo" },
  { brand: "Shapoorji Pallonji", src: "/logos/sp-infocity.png", alt: "Shapoorji Pallonji logo" },
  { brand: "JLL", src: "/logos/jll.png", alt: "JLL logo" },
  { brand: "CBRE", src: "/logos/cbre.png", alt: "CBRE logo" },
  { brand: "Colliers International", src: "/logos/colliers.png", alt: "Colliers International logo" },
  { brand: "Häfele", src: "/logos/hafele.png", alt: "Häfele logo" },
  { brand: "Hettich", src: "/logos/hettich_transparent_clean.png", alt: "Hettich logo" },
  { brand: "Dorn Bracht", src: "/logos/dorn-bracht.png", alt: "Dorn Bracht logo" },
  { brand: "Kaff", src: "/logos/kaff.png", alt: "Kaff logo" },
  { brand: "AGL (Asian Granito)", src: "/logos/asian-granito.png", alt: "Asian Granito logo" }
];


// Helper components
const SparkleIcon = ({ size = 8 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0L8.2 3.8L12 6L8.2 8.2L6 12L3.8 8.2L0 6L3.8 3.8L6 0Z" fill={COLORS.gold} />
  </svg>
);

// Dynamic Styled Brand Logo renderer
const getLogoHeight = (brand: string) => {
  switch (brand) {
    // Row 1 (Hospitality)
    case "TAJ":
      return "h-[34px] sm:h-10 md:h-12";
    case "IHCL":
      return "h-7 sm:h-9 md:h-10";
    case "The Leela":
      return "h-8 sm:h-10 md:h-11";
    case "Royal Orchid Hotels":
      return "h-9 sm:h-11 md:h-12";
    case "Lemon Tree Hotels":
      return "h-8 sm:h-10 md:h-11";
    case "Sarovar Hotels & Resorts":
      return "h-8 sm:h-10 md:h-11";
    case "Sterling Holidays":
      return "h-9 sm:h-11 md:h-12";
    case "Accor":
      return "h-8 sm:h-10 md:h-12";
    
    // Row 2 (Consulting / B2B)
    case "Synergy Consulting":
      return "h-9 sm:h-11 md:h-12";
    case "Shapoorji Pallonji":
      return "h-8 sm:h-10 md:h-11";
    case "CBRE":
      return "h-7 sm:h-9 md:h-10";
    case "Häfele":
      return "h-5 sm:h-7 md:h-8";
    case "Hettich":
      return "h-8 sm:h-10 md:h-11";
    case "Kaff":
      return "h-6 sm:h-8 md:h-9";
    case "Colliers International":
      return "h-8 sm:h-10 md:h-11";
    case "Dorn Bracht":
      return "h-8 sm:h-10 md:h-11";
    case "AGL (Asian Granito)":
      return "h-8 sm:h-10 md:h-11";
    
    default:
      return "h-8 sm:h-10 md:h-11";
  }
};

// Dynamic Styled Brand Logo renderer using Cloudinary URLs
const BrandLogo = ({ logo }: { logo: LogoItem }) => {
  const heightClass = getLogoHeight(logo.brand);
  return (
    <img 
      src={logo.src} 
      alt={logo.alt} 
      loading="lazy" 
      className={`${heightClass} w-auto max-w-[104px] sm:max-w-[145px] md:max-w-[170px] object-contain transition-transform duration-500 hover:scale-105`} 
    />
  );
};


// Generate deterministic static particles to prevent hydration mismatches
const STATIC_PARTICLES = Array.from({ length: 100 }, (_, i) => {
  const seed1 = Math.sin(i + 1) * 10000;
  const seed2 = Math.cos(i + 2) * 10000;
  const seed3 = Math.sin(i + 3) * 10000;
  
  const cx = `${Math.floor((seed1 - Math.floor(seed1)) * 100)}%`;
  const cy = `${Math.floor((seed2 - Math.floor(seed2)) * 100)}%`;
  const r = ((seed3 - Math.floor(seed3)) * 1.8 + 0.8).toFixed(1);
  const opacity = ((seed1 + seed2 - Math.floor(seed1 + seed2)) * 0.25 + 0.15).toFixed(2);
  
  return { cx, cy, r: parseFloat(r), opacity: parseFloat(opacity) };
});

const WAVE_PARTICLES = Array.from({ length: 45 }, (_, i) => {
  const seed1 = Math.sin(i + 4) * 10000;
  const seed2 = Math.cos(i + 5) * 10000;
  
  // concentrated on the left third (cx: 0% to 35%)
  const cx = `${Math.floor((seed1 - Math.floor(seed1)) * 35)}%`;
  const cy = `${Math.floor((seed2 - Math.floor(seed2)) * 50 + 35)}%`;
  const r = ((seed1 - Math.floor(seed1)) * 1.5 + 0.8).toFixed(1);
  const opacity = ((seed2 - Math.floor(seed2)) * 0.35 + 0.2).toFixed(2);
  
  return { cx, cy, r: parseFloat(r), opacity: parseFloat(opacity) };
});

// Reusable Marquee strip component
interface MarqueeStripProps {
  logos: LogoItem[];
  direction?: "left" | "right";
}

const MarqueeStrip = ({ logos, direction = "left" }: MarqueeStripProps) => {
  const trackAnimation = direction === "right" ? "animate-scroll-right" : "animate-scroll-left";
  
  return (
    <div className="group relative w-full max-w-full h-[78px] sm:h-[92px] md:h-[102px] lg:h-[112px] rounded-xl sm:rounded-[18px] overflow-hidden [contain:paint] border border-[#C9A96E]/30 bg-gradient-to-b from-[#2A231C]/95 to-[#120E0B]/98 flex items-center shadow-gold-glow">
      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-[#C9A96E]/50 blur-[6px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[#C9A96E]/50 blur-[6px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-[#C9A96E]/50 blur-[6px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#C9A96E]/50 blur-[6px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Nav arrows (visual only, thin chevron glyphs, show on hover) */}
      <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 text-[#C9A96E] text-xl md:text-2xl font-light opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none select-none hidden sm:block">
        ‹
      </div>
      <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 text-[#C9A96E] text-xl md:text-2xl font-light opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none select-none hidden sm:block">
        ›
      </div>

      {/* Edge fading mask & scrolling logo track */}
      <div 
        className="w-full h-full overflow-hidden flex items-center"
        style={{
          maskImage: "linear-gradient(to right, transparent 0, black clamp(16px, 7vw, 64px), black calc(100% - clamp(16px, 7vw, 64px)), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0, black clamp(16px, 7vw, 64px), black calc(100% - clamp(16px, 7vw, 64px)), transparent 100%)"
        }}
      >
        <div className={`flex items-center w-max h-full group-hover:[animation-play-state:paused] ${trackAnimation}`}>
          {logos.concat(logos).map((logo, idx) => (
            <div 
              key={`${logo.brand}-${idx}`} 
              className="flex-shrink-0 flex items-center justify-center px-4 sm:px-8 md:px-10 lg:px-12 h-full border-r border-white/5 min-w-[112px] sm:min-w-[150px] md:min-w-[172px] lg:min-w-[190px]"
            >
              <BrandLogo logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default function ClientsBrandsSection() {
  return (
    <section 
      className="relative w-full overflow-hidden [contain:paint] select-none"
      style={{ 
        backgroundColor: COLORS.bgBase, 
        padding: "clamp(42px, 7vw, 60px) clamp(16px, 6vw, 96px) clamp(92px, 12vw, 150px)" 
      }}
    >
      {/* Background Style Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.95; }
        }
        .animate-scroll-left {
          animation: scroll-left 50s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 50s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 20s ease-in-out infinite;
        }
        .shadow-gold-glow {
          box-shadow: 0 0 30px rgba(201, 168, 76, 0.08);
        }
      `}} />

      {/* SVG Grain Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.8  0 0 0 0 0.7  0 0 0 0 0.6  0 0 0 0.04 0" />
        </filter>
      </svg>

      {/* Layer 1: Base radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          background: "radial-gradient(circle at center, #1B1714 0%, #15110D 100%)"
        }}
      />

      {/* Layer 2: Gold particle field */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.2] sm:opacity-[0.28] lg:opacity-[0.35] animate-shimmer pointer-events-none z-0" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {STATIC_PARTICLES.map((p, idx) => (
          <circle key={`bg-p-${idx}`} cx={p.cx} cy={p.cy} r={p.r} fill={COLORS.gold} opacity={p.opacity} />
        ))}
      </svg>

      {/* Layer 3: Diagonal gold light streak */}
      <div 
        className="absolute top-0 right-0 hidden sm:block w-[min(520px,56vw)] h-[120px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent rotate-[25deg] blur-[40px] -translate-y-1/4 pointer-events-none z-0" 
      />

      {/* Layer 4: Fine grain texture overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none z-0">
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Header Block */}
        <div className="w-full max-w-[760px] mx-auto text-center mb-8 sm:mb-10 lg:mb-14">
          {/* Eyebrow */}
          <div className="relative inline-flex max-w-full flex-col items-center mb-4 sm:mb-6">
            <div className="absolute -top-5 left-[55%] hidden min-[380px]:block">
              <SparkleIcon size={12} />
            </div>
            <div className="flex max-w-full items-center justify-center gap-2 sm:gap-3">
              <span className="w-6 sm:w-10 h-[1px] shrink-0" style={{ backgroundColor: COLORS.crimson }} />
              <span className="text-[10px] min-[390px]:text-[11px] sm:text-[12px] font-bold tracking-[0.14em] sm:tracking-[0.2em] leading-snug text-center" style={{ color: COLORS.crimson, fontFamily: "var(--font-sans)" }}>
                TRUSTED BY VISIONARIES.
              </span>
              <span className="w-6 sm:w-10 h-[1px] shrink-0" style={{ backgroundColor: COLORS.crimson }} />
            </div>
          </div>

          {/* Headline */}
          <h2 
            className="font-serif uppercase text-center font-normal tracking-tight max-w-full" 
            style={{ 
              fontSize: "clamp(28px, 7.5vw, 56px)", 
              lineHeight: "1.08", 
              fontFamily: "var(--font-serif)" 
            }}
          >
            <span style={{ color: COLORS.parchment }}>COLLABORATIONS THAT CREATE</span>
            <br />
            <span style={{ color: COLORS.crimson }}>
              ICONIC SPACES.
              <span className="inline-block ml-1 align-super">
                <SparkleIcon size={14} />
              </span>
            </span>
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center" style={{ margin: "clamp(18px, 4vw, 24px) auto" }}>
            <div className="w-[45px] h-[1px]" style={{ backgroundColor: COLORS.gold }} />
            <div className="mx-2 w-[8px] h-[8px] rotate-45 border" style={{ borderColor: COLORS.gold, backgroundColor: "transparent" }} />
            <div className="w-[45px] h-[1px]" style={{ backgroundColor: COLORS.gold }} />
          </div>
        </div>

        {/* Marquee Strips Wrapper */}
        <div className="w-full max-w-full flex flex-col gap-3 sm:gap-4 lg:gap-5">
          <MarqueeStrip logos={LOGO_HOSPITALITY} direction="left" />
          <MarqueeStrip logos={LOGO_CONSULTING} direction="right" />
        </div>

        {/* Bottom Divider */}
        <div className="flex items-center justify-center mt-10 sm:mt-16 lg:mt-24 mb-3 sm:mb-6 lg:mb-8">
          <SparkleIcon size={10} />
          <span className="w-8 h-[1px] mx-3" style={{ backgroundColor: COLORS.gold }} />
          <div className="w-[8px] h-[8px] rotate-45 border" style={{ borderColor: COLORS.gold, backgroundColor: "transparent" }} />
          <span className="w-8 h-[1px] mx-3" style={{ backgroundColor: COLORS.gold }} />
          <SparkleIcon size={10} />
        </div>
      </div>

      {/* Bottom Wave Graphic */}
      <div className="absolute bottom-0 left-0 w-full h-[72px] sm:h-[110px] lg:h-[160px] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.gold} stopOpacity="0" />
              <stop offset="50%" stopColor={COLORS.gold} stopOpacity="0.45" />
              <stop offset="100%" stopColor={COLORS.gold} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.gold} stopOpacity="0" />
              <stop offset="30%" stopColor={COLORS.gold} stopOpacity="0.3" />
              <stop offset="100%" stopColor={COLORS.gold} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.gold} stopOpacity="0" />
              <stop offset="70%" stopColor={COLORS.gold} stopOpacity="0.2" />
              <stop offset="100%" stopColor={COLORS.gold} stopOpacity="0" />
            </linearGradient>
            <filter id="wave-glow">
              <feGaussianBlur stdDeviation="2.0" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Wave Paths */}
          <path d="M0,80 C360,130 720,30 1080,110 C1260,150 1350,110 1440,90" fill="none" stroke="url(#wave-grad-1)" strokeWidth="2" filter="url(#wave-glow)" />
          <path d="M0,110 C240,60 600,140 960,70 C1200,30 1320,100 1440,120" fill="none" stroke="url(#wave-grad-2)" strokeWidth="1.5" filter="url(#wave-glow)" />
          <path d="M0,50 C480,100 960,20 1440,80" fill="none" stroke="url(#wave-grad-3)" strokeWidth="1" filter="url(#wave-glow)" opacity="0.8" />
          
          {/* Wave particles concentrated along the crest on the left third */}
          {WAVE_PARTICLES.map((p, idx) => (
            <circle key={`wave-p-${idx}`} cx={p.cx} cy={p.cy} r={p.r} fill={COLORS.goldBright} opacity={p.opacity} />
          ))}
        </svg>
      </div>
    </section>
  );
}
