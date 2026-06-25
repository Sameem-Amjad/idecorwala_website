"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// SVGs for Left Column Metrics Icons
const BuildingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#lustrousGold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 transition-all duration-300 hover:brightness-125 drop-shadow-[0_0_8px_rgba(201,160,91,0.7)]">
    <defs>
      <linearGradient id="lustrousGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFECA6" />
        <stop offset="25%" stopColor="#F5D07B" />
        <stop offset="50%" stopColor="#C9A05B" />
        <stop offset="75%" stopColor="#A47D3A" />
        <stop offset="100%" stopColor="#EAD28B" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
    <path d="M9 22V12h6v10" />
    <path d="M8 6h2" />
    <path d="M14 6h2" />
    <path d="M8 10h2" />
    <path d="M14 10h2" />
    <path d="M14 14h2" />
    <path d="M8 14h2" />
  </svg>
);

const PeopleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#lustrousGold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 transition-all duration-300 hover:brightness-125 drop-shadow-[0_0_8px_rgba(201,160,91,0.7)]">
    <defs>
      <linearGradient id="lustrousGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFECA6" />
        <stop offset="25%" stopColor="#F5D07B" />
        <stop offset="50%" stopColor="#C9A05B" />
        <stop offset="75%" stopColor="#A47D3A" />
        <stop offset="100%" stopColor="#EAD28B" />
      </linearGradient>
    </defs>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const AwardIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#lustrousGold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 transition-all duration-300 hover:brightness-125 drop-shadow-[0_0_8px_rgba(201,160,91,0.7)]">
    <defs>
      <linearGradient id="lustrousGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFECA6" />
        <stop offset="25%" stopColor="#F5D07B" />
        <stop offset="50%" stopColor="#C9A05B" />
        <stop offset="75%" stopColor="#A47D3A" />
        <stop offset="100%" stopColor="#EAD28B" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const LocationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#lustrousGold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 transition-all duration-300 hover:brightness-125 drop-shadow-[0_0_8px_rgba(201,160,91,0.7)]">
    <defs>
      <linearGradient id="lustrousGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFECA6" />
        <stop offset="25%" stopColor="#F5D07B" />
        <stop offset="50%" stopColor="#C9A05B" />
        <stop offset="75%" stopColor="#A47D3A" />
        <stop offset="100%" stopColor="#EAD28B" />
      </linearGradient>
    </defs>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// SVGs for Bottom Commitment Banner Icons
const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bannerGoldStroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 hover:brightness-110 drop-shadow-[0_0_10px_rgba(201,160,91,0.28)]">
    <defs>
      <linearGradient id="bannerGoldStroke" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E6C98A" />
        <stop offset="0.48" stopColor="#C7A25A" />
        <stop offset="1" stopColor="#8F6A2F" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const SpeedometerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bannerGoldStrokeSpeed)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 hover:brightness-110 drop-shadow-[0_0_10px_rgba(201,160,91,0.28)]">
    <defs>
      <linearGradient id="bannerGoldStrokeSpeed" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E6C98A" />
        <stop offset="0.48" stopColor="#C7A25A" />
        <stop offset="1" stopColor="#8F6A2F" />
      </linearGradient>
    </defs>
    <path d="M12 2a10 10 0 0 0-10 10h4a6 6 0 0 1 12 0h4A10 10 0 0 0 12 2z" />
    <path d="M12 12l4-4" />
  </svg>
);

const ProfitabilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bannerGoldStrokeProfit)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 hover:brightness-110 drop-shadow-[0_0_10px_rgba(201,160,91,0.28)]">
    <defs>
      <linearGradient id="bannerGoldStrokeProfit" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E6C98A" />
        <stop offset="0.48" stopColor="#C7A25A" />
        <stop offset="1" stopColor="#8F6A2F" />
      </linearGradient>
    </defs>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <path d="M2 20h20" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bannerGoldStrokeShield)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 hover:brightness-110 drop-shadow-[0_0_10px_rgba(201,160,91,0.28)]">
    <defs>
      <linearGradient id="bannerGoldStrokeShield" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E6C98A" />
        <stop offset="0.48" stopColor="#C7A25A" />
        <stop offset="1" stopColor="#8F6A2F" />
      </linearGradient>
    </defs>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 11l2 2 4-4" />
  </svg>
);

// Showcase Region panel configuration
const PANELS = [
  {
    id: 0,
    title: "HOSPITALITY",
    subtitle: "Creating memorable stays that guests love.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    icon: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
  {
    id: 1,
    title: "CORPORATE",
    subtitle: "Workplaces designed for performance and productivity.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    icon: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "RESIDENTIAL",
    subtitle: "Personalized spaces that reflect you.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    icon: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
        <path d="M2 14v-3a2 2 0 0 1 2-2h2" />
        <path d="M20 9h2a2 2 0 0 1 2 2v3" />
        <path d="M4 14h16v3H4v-3z" />
        <path d="M6 17v3M18 17v3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "INFRASTRUCTURE",
    subtitle: "Building foundations for a better tomorrow.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    icon: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
        <path d="M9 22v-4" />
      </svg>
    ),
  }
];

export default function IndustriesWeServeSection() {
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isShowcaseInView = useInView(showcaseRef, { amount: 0.35, once: true });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isShowcaseInView) return;

    const reset = window.setTimeout(() => {
      setActivePanel(0);
    }, 0);
    const cycle = window.setInterval(() => {
      setActivePanel((prev) => (prev + 1) % PANELS.length);
    }, 2800);

    return () => {
      window.clearTimeout(reset);
      window.clearInterval(cycle);
    };
  }, [isShowcaseInView]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    // Set custom CSS variables directly on the style of the section element
    // to prevent continuous React re-renders on mousemove
    const target = e.currentTarget as HTMLElement;
    target.style.setProperty("--mouse-x", `${x * 6}px`);
    target.style.setProperty("--mouse-y", `${y * 6}px`);
  };

  const handleMouseLeaveSection = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.setProperty("--mouse-x", "0px");
    target.style.setProperty("--mouse-y", "0px");
  };

  // 20% viewport reveal trigger parameters
  const sectionViewport = { once: true, amount: 0.2 };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveSection}
      initial={{ opacity: 0.95 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="w-full relative flex items-center justify-center lg:h-[1200px] py-20 lg:py-0"
      style={{
        backgroundColor: "#E8D5B0",
        overflowX: "clip",
        overflowY: "visible",
        marginTop: "-50px",
        paddingTop: isMobile ? "240px" : "280px",
        paddingBottom: isMobile ? "85px" : "80px",
      }}
    >
      {/* Isolated Static Background Texture Layer (GPU rasterized once) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundColor: "#E8D5B0", // Airy warm cream beige base
          backgroundImage: `
            url("https://www.transparenttextures.com/patterns/cream-paper.png")
          `,
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
          opacity: 0.95,
        }}
      />

      {/* Cinematic Ambient Vignette Layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 3,
          background: "radial-gradient(circle at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.06) 100%)",
        }}
      />

      {/* Prominent Crumpled Paper Texture Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage: `url("https://www.transparenttextures.com/patterns/crumpled-paper.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "550px 550px",
          opacity: 0.28, // Prominently visible
          mixBlendMode: "multiply",
        }}
      />

      {/* Tactile Handmade Paper / Grain Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          backgroundImage: `url("https://www.transparenttextures.com/patterns/handmade-paper.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "600px 600px",
          opacity: 0.18, // Prominent grain texture
          mixBlendMode: "multiply",
        }}
      />

      {/* ── GRADIENT ARCHITECTURAL SHADOW (Fades Left to Right) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px", 
          left: "-5%",
          width: "110%",
          height: "400px",
          pointerEvents: "none",
          zIndex: 15, // Sits strictly BEHIND the textured S-curve div
          /* Fades the shadow from strong on the left to nothing on the right */
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 40%, transparent 85%)",
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 40%, transparent 85%)",
          /* Massive CSS blur for the authentic cast-shadow effect */
          filter: "blur(22px)",
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          {/* Deep, heavy ambient occlusion shadow near the physical edge */}
          <path 
            d="M 0,40 C 35,60 65,30 100,50" 
            fill="none" 
            stroke="rgba(40, 20, 5, 0.9)" 
            strokeWidth="10" 
            vectorEffect="non-scaling-stroke" 
            transform="translate(0, 3)" 
          />
          {/* Massive, wide architectural cast shadow projecting downwards */}
          <path 
            d="M 0,40 C 35,60 65,30 100,50" 
            fill="none" 
            stroke="rgba(60, 30, 10, 0.7)" 
            strokeWidth="35" 
            vectorEffect="non-scaling-stroke" 
            transform="translate(0, 10)" 
          />
        </svg>
      </div>
      {/* ── MASSIVE ASYMMETRICAL S-CURVE OVERLAP ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-50px", // Just enough overlap to blend into previous section
          left: "-5%", // Prevents horizontal edge clipping
          width: "110%",
          height: "400px", // Sufficient height for the shadow to drop without clipping
          pointerEvents: "none",
          zIndex: 20,
          /* CRITICAL: Fades the top 50px of the overlay so the noise textures blend seamlessly without a straight line seam! */
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 50px)",
          maskImage: "linear-gradient(to bottom, transparent 0px, black 50px)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#090909",
            /* EXACT texture match from the previous section to completely hide the seam */
            backgroundImage: `url("https://www.transparenttextures.com/patterns/black-paper.png")`,
            backgroundRepeat: "repeat",
            backgroundSize: "600px 600px",
            clipPath: "url(#s-curve-clip)",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            contain: "strict",
          }}
        />
      </div>

      {/* ── PREMIUM LUSTROUS PURE-GOLD RIM ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-50px", // Exactly matches the background div
          left: "-5%", // Exactly matches the background div
          width: "110%", // Exactly matches the background div
          height: "400px", // Exactly matches the background div
          pointerEvents: "none",
          zIndex: 25, // Sits strictly ON TOP of the textured curved section edge
          /* High-end metallic gold bloom/glow shadows */
          filter: "drop-shadow(0px 8px 12px rgba(212, 175, 55, 0.4)) drop-shadow(0px 16px 28px rgba(184, 134, 11, 0.25))",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="s-curve-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8F631B" />
            <stop offset="10%" stopColor="#C59B45" />
            <stop offset="20%" stopColor="#FFE8A1" /> {/* Glare / Specular highlight */}
            <stop offset="28%" stopColor="#D4A74A" />
            <stop offset="38%" stopColor="#966D22" /> {/* Rich gold depth */}
            <stop offset="48%" stopColor="#F5D07B" />
            <stop offset="55%" stopColor="#FFF9E0" /> {/* Bright reflection center */}
            <stop offset="62%" stopColor="#D4A74A" />
            <stop offset="72%" stopColor="#A47D3A" />
            <stop offset="85%" stopColor="#FFECA6" />
            <stop offset="100%" stopColor="#966D22" />
          </linearGradient>
        </defs>

        {/* 1. Underlying Premium Gold Shadow/Glow (Simulates reflection bounce) */}
        <path 
          d="M 0,40 C 35,60 65,30 100,50" 
          fill="none" 
          stroke="url(#s-curve-gold)" 
          strokeWidth="10" 
          strokeLinecap="round"
          opacity="0.35"
          vectorEffect="non-scaling-stroke" 
          transform="translate(0, 2)" 
        />

        {/* 2. Main Lustrous 3D Gold Band */}
        <path 
          d="M 0,40 C 35,60 65,30 100,50" 
          fill="none" 
          stroke="url(#s-curve-gold)" 
          strokeWidth="5" 
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke" 
        />
        
        {/* 3. Intense Inner Core Highlight (pure gold sheen) */}
        <path 
          d="M 0,40 C 35,60 65,30 100,50" 
          fill="none" 
          stroke="#FFFDF0" 
          strokeWidth="1.5" 
          opacity="0.9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke" 
          transform="translate(0, -0.5)" 
        />
      </svg>

      {/* SVG Clip Path Definitions */}
      <svg style={{ width: 0, height: 0, position: "absolute", pointerEvents: "none" }}>
        <defs>
          <clipPath id="s-curve-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 0,0.4 C 0.35,0.6 0.65,0.3 1,0.5 L 1,0 Z" />
          </clipPath>
        </defs>
      </svg>
      {/* CSS Styles injection for hides scrollbar and gold shimmer heartbeat */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes goldShimmer {
          0%, 100% { opacity: 0.3; filter: brightness(1); }
          50% { opacity: 0.45; filter: brightness(1.15); }
        }
        .shimmer-gold {
          animation: goldShimmer 15s ease-in-out infinite;
        }
        .luxury-showcase-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 25;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 13%, transparent 82%, rgba(230,201,138,0.08) 100%),
            linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 18%, rgba(0,0,0,0.18) 100%);
          mix-blend-mode: screen;
          opacity: 0.38;
        }
        .luxury-showcase-glass::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 26;
          pointer-events: none;
          background:
            radial-gradient(circle at 22% 10%, rgba(230,201,138,0.16), transparent 22%),
            radial-gradient(circle at 76% 88%, rgba(177,29,29,0.12), transparent 24%),
            linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 48%, transparent 54%);
          opacity: 0.46;
        }
        .architectural-frame {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          border: 1px solid rgba(201,160,91,0.28);
          box-shadow:
            inset 0 0 0 1px rgba(230,201,138,0.10),
            0 0 20px rgba(212,176,107,0.18),
            0 0 40px rgba(212,176,107,0.08);
        }
        .architectural-frame::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(128deg, rgba(230,201,138,0.92) 0%, rgba(201,160,91,0.18) 28%, rgba(201,160,91,0.02) 48%, rgba(230,201,138,0.58) 72%, rgba(143,106,47,0.82) 100%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.9;
        }
        .panel-reflection {
          background:
            linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.08) 34%, transparent 46%),
            linear-gradient(180deg, rgba(244,240,234,0.08), transparent 38%);
        }
        .spaces-headline-dark-groove {
          background: linear-gradient(180deg, #0f0f0e 0%, #2e2d2a 60%, #000000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.22));
        }
        .spaces-headline-red-groove {
          background: linear-gradient(180deg, #8a170f 0%, #b82b1f 35%, #630c06 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0px 1px 2px rgba(138, 23, 15, 0.25));
        }
        .monolith-title-groove {
          background: linear-gradient(180deg, #FFFFFF 0%, #E6E6E6 45%, #CCCCCC 75%, #A8A8A8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.15);
          filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.95)) drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.9));
        }
        .monolith-feature-groove {
          background: linear-gradient(180deg, #FFF8E7 0%, #FFDF9F 25%, #F0B343 65%, #C7922E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.1);
          filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.95));
        }
        .primary-text-grooved {
          background: linear-gradient(135deg, #0b0b0a 0%, #242422 50%, #000000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.15));
        }
        .primary-text-grooved-gold {
          background: linear-gradient(135deg, #8a170f 0%, #b82b1f 50%, #630c06 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0px 1px 1px rgba(138, 23, 15, 0.2));
        }
        .premium-monolith {
          position: relative;
          isolation: isolate;
          background:
            radial-gradient(circle at 18% 0%, rgba(210,176,107,0.10), transparent 28%),
            radial-gradient(circle at 82% 100%, rgba(160,51,42,0.12), transparent 26%),
            linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.005) 34%, rgba(0,0,0,0.18)),
            url("https://www.transparenttextures.com/patterns/black-paper.png"),
            #0C0C0C;
          box-shadow:
            0 26px 70px rgba(9,9,9,0.28),
            0 0 40px rgba(210,176,107,0.16),
            0 0 80px rgba(210,176,107,0.08),
            inset 0 1px 0 rgba(242,236,228,0.08),
            inset 0 -1px 0 rgba(210,176,107,0.10);
        }
        .premium-monolith::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(110deg, rgba(230,201,138,0.34), rgba(230,201,138,0.05) 28%, rgba(160,51,42,0.22) 74%, rgba(230,201,138,0.30));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .premium-monolith::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background:
            linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 18%, transparent 32%, transparent 68%, rgba(230,201,138,0.05), transparent),
            repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 7px);
          opacity: 0.42;
          mix-blend-mode: screen;
        }
        .velvet-cta {
          background:
            radial-gradient(circle at 22% 0%, rgba(255,255,255,0.18), transparent 30%),
            radial-gradient(circle at 78% 100%, rgba(78,9,8,0.46), transparent 34%),
            linear-gradient(135deg, #B63A31 0%, #A0332A 42%, #7F211B 100%),
            repeating-linear-gradient(135deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 6px);
          box-shadow:
            0 16px 34px rgba(160,51,42,0.24),
            0 0 34px rgba(160,51,42,0.12),
            inset 0 1px 0 rgba(255,255,255,0.16),
            inset 0 -10px 22px rgba(52,7,7,0.20);
        }
        .velvet-cta:hover {
          background:
            radial-gradient(circle at 22% 0%, rgba(255,255,255,0.22), transparent 30%),
            radial-gradient(circle at 78% 100%, rgba(78,9,8,0.42), transparent 34%),
            linear-gradient(135deg, #C04439 0%, #A9362E 42%, #84231D 100%),
            repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 6px);
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Top Divider Anchor */}
      <div className="absolute top-5 left-0 w-full h-[1px] bg-[#C9A05B]/20 z-10 pointer-events-none shimmer-gold">
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[30%] -translate-x-1/2 w-2 h-2 bg-[#C9A05B] rotate-45"
          style={{
            boxShadow: "0 0 20px 4px rgba(201, 160, 91, 0.35)",
            opacity: 0.35
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[55%] -translate-x-1/2 w-2 h-2 bg-[#C9A05B] rotate-45"
          style={{
            boxShadow: "0 0 20px 4px rgba(201, 160, 91, 0.35)",
            opacity: 0.35
          }}
        />
      </div>

      {/* Outer Container */}
      <div className="w-[92vw] xl:w-[90vw] max-w-[1720px] mx-auto px-4 md:px-8 lg:px-[48px] py-16 lg:py-0 z-10 flex flex-col justify-center gap-16 lg:gap-24 lg:pt-[120px]">

        {/* Layer 02: Main Content (Narrative + Showcase) */}
        <div className="w-full flex flex-col lg:flex-row gap-14 lg:gap-8 xl:gap-10 2xl:gap-[52px] items-center lg:items-stretch justify-between">

          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="w-full lg:w-[36%] xl:w-[470px] 2xl:w-[540px] flex-shrink-0 flex flex-col justify-start items-start text-left z-10 lg:pt-[90px] lg:self-stretch lg:pb-0 lg:min-h-[610px]"
          >
            {/* Eyebrow label with muted gold-red line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewport}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex items-center gap-3 mb-8 mt-4 lg:mt-6"
            >
              <div
                className="w-[28px] h-[1px] shimmer-gold"
                style={{
                  background: "linear-gradient(to right, #B11D1D, #C9A05B)",
                  opacity: 0.7
                }}
              />
              <span 
                className="font-sans text-[13px] sm:text-[15px] font-medium tracking-[2px] uppercase text-[#A0332A]"
                style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.08)" }}
              >
                BUILT WHERE IT MATTERS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewport}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
              className="font-serif font-bold text-[34px] sm:text-[50px] lg:text-[50px] xl:text-[54px] 2xl:text-[58px] leading-[1.12] tracking-[-0.4px] max-w-[560px] select-none mb-6 flex flex-col gap-1"
            >
              <span className="block spaces-headline-dark-groove">SPACES THAT</span>
              <span className="block spaces-headline-dark-groove">PERFORM.</span>
              <span className="block spaces-headline-red-groove">EXPERIENCES</span>
              <span className="block"><span className="spaces-headline-dark-groove">THAT </span><span className="spaces-headline-red-groove">LAST.</span></span>
            </motion.h2>

            {/* Gold Diamond Divider */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.3, y: 0 }}
              viewport={sectionViewport}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex items-center w-full max-w-[420px] gap-3 mt-8 mb-6 text-[#C9A05B] shimmer-gold"
            >
              <div className="flex-1 h-[1px] bg-[#C9A05B]" />
              <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                <polygon points="4,0 8,4 4,8 0,4" />
              </svg>
              <div className="flex-1 h-[1px] bg-[#C9A05B]" />
            </motion.div>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.85, y: 0 }}
              viewport={sectionViewport}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="font-sans font-light text-[15px] xl:text-[16px] leading-[1.82] text-[#1A1A1A]/85 max-w-[560px] mb-12"
              style={{
                textShadow: "0.5px 0.5px 1px rgba(0, 0, 0, 0.08)"
              }}
            >
              From luxury hospitality to enterprise workplaces, we craft environments that elevate experiences and drive real business impact.
            </motion.p>

            {/* Flex spacer to force metrics block to the bottom of the container */}
            <div className="hidden lg:block flex-grow min-h-[20px]" />

            {/* Metrics block (4 separate grooved cardboard cards) */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-4 items-stretch w-full max-w-[700px] gap-4"
              style={{ marginTop: isMobile ? "80px" : "auto" }}
            >
              {/* Metric 1 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                style={{
                  padding: "5px",
                  backgroundColor: "#D9C7A2", // Recessed groove color
                  borderRadius: "18px",
                  boxShadow: "inset 3px 3px 6px rgba(0, 0, 0, 0.25), inset -3px -3px 6px rgba(255, 255, 255, 0.6), 0.5px 1px 1px rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.03)",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#F5E5C0", // Goldenish cardboard tint
                    borderRadius: "14px",
                    padding: isMobile ? "12px 10px" : "16px 12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(201, 160, 91, 0.28)", // Golden rim border
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    minHeight: isMobile ? "105px" : "140px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Card Grain Multiply Overlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      backgroundImage: `url("https://www.transparenttextures.com/patterns/handmade-paper.png")`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "180px 180px",
                      opacity: 0.35, // High contrast grain
                      mixBlendMode: "multiply",
                      borderRadius: "14px",
                      zIndex: 1,
                    }}
                  />
                  {/* Subtle card dark vignette */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background: "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.06) 100%)",
                      borderRadius: "14px",
                      zIndex: 2,
                    }}
                  />
                  <div className="relative z-10 w-full">
                    <div className="mb-1.5 h-[24px] sm:h-[32px] flex items-center [&>svg]:scale-[0.8] sm:[&>svg]:scale-100 origin-left">{BuildingIcon()}</div>
                  </div>
                  <div className="relative z-10 w-full">
                    <div 
                      className="font-serif text-[20px] sm:text-[26px] font-bold leading-none mb-5 sm:mb-3 primary-text-grooved"
                    >
                      150+
                    </div>
                    <div 
                      className="font-sans text-[8.5px] sm:text-[9px] font-bold tracking-[0.5px] leading-[1.3] text-[#111111]/90 uppercase"
                      style={{ textShadow: "0px 0.5px 1px rgba(255, 255, 255, 0.85)" }}
                    >
                      PROJECTS<br />DELIVERED
                    </div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ borderRadius: "14px" }}>
                    <defs>
                      <linearGradient id="cardGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF2B2" />
                        <stop offset="30%" stopColor="#D4A74A" />
                        <stop offset="70%" stopColor="#B38222" />
                        <stop offset="100%" stopColor="#FFE8A1" />
                      </linearGradient>
                    </defs>
                    <motion.rect
                      x="0.75"
                      y="0.75"
                      width="calc(100% - 1.5px)"
                      height="calc(100% - 1.5px)"
                      rx="13"
                      ry="13"
                      fill="none"
                      stroke="url(#cardGoldGrad)"
                      strokeWidth="1.5"
                      initial={{ strokeDasharray: 600, strokeDashoffset: 600 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={sectionViewport}
                      transition={{
                        delay: 0.4,
                        duration: 1.4,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Metric 2 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 0.61, 0.36, 1] }}
                style={{
                  padding: "5px",
                  backgroundColor: "#D9C7A2", // Recessed groove color
                  borderRadius: "18px",
                  boxShadow: "inset 3px 3px 6px rgba(0, 0, 0, 0.25), inset -3px -3px 6px rgba(255, 255, 255, 0.6), 0.5px 1px 1px rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#F5E5C0", // Goldenish cardboard tint
                    borderRadius: "14px",
                    padding: isMobile ? "12px 10px" : "16px 12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(201, 160, 91, 0.28)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    minHeight: isMobile ? "105px" : "140px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Card Grain Multiply Overlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      backgroundImage: `url("https://www.transparenttextures.com/patterns/handmade-paper.png")`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "180px 180px",
                      opacity: 0.35,
                      mixBlendMode: "multiply",
                      borderRadius: "14px",
                      zIndex: 1,
                    }}
                  />
                  {/* Subtle card dark vignette */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background: "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.06) 100%)",
                      borderRadius: "14px",
                      zIndex: 2,
                    }}
                  />
                  <div className="relative z-10 w-full">
                    <div className="mb-1.5 h-[24px] sm:h-[32px] flex items-center [&>svg]:scale-[0.8] sm:[&>svg]:scale-100 origin-left">{PeopleIcon()}</div>
                  </div>
                  <div className="relative z-10 w-full">
                    <div 
                      className="font-serif text-[20px] sm:text-[26px] font-bold leading-none mb-5 sm:mb-3 primary-text-grooved"
                    >
                      100+
                    </div>
                    <div 
                      className="font-sans text-[8.5px] sm:text-[9px] font-bold tracking-[0.5px] leading-[1.3] text-[#111111]/90 uppercase"
                      style={{ textShadow: "0px 0.5px 1px rgba(255, 255, 255, 0.85)" }}
                    >
                      HAPPY<br />CLIENTS
                    </div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ borderRadius: "14px" }}>
                    <motion.rect
                      x="0.75"
                      y="0.75"
                      width="calc(100% - 1.5px)"
                      height="calc(100% - 1.5px)"
                      rx="13"
                      ry="13"
                      fill="none"
                      stroke="url(#cardGoldGrad)"
                      strokeWidth="1.5"
                      initial={{ strokeDasharray: 600, strokeDashoffset: 600 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={sectionViewport}
                      transition={{
                        delay: 1.2,
                        duration: 1.4,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Metric 3 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.6, delay: 0.56, ease: [0.22, 0.61, 0.36, 1] }}
                style={{
                  padding: "5px",
                  backgroundColor: "#D9C7A2", // Recessed groove color
                  borderRadius: "18px",
                  boxShadow: "inset 3px 3px 6px rgba(0, 0, 0, 0.25), inset -3px -3px 6px rgba(255, 255, 255, 0.6), 0.5px 1px 1px rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#F5E5C0", // Goldenish cardboard tint
                    borderRadius: "14px",
                    padding: isMobile ? "12px 10px" : "16px 12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(201, 160, 91, 0.28)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    minHeight: isMobile ? "105px" : "140px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Card Grain Multiply Overlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      backgroundImage: `url("https://www.transparenttextures.com/patterns/handmade-paper.png")`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "180px 180px",
                      opacity: 0.35,
                      mixBlendMode: "multiply",
                      borderRadius: "14px",
                      zIndex: 1,
                    }}
                  />
                  {/* Subtle card dark vignette */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background: "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.06) 100%)",
                      borderRadius: "14px",
                      zIndex: 2,
                    }}
                  />
                  <div className="relative z-10 w-full">
                    <div className="mb-1.5 h-[24px] sm:h-[32px] flex items-center [&>svg]:scale-[0.8] sm:[&>svg]:scale-100 origin-left">{AwardIcon()}</div>
                  </div>
                  <div className="relative z-10 w-full">
                    <div 
                      className="font-serif text-[20px] sm:text-[26px] font-bold leading-none mb-5 sm:mb-3 primary-text-grooved"
                    >
                      20+
                    </div>
                    <div 
                      className="font-sans text-[8.5px] sm:text-[9px] font-bold tracking-[0.5px] leading-[1.3] text-[#111111]/90 uppercase"
                      style={{ textShadow: "0px 0.5px 1px rgba(255, 255, 255, 0.85)" }}
                    >
                      YEARS OF<br />EXCELLENCE
                    </div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ borderRadius: "14px" }}>
                    <motion.rect
                      x="0.75"
                      y="0.75"
                      width="calc(100% - 1.5px)"
                      height="calc(100% - 1.5px)"
                      rx="13"
                      ry="13"
                      fill="none"
                      stroke="url(#cardGoldGrad)"
                      strokeWidth="1.5"
                      initial={{ strokeDasharray: 600, strokeDashoffset: 600 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={sectionViewport}
                      transition={{
                        delay: 2.0,
                        duration: 1.4,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Metric 4 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.6, delay: 0.64, ease: [0.22, 0.61, 0.36, 1] }}
                style={{
                  padding: "5px",
                  backgroundColor: "#D9C7A2", // Recessed groove color
                  borderRadius: "18px",
                  boxShadow: "inset 3px 3px 6px rgba(0, 0, 0, 0.25), inset -3px -3px 6px rgba(255, 255, 255, 0.6), 0.5px 1px 1px rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#F5E5C0", // Goldenish cardboard tint
                    borderRadius: "14px",
                    padding: isMobile ? "12px 10px" : "16px 12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(201, 160, 91, 0.28)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    minHeight: isMobile ? "105px" : "140px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Card Grain Multiply Overlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      backgroundImage: `url("https://www.transparenttextures.com/patterns/handmade-paper.png")`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "180px 180px",
                      opacity: 0.35,
                      mixBlendMode: "multiply",
                      borderRadius: "14px",
                      zIndex: 1,
                    }}
                  />
                  {/* Subtle card dark vignette */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background: "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.06) 100%)",
                      borderRadius: "14px",
                      zIndex: 2,
                    }}
                  />
                  <div className="relative z-10 w-full">
                    <div className="mb-1.5 h-[24px] sm:h-[32px] flex items-center [&>svg]:scale-[0.8] sm:[&>svg]:scale-100 origin-left">{LocationIcon()}</div>
                  </div>
                  <div className="relative z-10 w-full">
                    <div 
                      className="font-serif text-[16px] sm:text-[22px] font-bold leading-none mb-5 sm:mb-3 primary-text-grooved-gold"
                    >
                      ACROSS
                    </div>
                    <div 
                      className="font-sans text-[8.5px] sm:text-[9px] font-bold tracking-[0.5px] leading-[1.3] text-[#111111]/90 uppercase"
                      style={{ textShadow: "0px 0.5px 1px rgba(255, 255, 255, 0.85)" }}
                    >
                      INDIA &<br />BEYOND
                    </div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ borderRadius: "14px" }}>
                    <motion.rect
                      x="0.75"
                      y="0.75"
                      width="calc(100% - 1.5px)"
                      height="calc(100% - 1.5px)"
                      rx="13"
                      ry="13"
                      fill="none"
                      stroke="url(#cardGoldGrad)"
                      strokeWidth="1.5"
                      initial={{ strokeDasharray: 600, strokeDashoffset: 600 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={sectionViewport}
                      transition={{
                        delay: 2.8,
                        duration: 1.4,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Center Vertical Divider (Desktop only - from MD-04) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={sectionViewport}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex w-[1px] bg-[rgba(201,160,91,0.22)] relative flex-shrink-0 items-center justify-center self-stretch mx-2 xl:mx-4 shimmer-gold"
            style={{ boxShadow: "0 0 10px rgba(201, 160, 91, 0.1)" }}
          >
            <div
              className="w-[10px] h-[10px] bg-[#C9A05B] rotate-45 flex-shrink-0"
              style={{
                boxShadow: "0 0 16px 4px rgba(201, 160, 91, 0.35)",
                opacity: 0.4
              }}
            />
          </motion.div>

          {/* Right Column Showcase Region */}
          <motion.div
            ref={showcaseRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="w-full lg:flex-1 xl:max-w-[900px] 2xl:max-w-[980px] min-w-0 flex-shrink z-10"
          >
            <div
              style={isMobile ? {
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
              } : {
                padding: "10px",
                backgroundColor: "#D9C7A2", // Grooved bottom/recess color
                borderRadius: "120px 120px 30px 30px", // matching outer curve + padding
                boxShadow: "inset 4px 4px 10px rgba(0, 0, 0, 0.35), inset -4px -4px 10px rgba(255, 255, 255, 0.75), 0.5px 1.5px 1px rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(0, 0, 0, 0.04)",
                display: "flex",
                alignItems: "stretch",
                width: "100%",
              }}
            >
              {isMobile ? (
                // Mobile View: 4 Beautiful, fully visible stacked cards
                <div className="w-full flex flex-col gap-6">
                  {PANELS.map((panel) => (
                    <div
                      key={panel.id}
                      className="relative overflow-hidden flex flex-col justify-between w-full h-[220px] rounded-[32px] border border-[rgba(201,160,91,0.35)] shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                      style={{
                        background: "#0D0D0D",
                      }}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${panel.image})`,
                            filter: "contrast(1.08) saturate(0.86) brightness(0.75)"
                          }}
                        />
                      </div>
                      
                      {/* Dark Overlay */}
                      <div
                        className="absolute inset-0 z-[1]"
                        style={{
                          background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.7) 100%)",
                        }}
                      />

                      <div className="panel-reflection absolute inset-0 z-[2] pointer-events-none opacity-[0.3]" />

                      {/* Content inside mobile card */}
                      <div className="relative z-10 flex flex-col justify-between h-full w-full text-center pb-5 pt-5 px-4">
                        <div className="flex flex-col items-center">
                          <div 
                            className="rounded-full border border-[rgba(230, 201, 138, 0.4)] bg-black/45 flex items-center justify-center text-[#C9A05B] mb-2"
                            style={{
                              width: "48px",
                              height: "48px",
                              background: "radial-gradient(circle at 35% 25%, rgba(230,201,138,0.14), rgba(0,0,0,0.58) 58%)",
                              boxShadow: "0 0 16px rgba(201,160,91,0.2)"
                            }}
                          >
                            {panel.icon(22)}
                          </div>
                          
                          <h3 className="font-serif font-light text-[24px] text-[#F4F0EA] leading-tight select-none uppercase tracking-wider mb-1">
                            {panel.title}
                          </h3>
                          
                          <p className="font-sans font-light text-[12px] text-[#F4F0EA]/85 max-w-[280px] leading-snug">
                            {panel.subtitle}
                          </p>
                        </div>

                        <div className="flex justify-center items-center mt-2">
                          <a
                            href="#projects"
                            className="flex items-center gap-[8px] text-[#C9A05B] font-sans text-[11px] font-semibold tracking-[2px] uppercase"
                            style={{ textShadow: "0 0 10px rgba(201,160,91,0.3)" }}
                          >
                            <span>VIEW PROJECTS</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Desktop View: Accordion-like Carousel
                <div
                  className="luxury-showcase-glass relative w-full h-[480px] sm:h-[540px] lg:h-[610px] flex flex-row overflow-x-auto lg:overflow-hidden rounded-tl-[112px] rounded-tr-[112px] rounded-bl-[22px] rounded-br-[22px] border border-[rgba(201,160,91,0.22)] bg-[#0D0D0D] gap-0 scrollbar-none snap-x snap-mandatory"
                  style={{
                    boxShadow: "0 34px 90px rgba(13, 13, 13, 0.22), inset 0 1px 0 rgba(230, 201, 138, 0.18), inset 0 -1px 0 rgba(0, 0, 0, 0.55)",
                  }}
                >
                  {PANELS.map((panel, idx) => {
                    const isActive = activePanel === idx;
                    const isHovered = hoveredPanel === idx;

                    return (
                      <motion.div
                        key={panel.id}
                        layout
                        onClick={() => setActivePanel(idx)}
                        onMouseEnter={() => setHoveredPanel(idx)}
                        onMouseLeave={() => setHoveredPanel(null)}
                        animate={{
                          width: isActive ? "46%" : "18%",
                          borderRadius: isActive ? "112px 0px 112px 0px" : "48px",
                          opacity: isActive ? 1.0 : 0.82,
                          scale: isActive ? 1.018 : 1,
                          y: isActive ? -8 : 0,
                        }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative cursor-pointer overflow-hidden flex flex-col justify-between flex-shrink-0 snap-center group select-none border-r border-[rgba(201,160,91,0.08)] last:border-r-0 ${isActive ? "z-10" : "z-0"}`}
                        style={{
                          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.035), rgba(0, 0, 0, 0.16))",
                          boxShadow: isActive
                            ? "0 26px 64px rgba(0, 0, 0, 0.34), 0 0 34px rgba(201,160,91,0.10), inset 0 0 0 1px rgba(230, 201, 138, 0.08)"
                            : "inset 10px 0 28px rgba(0,0,0,0.22), inset -10px 0 28px rgba(0,0,0,0.30)",
                        }}
                      >
                        {/* Background Image with Cinematic Finish and 8s slow zoom */}
                        <div
                          className="absolute inset-0 overflow-hidden z-0"
                          style={{
                            transform: isActive ? "translate3d(var(--mouse-x, 0px), var(--mouse-y, 0px), 0)" : "none",
                            transition: "transform 0.2s ease-out"
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${panel.image})`,
                              filter: isActive
                                ? "contrast(1.08) saturate(0.86) brightness(0.86)"
                                : "contrast(0.94) saturate(0.58) brightness(0.48)"
                            }}
                            animate={{
                              scale: isActive ? (isHovered ? 1.08 : 1.05) : 1.05,
                            }}
                            transition={{
                              scale: { duration: 8, ease: "easeOut" },
                            }}
                          />
                        </div>

                        {/* Dark atmospheric overlay with brass warmth and edge vignettes */}
                        <motion.div
                          className="absolute inset-0 z-[1]"
                          animate={{
                            opacity: isActive ? (isHovered ? 0.88 : 0.94) : 0.98
                          }}
                          style={{
                            background: isActive
                              ? "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.22) 38%, rgba(0,0,0,0.72) 100%), radial-gradient(circle at 50% 8%, rgba(230,201,138,0.16), transparent 28%), linear-gradient(90deg, rgba(0,0,0,0.62) 0%, transparent 25%, transparent 72%, rgba(0,0,0,0.68) 100%)"
                              : "linear-gradient(180deg, rgba(0,0,0,0.72), rgba(0,0,0,0.84)), linear-gradient(90deg, rgba(0,0,0,0.28), transparent 50%, rgba(0,0,0,0.38))"
                          }}
                          transition={{ duration: 0.4 }}
                        />

                        <div className="panel-reflection absolute inset-0 z-[2] pointer-events-none opacity-[0.45]" />

                        {/* Active brass architectural frame */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              layoutId="activeBorder"
                              className="architectural-frame"
                              style={{
                                borderRadius: "112px 0px 112px 0px",
                              }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Subtle illuminated gold edge on bottom-right curve */}
                        {isActive && (
                          <svg
                            className="absolute bottom-0 right-0 w-[170px] h-[170px] pointer-events-none z-20 shadow-gold-glow shimmer-gold"
                            viewBox="0 0 170 170"
                            fill="none"
                          >
                            <path
                               d="M 0 170 A 170 170 0 0 0 170 0"
                               stroke="#C9A05B"
                               strokeWidth="2"
                               strokeLinecap="round"
                               style={{
                                 opacity: 0.72,
                                 filter: "drop-shadow(0 0 10px rgba(201,160,91,0.72))"
                               }}
                            />
                          </svg>
                        )}

                        {/* Panel Contents - Centered, top-aligned content */}
                        <div className="relative z-10 flex flex-col justify-between h-full w-full text-center pb-10 pt-0">
                          {/* Top area: Icon and Title */}
                          <motion.div
                            animate={{ paddingTop: isActive ? 72 : 58 }}
                            className="flex flex-col items-center px-4 animate-none"
                          >
                            {/* Circular Icon wrapper */}
                            <motion.div
                              animate={{
                                width: isActive ? 68 : 58,
                                height: isActive ? 68 : 58,
                                borderColor: isHovered || isActive ? "rgba(230, 201, 138, 0.48)" : "rgba(201, 160, 91, 0.24)"
                              }}
                              className="rounded-full border bg-black/45 flex items-center justify-center text-[#C9A05B] mb-6"
                              style={{
                                background: "radial-gradient(circle at 35% 25%, rgba(230,201,138,0.14), rgba(0,0,0,0.58) 58%)",
                                boxShadow: isActive
                                  ? "0 0 24px rgba(201,160,91,0.24), inset 0 0 18px rgba(201,160,91,0.08)"
                                  : "inset 0 0 14px rgba(0,0,0,0.55)"
                              }}
                            >
                              {panel.icon(isActive ? 30 : 24)}
                            </motion.div>

                            {/* Title (Serif typeface) */}
                            <motion.h3
                              animate={{
                                fontSize: isActive ? (panel.title.length > 12 ? "28px" : "32px") : "16px",
                                y: 0,
                              }}
                              className="font-serif font-light leading-none text-[#F4F0EA] mb-4 select-none uppercase"
                              style={{
                                textShadow: isActive
                                  ? "0 2px 22px rgba(0,0,0,0.55)"
                                  : "0 1px 14px rgba(0,0,0,0.6)",
                                letterSpacing: isActive ? "0.04em" : "0.08em",
                              }}
                            >
                              {panel.title}
                            </motion.h3>

                            {/* Subtitle */}
                            <motion.p
                              animate={{
                                fontSize: isActive ? "14px" : "11px",
                                opacity: isActive ? 0.9 : 0.6,
                                height: "auto",
                                marginTop: 4,
                              }}
                              className="font-sans font-light text-[#F4F0EA]/80 max-w-[280px] mx-auto select-none overflow-hidden"
                              style={{ lineHeight: 1.5 }}
                            >
                              {panel.subtitle}
                            </motion.p>
                          </motion.div>

                          {/* Bottom area: Active-only view CTA positioned absolute bottom left on desktop */}
                          <div className="h-[60px] flex justify-center items-center">
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="absolute left-1/2 -translate-x-1/2 bottom-[52px] xl:bottom-[60px] pointer-events-auto"
                              >
                                {/* CTA Link (VIEW PROJECTS) */}
                                <motion.a
                                  href="#projects"
                                  className="flex items-center gap-[12px] text-[#C9A05B] hover:text-[#F4F0EA] font-sans text-[13px] font-medium tracking-[2px] uppercase transition-colors duration-300 group/cta pointer-events-auto"
                                  whileHover="hover"
                                  style={{ textShadow: "0 0 18px rgba(201,160,91,0.22)" }}
                                >
                                  <span>VIEW PROJECTS</span>
                                  <motion.svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    variants={{
                                      hover: { x: 4 }
                                    }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                  >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                  </motion.svg>
                                </motion.a>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Indicators */}
                  <div className="absolute bottom-[48px] left-[30%] -translate-x-1/2 flex gap-[12px] z-30 pointer-events-auto">
                    {PANELS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePanel(idx)}
                        className="h-[2px] rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                          width: activePanel === idx ? "48px" : "32px",
                          backgroundColor: activePanel === idx ? "#A0332A" : "#8A8A8A",
                          opacity: activePanel === idx ? 1.0 : 0.35,
                          transition: "width 350ms cubic-bezier(.22,.61,.36,1), background-color 350ms, opacity 350ms"
                        }}
                      />
                    ))}
                  </div>

                  {/* Navigation Controls */}
                  <div className="absolute bottom-[36px] right-[40px] flex gap-4 z-30 pointer-events-auto">
                    {/* Previous Button */}
                    <motion.button
                      whileHover={{
                        y: -2,
                        scale: 1.05,
                        borderColor: "rgba(201, 160, 91, 0.65)",
                        backgroundColor: "rgba(201, 160, 91, 0.05)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePanel((prev) => (prev - 1 + PANELS.length) % PANELS.length);
                      }}
                      className="w-[52px] h-[52px] rounded-full border border-[#C9A05B]/35 bg-black/40 backdrop-blur-[2px] flex items-center justify-center text-[#C9A05B] transition-colors duration-300 hover:brightness-110 cursor-pointer"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                    </motion.button>

                    {/* Next Button */}
                    <motion.button
                      whileHover={{
                        y: -2,
                        scale: 1.05,
                        borderColor: "rgba(177, 29, 29, 0.65)",
                        backgroundColor: "rgba(177, 29, 29, 0.05)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePanel((prev) => (prev + 1) % PANELS.length);
                      }}
                      className="w-[52px] h-[52px] rounded-full border border-[#C9A05B]/35 bg-black/40 backdrop-blur-[2px] flex items-center justify-center text-[#C9A05B] transition-colors duration-300 hover:brightness-110 cursor-pointer"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Layer 03: Bottom Commitment Banner (Centering wrapper + split design) */}
        <div className="w-full flex justify-center items-center mx-auto mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[850px] mx-auto relative z-10 flex flex-col overflow-hidden"
            style={{
              borderRadius: "40px 40px 24px 24px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4), 0 5px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Top Parchment Card Part */}
            <div
              className="relative w-full px-6 pt-6 pb-10 sm:pt-10 sm:pb-16 text-center overflow-hidden flex flex-col items-center"
              style={{
                background: "#F4EFE6",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/handmade-paper.png')",
                minHeight: "160px",
              }}
            >
              {/* Elegant inner gold framing line */}
              <div 
                className="absolute pointer-events-none z-10"
                style={{
                  top: "12px",
                  left: "12px",
                  right: "12px",
                  bottom: "0px",
                  borderTop: "1.2px solid rgba(197, 155, 69, 0.45)",
                  borderLeft: "1.2px solid rgba(197, 155, 69, 0.45)",
                  borderRight: "1.2px solid rgba(197, 155, 69, 0.45)",
                  borderRadius: "30px 30px 0 0",
                }}
              />

              {/* Left Architectural Blueprints Sketch Overlay */}
              <svg className="absolute bottom-4 left-4 w-[160px] md:w-[190px] h-[85%] pointer-events-none opacity-[0.14] z-0 select-none hidden md:block" viewBox="0 0 200 200" fill="none" stroke="#A88238" strokeWidth="0.6">
                <path d="M 10 190 L 10 30 L 190 30 L 190 190" />
                <line x1="10" y1="60" x2="190" y2="60" />
                <line x1="10" y1="90" x2="190" y2="90" />
                <line x1="10" y1="120" x2="190" y2="120" />
                <line x1="10" y1="150" x2="190" y2="150" />
                <line x1="40" y1="30" x2="40" y2="190" />
                <line x1="70" y1="30" x2="70" y2="190" />
                <line x1="100" y1="30" x2="100" y2="190" />
                <line x1="130" y1="30" x2="130" y2="190" />
                <line x1="160" y1="30" x2="160" y2="190" />
                <path d="M 100 30 L 70 10 L 130 10 Z" />
                <circle cx="100" cy="90" r="15" />
                <path d="M 10 30 L 100 10 L 190 30" />
              </svg>

              {/* Right Architectural Blueprints Sketch Overlay */}
              <svg className="absolute bottom-4 right-4 w-[160px] md:w-[190px] h-[85%] pointer-events-none opacity-[0.14] z-0 select-none hidden md:block" viewBox="0 0 200 200" fill="none" stroke="#A88238" strokeWidth="0.6">
                <path d="M 20 190 L 100 15 L 180 190" />
                <line x1="60" y1="100" x2="140" y2="100" />
                <line x1="40" y1="140" x2="160" y2="140" />
                <line x1="100" y1="15" x2="100" y2="190" />
                <line x1="60" y1="100" x2="100" y2="190" />
                <line x1="140" y1="100" x2="100" y2="190" />
                <rect x="85" y="100" width="30" height="90" />
                <circle cx="100" cy="60" r="10" />
              </svg>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col items-center max-w-[600px] mx-auto pb-1">
                {/* Top Gold Star Emblem */}
                <div className="text-[#C9A05B] mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ filter: "drop-shadow(0 0 6px rgba(199,162,90,0.3))" }}>
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                  </svg>
                </div>

                {/* Muted Subtitles */}
                <h4 className="font-serif tracking-[0.08em] text-[15px] sm:text-[20px] md:text-[24px] text-[#1B1714] font-medium mb-1 uppercase select-none">
                  BIG OR BOUTIQUE,
                </h4>
                <p className="font-sans tracking-[0.14em] text-[9px] sm:text-[11px] md:text-[12px] text-[#6D6860] uppercase font-bold mb-2 select-none">
                  WE BRING THE SAME COMMITMENT
                </p>

                {/* Main Red Heading */}
                <div className="flex items-center justify-center mt-1 w-full">
                  <span className="font-serif text-[22px] sm:text-[30px] md:text-[36px] leading-tight text-[#8B1A1A] font-extrabold select-none uppercase tracking-wide">
                    TO EVERY DETAIL.
                  </span>
                </div>
              </div>

              {/* Curve Transition Overlay (Parchment Dip, Velvet Shadow, Gold Trim) */}
              <div className="absolute bottom-0 left-0 w-full h-[35px] sm:h-[65px] md:h-[80px] pointer-events-none z-20">
                <svg className="w-full h-full" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
                  <defs>
                    {/* Royal Velvet Red Gradient */}
                    <linearGradient id="redVelvetWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5E0B0B" />
                      <stop offset="25%" stopColor="#9E1B1B" />
                      <stop offset="50%" stopColor="#D32F2F" /> {/* Lustrous center sheen */}
                      <stop offset="75%" stopColor="#9E1B1B" />
                      <stop offset="100%" stopColor="#5E0B0B" />
                    </linearGradient>
                    {/* Premium Velvet Grain Filter */}
                    <filter id="velvetGrain" x="-10%" y="-10%" width="120%" height="120%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" result="noise" />
                      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.38 0" result="softNoise" />
                      <feComposite operator="in" in="softNoise" in2="SourceGraphic" result="grainOverlay" />
                      <feBlend mode="overlay" in="grainOverlay" in2="SourceGraphic" />
                    </filter>
                    {/* Metallic Lustrous Gold Gradient */}
                    <linearGradient id="goldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#B38622" />
                      <stop offset="30%" stopColor="#FFE8A1" /> {/* Shiny highlight */}
                      <stop offset="50%" stopColor="#D4A74A" />
                      <stop offset="70%" stopColor="#FFE8A1" /> {/* Shiny highlight */}
                      <stop offset="100%" stopColor="#8F631B" />
                    </linearGradient>
                  </defs>
                  {/* Red Velvet Wave Band (Filled Shape for constant thickness) */}
                  <path d="M 0 35 C 360 55, 1080 55, 1440 35 L 1440 55 C 1080 75, 360 75, 0 55 Z" fill="url(#redVelvetWaveGrad)" filter="url(#velvetGrain)" />
                  {/* Gold trim along top edge */}
                  <path d="M 0 35 C 360 55, 1080 55, 1440 35" stroke="url(#goldStrokeGrad)" strokeWidth="3.5" />
                  {/* Velvet wave shadow layer underneath */}
                  <path d="M 0 55 C 360 75, 1080 75, 1440 55 L 1440 80 L 0 80 Z" fill="#0C0C0C" />
                </svg>
              </div>

              {/* Crest Emblem Diamond right at the center of the bottom curve */}
              <div className="absolute bottom-[4px] sm:bottom-[8px] md:bottom-[10px] left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rotate-45 bg-[#F4EFE6] shadow-[0_4px_12px_rgba(0,0,0,0.35)] flex items-center justify-center rounded-lg border border-[#C59B45]/70"
                  style={{
                    background: "linear-gradient(135deg, #FFECA6 0%, #FFF5D1 25%, #C7A25A 50%, #8F6A2F 75%, #FFECA6 100%)",
                  }}
                >
                  <div className="w-5 h-5 sm:w-7 sm:h-7 -rotate-45 flex items-center justify-center text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          {/* Bottom Charcoal Strip (Metrics) */}
          <div
            className="w-full grid grid-cols-4 items-stretch relative z-10 border-t border-[#C9A05B]/15"
            style={{
              background: "#0C0C0C",
              backgroundImage: "url('https://www.transparenttextures.com/patterns/black-paper.png')",
            }}
          >
            {/* Metric 1 */}
            <div className="flex flex-col items-center justify-center text-center py-5 px-1 sm:py-8 border-r border-[#C9A05B]/15">
              <div className="text-[#C59B45] rounded-full border border-[#C59B45]/50 p-1.5 sm:p-2 flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 bg-black/35 shadow-[inset_0_0_8px_rgba(201,160,91,0.15),0_0_10px_rgba(255,232,161,0.1)] mb-2 sm:mb-3 [&>svg]:w-[16px] [&>svg]:h-[16px] sm:[&>svg]:w-[24px] sm:[&>svg]:h-[24px]">
                {TargetIcon()}
              </div>
              <div className="select-none min-w-0">
                <div className="text-[8.5px] min-[370px]:text-[9.5px] sm:text-[12.5px] md:text-[13.5px] font-bold tracking-[0.06em] sm:tracking-[0.12em] text-[#C59B45] uppercase">PRECISION</div>
                <div className="text-[7.5px] min-[370px]:text-[8px] sm:text-[11px] md:text-[12px] font-serif italic text-[#E2DCD0]/80 mt-0.5">In Every Plan</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center justify-center text-center py-5 px-1 sm:py-8 border-r border-[#C9A05B]/15">
              <div className="text-[#C59B45] rounded-full border border-[#C59B45]/50 p-1.5 sm:p-2 flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 bg-black/35 shadow-[inset_0_0_8px_rgba(201,160,91,0.15),0_0_10px_rgba(255,232,161,0.1)] mb-2 sm:mb-3 [&>svg]:w-[16px] [&>svg]:h-[16px] sm:[&>svg]:w-[24px] sm:[&>svg]:h-[24px]">
                {SpeedometerIcon()}
              </div>
              <div className="select-none min-w-0">
                <div className="text-[8.5px] min-[370px]:text-[9.5px] sm:text-[12.5px] md:text-[13.5px] font-bold tracking-[0.06em] sm:tracking-[0.12em] text-[#C59B45] uppercase">PERFORMANCE</div>
                <div className="text-[7.5px] min-[370px]:text-[8px] sm:text-[11px] md:text-[12px] font-serif italic text-[#E2DCD0]/80 mt-0.5">In Every Step</div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center justify-center text-center py-5 px-1 sm:py-8 border-r border-[#C9A05B]/15">
              <div className="text-[#C59B45] rounded-full border border-[#C59B45]/50 p-1.5 sm:p-2 flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 bg-black/35 shadow-[inset_0_0_8px_rgba(201,160,91,0.15),0_0_10px_rgba(255,232,161,0.1)] mb-2 sm:mb-3 [&>svg]:w-[16px] [&>svg]:h-[16px] sm:[&>svg]:w-[24px] sm:[&>svg]:h-[24px]">
                {ProfitabilityIcon()}
              </div>
              <div className="select-none min-w-0">
                <div className="text-[8.5px] min-[370px]:text-[9.5px] sm:text-[12.5px] md:text-[13.5px] font-bold tracking-[0.06em] sm:tracking-[0.12em] text-[#C59B45] uppercase">PROFITABILITY</div>
                <div className="text-[7.5px] min-[370px]:text-[8px] sm:text-[11px] md:text-[12px] font-serif italic text-[#E2DCD0]/80 mt-0.5">In Every Outcome</div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center justify-center text-center py-5 px-1 sm:py-8">
              <div className="text-[#C59B45] rounded-full border border-[#C59B45]/50 p-1.5 sm:p-2 flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 bg-black/35 shadow-[inset_0_0_8px_rgba(201,160,91,0.15),0_0_10px_rgba(255,232,161,0.1)] mb-2 sm:mb-3 [&>svg]:w-[16px] [&>svg]:h-[16px] sm:[&>svg]:w-[24px] sm:[&>svg]:h-[24px]">
                {ShieldCheckIcon()}
              </div>
              <div className="select-none min-w-0">
                <div className="text-[8.5px] min-[370px]:text-[9.5px] sm:text-[12.5px] md:text-[13.5px] font-bold tracking-[0.06em] sm:tracking-[0.12em] text-[#C59B45] uppercase">DELIVERED</div>
                <div className="text-[7.5px] min-[370px]:text-[8px] sm:text-[11px] md:text-[12px] font-serif italic text-[#E2DCD0]/80 mt-0.5">Every Time</div>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </div>
    {/* Layer 04: Decorative Corner Elements */}
      <div
        style={{
          transform: "translate3d(calc(var(--mouse-x, 0px) * -1), calc(var(--mouse-y, 0px) * -1), 0)",
          transition: "transform 0.2s ease-out"
        }}
        className="absolute bottom-[-150px] left-[-150px] w-[350px] h-[350px] pointer-events-none opacity-[0.12] z-0 select-none shimmer-gold"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="#C9A05B" strokeWidth="0.5">
          <circle cx="50" cy="50" r="48" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="20" />
          <circle cx="50" cy="50" r="10" />
          <path d="M50 0 V100" />
          <path d="M0 50 H100" />
        </svg>
      </div>

      <div
        style={{
          transform: "translate3d(calc(var(--mouse-x, 0px) * -1), calc(var(--mouse-y, 0px) * -1), 0)",
          transition: "transform 0.2s ease-out"
        }}
        className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] pointer-events-none opacity-[0.12] z-0 select-none shimmer-gold"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="#C9A05B" strokeWidth="0.5">
          <circle cx="50" cy="50" r="48" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="20" />
          <circle cx="50" cy="50" r="10" />
          <path d="M50 0 V100" />
          <path d="M0 50 H100" />
        </svg>
      </div>
    </motion.section>
  );
}
