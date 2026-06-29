"use client";

import React, { useEffect, useRef, useState } from "react";
import FooterSection from "@/components/sections/FooterSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   Shared style objects (avoid repetition)
───────────────────────────────────────────── */
const FONTS = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
};

const COLORS = {
  dark: "#0B0A09",
  darkDeep: "#070605",
  cream: "#F6F1E7",
  gold: "#D4AF37",
  goldLight: "#F3E5AB",
  goldDark: "#AA7C11",
  red: "#A11217",
  redDark: "#6A040F",
  white: "#FFFFFF",
  textLight: "rgba(246,241,231,0.72)",
  textDark: "rgba(20,19,17,0.72)",
};

export default function SpacefoldPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const container = triggerRef.current;
    if (!container) return;

    const frameCount = 241;
    // Sparse array indexed 0..frameCount-1
    const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);

    const drawImageCover = (img: HTMLImageElement, ctx: CanvasRenderingContext2D) => {
      const c = ctx.canvas;
      const hRatio = c.width / img.width;
      const vRatio = c.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (c.width - img.width * ratio) / 2;
      const cy = (c.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    };

    // Draw best available frame (nearest loaded fallback prevents black flashes)
    const drawFrame = (targetIdx: number) => {
      let img = images[targetIdx];
      if (!img) {
        // Walk outwards to find the nearest already-loaded frame
        for (let d = 1; d < frameCount; d++) {
          if (targetIdx - d >= 0 && images[targetIdx - d]) { img = images[targetIdx - d]; break; }
          if (targetIdx + d < frameCount && images[targetIdx + d]) { img = images[targetIdx + d]; break; }
        }
      }
      if (img) drawImageCover(img, context);
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const st = ScrollTrigger.getById("sf-3d-canvas");
      if (st) drawFrame(Math.round(st.progress * (frameCount - 1)));
      else drawFrame(0);
    };

    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const idx = i;
      img.onload = () => {
        loadedCount++;
        images[idx] = img;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (idx === 0) {
          setCanvasSize();
          setIsFirstFrameReady(true);
        }
      };
      img.onerror = () => { loadedCount++; };
      img.src = `/images/spacefold/scroll/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
    }

    setCanvasSize();
    setTimeout(() => ScrollTrigger.refresh(), 200);

    // Use ScrollTrigger.create (same as ScrollSequenceSection) — works correctly with Lenis
    const st = ScrollTrigger.create({
      id: "sf-3d-canvas",
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const frameIdx = Math.min(frameCount - 1, Math.round(self.progress * (frameCount - 1)));
        drawFrame(frameIdx);
      },
    });

    window.addEventListener("resize", setCanvasSize);

    return () => {
      st.kill();
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <>
      {/* ── Global style block ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');

        .sf-grain {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 9999; opacity: 0.02; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
        }
        .sf-vignette {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 9998;
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%);
        }
        .sf-noise-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.08; pointer-events: none; z-index: 0; mix-blend-mode: overlay;
        }
        .sf-paper-texture {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='6' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E");
          opacity: 0.04; pointer-events: none; z-index: 0; mix-blend-mode: multiply;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes sf-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .sf-spin-slow { animation: sf-spin-slow 40s linear infinite; }
        .sf-spin-slow-rev { animation: sf-spin-slow 60s linear infinite reverse; }
        @keyframes sf-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .sf-bounce { animation: sf-bounce 1.2s ease-in-out infinite; }
        .sf-process-card {
          background: #FFFFFF; border-radius: 18px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 10px 30px rgba(0,0,0,0.06), 0 30px 80px rgba(0,0,0,0.08);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
          flex-shrink: 0;
        }
        .sf-process-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0,0,0,0.14); }
        .sf-ecosystem-card {
          background: #FFFFFF; border-radius: 18px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 10px 30px rgba(0,0,0,0.06), 0 30px 80px rgba(0,0,0,0.07);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .sf-ecosystem-card:hover { transform: translateY(-8px); border-color: rgba(212,175,55,0.4); }
        .sf-primary-btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; height: 52px; padding: 0 32px; border-radius: 10px;
          background: linear-gradient(160deg, #8A1014 0%, #520306 100%);
          border: 1px solid rgba(255,255,255,0.06);
          color: #FFFFFF; font-weight: 600; font-size: 12px; letter-spacing: 0.08em;
          text-decoration: none; cursor: pointer; transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          font-family: 'Inter', sans-serif;
        }
        .sf-primary-btn:hover { transform: translateY(-3px); box-shadow: 0 20px 60px rgba(161,18,23,0.35); }
        .sf-secondary-btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 10px; height: 52px; padding: 0 32px; border-radius: 10px;
          background: rgba(11,10,9,0.6); border: 1px solid rgba(212,175,55,0.3);
          color: #F6F1E7; font-weight: 600; font-size: 12px; letter-spacing: 0.08em;
          text-decoration: none; cursor: pointer; transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          backdrop-filter: blur(12px); font-family: 'Inter', sans-serif;
        }
        .sf-secondary-btn:hover { border-color: rgba(212,175,55,0.7); box-shadow: 0 0 40px rgba(212,175,55,0.12); }
        /* Scrollbar hide for process card row */
        .sf-scroll-row { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .sf-scroll-row::-webkit-scrollbar { display: none; }
        .sf-scroll-row { -ms-overflow-style: none; scrollbar-width: none; }

        /* Responsive overrides */
        @media (max-width: 1023px) {
          .sf-hero-grid { flex-direction: column !important; }
          .sf-hero-right { display: none !important; }
          .sf-why-grid { flex-direction: column !important; }
          .sf-idda-grid { flex-direction: column !important; }
          .sf-cta-grid { flex-direction: column !important; }
        }
        @media (max-width: 767px) {
          .sf-feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sf-kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sf-eco-grid { grid-template-columns: 1fr !important; }
          .sf-cap-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div className="sf-grain" />
      <div className="sf-vignette" />

      <main style={{ backgroundColor: COLORS.dark, minHeight: "100vh", color: COLORS.cream, fontFamily: FONTS.body }}>

        {/* ═══════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════ */}
        <section style={{ position: "relative", paddingTop: "130px", paddingBottom: "80px", overflow: "hidden", backgroundColor: COLORS.darkDeep }}>
          {/* Velvet background */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="vel-grad" x1="0" y1="0" x2="1" y2="0.25">
                  <stop offset="0%" stopColor="#090001" /><stop offset="25%" stopColor="#140102" />
                  <stop offset="50%" stopColor="#450409" /><stop offset="75%" stopColor="#110001" />
                  <stop offset="100%" stopColor="#090001" />
                </linearGradient>
                <filter id="vel-warp" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.015 0.004" numOctaves="4" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="url(#vel-grad)" filter="url(#vel-warp)" />
            </svg>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1), transparent, rgba(0,0,0,0.4))" }} />
          </div>

          {/* Parchment right panel — desktop only */}
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "44%", zIndex: 0, overflow: "hidden", clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)" }} className="sf-hero-right">
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 50%, #FCF9F2 0%, #F5EEDB 35%, #EADBBE 65%, #C2A77A 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 50%, transparent 40%, rgba(126,88,53,0.25) 75%, rgba(68,42,19,0.6) 100%)", mixBlendMode: "multiply" as const }} />
          </div>

          {/* Gold seam divider */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10 }} viewBox="0 0 100 100" preserveAspectRatio="none" className="sf-hero-right">
            <defs>
              <linearGradient id="gold-seam" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8A640F" /><stop offset="25%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#F3E5AB" /><stop offset="75%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#5A3E05" />
              </linearGradient>
            </defs>
            <line x1="58" y1="0" x2="42" y2="100" stroke="url(#gold-seam)" strokeWidth="0.45" />
            <line x1="58" y1="0" x2="42" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="0.08" />
          </svg>

          {/* Ambient glows */}
          <div style={{ position: "absolute", top: "10%", left: "5%", width: "400px", height: "400px", background: "rgba(161,18,23,0.2)", filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "500px", height: "500px", background: "rgba(212,175,55,0.08)", filter: "blur(150px)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />

          {/* Hero content */}
          <div style={{ position: "relative", zIndex: 10, maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(24px, 4vw, 96px)", display: "flex", alignItems: "center", gap: "48px" }} className="sf-hero-grid">
            {/* Left */}
            <div style={{ flex: "0 0 auto", width: "min(520px, 100%)" }}>
              <p style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: COLORS.gold, opacity: 0.9, marginBottom: "24px" }}>
                POWERED BY IDECORWALA
              </p>
              <h1 style={{ fontFamily: FONTS.display, fontWeight: 400, fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.025em", color: "#FCF9F2", marginBottom: "28px" }}>
                The Operating<br />System for<br />
                <span style={{ background: `linear-gradient(90deg, ${COLORS.goldLight}, ${COLORS.gold}, ${COLORS.goldDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Living Spaces</span>
              </h1>
              <p style={{ fontFamily: FONTS.body, fontSize: "16px", lineHeight: 1.8, color: COLORS.textLight, maxWidth: "440px", marginBottom: "40px" }}>
                Spacefold is the world's first AI-powered spatial commerce platform that lets anyone design, visualize, optimize, manufacture and execute their dream home—all in one place.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                <a href="#experience" className="sf-primary-btn">
                  EXPERIENCE SPACEFOLD <span>→</span>
                </a>
                <a href="#demo" className="sf-secondary-btn">
                  <span style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7px" }}>▶</span>
                  WATCH DEMO
                </a>
              </div>

              {/* Trusted Brands */}
              <div style={{ marginTop: "52px" }}>
                <p style={{ fontFamily: FONTS.body, fontSize: "10px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: COLORS.gold, opacity: 0.9, marginBottom: "18px" }}>
                  TRUSTED BY LEADING BRANDS
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "22px", alignItems: "center", opacity: 0.82 }}>
                  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                    <span style={{ fontFamily: FONTS.display, fontSize: "18px", color: "#fff", fontWeight: 500 }}>Merino</span>
                    <span style={{ fontFamily: FONTS.body, fontSize: "6.5px", letterSpacing: "0.35em", textTransform: "uppercase", color: COLORS.gold, marginTop: "2px", fontWeight: 600 }}>Laminates</span>
                  </div>
                  <span style={{ fontFamily: FONTS.body, fontSize: "16px", color: "#fff", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Häfele</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="1.5"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" /><polygon points="12,6.5 18,10.5 18,14.5 12,18.5 6,14.5 6,10.5" fill={COLORS.gold} fillOpacity="0.8" stroke="none" /></svg>
                    <span style={{ fontFamily: FONTS.display, fontSize: "15px", color: "#fff", fontWeight: 700 }}>CenturyPly</span>
                  </div>
                  <span style={{ fontFamily: FONTS.body, fontSize: "18px", color: "#fff", fontWeight: 300, letterSpacing: "0.1em" }}>ecco</span>
                  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                    <span style={{ fontFamily: FONTS.body, fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.gold, fontWeight: 700 }}>Philips</span>
                    <span style={{ fontFamily: FONTS.display, fontSize: "19px", color: "#fff", fontWeight: 300, fontStyle: "italic", marginTop: "2px" }}>hue</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Octagon preview (desktop only) */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "420px", position: "relative" }} className="sf-hero-right">
              <div style={{ position: "relative", width: "min(460px, 100%)", height: "370px", padding: "1.5px", background: "linear-gradient(135deg, rgba(212,175,55,0.65) 0%, rgba(212,175,55,0.06) 50%, rgba(212,175,55,0.5) 100%)", clipPath: "polygon(34px 0, calc(100% - 34px) 0, 100% 34px, 100% calc(100% - 34px), calc(100% - 34px) 100%, 34px 100%, 0 calc(100% - 34px), 0 34px)", boxShadow: "0 40px 100px rgba(0,0,0,0.55)" }}>
                <div style={{ position: "absolute", inset: "1.5px", clipPath: "polygon(34px 0, calc(100% - 34px) 0, 100% 34px, 100% calc(100% - 34px), calc(100% - 34px) 100%, 34px 100%, 0 calc(100% - 34px), 0 34px)", background: "radial-gradient(circle at 50% 40%, #1c1916 0%, #100e0c 55%, #080706 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <svg viewBox="0 0 460 370" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2, pointerEvents: "none" }} stroke="rgba(212,175,55,0.45)" strokeWidth="0.7" fill="none">
                    <line x1="230" y1="185" x2="-60" y2="-50" /><line x1="230" y1="185" x2="520" y2="-50" />
                    <line x1="230" y1="185" x2="520" y2="420" /><line x1="230" y1="185" x2="-60" y2="420" />
                    <line x1="230" y1="185" x2="230" y2="-60" /><line x1="230" y1="185" x2="230" y2="430" />
                    <line x1="230" y1="185" x2="-60" y2="185" /><line x1="230" y1="185" x2="520" y2="185" />
                    <ellipse cx="230" cy="185" rx="85" ry="60" /><ellipse cx="230" cy="185" rx="145" ry="102" /><ellipse cx="230" cy="185" rx="210" ry="148" />
                  </svg>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ position: "relative", zIndex: 10, marginBottom: "20px", filter: "drop-shadow(0 0 14px rgba(212,175,55,0.7))" }}>
                    <path d="M20 5 L33 12.5 L33 27.5 L20 35 L7 27.5 L7 12.5 Z" stroke={COLORS.gold} strokeWidth="1.3" fill="rgba(212,175,55,0.04)" />
                    <path d="M20 5 L20 35 M7 12.5 L33 27.5 M33 12.5 L7 27.5" stroke={COLORS.gold} strokeWidth="0.6" strokeOpacity="0.4" />
                  </svg>
                  <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
                    <p style={{ fontFamily: FONTS.body, fontSize: "11px", color: COLORS.gold, letterSpacing: "0.32em", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" }}>3D SCROLL EXPERIENCE</p>
                    <p style={{ fontFamily: FONTS.body, fontSize: "10px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)" }}>( 3D VISUAL SPACE )</p>
                  </div>
                  {[{t:"top",l:"left"},{t:"top",l:"right"},{t:"bottom",l:"left"},{t:"bottom",l:"right"}].map((c,i) => (
                    <div key={i} style={{ position: "absolute", [c.t]: 20, [c.l]: 20, width: 24, height: 24, borderTop: c.t === "top" ? "1px solid rgba(212,175,55,0.5)" : undefined, borderBottom: c.t === "bottom" ? "1px solid rgba(212,175,55,0.5)" : undefined, borderLeft: c.l === "left" ? "1px solid rgba(212,175,55,0.5)" : undefined, borderRight: c.l === "right" ? "1px solid rgba(212,175,55,0.5)" : undefined }} />
                  ))}
                </div>
              </div>
              {/* IDDA card */}
              <div style={{ position: "absolute", bottom: "10px", left: "0", maxWidth: "290px", display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(16,13,10,0.97) 0%, rgba(24,19,14,0.94) 100%)", border: "1px solid rgba(212,175,55,0.22)", boxShadow: "0 12px 40px rgba(0,0,0,0.55)", backdropFilter: "blur(20px)", zIndex: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 35% 35%, #FF5522 0%, #C41800 50%, #6B0800 100%)", boxShadow: "0 0 20px rgba(196,24,0,0.75)", fontFamily: FONTS.display, fontWeight: 700, fontSize: "11px", letterSpacing: "0.1em", color: "#FFD4B8" }}>IDDA</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: FONTS.body, fontSize: "10px", fontWeight: 700, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.3, margin: 0 }}>IDDA – IDECORWALA</p>
                  <p style={{ fontFamily: FONTS.body, fontSize: "9px", letterSpacing: "0.08em", color: "rgba(212,175,55,0.65)", textTransform: "uppercase", marginTop: "3px", marginBottom: 0 }}>Digital Design Assistant</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M8 1L9.2 6.8L15 8L9.2 9.2L8 15L6.8 9.2L1 8L6.8 6.8Z" fill={COLORS.gold} opacity="0.85" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FEATURE JOURNEY STRIP
        ═══════════════════════════════════════════ */}
        <div style={{ width: "100%", background: "#0F0E0D", borderTop: "1px solid rgba(212,175,55,0.15)", position: "relative", zIndex: 20 }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "72px clamp(24px, 4vw, 96px)" }}>
            <div className="sf-feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
              {[
                { text: "2D Floor Plan Upload", num: "01", icon: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /> },
                { text: "3D Digital Twin Generated", num: "02", icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /> },
                { text: "Design In Metaverse", num: "03", icon: <path d="M2 12h4l2-9 4 18 2-9h4" /> },
                { text: "Real-Time Cost Optimization", num: "04", icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></> },
                { text: "Manufacturing Ready", num: "05", icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></> },
                { text: "Execute & Enjoy", num: "06", icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></> },
              ].map((f) => (
                <div key={f.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "12px" }}>
                  <div style={{ position: "relative", width: 64, height: 64, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.6)", background: "rgba(212,175,55,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.gold }}>
                    <span style={{ position: "absolute", top: -8, right: -8, fontFamily: FONTS.body, fontSize: "10px", color: COLORS.gold, background: "#0F0E0D", padding: "0 4px", fontWeight: 600 }}>{f.num}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                  </div>
                  <span style={{ fontFamily: FONTS.body, fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.4, fontWeight: 500 }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            KPI STRIP
        ═══════════════════════════════════════════ */}
        <div style={{ width: "100%", background: COLORS.cream, position: "relative", zIndex: 20 }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "72px clamp(24px, 4vw, 96px)" }}>
            <div className="sf-kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "32px", textAlign: "center" }}>
              {[
                { metric: "90%", label: "Faster\nDesign Creation" },
                { metric: "25%", label: "Average Cost\nOptimization" },
                { metric: "10,000+", label: "Products & Materials\nAt Your Fingertips" },
                { metric: "100%", label: "Manufacturing\nReady Outputs" },
                { metric: "1 Platform", label: "Design to Execution\nEnd-to-End" },
              ].map((k) => (
                <div key={k.metric} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{ fontFamily: FONTS.display, fontSize: "clamp(32px, 4vw, 56px)", color: COLORS.gold, lineHeight: 1 }}>{k.metric}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: "12px", color: "#141311", fontWeight: 600, whiteSpace: "pre-line", lineHeight: 1.4 }}>{k.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            3D SCROLL SECTION
        ═══════════════════════════════════════════ */}
        <section ref={triggerRef} style={{ position: "relative", width: "100%", background: COLORS.darkDeep, zIndex: 20, height: "400vh" }}>
          <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", transform: "translateZ(0)", willChange: "transform" }}>
            <canvas
              ref={canvasRef}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", opacity: isFirstFrameReady ? 1 : 0, transition: "opacity 0.6s ease", transform: "translateZ(0)", willChange: "transform" }}
            />
            {!isFirstFrameReady && (
              <div style={{ position: "absolute", inset: 0, background: COLORS.darkDeep, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 30 }}>
                <div style={{ width: 64, height: 64, border: "2px solid rgba(212,175,55,0.2)", borderTopColor: COLORS.gold, borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "20px" }} />
                <span style={{ fontFamily: FONTS.body, fontWeight: 700, color: "#fff", letterSpacing: "0.3em", fontSize: "12px", textTransform: "uppercase" }}>Preloading 3D Workspace</span>
                <span style={{ fontFamily: FONTS.body, color: COLORS.gold, fontSize: "13px", letterSpacing: "0.1em", marginTop: "8px", fontWeight: 700 }}>{loadProgress}%</span>
              </div>
            )}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to bottom, rgba(7,6,5,0.85), transparent)", zIndex: 10, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to top, rgba(7,6,5,0.8), transparent)", zIndex: 10, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "48px", left: 0, right: 0, zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none", padding: "0 24px" }}>
              <p style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(212,175,55,0.75)", marginBottom: "16px" }}>3D SCROLL EXPERIENCE</p>
              <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: 1.1, color: "#fff", textAlign: "center", fontWeight: 400, textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}>
                Immersive Spatial Play.<br />
                <span style={{ background: `linear-gradient(90deg, ${COLORS.goldLight}, ${COLORS.gold}, ${COLORS.goldDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Explore in 3D.</span>
              </h2>
            </div>
            {isFirstFrameReady && (
              <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", pointerEvents: "none", opacity: 0.8 }}>
                <div style={{ width: 20, height: 32, borderRadius: "10px", border: "1px solid rgba(212,175,55,0.6)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "3px" }}>
                  <div className="sf-bounce" style={{ width: 4, height: 8, background: COLORS.gold, borderRadius: "2px" }} />
                </div>
                <span style={{ fontFamily: FONTS.body, fontSize: "9px", color: "rgba(212,175,55,0.8)", letterSpacing: "0.25em", fontWeight: 600, textTransform: "uppercase" }}>Scroll to explore</span>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            WHY SPACEFOLD
        ═══════════════════════════════════════════ */}
        <section id="why" style={{ position: "relative", width: "100%", background: COLORS.dark, zIndex: 30, overflow: "hidden" }}>
          <div className="sf-noise-overlay" />
          {/* Ambient */}
          <div style={{ position: "absolute", top: "20%", left: "-5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)", filter: "blur(120px)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "96px clamp(24px, 4vw, 96px)", position: "relative", zIndex: 10 }}>
            <p style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: COLORS.gold, opacity: 0.85, marginBottom: "40px" }}>AN INDUSTRY LONG OVERDUE FOR CHANGE</p>
            <div className="sf-why-grid" style={{ display: "flex", gap: "64px", alignItems: "flex-start" }}>
              {/* Left */}
              <div style={{ flex: "0 0 auto", width: "min(420px, 100%)" }}>
                <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 1.05, color: "#fff", marginBottom: "24px" }}>
                  Fragmented.<br />Opaque.<br />Unpredictable.<br />
                  <span style={{ color: COLORS.red }}>Until Now.</span>
                </h2>
                <p style={{ fontFamily: FONTS.body, fontSize: "16px", lineHeight: 1.8, color: COLORS.textLight, maxWidth: "480px" }}>
                  For decades, designing and building spaces has relied on disjointed teams, unpredictable costs, and isolated workflows. SpaceFold unifies every step into a single, predictable matrix.
                </p>
              </div>
              {/* Right — comparison cards */}
              <div style={{ flex: 1, display: "flex", alignItems: "stretch", gap: "16px", minWidth: 0 }}>
                {/* Old Way */}
                <div style={{ flex: 1, background: "rgba(106,4,15,0.12)", border: "1px solid rgba(161,18,23,0.3)", borderRadius: "24px", padding: "32px 28px" }}>
                  <h3 style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: "13px", letterSpacing: "0.15em", color: COLORS.red, textTransform: "uppercase", marginBottom: "24px" }}>THE OLD WAY</h3>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                    {["Multiple vendors & disconnected workflows", "Weeks of back & forth for designs", "Unclear pricing & hidden markups", "Rework, delays & budget overruns", "High dependency on designers & contractors"].map((t, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid rgba(161,18,23,0.8)", background: "rgba(161,18,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                          <span style={{ color: COLORS.red, fontSize: "10px", lineHeight: 1 }}>×</span>
                        </div>
                        <span style={{ fontFamily: FONTS.body, fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Arrow */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: "0 8px" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(to bottom, #A11217, #6A040F)", boxShadow: "0 0 30px rgba(161,18,23,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
                {/* Spacefold Way */}
                <div style={{ flex: 1, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "24px", padding: "32px 28px" }}>
                  <h3 style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: "13px", letterSpacing: "0.15em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "24px" }}>THE SPACEFOLD WAY</h3>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                    {["AI-powered platform for everyone", "Instant 3D visualization & real-time pricing", "Transparent BOM, BOQ & cost optimization", "Manufacturing-ready drawings in minutes", "One-click execution with complete control"].map((t, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.8)", background: "rgba(212,175,55,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span style={{ fontFamily: FONTS.body, fontSize: "14px", color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            HOW SPACEFOLD WORKS
        ═══════════════════════════════════════════ */}
        <section id="how" style={{ position: "relative", width: "100%", background: COLORS.dark, zIndex: 30, overflow: "hidden" }}>
          {/* Cream rounded top surface */}
          <div style={{ position: "absolute", inset: 0, background: COLORS.cream, borderTopLeftRadius: "48px", borderTopRightRadius: "48px" }} />
          <div className="sf-paper-texture" style={{ borderTopLeftRadius: "48px", borderTopRightRadius: "48px" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "1440px", margin: "0 auto", padding: "96px clamp(24px, 4vw, 96px)" }}>
            <p style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: COLORS.gold, opacity: 0.85, textAlign: "center", marginBottom: "16px" }}>HOW SPACEFOLD WORKS</p>
            <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: 1.1, color: "#141311", textAlign: "center", fontWeight: 400, marginBottom: "72px" }}>
              From Floor Plan to Finished Home.<br />
              <span style={{ color: COLORS.red }}>Seamlessly.</span>
            </h2>
            <div className="sf-scroll-row" style={{ display: "flex", gap: "24px", paddingBottom: "16px", justifyContent: "flex-start" }}>
              {[
                { num: "01", title: "Upload Floor Plan", desc: "Upload PDF, CAD or Images. We convert it into a 3D digital twin instantly.", image: "/images/spacefold/step01.png" },
                { num: "02", title: "Enter Your Space", desc: "Walk through your future home in an immersive 3D metaverse.", image: "/images/spacefold/step02.png" },
                { num: "03", title: "Design Through Play", desc: "Drag, drop & customize thousands of real products.", image: "/images/spacefold/step03.png" },
                { num: "04", title: "AI Optimizes In Real-Time", desc: "IDDA calculates costs, BOM, BOQ and suggests alternatives instantly.", image: "/images/spacefold/step04.png" },
                { num: "05", title: "Manufacturing Ready", desc: "Production drawings, cut lists and CNC instructions generated automatically.", image: "/images/spacefold/step05.png" },
                { num: "06", title: "Order & Execute", desc: "Confirm with full transparency and move directly into execution.", image: "/images/spacefold/step06.png" },
              ].map((s) => (
                <div key={s.num} className="sf-process-card" style={{ width: "280px", minHeight: "420px", padding: "32px 28px", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.6)", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.body, fontWeight: 700, color: COLORS.goldDark, fontSize: "13px", marginBottom: "24px", flexShrink: 0 }}>{s.num}</div>
                  <div style={{ width: "100%", height: "110px", borderRadius: "8px", overflow: "hidden", background: "#ECE4D5", marginBottom: "20px", flexShrink: 0 }}>
                    <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <h3 style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: "17px", color: "#141311", marginBottom: "10px", lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontFamily: FONTS.body, fontSize: "13.5px", lineHeight: 1.65, color: COLORS.textDark, flex: 1, margin: 0 }}>{s.desc}</p>
                  <div style={{ alignSelf: "flex-end", marginTop: "16px", color: COLORS.gold, cursor: "pointer" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            IDDA AI SECTION
        ═══════════════════════════════════════════ */}
        <section style={{ position: "relative", width: "100%", background: COLORS.dark, zIndex: 30, overflow: "hidden" }}>
          <div className="sf-noise-overlay" />
          <div style={{ position: "absolute", left: "-5%", top: "50%", transform: "translateY(-50%)", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "1440px", margin: "0 auto", padding: "96px clamp(24px, 4vw, 96px)", display: "flex", gap: "64px", alignItems: "center" }} className="sf-idda-grid">
            {/* Ring system */}
            <div style={{ flex: "0 0 auto", width: "min(360px, 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "320px", height: "320px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.25)" }} />
                <div className="sf-spin-slow" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px dashed rgba(212,175,55,0.65)" }} />
                <div className="sf-spin-slow-rev" style={{ position: "absolute", inset: "18px", borderRadius: "50%", border: "1px dotted rgba(212,175,55,0.3)" }} />
                <div style={{ position: "absolute", inset: "36px", borderRadius: "50%", boxShadow: "0 0 60px rgba(106,4,15,0.8), inset 0 0 40px rgba(106,4,15,0.4)" }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: "0 0 60px rgba(212,175,55,0.2), 0 0 120px rgba(106,4,15,0.3)" }} />
                <div style={{ position: "relative", zIndex: 10, width: "120px", height: "120px", background: COLORS.dark, border: "1px solid rgba(212,175,55,0.5)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 30px rgba(106,4,15,0.8), 0 0 20px rgba(212,175,55,0.3)" }}>
                  <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: "24px", color: "#fff", letterSpacing: "0.15em" }}>IDDA</span>
                </div>
              </div>
            </div>
            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: COLORS.gold, opacity: 0.85, marginBottom: "20px" }}>POWERED BY IDDA</p>
              <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: 1.05, color: "#fff", marginBottom: "20px", fontWeight: 400 }}>
                Your AI Design Assistant,<br />Cost Consultant &<br />Strategist
              </h2>
              <p style={{ fontFamily: FONTS.body, fontSize: "16px", lineHeight: 1.8, color: COLORS.textLight, maxWidth: "500px", marginBottom: "40px" }}>
                IDDA works like an entire team of experts—available instantly whenever required. Every recommendation balances Design, Cost, Manufacturability, Execution, and Value.
              </p>
              <div className="sf-cap-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
                {[
                  { role: "Interior Designer", icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
                  { role: "Cost Consultant", icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></> },
                  { role: "Quantity Surveyor", icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></> },
                  { role: "Procurement Planner", icon: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></> },
                  { role: "Manufacturing Engineer", icon: <><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20.49 12l-2 .01M4 12H2M18.66 18.66l-1.41-1.41M6.34 6.34L4.93 4.93M12 20v2M12 2v2" /></> },
                  { role: "Project Coordinator", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 010 7.75" /></> },
                ].map((item) => (
                  <div key={item.role} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.4)", background: "rgba(212,175,55,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                    </div>
                    <span style={{ fontFamily: FONTS.body, fontSize: "13px", color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{item.role}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: FONTS.body, fontSize: "14px", lineHeight: 1.65, color: "rgba(212,175,55,0.8)", maxWidth: "500px", borderLeft: "2px solid rgba(212,175,55,0.3)", paddingLeft: "16px", margin: 0 }}>
                IDDA continuously learns and optimizes every decision to deliver better design, lower costs and smoother execution.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CONNECTED ECOSYSTEM
        ═══════════════════════════════════════════ */}
        <section id="ecosystem" style={{ position: "relative", width: "100%", background: COLORS.cream, zIndex: 30, overflow: "hidden" }}>
          <div className="sf-paper-texture" />
          <div style={{ position: "relative", zIndex: 10, maxWidth: "1440px", margin: "0 auto", padding: "96px clamp(24px, 4vw, 96px)" }}>
            <p style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: COLORS.gold, opacity: 0.85, textAlign: "center", marginBottom: "16px" }}>A CONNECTED ECOSYSTEM</p>
            <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(40px, 4.5vw, 60px)", lineHeight: 1.1, color: "#141311", textAlign: "center", fontWeight: 400, marginBottom: "64px" }}>
              Built for Everyone<br />in the Value Chain
            </h2>
            <div className="sf-eco-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" }}>
              {[
                { title: "For Homeowners", desc: "Design your dream home with complete transparency and control.", icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
                { title: "For Interior Designers", desc: "Deliver projects faster with AI-powered collaboration.", icon: <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></> },
                { title: "For Manufacturers", desc: "Receive accurate production data and demand forecasting.", icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></> },
                { title: "For Brands & Suppliers", desc: "Showcase products through immersive experiences.", icon: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></> },
                { title: "For Builders & Developers", desc: "Accelerate project delivery and improve buyer engagement.", icon: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></> },
              ].map((card) => (
                <div key={card.title} className="sf-ecosystem-card" style={{ padding: "32px 24px", minHeight: "220px", display: "flex", flexDirection: "column" }}>
                  <div style={{ marginBottom: "16px", color: COLORS.gold }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{card.icon}</svg>
                  </div>
                  <h3 style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: "15px", color: "#141311", marginBottom: "8px", lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontFamily: FONTS.body, fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════ */}
        <section style={{ position: "relative", width: "100%", background: COLORS.dark, zIndex: 30 }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "96px clamp(24px, 4vw, 96px)" }}>
            <div style={{ borderRadius: "36px", overflow: "hidden", background: "linear-gradient(135deg, #A11217 0%, #6A040F 100%)", boxShadow: "0 40px 120px rgba(106,4,15,0.4)", position: "relative", display: "flex" }} className="sf-cta-grid">
              <div className="sf-noise-overlay" />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />

              {/* Left content */}
              <div style={{ flex: "0 0 60%", padding: "56px 48px", position: "relative", zIndex: 10, display: "flex", gap: "32px", alignItems: "center" }}>
                <div style={{ width: 180, height: 180, flexShrink: 0, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
                  <img src="/images/spacefold/cta_interior.png" alt="Luxury interior" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: "11px", color: COLORS.gold, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px" }}>READY TO EXPERIENCE THE FUTURE?</p>
                  <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(32px, 4vw, 52px)", color: "#fff", lineHeight: 1.05, fontWeight: 400, marginBottom: "24px" }}>Your Dream Home<br />is Just One Click Away.</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
                    {["Personalized Live Demo", "Explore Real Projects", "Understand Cost Benefits", "Get All Your Questions Answered"].map((b) => (
                      <div key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0B0A09" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span style={{ fontFamily: FONTS.body, fontSize: "14px", color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right buttons */}
              <div style={{ flex: 1, padding: "56px 48px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 10, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "280px" }}>
                  <button style={{ height: 56, width: "100%", background: "#fff", border: "none", borderRadius: "10px", fontFamily: FONTS.body, fontWeight: 700, fontSize: "14px", color: "#141311", cursor: "pointer", boxShadow: "0 0 30px rgba(212,175,55,0.35)", letterSpacing: "0.06em" }}>
                    BOOK A LIVE DEMO
                  </button>
                  <button style={{ height: 56, width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "10px", fontFamily: FONTS.body, fontWeight: 700, fontSize: "14px", color: "#fff", cursor: "pointer", letterSpacing: "0.06em" }}>
                    TALK TO AN EXPERT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <FooterSection />
      </main>
    </>
  );
}
