"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Head from "next/head";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


export default function SpacefoldPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 241;
    const images: HTMLImageElement[] = [];
    const scrollState = { frame: 1 };

    canvas.width = 1200;
    canvas.height = 680;

    // Draw first frame immediately
    const firstImg = new Image();
    firstImg.src = `/images/spacefold/scroll/ezgif-frame-001.jpg`;
    firstImg.onload = () => {
      if (scrollState.frame === 1) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
      }
    };

    let loadedCount = 0;
    const loadPromises = [];

    // Preload all frames for zero-lag scrubbing
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/images/spacefold/scroll/ezgif-frame-${frameNum}.jpg`;
      
      const promise = new Promise((resolve) => {
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / frameCount) * 100));
          resolve(true);
        };
        img.onerror = () => {
          loadedCount++;
          resolve(false);
        };
      });
      loadPromises.push(promise);
      images.push(img);
    }

    Promise.all(loadPromises).then(() => {
      setIsLoaded(true);
      const img = images[0];
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    });

    const drawFrame = (index: number) => {
      const img = images[index - 1];
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Pin scrollTrigger timeline — hold until ALL 241 frames finish
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        pinSpacing: true,
        scrub: 0.1,
        start: "top top",
        end: "+=6000",
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.to(scrollState, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        drawFrame(Math.round(scrollState.frame));
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === triggerRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <main 
        className="min-h-screen text-[#F6F1E7] overflow-x-hidden"
        style={{
          backgroundColor: "#0B0A09",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* MD-05: Global 2% grain + 6% vignette — fixed, behind everything */}
        <div className="global-grain"></div>
        <div className="page-vignette"></div>
        {/* ═══════════════════════════════════════════════════ */}
        {/* MD-05 MASTER ART DIRECTION — LUXURY EXECUTION RULES */}
        {/* ═══════════════════════════════════════════════════ */}
        <style dangerouslySetInnerHTML={{ __html: `

          /* ─── FONTS ─────────────────────────────────────────── */
          .font-display { font-family: 'Cormorant Garamond', serif; letter-spacing: -0.025em; }
          .font-body { font-family: 'Inter', sans-serif; }

          /* ─── BUTTONS ────────────────────────────────────────── */
          .primary-btn {
            display: inline-flex; align-items: center; justify-content: center;
            height: 44px; padding: 0 26px; border-radius: 10px;
            background: linear-gradient(160deg, #A11217 0%, #6A040F 100%);
            box-shadow: 0 10px 30px rgba(0,0,0,0.12), 0 30px 80px rgba(161,18,23,0.25), 0 0 0 1px rgba(161,18,23,0.5);
            color: #FFFFFF; font-weight: 600; font-size: 13px; letter-spacing: 0.06em;
            transition: all 0.4s cubic-bezier(0.22,1,0.36,1); text-decoration: none; cursor: pointer;
          }
          .primary-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15), 0 30px 80px rgba(161,18,23,0.35), 0 80px 140px rgba(161,18,23,0.08);
          }
          .secondary-btn {
            display: inline-flex; align-items: center; justify-content: center;
            height: 44px; padding: 0 26px; border-radius: 10px;
            background: rgba(20,19,17,0.4); border: 1px solid rgba(212,175,55,0.35);
            color: #F6F1E7; font-weight: 600; font-size: 13px; letter-spacing: 0.06em;
            transition: all 0.4s cubic-bezier(0.22,1,0.36,1); text-decoration: none; cursor: pointer;
            backdrop-filter: blur(12px);
          }
          .secondary-btn:hover {
            box-shadow: 0 0 0 1px rgba(212,175,55,0.5), 0 10px 30px rgba(0,0,0,0.2), 0 0 40px rgba(212,175,55,0.12);
            border-color: rgba(212,175,55,0.7);
          }

          /* ─── LABELS ─────────────────────────────────────────── */
          .section-label {
            font-family: 'Inter', sans-serif; font-weight: 600; font-size: 11px;
            letter-spacing: 0.32em; text-transform: uppercase; color: #D4AF37;
          }

          /* ─── HERO HEADING ───────────────────────────────────── */
          .hero-heading {
            font-family: 'Cormorant Garamond', serif;
            font-size: 76px; line-height: 0.92;
            letter-spacing: -0.025em; font-weight: 400;
          }

          /* ─── TEXTURE SYSTEM (MD-05) ─────────────────────────── */

          /* Global 2% noise — on every section via main */
          .global-grain {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 9999; opacity: 0.02; mix-blend-mode: overlay;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
          }

          /* Dark section 8% film grain */
          .noise-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            opacity: 0.08; pointer-events: none; z-index: 1; mix-blend-mode: overlay;
          }

          /* Light section 4% paper texture */
          .paper-texture {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='6' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E");
            opacity: 0.04; pointer-events: none; z-index: 1; mix-blend-mode: multiply;
          }

          /* ─── VIGNETTE (MD-05) ───────────────────────────────── */
          .page-vignette {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 9998;
            background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%);
          }

          /* ─── AMBIENT LIGHTING (MD-05) ───────────────────────── */
          /* Gold — reflected, never solid. 8–15%, 120–240px blur */
          .gold-glow {
            position: absolute; top: 40%; right: 10%; transform: translateY(-50%);
            width: 900px; height: 900px;
            background: radial-gradient(circle, #D4AF37 0%, rgba(212,175,55,0) 70%);
            opacity: 0.11; filter: blur(220px); pointer-events: none; z-index: 1;
          }
          .gold-glow-corner {
            position: absolute;
            width: 600px; height: 600px;
            background: radial-gradient(circle, #D4AF37 0%, rgba(212,175,55,0) 70%);
            opacity: 0.08; filter: blur(180px); pointer-events: none; z-index: 1;
          }

          /* Red — corners/transitions only. 10–20%. Never centered. */
          .red-velvet {
            position: absolute; top: 0; left: 0; width: 800px; height: 800px;
            background: radial-gradient(circle, #6A040F 0%, rgba(106,4,15,0) 70%);
            opacity: 0.15; filter: blur(160px); pointer-events: none; z-index: 1;
          }
          .red-velvet-br {
            position: absolute; bottom: 0; right: 0; width: 800px; height: 800px;
            background: radial-gradient(circle, #6A040F 0%, rgba(106,4,15,0) 70%);
            opacity: 0.15; filter: blur(160px); pointer-events: none; z-index: 1;
          }

          /* ─── ARCHITECTURAL GRID LINES ───────────────────────── */
          .arch-lines {
            position: absolute; inset: 0;
            background-image:
              linear-gradient(rgba(212,175,55,0.10) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.10) 1px, transparent 1px);
            background-size: 120px 120px;
            pointer-events: none; z-index: 1; opacity: 0.5;
          }

          /* ─── PREMIUM STACKED SHADOWS (MD-05) ───────────────── */
          .shadow-premium {
            box-shadow:
              0 10px 30px rgba(0,0,0,0.12),
              0 30px 80px rgba(0,0,0,0.18),
              0 80px 140px rgba(0,0,0,0.08);
          }
          .shadow-premium-dark {
            box-shadow:
              0 10px 30px rgba(0,0,0,0.25),
              0 30px 80px rgba(0,0,0,0.35),
              0 80px 140px rgba(0,0,0,0.15);
          }

          /* ─── NAVBAR ─────────────────────────────────────────── */
          .spcfld-nav {
            position: sticky; top: 0; height: 88px;
            background: rgba(11,10,9,0.82); backdrop-filter: blur(24px) saturate(180%);
            border-bottom: 1px solid rgba(212,175,55,0.12);
            z-index: 999; display: flex; align-items: center; padding: 0 48px;
            box-shadow: 0 1px 0 rgba(212,175,55,0.08), 0 10px 30px rgba(0,0,0,0.25);
          }
          .nav-link {
            font-family: 'Inter', sans-serif; font-weight: 500; font-size: 12px;
            letter-spacing: 0.06em; color: rgba(255,255,255,0.72);
            transition: color 0.4s ease; text-decoration: none;
          }
          .nav-link:hover { color: #D4AF37; }

          /* ─── ANIMATION SYSTEM (MD-05) ───────────────────────── */
          /* Section reveal: translateY 60px → 0, 1.2–1.6s */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(60px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .gsap-fade {
            animation: fadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          /* Faster for hero */
          .gsap-fade-fast {
            animation: fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          /* ─── RING ANIMATIONS ────────────────────────────────── */
          @keyframes spin-slow {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow { animation: spin-slow 40s linear infinite; }

          /* ─── IMAGE TREATMENT (MD-05) ────────────────────────── */
          /* Premium warm contrast grade */
          .img-luxury {
            filter: contrast(1.08) saturate(0.92) sepia(0.08) brightness(0.97);
            transition: filter 0.5s ease;
          }
          .img-luxury:hover { filter: contrast(1.06) saturate(0.95) sepia(0.05) brightness(1.0); }

          /* ─── CARD SYSTEM (MD-05) ────────────────────────────── */
          /* Process cards — white, stacked shadow, lift on hover */
          .process-card {
            background: #FFFFFF;
            border-radius: 18px;
            border: 1px solid rgba(0,0,0,0.05);
            box-shadow: 0 10px 30px rgba(0,0,0,0.06), 0 30px 80px rgba(0,0,0,0.08), 0 80px 140px rgba(0,0,0,0.04);
            transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1);
          }
          .process-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.10), 0 30px 80px rgba(0,0,0,0.18), 0 80px 140px rgba(0,0,0,0.10);
          }

          /* Ecosystem cards — stacked shadow + gold hover */
          .ecosystem-card {
            background: #FFFFFF;
            border-radius: 18px;
            border: 1px solid rgba(0,0,0,0.05);
            box-shadow: 0 10px 30px rgba(0,0,0,0.06), 0 30px 80px rgba(0,0,0,0.07);
            transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          }
          .ecosystem-card:hover {
            transform: translateY(-8px);
            border-color: rgba(212,175,55,0.4);
            box-shadow: 0 10px 30px rgba(0,0,0,0.10), 0 30px 80px rgba(0,0,0,0.16), 0 0 0 1px rgba(212,175,55,0.15);
          }

          /* ─── CORNER ARCHITECTURE (MD-05) ────────────────────── */
          .arch-corner-tl {
            clip-path: polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px);
          }
          .arch-corner-br {
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
          }
          .arch-corner-both {
            clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
          }

          /* ─── SCROLL BREATHING ROOM (MD-05) ─────────────────── */
          section { scroll-margin-top: 100px; }

        `}} />


        {/* HERO SECTION */}
        <section className="relative min-h-[1050px] flex flex-col w-full gsap-fade overflow-hidden">
          {/* Base Background */}
          <div className="absolute inset-0 bg-[#070605] z-0"></div>

          {/* Left Background Layer - Deep Burgundy Velvet Fabric (100% Procedural SVG displacement shader) */}
          <div 
            className="absolute inset-y-0 left-0 z-0 opacity-100 transition-opacity duration-1000"
            style={{
              width: "60%",
            }}
          >
            {/* Procedural Wavy Velvet Shader */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="velvet-stripes" x1="0" y1="0" x2="1" y2="0.25">
                  <stop offset="0%" stopColor="#090001" />
                  <stop offset="12%" stopColor="#2c0205" />
                  <stop offset="25%" stopColor="#140102" />
                  <stop offset="38%" stopColor="#450409" />
                  <stop offset="50%" stopColor="#140102" />
                  <stop offset="65%" stopColor="#55050c" />
                  <stop offset="78%" stopColor="#110001" />
                  <stop offset="90%" stopColor="#380306" />
                  <stop offset="100%" stopColor="#090001" />
                </linearGradient>
                
                <filter id="velvet-warp" x="0%" y="0%" width="100%" height="100%">
                  {/* Organic wave noise generator */}
                  <feTurbulence type="fractalNoise" baseFrequency="0.015 0.004" numOctaves="4" result="noise" />
                  {/* Warp the linear stripes into fabric drapes */}
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#velvet-stripes)" filter="url(#velvet-warp)" />
            </svg>

            {/* Fine Fabric Velvet Grain Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15] mix-blend-overlay pointer-events-none">
              <filter id="velvet-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#velvet-grain)" />
            </svg>
            
            {/* Ambient vignette and glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45"></div>
          </div>


          {/* Right Background Layer - Premium Antique Treasure Paper (100% Code-based Parchment) */}
          <div 
            className="absolute inset-0 z-0 transition-opacity duration-1000 overflow-hidden"
            style={{
              clipPath: "polygon(58% 0, 100% 0, 100% 100%, 42% 100%)",
            }}
          >
            {/* Antique Parchment Radial Base (Light cream center, intensity/burnt color increases outwards) */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 70% 50%, #FCF9F2 0%, #F5EEDB 35%, #EADBBE 65%, #C2A77A 100%)'
              }}
            />
            
            {/* SVG Procedural Paper Fibers & Crease Map */}
            <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <filter id="parchment-fiber">
                  {/* Fractal noise for organic paper lumps */}
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                  {/* 3D lighting to simulate texture height/creases */}
                  <feDiffuseLighting in="noise" lightingColor="#FFF9EB" surfaceScale="1.8" result="light">
                    <feDistantLight azimuth="60" elevation="50" />
                  </feDiffuseLighting>
                  {/* Blend original base color with the fiber map */}
                  <feBlend mode="multiply" in="SourceGraphic" in2="light" />
                </filter>
                {/* Antique stains */}
                <radialGradient id="stain-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7E5835" stopOpacity="0.12" />
                  <stop offset="60%" stopColor="#7E5835" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#7E5835" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Render structural base with the 3D paper filter */}
              <rect width="100" height="100" fill="#FCF8EF" filter="url(#parchment-fiber)" opacity="0.85" />
              
              {/* Random organic time-worn stains */}
              <circle cx="65" cy="30" r="15" fill="url(#stain-grad)" />
              <circle cx="85" cy="70" r="22" fill="url(#stain-grad)" />
              <circle cx="50" cy="80" r="10" fill="url(#stain-grad)" />
              
              {/* Faint historical fold lines/creases */}
              <path d="M48 0 C55 30, 60 70, 68 100" stroke="#7E5835" strokeWidth="0.08" fill="none" opacity="0.15" />
              <path d="M48.2 0 C55.2 30, 60.2 70, 68.2 100" stroke="#FFFFFF" strokeWidth="0.06" fill="none" opacity="0.25" />
              
              <path d="M35 100 C50 65, 75 40, 100 25" stroke="#7E5835" strokeWidth="0.08" fill="none" opacity="0.12" />
              <path d="M35.2 100 C50.2 65, 75.2 40, 100.2 25" stroke="#FFFFFF" strokeWidth="0.06" fill="none" opacity="0.2" />
            </svg>
            
            {/* Burnt edges vignette overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 70% 50%, transparent 40%, rgba(126, 88, 53, 0.25) 75%, rgba(68, 42, 19, 0.6) 100%)',
                mixBlendMode: 'multiply'
              }}
            />
          </div>

          {/* Diagonal Gold Metallic Seams / Chevron Linings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gold-metallic" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8A640F" />
                <stop offset="25%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#F3E5AB" />
                <stop offset="75%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#5A3E05" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Primary seam splitting velvet and marble */}
            <line x1="58" y1="0" x2="42" y2="100" stroke="url(#gold-metallic)" strokeWidth="0.45" filter="url(#glow)" />
            <line x1="58" y1="0" x2="42" y2="100" stroke="rgba(255,255,255,0.6)" strokeWidth="0.1" />

            {/* Accent gold line intersecting bottom right */}
            <line x1="90" y1="0" x2="65" y2="100" stroke="url(#gold-metallic)" strokeWidth="0.25" opacity="0.8" />
            
            {/* Top right thin border */}
            <line x1="75" y1="0" x2="100" y2="35" stroke="url(#gold-metallic)" strokeWidth="0.2" opacity="0.7" />
          </svg>

          {/* Ambient Lighting & Glows */}
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#A11217]/25 blur-[120px] rounded-full pointer-events-none z-0"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

          {/* Layer 02: Navigation Bar */}
          <nav className="spcfld-nav w-full z-20">
            <div className="w-[20%] flex items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center rounded">
                  <span className="text-[#D4AF37] text-xl font-display">SF</span>
                </div>
                <span className="font-display text-white text-xl tracking-widest uppercase">SpaceFold</span>
              </div>
            </div>
            <div className="w-[60%] flex items-center justify-center gap-[42px]">
              <a href="#why" className="nav-link">WHY SPACEFOLD</a>
              <a href="#features" className="nav-link">FEATURES</a>
              <a href="#how" className="nav-link">HOW IT WORKS</a>
              <a href="#ecosystem" className="nav-link">ECOSYSTEM</a>
              <a href="#business" className="nav-link">FOR BUSINESS</a>
              <a href="#resources" className="nav-link">RESOURCES</a>
            </div>
            <div className="w-[20%] flex justify-end">
              <a href="/contact" className="primary-btn">BOOK DEMO</a>
            </div>
          </nav>

          {/* Layer 03: Hero Split Layout */}
          <div className="relative z-10 w-full flex mt-[80px] px-[60px] items-center" style={{ minHeight: '560px' }}>

            {/* Left Column */}
            <div className="w-[48%] flex flex-col justify-between pl-[120px]" style={{ minHeight: '520px' }}>
              <div className="mt-4">
                <div className="section-label mb-[24px] text-[#D4AF37] tracking-[0.32em] font-semibold text-[11px] opacity-80 font-sans">
                  POWERED BY IDECORWALA
                </div>
                <h1 className="hero-heading text-[#FCF9F2] text-[96px] leading-[0.9] font-light">
                  The Operating<br />System for<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] font-normal">Living Spaces</span>
                </h1>
                <p className="font-body text-[16px] leading-[1.8] max-w-[440px] mt-[44px]" style={{ color: 'rgba(246,241,231,0.68)' }}>
                  Spacefold is the world's first AI-powered spatial commerce platform that lets anyone design, visualize, optimize, manufacture and execute their dream home—all in one place.
                </p>
                <div className="flex items-center gap-[18px] mt-[72px]">
                  <a href="#experience" className="primary-btn flex items-center justify-center gap-2 group font-semibold text-[12px] tracking-[0.08em]" style={{ background: 'linear-gradient(160deg, #8A1014 0%, #520306 100%)', height: '52px', padding: '0 32px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    EXPERIENCE SPACEFOLD
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <a href="#demo" className="secondary-btn flex items-center justify-center gap-2.5 font-semibold text-[12px] tracking-[0.08em]" style={{ height: '52px', padding: '0 32px', background: 'rgba(11,10,9,0.6)', border: '1px solid rgba(212,175,55,0.3)' }}>
                    <span className="w-5 h-5 rounded-full border border-white/80 flex items-center justify-center text-[7px] text-white pl-[1.5px] bg-white/5 shadow-inner">▶</span>
                    WATCH DEMO
                  </a>
                </div>
              </div>

              {/* Trusted Brands */}
              <div className="mt-[52px]">
                <div className="text-[#D4AF37] font-body text-[10px] font-bold uppercase tracking-[0.35em] mb-[18px] opacity-90">
                  TRUSTED BY LEADING BRANDS
                </div>
                <div className="flex gap-[22px] items-center" style={{ opacity: 0.82 }}>
                  <div className="flex flex-col items-start leading-none shrink-0 select-none">
                    <span className="font-display text-[18px] text-white tracking-wide font-medium">Merino</span>
                    <span className="font-sans font-semibold text-[#D4AF37]" style={{ fontSize: '6.5px', letterSpacing: '0.35em', textTransform: 'uppercase', marginTop: '2px' }}>Laminates</span>
                  </div>
                  <div className="flex flex-col shrink-0 select-none">
                    <span className="font-sans text-[16px] text-white font-extrabold tracking-widest uppercase">Häfele</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 select-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                      <polygon points="12,6.5 18,10.5 18,14.5 12,18.5 6,14.5 6,10.5" fill="#D4AF37" fillOpacity="0.8" stroke="none" />
                    </svg>
                    <span className="font-display text-[15px] text-white tracking-tight font-bold">CenturyPly</span>
                  </div>
                  <div className="flex shrink-0 select-none">
                    <span className="font-sans text-[18px] text-white font-light tracking-[0.1em] lowercase">ecco</span>
                  </div>
                  {/* Philips Hue */}
                  <div className="flex flex-col items-start leading-none shrink-0 select-none">
                    <span className="text-[8px] uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-bold">Philips</span>
                    <span className="font-display text-[19px] text-white tracking-tighter lowercase font-light italic mt-0.5">hue</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Octagon 3D Preview + IDDA Card */}
            <div className="w-[52%] relative flex flex-col items-end justify-center pl-10" style={{ minHeight: '520px' }}>

              {/* Octagon Card */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '460px',
                  height: '370px',
                  padding: '1.5px',
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.65) 0%, rgba(212,175,55,0.06) 50%, rgba(212,175,55,0.5) 100%)',
                  clipPath: 'polygon(34px 0, calc(100% - 34px) 0, 100% 34px, 100% calc(100% - 34px), calc(100% - 34px) 100%, 34px 100%, 0 calc(100% - 34px), 0 34px)',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '1.5px',
                    clipPath: 'polygon(34px 0, calc(100% - 34px) 0, 100% 34px, 100% calc(100% - 34px), calc(100% - 34px) 100%, 34px 100%, 0 calc(100% - 34px), 0 34px)',
                    background: 'radial-gradient(circle at 50% 40%, #1c1916 0%, #100e0c 55%, #080706 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Perspective grid lines */}
                  <svg viewBox="0 0 460 370" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25, pointerEvents: 'none' }} stroke="rgba(212,175,55,0.45)" strokeWidth="0.7" fill="none">
                    <line x1="230" y1="185" x2="-60" y2="-50" />
                    <line x1="230" y1="185" x2="520" y2="-50" />
                    <line x1="230" y1="185" x2="520" y2="420" />
                    <line x1="230" y1="185" x2="-60" y2="420" />
                    <line x1="230" y1="185" x2="230" y2="-60" />
                    <line x1="230" y1="185" x2="230" y2="430" />
                    <line x1="230" y1="185" x2="-60" y2="185" />
                    <line x1="230" y1="185" x2="520" y2="185" />
                    <ellipse cx="230" cy="185" rx="38" ry="27" />
                    <ellipse cx="230" cy="185" rx="85" ry="60" />
                    <ellipse cx="230" cy="185" rx="145" ry="102" />
                    <ellipse cx="230" cy="185" rx="210" ry="148" />
                  </svg>
                  {/* 3D Cube icon */}
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ position: 'relative', zIndex: 10, marginBottom: '20px', filter: 'drop-shadow(0 0 14px rgba(212,175,55,0.7))' }}>
                    <path d="M20 5 L33 12.5 L33 27.5 L20 35 L7 27.5 L7 12.5 Z" stroke="#D4AF37" strokeWidth="1.3" fill="rgba(212,175,55,0.04)"/>
                    <path d="M20 5 L20 35 M7 12.5 L33 27.5 M33 12.5 L7 27.5" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.4"/>
                  </svg>
                  {/* Labels */}
                  <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#D4AF37', letterSpacing: '0.32em', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>3D SCROLL EXPERIENCE</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)' }}>( 3D VISUAL SPACE )</p>
                  </div>
                  {/* Corner ticks */}
                  <div style={{ position: 'absolute', top: 20, left: 20, width: 24, height: 24, borderTop: '1px solid rgba(212,175,55,0.5)', borderLeft: '1px solid rgba(212,175,55,0.5)' }} />
                  <div style={{ position: 'absolute', top: 20, right: 20, width: 24, height: 24, borderTop: '1px solid rgba(212,175,55,0.5)', borderRight: '1px solid rgba(212,175,55,0.5)' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 20, width: 24, height: 24, borderBottom: '1px solid rgba(212,175,55,0.5)', borderLeft: '1px solid rgba(212,175,55,0.5)' }} />
                  <div style={{ position: 'absolute', bottom: 20, right: 20, width: 24, height: 24, borderBottom: '1px solid rgba(212,175,55,0.5)', borderRight: '1px solid rgba(212,175,55,0.5)' }} />
                </div>
              </div>

              {/* IDDA Card overlapping bottom-left */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '10px',
                  width: '295px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(16,13,10,0.97) 0%, rgba(24,19,14,0.94) 100%)',
                  border: '1px solid rgba(212,175,55,0.22)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* IDDA glowing orb */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(circle at 35% 35%, #FF5522 0%, #C41800 50%, #6B0800 100%)',
                    boxShadow: '0 0 20px rgba(196,24,0,0.75), 0 0 40px rgba(196,24,0,0.3)',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: '#FFD4B8',
                    textShadow: '0 0 8px rgba(255,80,20,0.9)',
                  }}
                >IDDA</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.3 }}>IDDA – IDECORWALA</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.08em', color: 'rgba(212,175,55,0.65)', textTransform: 'uppercase', marginTop: '3px' }}>Digital Design Assistant</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M8 1L9.2 6.8L15 8L9.2 9.2L8 15L6.8 9.2L1 8L6.8 6.8Z" fill="#D4AF37" opacity="0.85"/>
                </svg>
              </div>

            </div>
          </div>
          <div style={{ flexGrow: 1 }}></div>
        </section>

        {/* Layer 05: Feature Journey Strip */}
        <div className="w-full h-[160px] bg-[#0F0E0D] border-t border-[rgba(212,175,55,0.15)] flex z-20 relative gsap-fade">
          {[
            { text: "2D Floor Plan Upload", icon: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/> },
            { text: "3D Digital Twin Generated", icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path> },
            { text: "Design In Metaverse", icon: <path d="M2 12h4l2-9 4 18 2-9h4"/> },
            { text: "Real-Time Cost Optimization", icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></> },
            { text: "Manufacturing Ready", icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></> },
            { text: "Execute & Enjoy", icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></> }
          ].map((feature, idx) => (
            <div key={idx} className="flex-1 border-r border-[rgba(212,175,55,0.1)] last:border-0 flex flex-col justify-center items-center px-4 text-center">
              <div className="w-16 h-16 rounded-full border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-display text-[18px] mb-3 bg-[#D4AF37]/5 relative">
                <span className="absolute -top-2 -right-2 text-[10px] font-body bg-[#0F0E0D] px-1 text-[#D4AF37]">0{idx + 1}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {feature.icon}
                </svg>
              </div>
              <span className="font-body text-[12px] text-[rgba(255,255,255,0.7)] tracking-wide">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Layer 06: Metrics/KPI Strip */}
        <div className="w-full h-[140px] bg-[#F6F1E7] flex z-20 relative text-center">
          {[
            { metric: "90%", label: "Faster\nDesign Creation" },
            { metric: "25%", label: "Average Cost\nOptimization" },
            { metric: "10,000+", label: "Products & Materials\nAt Your Fingertips" },
            { metric: "100%", label: "Manufacturing\nReady Outputs" },
            { metric: "1 Platform", label: "Design to Execution\nEnd-to-End" }
          ].map((kpi, idx) => (
            <div key={idx} className="flex-1 border-r border-black/10 last:border-0 flex flex-col justify-center items-center px-4">
              <div className="font-display text-[54px] text-[#D4AF37] leading-none mb-2">{kpi.metric}</div>
              <div className="font-body text-[14px] text-[#141311] font-medium whitespace-pre-line leading-snug">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* IMMERSIVE FULLSCREEN 3D SCROLL SECTION */}
        <section
          ref={triggerRef}
          className="relative w-full bg-[#070605] overflow-hidden"
          style={{ height: '100vh' }}
        >
          {/* Fullscreen Canvas — covers the entire section */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0"
            style={{
              objectFit: 'cover',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          />

          {/* Preloader overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#070605] flex flex-col items-center justify-center z-30">
              <div className="w-16 h-16 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-5" />
              <span className="font-body font-bold text-white tracking-[0.3em] text-xs uppercase">Preloading 3D Workspace</span>
              <span className="font-body text-[#D4AF37] text-[13px] tracking-[0.1em] mt-2 font-bold">{loadProgress}%</span>
            </div>
          )}

          {/* Top vignette — so the title text reads cleanly */}
          <div
            className="absolute inset-x-0 top-0 h-[40%] z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(7,6,5,0.82) 0%, rgba(7,6,5,0.0) 100%)',
            }}
          />
          {/* Bottom vignette */}
          <div
            className="absolute inset-x-0 bottom-0 h-[25%] z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(7,6,5,0.75) 0%, rgba(7,6,5,0.0) 100%)',
            }}
          />

          {/* Floating title — top-left, on top of canvas */}
          <div className="absolute top-12 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
            <div className="section-label mb-4 tracking-[0.25em] text-[#D4AF37]/70 text-[11px]">3D SCROLL EXPERIENCE</div>
            <h2 className="font-display text-[56px] leading-[1.1] text-white text-center drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]">
              Immersive Spatial Play.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] font-normal">Explore in 3D.</span>
            </h2>
          </div>

          {/* Scroll hint — bottom-center */}
          {isLoaded && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-80">
              <div className="w-5 h-8 rounded-full border border-[#D4AF37]/60 flex items-start justify-center p-[3px]">
                <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce" />
              </div>
              <span className="font-body text-[9px] text-[#D4AF37]/80 tracking-[0.25em] font-semibold uppercase">Scroll to explore</span>
            </div>
          )}
        </section>

        {/* WHY SPACEFOLD + COMPARISON SECTION */}
        <section id="why" className="relative w-full pt-[100px] pb-[120px] px-[80px] gsap-fade" style={{ minHeight: '820px' }}>
          <div className="absolute inset-0 bg-[#0B0A09] z-0"></div>
          <div className="noise-overlay"></div>
          <div className="gold-glow" style={{ top: '20%', left: '-10%' }}></div>
          <div className="red-velvet" style={{ top: '50%', right: '0' }}></div>
          <div className="arch-lines"></div>

          <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col">
            <div className="section-label mb-8">AN INDUSTRY LONG OVERDUE FOR CHANGE</div>
            
            <div className="flex flex-col lg:flex-row justify-between w-full">
              {/* Left Side: Headings */}
              <div className="lg:w-[40%] flex flex-col">
                <h2 className="font-display text-[64px] leading-[1.05] text-white">
                  Fragmented.<br/>
                  Opaque.<br/>
                  Unpredictable.<br/>
                  <span className="text-[#A11217]">Until Now.</span>
                </h2>
                <p className="font-body text-[16px] leading-[1.8] text-[rgba(255,255,255,0.72)] max-w-[520px] mt-[30px]">
                  For decades, designing and building spaces has relied on disjointed teams, unpredictable costs, and isolated workflows. SpaceFold unifies every step into a single, predictable matrix.
                </p>
              </div>

              {/* Right Side: Comparison Grid */}
              <div className="lg:w-[60%] flex items-center justify-end mt-16 lg:mt-0">
                <div className="flex items-center w-full max-w-[1100px]">
                  
                  {/* The Old Way Card (44%) */}
                  <div className="w-[44%] h-[340px] rounded-[24px] p-8 flex flex-col justify-center relative" style={{ background: 'rgba(106,4,15,0.12)', border: '1px solid rgba(161,18,23,0.3)' }}>
                    <h3 className="font-body font-bold text-[#A11217] text-[14px] tracking-widest mb-6">THE OLD WAY</h3>
                    <ul className="space-y-4">
                      {["Multiple vendors & disconnected workflows", "Weeks of back & forth for designs", "Unclear pricing & hidden markups", "Rework, delays & budget overruns", "High dependency on designers & contractors"].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full bg-[#A11217]/20 flex items-center justify-center border border-[#A11217] mt-1 shrink-0">
                            <span className="text-[#A11217] text-[10px] leading-none">×</span>
                          </div>
                          <span className="font-body text-[14px] text-white/80">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Center Arrow (12%) */}
                  <div className="w-[12%] flex justify-center z-10" style={{ transform: 'scale(1.2)' }}>
                    <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center relative" style={{ background: 'linear-gradient(to bottom, #A11217, #6A040F)', boxShadow: '0 0 30px rgba(161,18,23,0.6), 0 0 40px rgba(212,175,55,0.2)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>

                  {/* The Spacefold Way Card (44%) */}
                  <div className="w-[44%] h-[340px] rounded-[24px] p-8 flex flex-col justify-center" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)' }}>
                    <h3 className="font-body font-bold text-[#D4AF37] text-[14px] tracking-widest mb-6">THE SPACEFOLD WAY</h3>
                    <ul className="space-y-4">
                      {["AI-powered platform for everyone", "Instant 3D visualization & real-time pricing", "Transparent BOM, BOQ & cost optimization", "Manufacturing-ready drawings in minutes", "One-click execution with complete control"].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37] mt-1 shrink-0">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span className="font-body text-[14px] text-white/90">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW SPACEFOLD WORKS SECTION */}
        <section id="how" className="relative w-full pb-[160px] px-[80px] gsap-fade" style={{ minHeight: '900px', background: '#0B0A09' }}>
          {/* Light #F6F1E7 surface with paper texture */}
          <div 
            className="w-full absolute left-0 top-0 h-full z-0"
            style={{
              background: '#F6F1E7',
              borderTopLeftRadius: '48px',
              borderTopRightRadius: '48px',
            }}
          ></div>
          <div className="paper-texture" style={{ borderTopLeftRadius: '48px', borderTopRightRadius: '48px' }}></div>
          <div className="relative z-10 max-w-[1360px] mx-auto pt-[120px]">
            <div className="section-label mb-6 text-center">HOW SPACEFOLD WORKS</div>
            <h2 className="font-display text-[58px] leading-[1.1] text-[#141311] text-center mb-[80px]">
              From Floor Plan to Finished Home.<br/>
              <span className="text-[#A11217]">Seamlessly.</span>
            </h2>

            {/* Process Card Row */}
            <div className="flex overflow-x-auto gap-[24px] pb-10 justify-start xl:justify-center">
              {[
                { num: "01", title: "Upload Floor Plan", desc: "Upload PDF, CAD or Images. We convert it into a 3D digital twin instantly.", image: "/images/spacefold/step01.png" },
                { num: "02", title: "Enter Your Space", desc: "Walk through your future home in an immersive 3D metaverse.", image: "/images/spacefold/step02.png" },
                { num: "03", title: "Design Through Play", desc: "Drag, drop & customize thousands of real products.", image: "/images/spacefold/step03.png" },
                { num: "04", title: "AI Optimizes In Real-Time", desc: "IDDA calculates costs, BOM, BOQ and suggests alternatives instantly.", image: "/images/spacefold/step04.png" },
                { num: "05", title: "Manufacturing Ready", desc: "Production drawings, cut lists and CNC instructions generated automatically.", image: "/images/spacefold/step05.png" },
                { num: "06", title: "Order & Execute", desc: "Confirm with full transparency and move directly into execution.", image: "/images/spacefold/step06.png" }
              ].map((step, i) => (
                <div key={i} className="process-card shrink-0 w-[190px] h-[360px] p-5 relative flex flex-col">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#F6F1E7] border border-[#D4AF37] flex items-center justify-center font-inter font-bold text-[#D4AF37] mb-6 shrink-0">
                    {step.num}
                  </div>
                  {/* Card Image — luxury grade */}
                  <div className="w-full h-[80px] rounded-md mb-6 shrink-0 overflow-hidden relative bg-[#ECE4D5]">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover img-luxury" />
                  </div>
                  
                  <h3 className="font-body font-semibold text-[18px] text-[#141311] mb-3 leading-tight">{step.title}</h3>
                  <p className="font-body text-[14px] leading-[1.7] text-[rgba(20,19,17,0.72)] flex-grow">{step.desc}</p>
                  
                  <div className="absolute bottom-5 right-5 text-[#D4AF37] transition-transform hover:translate-x-2 cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IDDA AI SECTION */}
        <section className="relative w-full h-[620px] bg-[#0B0A09] flex gsap-fade overflow-hidden">
          <div className="noise-overlay"></div>
          {/* Ambient gold glow behind AI core */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>

          {/* Left Column 45% */}
          <div className="w-[45%] h-full relative z-10 flex items-center justify-center">
            {/* AI Core — 5-layer ring system */}
            <div className="relative w-[320px] h-[320px] flex items-center justify-center">
              {/* Layer 01: Outer Gold Ring — static */}
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30"></div>
              {/* Layer 02: Rotating Gold Segments — 40s */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/70 animate-spin-slow"></div>
              {/* Layer 02b: Counter-rotating thin ring */}
              <div className="absolute inset-[18px] rounded-full border border-dotted border-[#D4AF37]/30" style={{ animation: 'spin-slow 60s linear infinite reverse' }}></div>
              {/* Layer 03: Red Ambient Ring */}
              <div className="absolute inset-[36px] rounded-full" style={{ boxShadow: '0 0 60px rgba(106,4,15,0.8), inset 0 0 40px rgba(106,4,15,0.4)' }}></div>
              {/* Layer 04: Orange Energy Ring */}
              <div className="absolute inset-[36px] rounded-full" style={{ boxShadow: '0 0 120px rgba(255,120,0,0.3)' }}></div>
              {/* Outer composite glow */}
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: '0 0 60px rgba(212,175,55,0.25), 0 0 120px rgba(106,4,15,0.4), 0 0 180px rgba(255,165,0,0.15)' }}></div>
              {/* Layer 05: Core Sphere */}
              <div className="w-[120px] h-[120px] bg-[#0B0A09] border border-[#D4AF37]/50 rounded-full z-10 flex items-center justify-center" style={{ boxShadow: 'inset 0 0 30px rgba(106,4,15,0.8), 0 0 20px rgba(212,175,55,0.3)' }}>
                <span className="font-body font-bold text-[28px] text-white tracking-[0.15em]">IDDA</span>
              </div>
            </div>
          </div>

          {/* Right Column 55% */}
          <div className="w-[55%] h-full relative z-10 flex flex-col justify-center pr-[80px]">
            <div className="section-label mb-6">POWERED BY IDDA</div>
            <h2 className="font-display text-[62px] leading-[1.05] text-white mb-6">
              Your AI Design Assistant,<br/>Cost Consultant &<br/>Strategist
            </h2>
            <p className="font-body text-[16px] leading-[1.8] text-[rgba(255,255,255,0.72)] max-w-[500px] mb-10">
              IDDA works like an entire team of experts—available instantly whenever required. Every recommendation balances Design, Cost, Manufacturability, Execution, and Value.
            </p>
            
            {/* Capability Grid — 6 items with distinct icons, sequential fade */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { role: "Interior Designer", icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> },
                { role: "Cost Consultant", icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></> },
                { role: "Quantity Surveyor", icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></> },
                { role: "Procurement Planner", icon: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></> },
                { role: "Manufacturing Engineer", icon: <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20.49 12l-2 .01M4 12H2M18.66 18.66l-1.41-1.41M6.34 6.34L4.93 4.93M12 20v2M12 2v2"/></> },
                { role: "Project Coordinator", icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4" style={{ animation: `fadeUp 1.2s cubic-bezier(0.22,1,0.36,1) ${0.1 * i}s both` }}>
                  <div className="w-[48px] h-[48px] rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#D4AF37]/10 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {item.icon}
                    </svg>
                  </div>
                  <span className="font-body text-[13px] text-white/90">{item.role}</span>
                </div>
              ))}
            </div>

            <p className="font-body text-[14px] leading-[1.6] text-[#D4AF37]/80 max-w-[500px] border-l-2 border-[#D4AF37]/30 pl-4">
              IDDA continuously learns and optimizes every decision to deliver better design, lower costs and smoother execution.
            </p>
          </div>
        </section>

        {/* CONNECTED ECOSYSTEM SECTION — paper texture on light surface */}
        <section id="ecosystem" className="relative w-full bg-[#F6F1E7] flex flex-col items-center justify-center px-[80px] py-[120px] gsap-fade">
          <div className="paper-texture"></div>
          <div className="section-label mb-6 text-center">A CONNECTED ECOSYSTEM</div>
          <h2 className="font-display text-[56px] text-[#141311] mb-[60px] text-center leading-[1.1]">
            Built for Everyone<br/>in the Value Chain
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-[20px] w-full max-w-[1360px]">
            {[
              {
                title: "For Homeowners",
                desc: "Design your dream home with complete transparency and control.",
                icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              },
              {
                title: "For Interior Designers",
                desc: "Deliver projects faster with AI-powered collaboration.",
                icon: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>
              },
              {
                title: "For Manufacturers",
                desc: "Receive accurate production data and demand forecasting.",
                icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>
              },
              {
                title: "For Brands & Suppliers",
                desc: "Showcase products through immersive experiences.",
                icon: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>
              },
              {
                title: "For Builders & Developers",
                desc: "Accelerate project delivery and improve buyer engagement.",
                icon: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>
              }
            ].map((card, i) => (
              <div
                key={i}
                className="ecosystem-card p-[32px] h-[220px] flex flex-col"
                style={{ animationDelay: `${i * 0.09}s` }}
              >
                <div className="w-[60px] h-[60px] mb-4 flex items-center justify-start text-[#D4AF37]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="font-body font-semibold text-[15px] text-[#141311] mb-2">{card.title}</h3>
                <p className="font-body text-[13px] text-gray-500 leading-[1.6]">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="w-full flex items-center justify-center bg-[#0B0A09] py-[120px] px-[80px] gsap-fade">
          <div
            className="w-full max-w-[1280px] h-[320px] rounded-[36px] relative overflow-hidden flex"
            style={{ background: 'linear-gradient(135deg, #A11217 0%, #6A040F 100%)' }}
          >
            {/* Noise overlay — 8% */}
            <div className="noise-overlay"></div>
            {/* Gold accent overlay — 12% */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.12) 0%, transparent 60%)' }}></div>

            {/* Left 60% */}
            <div className="w-[60%] h-full p-[60px] relative z-10 flex items-center gap-10">
              {/* Luxury interior render 180×180 — arch corner + luxury grade */}
              <div className="w-[180px] h-[180px] arch-corner-both shrink-0 overflow-hidden border border-white/20" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.25), 0 30px 80px rgba(0,0,0,0.35)' }}>
                <img src="/images/spacefold/cta_interior.png" alt="Luxury interior" className="w-full h-full object-cover img-luxury" />
              </div>
              <div className="flex flex-col">
                <div className="font-body font-semibold text-[11px] text-[#D4AF37] tracking-[0.3em] uppercase mb-4">READY TO EXPERIENCE THE FUTURE?</div>
                <h2 className="font-display text-[52px] text-white leading-[1.0] mb-6">Your Dream Home<br/>is Just One Click Away.</h2>
                {/* Benefit List — gold checkmarks, 16px spacing */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    "Personalized Live Demo",
                    "Explore Real Projects",
                    "Understand Cost Benefits",
                    "Get All Your Questions Answered"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0B0A09" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="font-body text-[14px] text-white/90">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 40% */}
            <div className="w-[40%] h-full flex items-center justify-center relative z-10">
              <div className="flex flex-col gap-5 w-[260px]">
                {/* Button 01 — White bg, dark text, gold glow shadow */}
                <button className="h-[56px] w-full bg-white rounded-lg font-body font-semibold text-[#141311] text-[15px] transition-transform duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}>
                  BOOK A LIVE DEMO
                </button>
                {/* Button 02 — Transparent, white border */}
                <button className="h-[56px] w-full bg-transparent border border-white rounded-lg font-body font-semibold text-white text-[15px] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  TALK TO AN EXPERT
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full bg-[#0B0A09] border-t border-[rgba(212,175,55,0.15)] pt-[80px] pb-0 px-[80px]" style={{ minHeight: '420px' }}>
          <div className="max-w-[1280px] mx-auto flex flex-col" style={{ minHeight: '340px' }}>
            <div className="grid grid-cols-4 gap-10 flex-grow">
              {/* Col 1 — Brand */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center rounded">
                    <span className="text-[#D4AF37] font-display text-sm font-semibold">SF</span>
                  </div>
                  <span className="font-display text-white text-xl tracking-widest uppercase">SpaceFold</span>
                </div>
                <p className="font-body text-[14px] text-white/60 leading-[1.8] mb-8">
                  One platform connecting design,<br/>procurement, manufacturing and execution.
                </p>
                {/* Social Icons — gold outline, hover glow */}
                <div className="flex gap-4">
                  {[
                    /* Instagram */
                    <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
                    /* LinkedIn */
                    <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
                    /* Twitter/X */
                    <><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></>,
                    /* YouTube */
                    <><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.95C18.88 4 12 4 12 4s-6.88 0-8.6.47A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.94-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>,
                  ].map((socialIcon, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:shadow-[0_0_12px_rgba(212,175,55,0.35)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {socialIcon}
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 2 — Platform */}
              <div className="flex flex-col">
                <h4 className="font-body font-semibold text-[14px] text-white mb-6 uppercase tracking-wider">Platform</h4>
                <div className="flex flex-col gap-4">
                  {["Why SpaceFold", "Features", "How It Works", "Ecosystem"].map((link) => (
                    <a key={link} href="#" className="font-body text-[14px] text-white/60 hover:text-[#D4AF37] transition-colors duration-300">{link}</a>
                  ))}
                </div>
              </div>

              {/* Col 3 — Solutions */}
              <div className="flex flex-col">
                <h4 className="font-body font-semibold text-[14px] text-white mb-6 uppercase tracking-wider">Solutions</h4>
                <div className="flex flex-col gap-4">
                  {["Homeowners", "Designers", "Manufacturers", "Builders", "Brands"].map((link) => (
                    <a key={link} href="#" className="font-body text-[14px] text-white/60 hover:text-[#D4AF37] transition-colors duration-300">{link}</a>
                  ))}
                </div>
              </div>

              {/* Col 4 — Contact */}
              <div className="flex flex-col">
                <h4 className="font-body font-semibold text-[14px] text-white mb-6 uppercase tracking-wider">Contact</h4>
                <div className="flex flex-col gap-4">
                  <a href="mailto:technology@idecorwala.com" className="font-body text-[14px] text-white/60 hover:text-[#D4AF37] transition-colors duration-300">technology@idecorwala.com</a>
                  <a href="tel:+919999999999" className="font-body text-[14px] text-white/60 hover:text-[#D4AF37] transition-colors duration-300">+91 99999 99999</a>
                  <span className="font-body text-[14px] text-white/60">Global Headquarters<br/>Digital Metaverse</span>
                  <button className="mt-2 w-fit px-6 py-2 border border-[#D4AF37] text-[#D4AF37] font-body text-[13px] rounded transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0B0A09]">
                    Book Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Copyright — centered, 60% opacity */}
            <div className="w-full flex items-center justify-center py-8 border-t border-white/5 mt-10">
              <span className="font-body text-[13px] text-white/60">© 2026 SpaceFold. All Rights Reserved.</span>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

