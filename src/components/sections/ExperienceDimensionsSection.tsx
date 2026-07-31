"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Line-art stand-ins for the Wall/Floor/Ceiling/Space icons, whose raster originals were
// deleted from Cloudinary. Drawn at the same 36px box and gold tone as the surviving
// raster icons so the row still reads as one set.
type DimensionGlyph = "walls" | "floors" | "ceilings" | "spaces";

const GLYPH_PATHS: Record<DimensionGlyph, React.ReactNode> = {
  walls: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="1.5" />
      <path d="M3 9.2h18M3 14.8h18M9 3.5v5.7M15 9.2v5.6M9 14.8v5.7" />
    </>
  ),
  floors: (
    <>
      <path d="M3 19.5h18" />
      <path d="M6.2 19.5 8 9.5M12 19.5v-10M17.8 19.5 16 9.5" />
      <path d="M7.1 14.5h9.8M8 9.5h8" />
    </>
  ),
  ceilings: (
    <>
      <path d="M2.5 4.5h19" />
      <path d="M6.5 4.5v2.2M17.5 4.5v2.2M12 4.5v5.4" />
      <path d="M8.4 15.2a3.6 3.6 0 0 1 7.2 0z" />
      <path d="M8.4 15.2h7.2" />
    </>
  ),
  spaces: (
    <>
      <path d="M4 7.8 12 3.5l8 4.3v8.4L12 20.5l-8-4.3z" />
      <path d="M4 7.8 12 12l8-4.2M12 12v8.5" />
    </>
  ),
};

function DimensionGlyphIcon({ name }: { name: DimensionGlyph }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={36}
      height={36}
      fill="none"
      stroke="#D8B25E"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        display: "block",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        filter: "drop-shadow(0 4px 8px rgba(80, 50, 0, 0.45))",
      }}
    >
      {GLYPH_PATHS[name]}
    </svg>
  );
}

interface ArchItem {
  num: string;
  title: string;
  image: string;
  categories: string[];
  factor: number;
  /** Raster icon under /public. */
  icon?: string;
  /** Inline line-art glyph, used when no raster icon exists. */
  glyph?: DimensionGlyph;
}

const ARCHES: ArchItem[] = [
  {
    num: "01",
    title: "WALLS",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
    categories: ["Wallpaper", "Wall Murals", "Wall Art & Decals", "Wall Sculptures", "Finishes"],
    factor: 0,
    glyph: "walls",
    icon: "/arches/walls.png"
  },
  {
    num: "02",
    title: "FLOORS",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=600",
    categories: ["Wood", "Vinyl", "Epoxy", "Carpet", "Turf"],
    factor: 10,
    glyph: "floors",
    icon: "/arches/floor.png"
  },
  {
    num: "03",
    title: "CEILINGS",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
    categories: ["Gypsum", "PVC Panels", "Stretch Ceilings", "Ceiling Finishes"],
    factor: 20,
    glyph: "ceilings",
    icon: "/arches/ceiling.png"
  },
  {
    num: "04",
    title: "SPACES",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    categories: ["Modular Kitchens", "Furniture", "Lighting", "Décor & Accessories", "Turnkey Spaces"],
    factor: 30,
    glyph: "spaces",
    icon: "/arches/space.png"
  },
  {
    num: "05",
    title: "EXPERIENCE",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
    categories: ["EPC Delivery", "Civil & Structural", "MEP Infrastructure", "HVAC Engineering", "Turnkey Interiors"],
    factor: 40,
    icon: "/arches/experience.png"
  },
  {
    num: "06",
    title: "SPACEFOLD",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600",
    categories: ["Spacefold™ AI", "Digital Twins", "CAD/CAM Integration", "Generative Layouts", "3D Walkthroughs"],
    factor: 50,
    icon: "/arches/spacefold.png",
  },
];

export default function ExperienceDimensionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const archRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [leftColVisible, setLeftColVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [cardVisibility, setCardVisibility] = useState<boolean[]>(
    () => Array(ARCHES.length).fill(false)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isBrushVisible, setIsBrushVisible] = useState(false);
  const [autoActiveIdx, setAutoActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const leftObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLeftColVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (leftColRef.current) leftObserver.observe(leftColRef.current);
    if (cardsRef.current) cardsObserver.observe(cardsRef.current);

    // Per-card IntersectionObservers for mobile staggered slide-in
    const cardObservers: IntersectionObserver[] = [];
    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardVisibility((prev) => {
              if (prev[idx]) return prev; // already visible, skip
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(cardEl);
      cardObservers.push(obs);
    });

    setIsMobile(window.innerWidth < 1360);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1360);
    };
    window.addEventListener("resize", handleResize);

    // GSAP Context for ScrollTrigger setup and automatic cleanup
    let ctx = gsap.context(() => {
      if (window.innerWidth >= 1360 && sectionRef.current) {
        archRefs.current.forEach((ref, idx) => {
          if (ref && ARCHES[idx]) {
            const factor = ARCHES[idx].factor;
            // Butter-smooth parallax synced exactly with Lenis scroll RAF
            gsap.fromTo(ref,
              { y: -factor * 0.7 },
              {
                y: factor * 0.7,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                }
              }
            );
          }
        });
      }

      if (sectionRef.current) {
        // Trigger brush stroke transition when section reaches 85% scroll viewport height
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          onEnter: () => setIsBrushVisible(true),
          once: true,
        });
      }
    });

    return () => {
      leftObserver.disconnect();
      cardsObserver.disconnect();
      cardObservers.forEach((obs) => obs.disconnect());
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (isMobile || hoveredIdx !== null) return;

    const interval = setInterval(() => {
      setAutoActiveIdx((prev) => (prev + 1) % ARCHES.length);
    }, 5000); // 5-second premium autoplay interval

    return () => clearInterval(interval);
  }, [isMobile, hoveredIdx]);

  return (
    <section ref={sectionRef} className="ed-section">
      {/* Side Shadows with decreasing intensity from bottom to top */}
      <div aria-hidden="true" style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        top: 0,
        width: "clamp(120px, 18vw, 350px)",
        background: "linear-gradient(to right, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.2) 35%, rgba(0, 0, 0, 0.05) 70%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
        maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
        pointerEvents: "none",
        zIndex: 99,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        top: 0,
        width: "clamp(120px, 18vw, 350px)",
        background: "linear-gradient(to left, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.2) 35%, rgba(0, 0, 0, 0.05) 70%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
        maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
        pointerEvents: "none",
        zIndex: 99,
      }} />

      {/* ── GRADIENT ARCHITECTURAL SHADOW (Fades Left to Right) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-50px", 
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
          top: "-50px", // Just enough overlap to blend into StatsStrip
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
            backgroundColor: "#F3EAD8",
            /* EXACT texture match from the previous section to completely hide the seam */
            backgroundImage: `
              url("https://www.transparenttextures.com/patterns/cream-paper.png"),
              url("https://www.transparenttextures.com/patterns/handmade-paper.png")
            `,
            backgroundRepeat: "repeat, repeat",
            backgroundSize: "400px 400px, 700px 700px",
            clipPath: "url(#s-curve-clip)",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            contain: "strict",
          }}
        />

        {/* Blueprint/Architectural accent inside the overlap region (visible above the gold rim) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "280px",
            height: "120px",
            pointerEvents: "none",
            opacity: 0.65,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 280 120" fill="none" stroke="#B38728" strokeWidth="0.85">
            {/* Subtle concentric circles for drafting guide feel */}
            <circle cx="140" cy="50" r="40" strokeDasharray="3 3" />
            <circle cx="140" cy="50" r="25" />
            <circle cx="140" cy="50" r="10" strokeDasharray="1 2" />
            
            {/* Axis lines */}
            <line x1="140" y1="0" x2="140" y2="100" strokeDasharray="4 4" />
            <line x1="80" y1="50" x2="200" y2="50" strokeDasharray="4 4" />
            
            {/* Star symbol in the center */}
            <path d="M 140,43 L 142,48 L 147,50 L 142,52 L 140,57 L 138,52 L 133,50 L 138,48 Z" fill="#B38728" />
            
            {/* Clean compass markings */}
            <path d="M 140,8 L 140,14 M 140,86 L 140,92 M 98,50 L 104,50 M 176,50 L 182,50" />
          </svg>
        </div>
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
          /* Warm golden ambient drop shadow instead of harsh black */
          filter: "drop-shadow(0px 10px 20px rgba(150, 100, 30, 0.25)) drop-shadow(0px 3px 6px rgba(80, 50, 10, 0.15))",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="s-curve-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C59B45" />
            <stop offset="15%" stopColor="#FFF2B2" /> {/* Intense warm glare */}
            <stop offset="25%" stopColor="#D4A74A" />
            <stop offset="40%" stopColor="#B38222" /> {/* Rich gold core (no black) */}
            <stop offset="50%" stopColor="#FFE8A1" /> {/* Brilliant light pop */}
            <stop offset="60%" stopColor="#C59B45" />
            <stop offset="75%" stopColor="#B38622" /> {/* Warm gold shadow */}
            <stop offset="90%" stopColor="#FDF0A6" />
            <stop offset="100%" stopColor="#D4A74A" />
          </linearGradient>
        </defs>

        {/* 1. Soft gold bottom bevel (creates physical thickness without black lines) */}
        <path 
          d="M 0,40 C 35,60 65,30 100,50" 
          fill="none" 
          stroke="#946714" 
          strokeWidth="5.5" 
          vectorEffect="non-scaling-stroke" 
          transform="translate(0, 0.3)" 
        />
        
        {/* 2. Main Lustrous Pure-Gold Body */}
        <path 
          d="M 0,40 C 35,60 65,30 100,50" 
          fill="none" 
          stroke="url(#s-curve-gold)" 
          strokeWidth="4" 
          vectorEffect="non-scaling-stroke" 
        />
        
        {/* 3. Top Specular Edge Highlight (warm white) */}
        <path 
          d="M 0,40 C 35,60 65,30 100,50" 
          fill="none" 
          stroke="rgba(255, 255, 230, 0.75)" 
          strokeWidth="1.2" 
          vectorEffect="non-scaling-stroke" 
          transform="translate(0, -0.3)" 
        />
      </svg>

      {/* SVG Clip Path Definitions */}
      <svg style={{ width: 0, height: 0, position: "absolute", pointerEvents: "none" }}>
        <defs>
          <clipPath id="s-curve-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 0,0.4 C 0.35,0.6 0.65,0.3 1,0.5 L 1,0 Z" />
          </clipPath>
          <clipPath id="s-curve-clip-bottom-black-v2" clipPathUnits="objectBoundingBox">
            {/* Smooth single path matching the separation curve */}
            <path d="M 0,1 L 0,0.6 C 0.35,0.8 0.65,0.5 1,0.7 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <noscript>
        <style>{`
          .ed-reveal, .ed-card-reveal {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>
      <style>{`
        .ed-section {
          /* Airy cream craft paper — light enough for sunbeam to read */
          background-color: #F3EAD8;
          position: relative;
          width: 100%;
          min-height: 100vh;
          /* CRITICAL: Physically hoists the ENTIRE section (curve + text) 120px upwards to overlap the empty padding space of StatsStrip! */
          margin-top: -120px;
          /* CRITICAL: Adjusted to lock text position firmly between curve and cards */
          padding: 230px 24px 120px 24px;
          display: flex;
          align-items: stretch; /* Stretches the grid to fill the entire expanded height */
          justify-content: center;
          z-index: 2;
          overflow-x: clip; /* Prevent horizontal scrolling */
          overflow-y: visible; /* CRITICAL: Allows the top overlap to escape the container boundary */
        }

        @media (min-width: 1200px) {
          .ed-section {
            padding: 260px 80px 160px 80px; /* Expanded padding from below */
            height: auto; /* Allows section to expand downwards naturally to fit the cards */
            min-height: 100vh;
          }
        }
        
        .ed-grid {
          display: grid;
          grid-template-columns: 38% 62%;
          width: 100%;
          max-width: 1800px;
          gap: clamp(30px, 3vw, 80px);
          align-items: center;
          /* Sit above the ::before texture layer */
          position: relative;
          z-index: 1;
        }

        .ed-top-row {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .ed-left-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          max-width: 480px;
        }

        /* ── Reveal Animations ── */
        .ed-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .ed-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ed-card-reveal {
          opacity: 0;
          transform: translateY(50px) scale(0.97);
          transition: opacity 1s cubic-bezier(.22,.61,.36,1), transform 1s cubic-bezier(.22,.61,.36,1);
          width: 100%;
          max-width: 260px;
        }
        .ed-card-reveal.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .ed-eyebrow-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          margin-bottom: 24px;
        }

        .ed-eyebrow-line {
          width: 40px;
          height: 1px;
          background-color: #c00000;
          opacity: 0.9;
        }

        .ed-eyebrow {
          font-family: 'Inter', var(--font-sans), sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c00000;
        }

        .ed-headline {
          font-family: 'Cormorant Garamond', var(--font-serif), serif;
          font-size: clamp(26px, 5.5vw, 54px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.01em;
          /* Deep pure black — maximum contrast on cream bg */
          color: #0A0A0A;
          /* Subtle warm shadow lifts letters off the paper texture */
          text-shadow:
            0 1px 3px rgba(0, 0, 0, 0.18),
            0 2px 8px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
          text-align: left;
          max-width: 480px;
        }

        .ed-headline span.highlight {
          display: block;
          margin-top: 14px;
          color: #c00000;
          /* Match the shadow system so crimson also pops */
          text-shadow:
            0 1px 3px rgba(192, 0, 0, 0.20),
            0 2px 8px rgba(192, 0, 0, 0.10);
        }

        .ed-divider {
          display: flex;
          align-items: center;
          width: 320px;
          height: 30px;
          margin-bottom: 30px;
          gap: 16px;
        }

        .ed-divider-line {
          flex-grow: 1;
          height: 8px; /* Layer 1: Structural Groove */
          border-radius: 4px;
          background: rgba(0,0,0,0.02);
          box-shadow: inset 0 4px 10px rgba(0,0,0,0.12), inset 0 -1px 2px rgba(255,255,255,0.5);
          position: relative;
          display: flex;
          align-items: center;
        }

        .ed-divider-line::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 3px; /* Layer 2: Main Brass Body */
          border-radius: 3px;
          background: linear-gradient(90deg, 
            rgba(214, 183, 120, 0) 0%, 
            #7B5924 10%, 
            #D6B778 20%, 
            #F5E7BA 30%, 
            #A97C32 45%, 
            #FFF7DA 50%, /* Layer 3: Specular Highlight Hotspot */
            #D6B778 55%, 
            #7B5924 85%,
            #A97C32 90%, 
            rgba(214, 183, 120, 0) 100%);
          box-shadow: 
            0 1px 1px rgba(255, 255, 255, 0.6),
            0 2px 2px rgba(0, 0, 0, 0.25),
            0 0 10px rgba(255, 242, 200, 0.8), /* Light Collision Points */
            0 0 30px rgba(214, 183, 120, 0.3), /* Layer 4: Gold Bloom */
            0 10px 40px rgba(214, 183, 120, 0.04); /* Layer 5: Atmospheric Reflection */
        }

        .ed-divider-diamond {
          position: relative;
          color: #F5E7BA;
          font-size: 26px;
          line-height: 1;
          /* The Central Jewel Anchor */
          text-shadow: 
            -1px -1px 1px rgba(255, 255, 255, 0.9), /* Upper highlight */
            1px 1px 2px rgba(0, 0, 0, 0.6), /* Lower shadow */
            0 0 15px rgba(214, 183, 120, 0.3); /* Gold Bloom */
          filter: drop-shadow(0 12px 15px rgba(0, 0, 0, 0.12)); /* Grounding Jewel shadow */
          transform: scale(1.15);
          z-index: 2;
        }

        .ed-paragraph {
          font-family: 'Inter', var(--font-sans), sans-serif;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.65;
          color: #575757;
          margin-bottom: 32px;
          max-width: 380px;
          white-space: pre-line;
          text-align: left;
        }

        .ed-cta-row {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        /* .ed-primary-btn styles now applied via inline style + onMouseEnter/Leave */
        /* (Velvet texture requires background-image layering, handled inline) */

        .ed-secondary-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ed-play-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          /* Bold gold gradient border — visible on cream bg */
          background:
            transparent padding-box,
            linear-gradient(135deg, #FFECA8 0%, #D6B778 30%, #FFFCE0 55%, #C69A3A 80%, #FFECA8 100%) border-box;
          border: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          /* Outer gold glow so it pops off the cream surface */
          box-shadow:
            0 0 8px  rgba(214, 183, 120, 0.55),
            0 0 18px rgba(196, 158,  58, 0.30),
            inset 0 1px 2px rgba(255, 255, 255, 0.70);
        }

        .ed-secondary-btn:hover .ed-play-circle {
          background:
            rgba(255, 248, 210, 0.12) padding-box,
            linear-gradient(135deg, #FFFCE0 0%, #D6B778 40%, #FFECA8 70%, #C69A3A 100%) border-box;
          border: 2px solid transparent;
          box-shadow:
            0 0 14px rgba(255, 220, 100, 0.80),
            0 0 30px rgba(214, 183, 120, 0.55),
            0 0 50px rgba(196, 158,  58, 0.30),
            inset 0 1px 3px rgba(255, 255, 255, 0.90);
          transform: scale(1.1);
        }

        .ed-btn-text-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-family: 'Inter', var(--font-sans), sans-serif;
          line-height: 1.2;
        }

        .ed-btn-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0A0A0A;
          /* Lifts text off the paper texture */
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        .ed-btn-duration {
          font-size: 12px;
          font-weight: 500;
          color: #444444;
          margin-top: 2px;
          letter-spacing: 0.04em;
        }

        /* ── Right Column: Arches ── */
        .ed-arches-container {
          display: flex;
          gap: clamp(10px, 1.2vw, 24px);
          width: 100%;
          align-items: stretch;
          justify-content: center;
        }

        .ed-arch-card {
          width: 100%;
          height: 625px; /* Massively shortened */
          /* Thicker 3px border with highly reflective golden wire gradient */
          background: 
            url("https://www.transparenttextures.com/patterns/cardboard.png") padding-box,
            url("https://www.transparenttextures.com/patterns/stardust.png") padding-box,
            linear-gradient(#F3EAD8, #F3EAD8) padding-box,
            linear-gradient(135deg, #FFECA8 0%, #D6B778 20%, #FFFCE0 40%, #B89742 60%, #9C7225 80%, #FFECA8 100%) border-box;
          border: 3px solid transparent;
          outline: 1.5px solid rgba(214, 183, 120, 0.35);
          outline-offset: 1px;
          border-radius: 130px 130px 0 0;
          padding: 30px 16px 50px 16px; /* Adjusted padding to push text up */
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          /* Real golden wire cylindrical glow and reflections with dark lift shadow */
          box-shadow: 
            0px 20px 45px rgba(0, 0, 0, 0.18),
            0px 6px 18px rgba(0, 0, 0, 0.08),
            0 0 14px rgba(214, 183, 120, 0.2);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), outline-color 0.6s;
          z-index: 1;
          will-change: transform, box-shadow;
          /* Seamless bottom fade restored, calibrated to fade ONLY the empty bottom padding */
          mask-image: linear-gradient(to bottom, black 0%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, black 92%, transparent 100%);
        }

        /* Thin inner 3D groove following the capsule contour */
        .ed-arch-card::after {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: 122px 122px 0 0; /* 130px - 8px top rounded only */
          border: 1px solid rgba(156, 114, 37, 0.25);
          box-shadow: 
            inset 1px 1px 2px rgba(0, 0, 0, 0.08),
            1px 1px 0px rgba(255, 255, 255, 0.9),
            -1px -1px 0px rgba(0, 0, 0, 0.04);
          pointer-events: none;
          z-index: 0;
        }

        @media (max-height: 940px) {
          .ed-arch-card {
            height: 625px;
            width: 100%;
            border-radius: calc(625px / 3.25 / 2) calc(625px / 3.25 / 2) 0 0;
            padding: 30px 16px 50px 16px;
            /* Update responsive padding-box/border-box background for clamp sizing */
            background: 
              url("https://www.transparenttextures.com/patterns/cardboard.png") padding-box,
              url("https://www.transparenttextures.com/patterns/stardust.png") padding-box,
              linear-gradient(#F3EAD8, #F3EAD8) padding-box,
              linear-gradient(135deg, #FFECA8 0%, #D6B778 20%, #FFFCE0 40%, #B89742 60%, #9C7225 80%, #FFECA8 100%) border-box;
            border-width: 3px;
          }
          .ed-arch-card::after {
            inset: 6px;
            border-radius: calc((625px / 3.25 / 2) - 6px) calc((625px / 3.25 / 2) - 6px) 0 0;
          }
        }

        .ed-arch-card:hover {
          transform: translateY(-40px) scale(1.05) !important;
          box-shadow: 
            0px 40px 100px rgba(0, 0, 0, 0.5),
            0px 15px 35px rgba(0, 0, 0, 0.35),
            0 0 15px rgba(214, 183, 120, 0.3);
          outline-color: rgba(255, 252, 224, 1);
          z-index: 10;
        }

        .ed-arch-num {
          font-family: 'Cormorant Garamond', var(--font-serif), serif;
          font-size: 72px;
          font-weight: 400;
          color: #765015; /* Rich dark bronze-gold shadow */
          line-height: 1;
          /* 3D Letterpress Engraved / Grooved shadow system */
          text-shadow: 
            -1px -1px 1px rgba(0, 0, 0, 0.4), 
            1px 1.5px 1px rgba(255, 255, 255, 0.95);
        }

        @media (max-height: 940px) {
          .ed-arch-num {
            font-size: clamp(44px, 5vh, 64px);
          }
        }

        @keyframes starGlowPulse {
          0%, 100% {
            transform: scale(1.02);
            opacity: 0.82;
          }
          50% {
            transform: scale(1.08);
            opacity: 1.0;
          }
        }

        .ed-arch-star {
          display: block;
          font-size: 24px;
          margin-top: 20px;
          line-height: 1;
          /* Bright lustrous gold — face of the raised star catching full light */
          color: #F0CC6A;
          /* Outward embossed: bright spec top-left, deep shadow bottom-right */
          text-shadow:
            -1px -1px 0px rgba(255, 252, 210, 1),
            -0.5px -0.5px 0px rgba(255, 240, 160, 0.9),
            2px  2px  2px  rgba(0, 0, 0, 0.55),
            3px  3px  6px  rgba(0, 0, 0, 0.35),
            0 0  8px rgba(255, 225, 110, 0.95),
            0 0 18px rgba(214, 183, 120, 0.80),
            0 0 36px rgba(196, 158,  58, 0.55),
            0 0 56px rgba(156, 114,  37, 0.35);
          /* Outer halo drop-shadow — sells the 3D lifted feel */
          filter: drop-shadow(0 4px 8px rgba(80, 50, 0, 0.45));
          animation: starGlowPulse 3s ease-in-out infinite;
          /* Slight scale lift reinforces that it's raised off the surface */
          transform: scale(1.06);
          transform-origin: center;
          will-change: transform, opacity;
        }

        @media (max-height: 940px) {
          .ed-arch-star {
            margin-top: 10px;
            font-size: 20px;
          }
        }

        .ed-arch-title {
          font-family: 'Inter', var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #111111; /* Solid black for perfect prominent visibility */
          text-shadow: 0px 0.5px 1px rgba(255, 255, 255, 0.8);
          margin-top: 12px;
          margin-bottom: 0;
          line-height: 1.2;
          text-align: center;
        }

        @media (max-height: 940px) {
          .ed-arch-title {
            margin-top: 6px;
            font-size: 12px;
          }
        }

        .ed-arch-img-wrapper {
          position: relative;
          width: calc(100% + 10px);
          height: 420px;
          margin-top: 32px;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 150px), transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 150px), transparent 100%);
        }

        @media (max-height: 940px) {
          .ed-arch-img-wrapper {
            height: clamp(240px, 34vh, 360px);
            margin-top: 18px;
            mask-image: linear-gradient(to bottom, transparent 0%, black 60px, black calc(100% - 80px), transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 60px, black calc(100% - 80px), transparent 100%);
          }
        }

        .ed-arch-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.35) 100%);
          pointer-events: none;
          z-index: 2;
        }

        .ed-arch-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 1.2s cubic-bezier(.22,.61,.36,1);
          will-change: transform;
        }

        /* Removed image hover scaling as requested */
        /* ── Arrow Overlay Element (Jewelry-like Medallion) ── */
        .ed-arch-arrow {
          position: relative;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          /* Bold gold wire ring: use outline + box-shadow stack */
          border: none;
          outline: 2.5px solid transparent;
          /* Multi-stop metallic gold gradient ring via background-clip trick */
          background:
            linear-gradient(rgba(246, 236, 221, 0), rgba(246, 236, 221, 0)) padding-box,
            linear-gradient(135deg, #FFECA8 0%, #D6B778 25%, #FFFCE0 50%, #C69A3A 75%, #FFECA8 100%) border-box;
          border: 2.5px solid transparent;
          /* Lustrous glow rings */
          box-shadow:
            0 0  6px rgba(214, 183, 120, 0.70),
            0 0 14px rgba(214, 183, 120, 0.45),
            0 0 28px rgba(196, 158,  58, 0.25),
            inset 0 1px 2px rgba(255, 255, 255, 0.50);
          display: flex;
          align-items: center;
          justify-content: center;
          /* Arrow is BLACK */
          color: #111111;
          z-index: 3;
          background-color: transparent;
          transition: all 0.3s cubic-bezier(.22,.61,.36,1);
          will-change: transform, box-shadow;
        }

        @media (max-height: 940px) {
          .ed-arch-arrow {
            width: 44px;
            height: 44px;
          }
        }

        .ed-arch-card:hover .ed-arch-arrow {
          background:
            linear-gradient(135deg, rgba(255,252,224,0.15) 0%, rgba(214,183,120,0.2) 100%) padding-box,
            linear-gradient(135deg, #FFFCE0 0%, #D6B778 40%, #FFECA8 70%, #C69A3A 100%) border-box;
          border: 2.5px solid transparent;
          color: #111111;
          box-shadow:
            0 0 12px rgba(255, 220, 100, 0.90),
            0 0 28px rgba(214, 183, 120, 0.70),
            0 0 50px rgba(196, 158,  58, 0.45),
            inset 0 1px 3px rgba(255, 255, 255, 0.80);
          transform: scale(1.12);
        }

        /* ── Category List ── */
        .ed-categories-list {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          list-style: none;
          padding: 0;
          gap: 0;
        }

        @media (max-height: 940px) {
          .ed-categories-list {
            margin-top: 12px;
          }
        }

        .ed-category-item {
          font-family: 'Inter', var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 2;
          color: #333333;
          transition: color 0.3s ease;
          text-align: center;
        }

        .ed-category-item:hover {
          color: #c00000;
        }

        /* ── Responsive Styling ── */

        /* ═══════════════════════════════════════════════════════
           ATMOSPHERIC LUXURY ELEMENTS
        ═══════════════════════════════════════════════════════ */

        /* ① Sunlight Beam — diagonal from top-left, 3 blurred layers */
        .ed-sunbeam {
          position: absolute;
          top: -80px;
          left: 6%;
          width: 520px;
          height: 90%;
          pointer-events: none;
          z-index: 0;
          transform: rotate(25deg);
          transform-origin: top left;
        }
        /* Core beam — golden-amber, tight blur, clearly visible on cream */
        .ed-sunbeam-core {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 140px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(220, 170, 60, 0.48) 0%,
            rgba(218, 165, 55, 0.28) 30%,
            rgba(215, 160, 50, 0.10) 62%,
            transparent 100%
          );
          filter: blur(45px);
        }
        /* Mid beam — wider warm glow around the core */
        .ed-sunbeam-mid {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(214, 183, 120, 0.22) 0%,
            rgba(214, 183, 120, 0.12) 35%,
            rgba(214, 183, 120, 0.04) 65%,
            transparent 100%
          );
          filter: blur(110px);
        }
        /* Atmospheric diffusion — outer corona, very wide */
        .ed-sunbeam-atmos {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 520px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(196, 158, 58, 0.10) 0%,
            rgba(196, 158, 58, 0.05) 45%,
            transparent 100%
          );
          filter: blur(220px);
        }



        /* ③ Bottom-Left Brass Curve System */
        .ed-brass-curve {
          position: absolute;
          bottom: -60px;
          left: -80px;
          width: 480px;
          height: 480px;
          pointer-events: none;
          z-index: 0;
          overflow: visible;
        }
        /* Light collision star points */
        .ed-brass-star {
          position: absolute;
          border-radius: 50%;
          background: #F5E7BA;
        }
        .ed-brass-star-1 {
          width: 5px; height: 5px;
          top: 22%; left: 62%;
          box-shadow: 0 0 12px 6px rgba(245, 231, 186, 0.55), 0 0 18px 10px rgba(214, 183, 120, 0.28);
        }
        .ed-brass-star-2 {
          width: 4px; height: 4px;
          top: 48%; left: 38%;
          box-shadow: 0 0 10px 5px rgba(245, 231, 186, 0.45), 0 0 16px 8px rgba(214, 183, 120, 0.22);
        }
        .ed-brass-star-3 {
          width: 6px; height: 6px;
          top: 72%; left: 20%;
          box-shadow: 0 0 14px 7px rgba(245, 231, 186, 0.50), 0 0 22px 12px rgba(214, 183, 120, 0.25);
        }
        /* Atmospheric gold haze blob around the curve */
        .ed-brass-haze {
          position: absolute;
          bottom: -30px;
          left: -40px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(214, 183, 120, 0.09) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }

        @media (min-width: 1360px) {
          .ed-grid {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            height: auto;
            gap: 80px; /* Organically expands space between the text row and the cards */
            grid-template-columns: none;
          }

          .ed-top-row {
            height: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 40px;
            padding-bottom: 0;
            padding-top: 0;
          }

          .ed-cta-row {
            align-self: flex-end;
            margin-bottom: 120px;
          }

          .ed-left-col {
            max-width: 65%;
            margin-top: -20px;
          }

          .ed-headline {
            max-width: 800px;
          }

          .ed-paragraph {
            margin-bottom: 0;
          }

          .ed-arches-container {
            height: auto;
            align-items: stretch;
          }

          .ed-card-reveal {
            height: 90%;
            max-width: 280px;
          }

          .ed-arch-card {
            height: 625px !important; /* Shorter card */
            padding: 30px 16px 50px 16px;
          }

          .ed-arch-img-wrapper {
            margin-top: 16px;
            mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%) !important;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%) !important;
          }

          .ed-category-item {
            font-size: 13px;
            line-height: 1.8;
          }
        }

        @media (max-width: 1360px) {
          .ed-sunbeam { left: 2%; }
        }
        @media (max-width: 900px) {
          .ed-sunbeam { display: none; }
          .ed-brass-curve { display: none; }
          .ed-brass-haze { display: none; }
        }

        @media (max-width: 1400px) {
          .ed-grid {
            grid-template-columns: 100%;
            gap: 50px;
          }
          .ed-left-col {
            max-width: 100%;
            position: relative;
            top: 0;
          }
          .ed-arches-container {
            justify-content: center;
          }
          .ed-section {
            height: auto;
            min-height: 100vh;
          }
        }

        @media (max-width: 1360px) {
          .ed-arches-container {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr);
            justify-items: center;
            gap: 30px;
          }
          .ed-card-reveal {
            max-width: 280px;
            height: auto;
          }
          .ed-divider {
            margin: 12px auto 28px 0;
          }
        }

        @media (max-width: 1024px) {
          .ed-section {
            padding-top: 180px;
            padding-bottom: 200px;
          }
          .ed-left-col {
            align-items: center;
            text-align: center;
          }
          .ed-eyebrow-container {
            align-items: center;
          }
          .ed-headline {
            text-align: center;
            font-size: clamp(24px, 4.5vw, 36px);
          }
          .ed-divider {
            margin: 12px auto 28px auto;
          }
          .ed-cta-row {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 16px !important;
            width: 100% !important;
            flex-wrap: nowrap !important;
          }
          .ed-primary-btn {
            padding: 10px 18px !important;
            font-size: 10px !important;
            border-radius: 6px !important;
            background-color: #c00000 !important;
            box-shadow: 
              inset 0 2px 4px rgba(255, 255, 255, 0.25), 
              inset 0 -2px 4px rgba(0, 0, 0, 0.35), 
              0 6px 16px rgba(0, 0, 0, 0.25) !important;
            border: 1px solid rgba(0, 0, 0, 0.35) !important;
          }
          .ed-secondary-btn {
            display: inline-flex !important;
            align-items: center !important;
            gap: 8px !important;
            padding: 8px 12px !important;
            background: rgba(0, 0, 0, 0.08) !important;
            border: 1px solid rgba(0, 0, 0, 0.18) !important;
            border-radius: 6px !important;
            box-shadow: 
              inset 1px 1px 2.5px rgba(255, 255, 255, 0.4), 
              inset -1px -1px 2.5px rgba(0, 0, 0, 0.15), 
              0 4px 10px rgba(0, 0, 0, 0.12) !important;
            transition: all 0.3s ease !important;
          }
          .ed-secondary-btn .ed-play-circle {
            width: 32px !important;
            height: 32px !important;
            box-shadow: none !important;
            background: transparent !important;
            border: 1.5px solid #d6b778 !important;
          }
          .ed-secondary-btn .ed-btn-label {
            font-size: 10px !important;
          }
          .ed-secondary-btn .ed-btn-duration {
            font-size: 9px !important;
          }
          .ed-arches-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 36px !important;
            width: 100% !important;
            padding: 0 !important;
            position: relative;
          }

          /* Interactive vertical gold ribbon connecting the cards */
          .ed-arches-container::before {
            content: "";
            position: absolute;
            top: 20px;
            bottom: 20px;
            left: 50%;
            width: 24px;
            transform: translateX(-50%);
            background: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 1000' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50,0 C75,200 25,400 75,600 C90,750 35,900 50,1000' stroke='%23d6b778' stroke-width='14' stroke-linecap='round' stroke-linejoin='round' opacity='0.75'/%3E%3C/svg%3E") repeat-y;
            background-size: 100% 100%;
            z-index: 0;
            pointer-events: none;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.08));
          }
          
          .ed-card-reveal {
            width: 90% !important;
            max-width: 520px !important;
            flex: none !important;
            z-index: 2;
          }
          
          /* Slide-in from right for odd index cards aligned to the right, hanging off-screen */
          .ed-arches-container > div:nth-child(odd) {
            align-self: flex-end !important;
            margin-right: -45px !important;
            margin-left: auto !important;
            transform: translateX(30px) translateY(10px) scale(0.98) !important;
            opacity: 0 !important;
            transition: opacity 1s cubic-bezier(.22,.61,.36,1), transform 1s cubic-bezier(.22,.61,.36,1);
            filter: drop-shadow(-12px 16px 20px rgba(0, 0, 0, 0.26)) !important;
          }
          .ed-arches-container > div:nth-child(odd).visible {
            transform: translateX(0) translateY(0) scale(1) !important;
            opacity: 1 !important;
          }
          .ed-arches-container > div:nth-child(odd) .ed-arch-card {
            mask-image: linear-gradient(to right, black 65%, rgba(0,0,0,0.3) 88%, transparent 100%) !important;
            -webkit-mask-image: linear-gradient(to right, black 65%, rgba(0,0,0,0.3) 88%, transparent 100%) !important;
            box-shadow: 
              inset 4px 4px 8px rgba(255, 255, 255, 0.95), 
              inset -4px -4px 8px rgba(0, 0, 0, 0.04) !important;
          }
          
          /* Slide-in from left for even index cards aligned to the left, hanging off-screen */
          .ed-arches-container > div:nth-child(even) {
            align-self: flex-start !important;
            margin-left: -45px !important;
            margin-right: auto !important;
            transform: translateX(-30px) translateY(10px) scale(0.98) !important;
            opacity: 0 !important;
            transition: opacity 1s cubic-bezier(.22,.61,.36,1), transform 1s cubic-bezier(.22,.61,.36,1);
            filter: drop-shadow(12px 16px 20px rgba(0, 0, 0, 0.26)) !important;
          }
          .ed-arches-container > div:nth-child(even).visible {
            transform: translateX(0) translateY(0) scale(1) !important;
            opacity: 1 !important;
          }
          .ed-arches-container > div:nth-child(even) .ed-arch-card {
            mask-image: linear-gradient(to left, black 65%, rgba(0,0,0,0.3) 88%, transparent 100%) !important;
            -webkit-mask-image: linear-gradient(to left, black 65%, rgba(0,0,0,0.3) 88%, transparent 100%) !important;
            box-shadow: 
              inset -4px 4px 8px rgba(255, 255, 255, 0.95), 
              inset 4px -4px 8px rgba(0, 0, 0, 0.04) !important;
          }

          .ed-arch-card {
            display: flex !important;
            flex-direction: row !important;
            align-items: stretch !important;
            justify-content: space-between !important;
            width: 100% !important;
            height: 250px !important;
            padding: 0 !important;
            border-radius: 60px !important;
            background: 
              url("https://www.transparenttextures.com/patterns/cardboard.png") padding-box,
              url("https://www.transparenttextures.com/patterns/stardust.png") padding-box,
              linear-gradient(#F3EAD8, #F3EAD8) padding-box,
              linear-gradient(135deg, #FFECA8 0%, #D6B778 20%, #FFFCE0 40%, #B89742 60%, #9C7225 80%, #FFECA8 100%) border-box !important;
            border: 3px solid transparent !important;
            outline: 1.5px solid rgba(214, 183, 120, 0.35) !important;
            outline-offset: 1px !important;
            box-shadow: 
              0px 15px 35px rgba(0, 0, 0, 0.15),
              0 0 10px rgba(214, 183, 120, 0.15) !important;
            mask-image: none !important;
            -webkit-mask-image: none !important;
            position: relative;
            overflow: hidden !important;
          }
          .ed-arch-card::after {
            content: "";
            position: absolute;
            inset: 6px !important;
            border-radius: 54px !important;
            border: 1px solid rgba(156, 114, 37, 0.25) !important;
            pointer-events: none;
            z-index: 10;
            box-shadow: none !important;
          }

          .ed-arches-container > div:nth-child(even) .ed-arch-card {
            flex-direction: row-reverse !important;
          }

          .ed-arch-text-content {
            flex: 1 1 50% !important;
            width: 50% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: center !important;
            text-align: left !important;
            padding: 24px 20px 24px 36px !important;
            z-index: 5;
          }
          .ed-arches-container > div:nth-child(even) .ed-arch-text-content {
            padding: 24px 36px 24px 24px !important;
          }

          .ed-arch-num {
            font-size: 38px !important;
            margin: 0 !important;
            line-height: 1 !important;
            color: #765015;
            text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.8) !important;
          }
          .ed-arch-star {
            display: none !important;
          }
          .ed-arch-title {
            font-size: 14px !important;
            font-weight: 700 !important;
            letter-spacing: 0.12em !important;
            margin-top: 4px !important;
            margin-bottom: 10px !important;
            text-align: left !important;
            color: #111111 !important;
          }
          .ed-categories-list-wrapper {
            width: 100% !important;
          }
          .ed-categories-list {
            align-items: flex-start !important;
            text-align: left !important;
            gap: 4px !important;
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .ed-category-item {
            font-size: 12px !important;
            color: #1a1a1a !important;
            font-weight: 500 !important;
            line-height: 1.4 !important;
            list-style-type: none !important;
            margin: 0 !important;
            text-align: left !important;
          }

          .ed-arch-img-wrapper {
            flex: 1 1 50% !important;
            width: 50% !important;
            height: 100% !important;
            margin-top: 0 !important;
            border-radius: 0 !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          /* Smudge the inner edge of images into the card's background color */
          .ed-arches-container > div:nth-child(odd) .ed-arch-img-wrapper {
            mask-image: linear-gradient(to right, transparent 0%, black 20%) !important;
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%) !important;
          }
          .ed-arches-container > div:nth-child(even) .ed-arch-img-wrapper {
            mask-image: linear-gradient(to left, transparent 0%, black 20%) !important;
            -webkit-mask-image: linear-gradient(to left, transparent 0%, black 20%) !important;
          }

          .ed-arch-img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            transition: none !important;
          }

          /* Hide red buttons entirely on mobile dimensions */
          .ed-arch-card .absolute {
            display: none !important;
          }

          .ed-arch-arrow {
            width: 36px !important;
            height: 36px !important;
            border-radius: 50% !important;
            background: #c00000 !important;
            border: 2px solid #ffffff !important;
            outline: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25) !important;
            color: #ffffff !important;
          }
          .ed-arch-arrow span {
            color: #ffffff !important;
            font-size: 14px !important;
            font-weight: bold !important;
          }
          .ed-arches-container > div:nth-child(even) .ed-arch-card .ed-arch-arrow span {
            transform: rotate(180deg) !important;
            display: inline-block !important;
          }

          @media (max-width: 600px) {
            .ed-arches-container {
              gap: 20px !important;
              padding: 0 10px !important;
            }
            .ed-card-reveal {
              width: 95% !important;
              max-width: 380px !important;
            }
            .ed-arch-card {
              height: 230px !important;
              border-radius: 40px !important;
            }
            .ed-arch-card::after {
              border-radius: 34px !important;
              inset: 5px !important;
            }
            .ed-arch-text-content {
              padding: 16px 10px 16px 20px !important;
            }
            .ed-arches-container > div:nth-child(even) .ed-arch-text-content {
              padding: 16px 20px 16px 12px !important;
            }
            .ed-arch-text-content img {
              margin-top: 8px !important;
              width: 28px !important;
              height: 28px !important;
            }
            .ed-arch-num {
              font-size: 26px !important;
            }
            .ed-arch-title {
              font-size: 13px !important;
              margin-top: 6px !important;
              margin-bottom: 8px !important;
            }
            .ed-categories-list {
              gap: 4px !important;
            }
            .ed-category-item {
              font-size: 11px !important;
              color: #1a1a1a !important;
              font-weight: 500 !important;
              line-height: 1.35 !important;
              white-space: nowrap !important;
            }
            .ed-arch-arrow {
              width: 30px !important;
              height: 30px !important;
              border-width: 1.5px !important;
            }
            .ed-arch-arrow span {
              font-size: 11px !important;
            }
            .ed-cta-row {
              gap: 8px !important;
            }
            .ed-primary-btn {
              padding: 8px 14px !important;
              font-size: 9.5px !important;
              border-radius: 4px !important;
            }
            .ed-secondary-btn {
              padding: 6px 10px !important;
              gap: 6px !important;
              border-radius: 4px !important;
            }
            .ed-secondary-btn .ed-play-circle {
              width: 26px !important;
              height: 26px !important;
            }
            .ed-secondary-btn .ed-play-circle svg {
              width: 10px !important;
              height: 10px !important;
              margin-left: 2px !important;
            }
            .ed-secondary-btn .ed-btn-label {
              font-size: 9px !important;
            }
            .ed-secondary-btn .ed-btn-duration {
              font-size: 8px !important;
            }
          }
        }

        /* ── Bottom-Left Corner Decorative Image ── */
        .ed-corner-img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: clamp(240px, 25vw, 360px);
          height: auto;
          pointer-events: none;
          z-index: 1;
          opacity: 0.95;
          object-fit: contain;
          object-position: bottom left;
        }

        @media (max-width: 900px) {
          .ed-corner-img { display: none; }
        }
      `}</style>
      
      {/* Isolated Static Background Texture Layer (GPU rasterized once) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            url("https://www.transparenttextures.com/patterns/cream-paper.png"),
            url("https://www.transparenttextures.com/patterns/handmade-paper.png"),
            radial-gradient(ellipse 130% 55% at 50% 0%, rgba(255, 248, 225, 0.70) 0%, transparent 100%)
          `,
          backgroundRepeat: "repeat, repeat, no-repeat",
          backgroundSize: "400px 400px, 700px 700px, 100% 60%",
          pointerEvents: "none",
          zIndex: 0,
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          contain: "strict",
        }}
      />

      {/* ── Atmospheric Luxury Elements ── */}

      {/* ① Diagonal Sunlight Beam */}
      <div className="ed-sunbeam" aria-hidden="true">
        <div className="ed-sunbeam-atmos" />
        <div className="ed-sunbeam-mid" />
        <div className="ed-sunbeam-core" />
      </div>

      {/* Golden Slant S-Shape Brush Stroke - High Performance GPU Optimized (Right to Left) */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: 0,
          width: "100%",
          height: "120%",
          pointerEvents: "none",
          zIndex: 1, /* Behind content, but above background textures */
          opacity: isBrushVisible ? 0.75 : 0,
          transformOrigin: "right center",
          transform: isBrushVisible ? "scaleX(1) translate3d(0,0,0)" : "scaleX(0) translate3d(30px,0,0)",
          transition: "transform 3.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s ease-out",
          backfaceVisibility: "hidden",
        }}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gold-brush-gradient-ed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C69A3A" />
            <stop offset="30%" stopColor="#D6B778" />
            <stop offset="50%" stopColor="#FFFCE0" />
            <stop offset="70%" stopColor="#D6B778" />
            <stop offset="100%" stopColor="#9C7225" />
          </linearGradient>
        </defs>
        <path
          d="M 1200, 100 C 700, 300 400, 200 500, 500 C 650, 950 0, 700 -100, 1100"
          fill="none"
          stroke="url(#gold-brush-gradient-ed)"
          strokeWidth="50"
          strokeLinecap="round"
        />
      </svg>



      {/* ③ Bottom-Left Brass Curve System (SVG elliptical arc, 4 stroke layers) */}
      <svg
        className="ed-brass-curve"
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        overflow="visible"
      >
        <defs>
          {/* Layer 3: Lustrous glow filter */}
          <filter id="brass-glow-lg" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Layer 4: Atmospheric bloom */}
          <filter id="brass-bloom" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
          {/* Inner groove shadow filter */}
          <filter id="brass-groove" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.12)" />
            <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="rgba(255,255,255,0.20)" />
          </filter>
        </defs>

        {/* Layer 4: Atmospheric gold bloom (widest, most diffuse) */}
        <path
          d="M 480 0 A 1600 1600 0 0 0 0 480"
          stroke="rgba(169,124,50,0.06)"
          strokeWidth="80"
          fill="none"
          filter="url(#brass-bloom)"
        />
        {/* Layer 3: Lustrous glow */}
        <path
          d="M 480 0 A 1600 1600 0 0 0 0 480"
          stroke="rgba(214,183,120,0.18)"
          strokeWidth="6"
          fill="none"
          filter="url(#brass-glow-lg)"
        />
        {/* Layer 2: Metal reflection highlight (bright edge) */}
        <path
          d="M 480 0 A 1600 1600 0 0 0 0 480"
          stroke="rgba(244,229,182,0.35)"
          strokeWidth="2"
          fill="none"
          filter="url(#brass-groove)"
        />
        {/* Layer 1: Hairline brass base (defines the shape) */}
        <path
          d="M 480 0 A 1600 1600 0 0 0 0 480"
          stroke="rgba(214,183,120,0.50)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Atmospheric haze around curve */}
      <div className="ed-brass-haze" aria-hidden="true" />

      {/* Light collision star points on the brass curve */}
      <div className="ed-brass-curve" style={{ pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
        <div className="ed-brass-star ed-brass-star-1" />
        <div className="ed-brass-star ed-brass-star-2" />
        <div className="ed-brass-star ed-brass-star-3" />
      </div>

      {/* ── Bottom-Left Corner Decorative Image ── */}
      <img
        src="/images/ed-left-corner.jpg"
        alt=""
        className="ed-corner-img"
        aria-hidden="true"
        draggable={false}
      />

      <div className="ed-grid">
        {/* Top Section / Row (35% height on desktop) */}
        <div className="ed-top-row">
          {/* Left Corner: Text */}
          <div ref={leftColRef} className="ed-left-col">
            <div 
              className={`ed-reveal ed-eyebrow-container ${leftColVisible ? "visible" : ""}`}
              style={{ transitionDelay: "0ms" }}
            >
              <div className="ed-eyebrow-line" />
              <span className="ed-eyebrow">Experience Dimensions</span>
            </div>

            <h2 
              className={`ed-reveal ed-headline ${leftColVisible ? "visible" : ""}`}
              style={{ transitionDelay: "150ms" }}
            >
              WE DON&apos;T JUST DESIGN SPACES.
              <span className="highlight">
                WE ENGINEER DIMENSIONS OF EXPERIENCE.
              </span>
            </h2>

            <div 
              className={`ed-reveal ed-divider ${leftColVisible ? "visible" : ""}`}
              style={{ transitionDelay: "300ms" }}
            >
              <span className="ed-divider-line"></span>
              <span className="ed-divider-diamond">✦</span>
              <span className="ed-divider-line"></span>
            </div>

          </div>

          {/* Right Corner/Side: Buttons */}
          <div 
            className={`ed-reveal ed-cta-row ${leftColVisible ? "visible" : ""}`}
            style={{ transitionDelay: "600ms" }}
          >
            <Link
              href="/experience"
              className="ed-primary-btn"
              style={{
                position: "relative",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "'Inter', var(--font-sans), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-parchment-50, #FDFAF5)",
                backgroundColor: "#c00000",
                boxShadow: "0 8px 20px rgba(192, 0, 0, 0.3)",
                border: "1px solid #c00000",
                borderRadius: "6px",
                padding: "14px 28px",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "scale(1.03) translateY(-3px)";
                el.style.filter = "brightness(1.2) contrast(1.1)";
                el.style.boxShadow = "0 12px 28px rgba(192, 0, 0, 0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "none";
                el.style.filter = "none";
                el.style.boxShadow = "0 8px 20px rgba(192, 0, 0, 0.3)";
              }}
            >
              EXPLORE DIMENSIONS
              <span style={{ fontSize: "1rem" }}>→</span>
            </Link>
            
            <button className="ed-secondary-btn" aria-label="Watch film">
              <div className="ed-play-circle">
                <svg width="14" height="14" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "3px" }}>
                  <defs>
                    <linearGradient id="gold-play-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFCE0" />
                      <stop offset="50%" stopColor="#D6B778" />
                      <stop offset="100%" stopColor="#9C7225" />
                    </linearGradient>
                  </defs>
                  <path d="M2 1.5L12.5 8L2 14.5V1.5Z" fill="url(#gold-play-grad)" />
                </svg>
              </div>
              <div className="ed-btn-text-group">
                <span className="ed-btn-label">Watch Film</span>
                <span className="ed-btn-duration">2:15 Min</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Section / Row: 6 Arches */}
        <div 
          ref={cardsRef} 
          className="ed-arches-container"
          onMouseLeave={() => {
            if (!isMobile) {
              if (hoveredIdx !== null) {
                setAutoActiveIdx(hoveredIdx);
              }
              setHoveredIdx(null);
            }
          }}
        >
          {ARCHES.map((arch, idx) => {
            const isActive = isMobile || hoveredIdx === idx;
            // On mobile use per-card individual visibility; on desktop use global cardsVisible
            const isCardVisible = isMobile ? cardVisibility[idx] : cardsVisible;

            return (
              <motion.div
                key={arch.title}
                layout
                ref={(el) => { cardRefs.current[idx] = el; }}
                className={`ed-card-reveal ${isCardVisible ? "visible" : ""}`}
                style={{
                  transitionDelay: isMobile ? `0ms` : `${idx * 120}ms`,
                  flex: "1 0 0%",
                }}
                onMouseEnter={() => !isMobile && setHoveredIdx(idx)}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
              >
                <div
                  ref={(el) => { archRefs.current[idx] = el; }}
                  style={{
                    width: "100%",
                    height: isMobile ? "auto" : "100%",
                    display: "flex",
                    justifyContent: "center",
                    willChange: "transform",
                  }}
                >
                  <div className="ed-arch-card">
                    <div className="ed-arch-text-content">
                      <span className="ed-arch-num">{arch.num}</span>
                      {arch.icon ? (
                        <img
                          src={arch.icon}
                          alt=""
                          style={{
                            width: "36px",
                            height: "36px",
                            objectFit: "contain",
                            marginTop: "20px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "block",
                            filter: "drop-shadow(0 4px 8px rgba(80, 50, 0, 0.45))",
                          }}
                        />
                      ) : arch.glyph ? (
                        <DimensionGlyphIcon name={arch.glyph} />
                      ) : (
                        <span className="ed-arch-star">✦</span>
                      )}
                      <h3 className="ed-arch-title">{arch.title}</h3>

                      <div className="ed-categories-list-wrapper">
                        <AnimatePresence>
                          {isActive && (
                            <motion.ul 
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={{
                                visible: { transition: { staggerChildren: 0.05 } },
                                hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } }
                              }}
                              className="ed-categories-list"
                            >
                              {arch.categories.map((cat, i) => (
                                <motion.li 
                                  key={i}
                                  variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                                  }}
                                  className="ed-category-item"
                                >
                                  {cat}
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <motion.div 
                      layout="position"
                      className="ed-arch-img-wrapper"
                      style={{ height: "240px" }}
                      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
                    >
                      <div className="ed-arch-img-overlay" />
                      <img src={arch.image} alt={`${arch.title} mock`} className="ed-arch-img" />
                      
                      {/* Magnetic Gold Medallion Button */}
                      <MagneticButton className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
                        <div className="ed-arch-arrow">
                          <span style={{ fontSize: "1rem", fontWeight: "300" }}>→</span>
                        </div>
                      </MagneticButton>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Above Curve Decorative SVG (Tiny Minimal Architectural Crosshair Diamond) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "190px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "48px",
          height: "48px",
          pointerEvents: "none",
          opacity: 0.6,
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#D4A74A" strokeWidth="0.8">
          <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="3 3" />
          <line x1="0" y1="50" x2="100" y2="50" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="10" strokeWidth="0.6" />
          <path d="M 50,44 L 53,50 L 50,56 L 47,50 Z" fill="#D4A74A" />
        </svg>
      </div>

      {/* ── Below Curve Decorative SVG (Glowing Golden CAD Structural Grid) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "280px",
          height: "120px",
          pointerEvents: "none",
          opacity: 0.4,
          zIndex: 21,
        }}
      >
        <svg viewBox="0 0 200 100" fill="none" stroke="#FFE082" strokeWidth="0.25" style={{ filter: "drop-shadow(0 0 2px rgba(214, 183, 120, 0.35))" }}>
          <line x1="0" y1="80" x2="200" y2="80" />
          <line x1="0" y1="90" x2="200" y2="90" strokeDasharray="1 3" />
          <line x1="100" y1="20" x2="-20" y2="100" />
          <line x1="100" y1="20" x2="20" y2="100" />
          <line x1="100" y1="20" x2="60" y2="100" />
          <line x1="100" y1="20" x2="100" y2="100" />
          <line x1="100" y1="20" x2="140" y2="100" />
          <line x1="100" y1="20" x2="180" y2="100" />
          <line x1="100" y1="20" x2="220" y2="100" />
          <path d="M 60,75 L 85,60 L 140,65 L 115,80 Z" strokeWidth="0.4" />
          <path d="M 60,75 L 60,50 L 85,38 L 85,60" strokeWidth="0.4" />
          <path d="M 140,65 L 140,42 L 115,55 L 115,80" strokeWidth="0.4" />
          <path d="M 60,50 L 115,55" strokeWidth="0.4" strokeDasharray="2 1" />
          <path d="M 85,38 L 140,42" strokeWidth="0.4" />
          <circle cx="60" cy="75" r="1.5" fill="#FFE082" />
          <circle cx="85" cy="60" r="1.5" fill="#FFE082" />
          <circle cx="140" cy="65" r="1.5" fill="#FFE082" />
          <circle cx="115" cy="80" r="1.5" fill="#FFE082" />
          <circle cx="60" cy="50" r="1.5" fill="#FFE082" />
          <circle cx="85" cy="38" r="1.5" fill="#FFE082" />
          <circle cx="140" cy="42" r="1.5" fill="#FFE082" />
          <circle cx="115" cy="55" r="1.5" fill="#FFE082" />
        </svg>
      </div>

      {/* ── GRADIENT ARCHITECTURAL SHADOW (Fades Right to Left) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "0px", 
          left: "-5%",
          width: "110%",
          height: "400px",
          pointerEvents: "none",
          zIndex: 22,
          /* Fades the shadow from strong on the RIGHT to nothing on the LEFT */
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 95%)",
          maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 95%)",
          /* Removed clipPath to fix Safari/Chrome solid-shape rendering bug */
          filter: "blur(18px)",
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path 
            d="M 0,60 C 35,80 65,50 100,70" 
            fill="none" 
            stroke="rgba(214, 183, 120, 0.45)" 
            strokeWidth="15" 
            vectorEffect="non-scaling-stroke" 
            transform="translate(0, 4)" 
          />
          <path 
            d="M 0,60 C 35,80 65,50 100,70" 
            fill="none" 
            stroke="rgba(201, 168, 76, 0.25)" 
            strokeWidth="45" 
            vectorEffect="non-scaling-stroke" 
            transform="translate(0, 16)" 
          />
        </svg>
      </div>

      {/* ── MASSIVE ASYMMETRICAL CURVE FILLING (BLACK SPACE BELOW) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-4px",
          left: "-5%",
          width: "110%",
          height: "408px",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#090909", // Fill empty space below with exact black texture!
            backgroundImage: `url("https://www.transparenttextures.com/patterns/black-paper.png")`,
            clipPath: "url(#s-curve-clip-bottom-black-v2)",
          }}
        />
      </div>

      {/* ── PREMIUM LUSTROUS PURE-GOLD RIM WITH DIAMOND & DOUBLE LINE ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-4px", 
          left: "-5%", 
          width: "110%", 
          height: "408px", 
          pointerEvents: "none",
          zIndex: 25, 
          filter: "drop-shadow(0px 12px 28px rgba(0, 0, 0, 0.85)) drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.6)) drop-shadow(0px 0px 8px rgba(186, 147, 72, 0.15))",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bottom-s-curve-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E4D13" />    {/* Rich deep bronze-gold shadow */}
            <stop offset="15%" stopColor="#C59B27" />   {/* Classic warm gold */}
            <stop offset="30%" stopColor="#F3D078" />   {/* Bright warm gold metallic mid */}
            <stop offset="45%" stopColor="#B28526" />   {/* Antique dark gold */}
            <stop offset="55%" stopColor="#FFF2B2" />   {/* Brilliant warm sunlight reflection */}
            <stop offset="65%" stopColor="#D4A74A" />   {/* True liquid gold */}
            <stop offset="80%" stopColor="#8A662D" />   {/* Deep gold shadow */}
            <stop offset="92%" stopColor="#FFE082" />   {/* Warm golden gloss */}
            <stop offset="100%" stopColor="#6E4D13" />  {/* Return to deep shadow */}
          </linearGradient>
        </defs>

        {/* ── MAIN S-CURVE LAYERED 3D TRIM ── */}
        
        {/* Layer 1: Ambient Occlusion Under-shadow (creates physical thickness/trench) */}
        <path 
          d="M 0,60 C 35,80 65,50 100,70" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="8" 
          vectorEffect="non-scaling-stroke" 
          transform="translate(0, 3)" 
          opacity="0.8"
        />
        
        {/* Layer 2: Volumetric Gold Glow (Bloom) */}
        <path 
          d="M 0,60 C 35,80 65,50 100,70" 
          fill="none" 
          stroke="url(#bottom-s-curve-gold)" 
          strokeWidth="12" 
          vectorEffect="non-scaling-stroke" 
          opacity="0.4"
          style={{ filter: "blur(4px)" }}
        />
        
        {/* Layer 3: Deep Brass Bevel Base */}
        <path 
          d="M 0,60 C 35,80 65,50 100,70" 
          fill="none" 
          stroke="#4c3611" 
          strokeWidth="7" 
          vectorEffect="non-scaling-stroke" 
          transform="translate(0, 1.5)" 
        />
        
        {/* Layer 4: Main Lustrous Pure-Gold Body */}
        <path 
          d="M 0,60 C 35,80 65,50 100,70" 
          fill="none" 
          stroke="url(#bottom-s-curve-gold)" 
          strokeWidth="5" 
          vectorEffect="non-scaling-stroke" 
        />
        
        {/* Layer 5: Inner Gold/White Core Highlight */}
        <path 
          d="M 0,60 C 35,80 65,50 100,70" 
          fill="none" 
          stroke="rgba(255, 228, 120, 0.85)" 
          strokeWidth="2.2" 
          vectorEffect="non-scaling-stroke" 
          transform="translate(0, -0.6)" 
        />
        
        {/* Layer 6: Specular Edge Reflection (bright white top rim) */}
        <path 
          d="M 0,60 C 35,80 65,50 100,70" 
          fill="none" 
          stroke="rgba(255, 245, 200, 0.9)" 
          strokeWidth="1.2" 
          vectorEffect="non-scaling-stroke" 
          transform="translate(0, -1.2)" 
        />
        


        {/* ── THE GOLDEN CENTER DIAMOND ── */}
        <g transform="translate(50, 65) scale(0.6, 1.2)">
          {/* Ambient glow around the diamond */}
          <circle r="4" fill="url(#bottom-s-curve-gold)" opacity="0.45" style={{ filter: "blur(1.5px)" }} />

          {/* Deep shadow / backing border */}
          <path 
            d="M 0,-3.6 L 2.4,0 L 0,3.6 L -2.4,0 Z" 
            fill="#301f02" 
            stroke="#5C3E08" 
            strokeWidth="0.8" 
            vectorEffect="non-scaling-stroke"
          />

          {/* Main Gold Diamond */}
          <path 
            d="M 0,-3 L 2,0 L 0,3 L -2,0 Z" 
            fill="url(#bottom-s-curve-gold)" 
            stroke="rgba(255, 255, 255, 0.85)" 
            strokeWidth="0.5" 
            vectorEffect="non-scaling-stroke"
          />

          {/* Specular Facet lines */}
          <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
          <line x1="-2" y1="0" x2="2" y2="0" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />

          {/* Inner sparkling white gem core */}
          <path 
            d="M 0,-1.2 L 0.8,0 L 0,1.2 L -0.8,0 Z" 
            fill="#ffffff" 
            opacity="0.95"
          />
        </g>
      </svg>
    </section>
  );
}
