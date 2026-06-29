"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountUp }              from "@/hooks/useCountUp";
import EyebrowLabel                from "@/components/ui/EyebrowLabel";
import AnimatedSection             from "@/components/ui/AnimatedSection";
import {
  ProjectsIcon, SqFtIcon, ClientsIcon, YearsIcon, LocationIcon,
} from "@/components/ui/StatIcons";

/* ── Stat config — numeric values separated from display ── */
const STATS = [
  {
    endValue:    150,
    suffix:      "+",
    label:       "Projects Delivered",
    descriptor:  "Across Hospitality, Commercial, Workspaces & Infrastructure",
    Icon:        ProjectsIcon,
    isText:      false,
  },
  {
    endValue:    15,
    suffix:      "M+",
    label:       "Sq. Ft. Executed",
    descriptor:  "Of premium spaces crafted to perfection",
    Icon:        SqFtIcon,
    isText:      false,
  },
  {
    endValue:    100,
    suffix:      "+",
    label:       "Happy Clients",
    descriptor:  "Long-term partnerships built on trust and performance",
    Icon:        ClientsIcon,
    isText:      false,
  },
  {
    endValue:    20,
    suffix:      "+",
    label:       "Years of Excellence",
    descriptor:  "Consistent delivery. Unmatched standards.",
    Icon:        YearsIcon,
    isText:      false,
  },
  {
    endValue:    0,            /* Not used — text stat */
    suffix:      "",
    textDisplay: "Across",
    label:       "India & Beyond",
    descriptor:  "Pan-India presence with global project experience",
    Icon:        LocationIcon,
    isText:      true,
  },
];

/* ── Main Component ── */
export default function StatsStrip() {
  const { ref: stripRef, isVisible } = useIntersectionObserver({
    threshold:   0.2,
    triggerOnce: true,
  });

  // Secondary observer to trigger the brush stroke when 2/3rds into the section
  const { ref: brushRef, isVisible: isBrushVisible } = useIntersectionObserver({
    threshold: 0.66,
    triggerOnce: true,
  });

  const showcaseRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const showcaseRectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (showcaseRef.current) {
      showcaseRectRef.current = showcaseRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!showcaseRef.current || !glowRef.current) return;
    let rect = showcaseRectRef.current;
    if (!rect) {
      rect = showcaseRef.current.getBoundingClientRect();
      showcaseRectRef.current = rect;
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update directly via ref for extreme performance (no React re-renders)
    glowRef.current.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
    glowRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    showcaseRectRef.current = null;
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };

  return (
    <section
      ref={stripRef as React.RefObject<HTMLElement>}
      style={{
        backgroundColor: "#F3EAD8",
        position:        "relative",
        width:           "100%",
        zIndex:          2, /* Ensure badge renders over headline */
        overflow:        "hidden",
      }}
    >
      {/* Isolated Static Background Texture Layer (GPU rasterized once) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            url("https://www.transparenttextures.com/patterns/cream-paper.png"),
            url("https://www.transparenttextures.com/patterns/handmade-paper.png")
          `,
          backgroundRepeat: "repeat, repeat",
          backgroundSize: "400px 400px, 700px 700px",
          pointerEvents: "none",
          zIndex: 0,
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          contain: "strict",
        }}
      />

      {/* Layer 4: Top Right Light Beam */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-200px", right: "-100px", width: "800px", height: "800px",
        background: "radial-gradient(ellipse, #FFFCE0 0%, transparent 60%)",
        filter: "blur(200px)",
        transform: "rotate(30deg) translate3d(0, 0, 0)", opacity: 0.10, pointerEvents: "none", zIndex: 0,
        backfaceVisibility: "hidden",
      }} />

      {/* Layer 5: Atmospheric Dust */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')",
        opacity: 0.01, pointerEvents: "none", zIndex: 0,
      }} />

      {/* Golden Atmospheric Haze */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "10%", right: "10%", width: "800px", height: "800px",
        background: "rgba(214,183,120,0.06)", filter: "blur(150px)", pointerEvents: "none", zIndex: 0,
        transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden",
      }} />

      {/* Cinematic Vignette — Top, Left, and Right only to merge seamlessly at the bottom */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        boxShadow: "inset 0 120px 120px -120px rgba(0,0,0,0.04), inset 120px 0 120px -120px rgba(0,0,0,0.04), inset -120px 0 120px -120px rgba(0,0,0,0.04)",
        pointerEvents: "none", zIndex: 10,
      }} />

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


      {/* Golden Slant S-Shape Brush Stroke - High Performance GPU Optimized */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: 0,
          width: "100%",
          height: "120%",
          pointerEvents: "none",
          zIndex: 1, /* Behind the cards, but above the background textures */
          opacity: isBrushVisible ? 0.75 : 0,
          transformOrigin: "left center",
          transform: isBrushVisible ? "scaleX(1) translate3d(0,0,0)" : "scaleX(0) translate3d(-30px,0,0)",
          transition: "transform 3.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s ease-out",
          backfaceVisibility: "hidden",
        }}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gold-brush-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C69A3A" />
            <stop offset="30%" stopColor="#D6B778" />
            <stop offset="50%" stopColor="#FFFCE0" />
            <stop offset="70%" stopColor="#D6B778" />
            <stop offset="100%" stopColor="#9C7225" />
          </linearGradient>
        </defs>
        <path
          d="M -100, 100 C 400, 300 700, 200 600, 500 C 450, 950 1100, 700 1200, 1100"
          fill="none"
          stroke="url(#gold-brush-gradient)"
          strokeWidth="50"
          strokeLinecap="round"
        />
      </svg>

      <style>{`
        .stats-strip-inner {
          display: flex;
          align-items: stretch;
          padding-top: 140px;
          padding-bottom: 140px;
          padding-left: clamp(24px, 6vw, 120px);
          padding-right: clamp(24px, 6vw, 120px);
          gap: 0px;
          position: relative;
          z-index: 1;
        }
        .stats-left-block {
          flex-shrink: 0;
          width: clamp(280px, 30%, 400px);
          padding-right: clamp(40px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
          transform: translateY(-120px);
          position: relative;
          z-index: 2;
        }
        .stats-grid {
          display: flex;
          /* Remove flex: 1 so it fits the content tightly */
          gap: 0px;
          position: relative;
          z-index: 1;
          transform: translate(-3vw, -50px);
          border-radius: 28px;
          box-shadow: 
            -12px -12px 24px rgba(255, 255, 255, 0.7),
            12px 12px 24px rgba(0, 0, 0, 0.06);
        }
        .card-wrapper {
          position: relative;
          display: flex;
          flex: 1;
          justify-content: center;
        }
        .luxury-card {
          position: relative;
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background-color: #F3EAD8; /* Matches section bg */
          background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
          border-radius: 0; /* Reset to 0 for middle cards */
          /* Ungrooved/flat outer surface */
          box-shadow: none;
          padding: 36px clamp(8px, 1vw, 20px) 36px;
          text-align: center;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s;
          z-index: 1;
          width: clamp(135px, 11vw, 200px); /* Responsive fluid width instead of fixed 200px */
          min-height: 420px;
          overflow: hidden;
        }
        .first-card .luxury-card {
          border-top-left-radius: 28px;
          border-bottom-left-radius: 28px;
        }
        .last-card .luxury-card {
          border-top-right-radius: 28px;
          border-bottom-right-radius: 28px;
        }
        .luxury-card::after {
          /* Hyper-realistic deep groove/trench with textured paper inside */
          content: "";
          position: absolute;
          inset: 14px 4px; /* Reduced side margins so the cards look much closer together */
          border-radius: 16px;
          border: 1px solid rgba(156, 114, 37, 0.25);
          
          /* Warm golden cardboard texture */
          background-color: #EADDC4; 
          background-image: 
            linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(181,141,63,0.15) 100%),
            url("https://www.transparenttextures.com/patterns/handmade-paper.png"),
            url("https://www.transparenttextures.com/patterns/cardboard.png");
          
          box-shadow: 
            inset 2px 2px 4px rgba(0,0,0,0.06),     /* Consolidated inside trench shadow */
            -1px -1px 1px rgba(255,255,255,0.8),   /* Outer bevel light */
            1px 1px 1px rgba(0,0,0,0.03);
          pointer-events: none;
          z-index: 0; /* Moves behind text/icons so the background isn't overlaid over text */
        }
        .luxury-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 40%),
            radial-gradient(circle at bottom left, rgba(0,0,0,0.02) 0%, transparent 40%),
            url("https://www.transparenttextures.com/patterns/stardust.png");
          background-size: 100% 100%, 100% 100%, 50px;
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }
        .card-wrapper:hover .luxury-card {
          transform: translateY(-6px);
          /* Only outer shadow on hover to simulate lifting, no inner bevels */
          box-shadow: 
            -16px -16px 32px rgba(255, 255, 255, 0.8),
            16px 16px 32px rgba(0, 0, 0, 0.08);
          z-index: 5;
        }
        .luxury-reflection {
          position: absolute;
          top: 0; left: 0; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent);
          transform: translate3d(-150%, 0, 0) skewX(-20deg);
          pointer-events: none;
          transition: none;
          z-index: 2;
          will-change: transform;
        }
        .card-wrapper:hover .luxury-reflection {
          transform: translate3d(300%, 0, 0) skewX(-20deg);
          transition: transform 1.2s ease-out;
        }
        .stat-icon-medallion {
          width: clamp(52px, 4vw, 72px);
          height: clamp(52px, 4vw, 72px);
          border-radius: 50%;
          background: linear-gradient(135deg, #F9F1E2 0%, #F3E7D1 50%, #E8D6B8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #FFFFFF;
          outline: 1.5px solid rgba(198, 154, 58, 0.2);
          outline-offset: -3px;
          box-shadow: 
            0 6px 12px rgba(0,0,0,0.05),
            0 12px 24px rgba(156, 114, 37, 0.08);
          position: relative;
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          margin-bottom: 24px;
          z-index: 3;
        }
        .stat-icon-medallion::before {
          content: "";
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #D6B778;
          filter: blur(18px);
          opacity: 0.08;
          z-index: -1;
        }
        .card-wrapper:hover .stat-icon-medallion {
          box-shadow: 
            0 12px 24px rgba(0,0,0,0.08),
            0 24px 48px rgba(156, 114, 37, 0.12);
        }
        /* Icon etched effect */
        .stat-icon-medallion svg {
          stroke-width: 1.75px;
          color: #9A6F22; /* Darker bronze for contrast */
          filter: drop-shadow(0 1px 0 rgba(255,255,255,0.8)) drop-shadow(0 -1px 0 rgba(0,0,0,0.1));
        }
        .gold-foil-text {
          background: linear-gradient(180deg, #9C7225 0%, #765015 50%, #4D3208 100%);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 700;
          filter: drop-shadow(0px 1px 0px rgba(255,255,255,0.5)) drop-shadow(0px 2px 4px rgba(0,0,0,0.3));
        }
        .stat-number {
          font-family: var(--font-serif);
          font-size: clamp(28px, 2.8vw, 48px);
          font-weight: 500;
          color: #111111;
          letter-spacing: -0.04em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          transition: color 1.2s ease-out;
          margin-bottom: 18px;
          text-shadow: 0px 1px 1px rgba(255,255,255,0.5);
          z-index: 1;
        }
        .stat-label {
          font-family: var(--font-sans);
          font-size: clamp(9px, 0.8vw, 12px);
          font-weight: 700; /* Increased for legibility */
          letter-spacing: 0.22em;
          text-transform: uppercase;
          line-height: 1.3;
          margin-bottom: 16px;
          transition: opacity 1.2s ease-out;
          z-index: 1;
        }
        .card-wrapper:hover .stat-label {
          opacity: 0.8;
        }
        .stat-divider {
          position: relative;
          width: 36px;
          height: 1px;
          background: linear-gradient(90deg, rgba(214,183,120,0.1) 0%, rgba(154,111,34,0.6) 30%, rgba(154,111,34,0.8) 80%, rgba(214,183,120,0) 100%);
          margin: 0 0 16px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }
        .stat-divider::after {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          background: #E9D6A4;
          filter: blur(6px);
          border-radius: 50%;
        }
        .stat-desc {
          font-family: var(--font-sans);
          font-size: clamp(10px, 0.8vw, 13px);
          line-height: 1.6;
          color: #4A4A4A; /* Darkened for better contrast against cardboard */
          text-shadow: 0px 1px 1px rgba(255,255,255,0.5);
          max-width: 100%;
          margin: 0 auto;
          z-index: 1;
        }

        /* Responsive Styles */
        @media (max-width: 1280px) {
          .stats-strip-inner {
            flex-direction: column;
            align-items: center;
            padding-top: 80px;
            padding-bottom: 160px;
            padding-left: 24px;
            padding-right: 24px;
            gap: 48px;
          }
          .stats-left-block {
            width: 100% !important;
            max-width: 600px;
            padding-right: 0 !important;
            transform: none !important;
            text-align: center;
            align-items: center;
          }
          .stats-grid {
            transform: none !important;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 24px !important;
            width: 100%;
            border-radius: 0;
            box-shadow: none;
          }
          .stat-card-animate {
            flex: none !important;
            display: flex;
            justify-content: center;
          }
          .card-wrapper {
            flex: none !important;
          }
          .luxury-card {
            width: 280px !important;
            min-height: auto !important;
            padding: 32px 24px !important;
            border-radius: 20px !important;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05) !important;
          }
          .first-card .luxury-card,
          .last-card .luxury-card {
            border-radius: 20px !important;
          }
          .vertical-divider {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .stats-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px 8px !important;
            width: 100% !important;
          }
          .stat-card-animate {
            width: 100% !important;
            flex: none !important;
          }
          .stats-grid > div:last-child .stat-card-animate {
            grid-column: span 2 / span 2 !important;
            width: calc(50% - 4px) !important;
            margin: 0 auto !important;
          }
          .card-wrapper {
            width: 100% !important;
          }
          .luxury-card {
            width: 100% !important;
            max-width: none !important;
            min-height: 290px !important;
            padding: 20px 10px !important;
          }
          .stat-number {
            font-size: 32px !important;
            margin-bottom: 12px !important;
          }
          .stat-label {
            font-size: 10px !important;
            letter-spacing: 0.15em !important;
            margin-bottom: 12px !important;
          }
          .stat-divider {
            margin-bottom: 12px !important;
          }
          .stat-desc {
            font-size: 10.5px !important;
            max-width: 130px !important;
          }
          .stat-icon-medallion {
            width: 48px !important;
            height: 48px !important;
            margin-bottom: 16px !important;
          }
          .stat-icon-medallion::before {
            width: 70px !important;
            height: 70px !important;
          }
          .stat-icon-medallion svg {
            width: 22px !important;
            height: 22px !important;
          }
        }
      `}</style>
      

      {/* Top gold separator removed to perfectly merge sections */}

      {/* Main flex row */}
      <div
        ref={brushRef as React.RefObject<HTMLDivElement>}
        className="stats-strip-inner"
      >
        {/* Left block */}
        <AnimatedSection
          delay={0}
          direction="up"
          className="stats-left-block"
        >
          <EyebrowLabel
            text="The iDecorwala Difference"
            align="left"
            showRules={false}
          />
          <h3 className="font-serif" style={{
            fontSize:      "clamp(2.5rem, 4vw, 4rem)",
            fontWeight:    400,
            lineHeight:    0.92,
            letterSpacing: "-0.04em",
            color:         "#111111",
            marginTop:     "4px",
          }}>
            Built On<br />
            Certainty<span style={{ color: "#c00000" }}>.</span>
          </h3>
          
          {/* Polished brass strip - Made bolder and more prominent */}
          <div style={{ position: "relative", width: "120px", margin: "16px 0 12px 0" }}>
            <div style={{ height: "2px", background: "#C69A3A" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#D6B778", filter: "blur(3px)", opacity: 1 }} />
            <div style={{ position: "absolute", top: "-1px", left: "10%", width: "24px", height: "4px", background: "#FFFCE0", filter: "blur(2px)" }} />
            <div style={{ position: "absolute", top: "2px", left: 0, right: 0, height: "1px", background: "rgba(0,0,0,0.15)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {["Technology. Experience. Execution.", "All aligned to deliver", "measurable business impact."].map((line) => (
              <p key={line} className="font-sans" style={{ fontSize: "0.8125rem", fontWeight: 400, color: "var(--color-ink-500)", lineHeight: 1.65 }}>
                {line}
              </p>
            ))}
          </div>
        </AnimatedSection>

        {/* Stat columns */}
        <div 
          className="stats-grid"
          ref={showcaseRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Dynamic Highlight Glow */}
          <div ref={glowRef} aria-hidden="true" style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(214,183,120,0.08) 0%, transparent 60%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 0,
            transition: "opacity 0.3s ease-out",
            opacity: 0,
            transform: "translate3d(-1000px, -1000px, 0)",
            willChange: "transform, opacity",
          }} />

          {STATS.map((stat, index) => (
            <div key={stat.label} style={{ display: "contents" }}>
              <AnimatedSection
                delay={index * 180}
                direction="up"
                translateOffset={120}
                className="stat-card-animate"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <StatColumn stat={stat} trigger={isVisible} isFirst={index === 0} isLast={index === STATS.length - 1} />
              </AnimatedSection>
              {index < STATS.length - 1 && <VerticalDivider />}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Stat Column with count-up ── */
function StatColumn({
  stat,
  trigger,
  isFirst,
  isLast,
}: {
  stat: typeof STATS[0];
  trigger: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const count = useCountUp({
    end:      stat.endValue,
    duration: 1800,
    trigger,
  });

  const displayNumber = stat.isText
    ? stat.textDisplay
    : `${count}${stat.suffix}`;

  return (
    <div className={`card-wrapper ${isFirst ? "first-card" : ""} ${isLast ? "last-card" : ""}`}>
      <div className="luxury-card">
        <div className="luxury-reflection" />
        
        {/* Icon */}
        <div className="stat-icon-medallion">
          <stat.Icon />
        </div>

        {/* Number / Text */}
        <span className="stat-number">
          {displayNumber}
        </span>

        {/* Label */}
        <span className="stat-label gold-foil-text">
          {stat.label}
        </span>

        {/* Small Divider */}
        <div className="stat-divider" />

        {/* Descriptor */}
        <p className="stat-desc">
          {stat.descriptor}
        </p>
      </div>
    </div>
  );
}

/* ── Vertical Divider ── */
function VerticalDivider() {
  return (
    <div className="vertical-divider" aria-hidden="true" style={{
      position: "relative",
      width: "20px",
      height: "180px",
      alignSelf: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
      margin: "0 -10px", /* Centers exactly on the seam */
    }}>
      {/* Smooth Golden Zig-Zag Line */}
      <svg 
        style={{ position: "absolute", width: "20px", height: "180px", zIndex: 2 }} 
        viewBox="0 0 20 180" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gold-zigzag" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#C69A3A" />
            <stop offset="50%" stopColor="#FFFCE0" />
            <stop offset="80%" stopColor="#C69A3A" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="gold-glow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#D6B778" floodOpacity="0.8" />
          </filter>
        </defs>
        {/* Perfectly smooth, gentle sine wave */}
        <path 
          d="M 10,0 Q 14,15 10,30 T 10,60 T 10,90 T 10,120 T 10,150 T 10,180" 
          fill="none" 
          stroke="url(#gold-zigzag)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          filter="url(#gold-glow)"
        />
      </svg>

      {/* Intense Golden Glow Dot */}
      <div style={{ 
        position: "absolute",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "#FFFCE0",
        boxShadow: "0 0 24px 8px rgba(214,183,120,1), inset 0 0 4px #FFFFFF",
        zIndex: 3,
      }} />
    </div>
  );
}
