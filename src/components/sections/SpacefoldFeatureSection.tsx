"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layout, Glasses, Layers, Settings, Box, ChevronRight, ChevronsRight, ArrowRight, Cpu, HardDrive, Play, Compass, Timer, ShieldCheck, Pencil } from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  stats: { label: string; value: string };
  image: string;
  svgGlow: string;
}

const SPACEFOLD_FEATURES: FeatureItem[] = [
  {
    id: "spacefold-ai",
    title: "Spacefold™ AI",
    subtitle: "Autonomous Design Generation",
    description: "Our proprietary deep learning engine translates natural language prompts and spatial boundaries into fully-optimized 3D spatial concepts within seconds.",
    icon: Cpu,
    tag: "COGNITIVE CORE",
    stats: { label: "Design Iterations", value: "10,000/sec" },
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800",
    svgGlow: "rgba(199, 162, 90, 0.25)"
  },
  {
    id: "digital-twins",
    title: "Digital Twins",
    subtitle: "Real-time High Fidelity Replicas",
    description: "Every physical material is mapped into our interactive metaverse environment, creating an exact virtual counterpart that mirrors acoustics, lighting, and thermal performance.",
    icon: Layers,
    tag: "SPATIAL FIDELITY",
    stats: { label: "Rendering Precision", value: "Sub-millimeter" },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    svgGlow: "rgba(34, 139, 34, 0.25)"
  },
  {
    id: "cad-cam",
    title: "CAD/CAM Integration",
    subtitle: "Direct Machine-to-Material Pipeline",
    description: "Zero latency translation from 3D model coordinates to robotic CNC carving, laser profiling, and smart modular fabrication lines to ensure absolute execution accuracy.",
    icon: HardDrive,
    tag: "FABRICATION READY",
    stats: { label: "CNC Translation", value: "Instantaneous" },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
    svgGlow: "rgba(199, 162, 90, 0.25)"
  },
  {
    id: "generative-layouts",
    title: "Generative Layouts",
    subtitle: "Multi-parameter Optimization",
    description: "Synthesize spatial constraints, local building codes, structural columns, and ergonomic pathways to generate hundreds of perfect layouts instantly.",
    icon: Compass,
    tag: "AUTONOMOUS MATH",
    stats: { label: "Efficiency Gain", value: "+38% Area Yield" },
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800",
    svgGlow: "rgba(34, 139, 34, 0.2)"
  },
  {
    id: "walkthroughs",
    title: "3D Walkthroughs",
    subtitle: "Ray-Traced Interactive Simulators",
    description: "Step into your finalized enterprise showroom, corporate office, or luxury experience center via browser-based physics simulators prior to physical mobilization.",
    icon: Play,
    tag: "RAY-TRACED VR",
    stats: { label: "Simulation Frame Rate", value: "120 FPS Realtime" },
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
    svgGlow: "rgba(199, 162, 90, 0.25)"
  }
];

export default function SpacefoldFeatureSection() {
  const [activeTab, setActiveTab] = useState<string>(SPACEFOLD_FEATURES[0].id);
  const activeFeature = SPACEFOLD_FEATURES.find((f) => f.id === activeTab) || SPACEFOLD_FEATURES[0];

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(eyebrowRef.current, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Select line blocks inside h2
      const headlineLines = headlineRef.current?.querySelectorAll("span");
      if (headlineLines && headlineLines.length > 0) {
        tl.fromTo(headlineLines,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.6" // overlaps eyebrow slightly
        );
      }

      tl.fromTo(subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.45"
      );

      // 2. Parallax scroll drift
      if (sectionRef.current) {
        gsap.to(headerRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <section ref={sectionRef} id="spacefold-feature" className="spacefold-section" style={{
  backgroundColor: "#0A0A0A",
  minHeight: "100vh",
  backgroundImage: `
    radial-gradient(ellipse at 10% 0%, rgba(201, 168, 76, 0.15) 0%, transparent 40%),
    radial-gradient(ellipse at 90% 0%, rgba(201, 168, 76, 0.1) 0%, transparent 35%),
    radial-gradient(ellipse at 0% 100%, rgba(201, 168, 76, 0.1) 0%, transparent 40%),
    radial-gradient(ellipse at 100% 100%, rgba(201, 168, 76, 0.15) 0%, transparent 45%),
    url("https://www.transparenttextures.com/patterns/stardust.png")
  `
}}>
      {/* Cinematic Grain Overlay */}
      <div className="spacefold-grain" aria-hidden="true" />

      {/* Gold & Moss Glow Ambient Backdrops */}
      <div className="spacefold-ambient-glow" aria-hidden="true">
        <div className="glow-emerald" />
        <div className="glow-gold" />
      </div>
      {/* Top Brush Stroke Wave (Gold) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none opacity-100">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
          <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,0 L0,0 Z" fill="url(#goldGrad)"></path>
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9a45d" />
              <stop offset="50%" stopColor="#e5c880" />
              <stop offset="100%" stopColor="#a57a34" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Brush Stroke Wave (Gold) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none opacity-100">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] transform rotate-180">
          <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,0 L0,0 Z" fill="url(#goldGrad)"></path>
        </svg>
      </div>

      <div className="spacefold-container">
        <div className="gold-strip absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-gold-start to-gold-end opacity-10 pointer-events-none"></div>          {/* Header */}
          <div className="spacefold-header px-4" ref={headerRef}>
              {/* Eyebrow line */}
                <div className="eyebrow flex items-center justify-center text-sm mb-4" ref={eyebrowRef}>
                  <span className="dot hidden sm:inline-block text-[#c9a45d] mr-1">•</span>
                  <span className="line hidden sm:inline-block w-10 h-px bg-gradient-to-r from-transparent to-[#c9a45d] mx-2"></span>
                  <span className="uppercase tracking-widest eyebrow-groove text-[10px] sm:text-xs text-center font-bold">THE NEXT FRONTIER OF SPATIAL TECH</span>
                  <span className="line hidden sm:inline-block w-10 h-px bg-gradient-to-l from-transparent to-[#c9a45d] mx-2"></span>
                  <span className="dot hidden sm:inline-block text-[#c9a45d] ml-1">•</span>
                </div>

              {/* Headline */}

              <h2 className="spacefold-title text-4xl font-bold text-center mb-6" ref={headlineRef}>
                  <span className="block text-white headline-groove-silver">SEE IT. FEEL IT.</span>
                  <span className="block text-gold headline-groove-gold my-2 lowercase italic tracking-wide text-[0.85em] font-serif normal-case">then</span>
                  <span className="block text-gold headline-groove-gold">WE BUILT IT</span>
              </h2>

              {/* Subheadline */}
              <p className="spacefold-subtitle text-center subtitle-groove max-w-2xl mx-auto px-4" ref={subheadlineRef}>
                Our proprietary technology transforms imagination into immersive reality — so every decision is confident, every outcome is certain.
              </p>

              <div className="flex justify-center" style={{ marginTop: "24px", marginBottom: "24px" }}>
                <img 
                  src="/spacefold-icon.png"
                  alt="Spacefold Logo"
                  className="w-auto object-contain drop-shadow-[0_0_16px_rgba(201,168,76,0.4)]"
                  style={{ height: "120px" }}
                />
              </div>

            </div>
          {/* Process Cards */}
        <div className="spacefold-process flex justify-center items-start gap-4 overflow-x-auto">

            {/* Card 01 – VISUALIZE (Gamified Visualization) */}
            <div className="process-card-wrapper">
              <div className="card-gold-halo" />
              <div className="process-card">
                <div className="card-groove-top" />
                <div className="flex flex-col items-center w-full">
                  <div className="process-number">01</div>
                  <div className="process-title">VISUALIZE</div>
                  <Glasses className="process-icon" />
                  <div className="process-desc">Gamified visualization in immersive 3D/AR/VR</div>
                </div>
                <div className="card-image-wrap">
                  <div className="card-image-gradient" />
                  <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400" alt="Visualize visual" className="card-image" />
                </div>
              </div>
            </div>

            <div className="process-arrow-wrapper flex items-center self-center h-[360px]">
              <ChevronsRight className="process-arrow" />
            </div>

            {/* Card 02 – SELECT */}
            <div className="process-card-wrapper">
              <div className="card-gold-halo" />
              <div className="process-card">
                <div className="card-groove-top" />
                <div className="flex flex-col items-center w-full">
                  <div className="process-number">02</div>
                  <div className="process-title">SELECT</div>
                  <Layers className="process-icon" />
                  <div className="process-desc">Select from over 1.5 lakh products &amp; SKUs</div>
                </div>
                <div className="card-image-wrap">
                  <div className="card-image-gradient" />
                  <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400" alt="Select visual" className="card-image" />
                </div>
              </div>
            </div>

            <div className="process-arrow-wrapper flex items-center self-center h-[360px]">
              <ChevronsRight className="process-arrow" />
            </div>

            {/* Card 03 – BOQ */}
            <div className="process-card-wrapper">
              <div className="card-gold-halo" />
              <div className="process-card">
                <div className="card-groove-top" />
                <div className="flex flex-col items-center w-full">
                  <div className="process-number">03</div>
                  <div className="process-title">BOQ</div>
                  <Layout className="process-icon" />
                  <div className="process-desc">Generate BOM and BOQ instantly</div>
                </div>
                <div className="card-image-wrap">
                  <div className="card-image-gradient" />
                  <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=400" alt="BOQ visual" className="card-image" />
                </div>
              </div>
            </div>

            <div className="process-arrow-wrapper flex items-center self-center h-[360px]">
              <ChevronsRight className="process-arrow" />
            </div>

            {/* Card 04 – PRODUCTION */}
            <div className="process-card-wrapper">
              <div className="card-gold-halo" />
              <div className="process-card">
                <div className="card-groove-top" />
                <div className="flex flex-col items-center w-full">
                  <div className="process-number">04</div>
                  <div className="process-title">PRODUCTION</div>
                  <Settings className="process-icon" />
                  <div className="process-desc">Seamless flow from project to production</div>
                </div>
                <div className="card-image-wrap">
                  <div className="card-image-gradient" />
                  <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=400" alt="Production visual" className="card-image" />
                </div>
              </div>
            </div>

            <div className="process-arrow-wrapper flex items-center self-center h-[360px]">
              <ChevronsRight className="process-arrow" />
            </div>

            {/* Card 05 – DELIVERY */}
            <div className="process-card-wrapper">
              <div className="card-gold-halo" />
              <div className="process-card">
                <div className="card-groove-top" />
                <div className="flex flex-col items-center w-full">
                  <div className="process-number">05</div>
                  <div className="process-title">DELIVERY</div>
                  <Box className="process-icon" />
                  <div className="process-desc">Last mile delivery and experience</div>
                </div>
                <div className="card-image-wrap">
                  <div className="card-image-gradient" />
                  <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=400" alt="Delivery visual" className="card-image" />
                </div>
              </div>
            </div>

            </div>
            {/* Metrics Strip */}            <div className="spacefold-metrics flex justify-around items-center w-full max-w-[860px] mx-auto mt-12 bg-[#161513]/60 border border-gold rounded-lg p-4 backdrop-blur-md">
              <div className="metric-item flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:filter drop-shadow-[0_0_8px_rgba(201,168,76,0.3)] cursor-default">
                <Box className="metric-icon mb-1 text-gold w-6 h-6" />
                <div className="metric-value text-2xl font-bold text-gold">1.5L+</div>
                <div className="metric-label text-sm text-gray-400">Product SKUs</div>
              </div>
              <div className="hidden sm:block border-r border-gold/40 h-8 self-center"></div>
              <div className="metric-item flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:filter drop-shadow-[0_0_8px_rgba(201,168,76,0.3)] cursor-default">
                <Cpu className="metric-icon mb-1 text-gold w-6 h-6" />
                <div className="metric-value text-2xl font-bold text-gold">AI/AR/VR</div>
                <div className="metric-label text-sm text-gray-400">Powered Platform</div>
              </div>
              <div className="hidden sm:block border-r border-gold/40 h-8 self-center"></div>
              <div className="metric-item flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:filter drop-shadow-[0_0_8px_rgba(201,168,76,0.3)] cursor-default">
                <Timer className="metric-icon mb-1 text-gold w-6 h-6" />
                <div className="metric-value text-2xl font-bold text-gold">30%</div>
                <div className="metric-label text-sm text-gray-400">Less Time to Execution</div>
              </div>
              <div className="hidden sm:block border-r border-gold/40 h-8 self-center"></div>
              <div className="metric-item flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:filter drop-shadow-[0_0_8px_rgba(201,168,76,0.3)] cursor-default">
                <ShieldCheck className="metric-icon mb-1 text-gold w-6 h-6" />
                <div className="metric-value text-2xl font-bold text-gold">100%</div>
                <div className="metric-label text-sm text-gray-400">Quality Assured</div>
              </div>
            </div>  {/* CTA Button */}
          <div className="spacefold-cta mt-12">
              <button className="cta-button bg-gradient-to-r from-gold-start to-gold-end text-black font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
              SCHEDULE A LIVE SPACEFOLD DEMO →
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .spacefold-section {
          --moss-deep: #09120c;
          --moss-base: #0f1c12;
          --moss-light: #162a1c;
          --moss-gold: #9C7B3C;
          --moss-white: #f5f0e8;
          --moss-muted: #8d9c90;
          --moss-border: #9C7B3C;
          --gold-start: #c9a45d;
          --gold-end: #a57a34;
          
          position: relative;
          background-color: #0A0A0A;
          /* Gold edge streaks */
          background-image:
            radial-gradient(ellipse at 0% 50%, rgba(201, 168, 76, 0.2) 0%, transparent 30%),
            radial-gradient(ellipse at 100% 50%, rgba(201, 168, 76, 0.2) 0%, transparent 30%);
          color: var(--moss-white);
          padding: 80px 24px;
          overflow: hidden;
          width: 100%;
          font-family: var(--font-inter), sans-serif; /* headline uses Inter, adjust if needed */
        }

        /* Ambient Grain Texture */
        .spacefold-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          opacity: 0.045;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* Ambient glowing circles */
        .spacefold-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .glow-emerald {
          position: absolute;
          top: 20%;
          left: -10%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(22, 42, 28, 0.45) 0%, transparent 70%);
          filter: blur(80px);
        }

        .glow-gold {
          position: absolute;
          bottom: 10%;
          right: -10%;
          width: 900px;
          height: 900px;
          background: radial-gradient(circle, rgba(199, 162, 90, 0.08) 0%, transparent 65%);
          filter: blur(90px);
        }
        

        /* Gold decorative elements */

        .spacefold-container {
          max-width: 1440px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Header Styles */

          .spacefold-header {
            text-align: center;
            max-width: 760px;
            margin: 0 auto 72px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          /* Process Cards Layout */
          .spacefold-process {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 24px;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 40px 12px;
          }

          @media (max-width: 768px) {
            .spacefold-process {
              flex-direction: column;
              align-items: center;
              gap: 32px;
              overflow-x: visible;
              flex-wrap: wrap;
            }
            .process-arrow-wrapper {
              display: none !important;
            }
            .card-gold-halo {
              display: none !important; /* Disable heavy background gradient animations on mobile */
            }
            .process-card {
              width: 290px !important;
              min-height: 380px !important;
              padding: 24px 20px 0 20px !important;
              /* Simplify background textures and shadows on mobile to reduce paint costs */
              background: #0A0A0A !important;
              background-image: url("https://www.transparenttextures.com/patterns/black-paper.png") !important;
              box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(201, 168, 76, 0.25) !important;
              border-color: rgba(201, 168, 76, 0.35) !important;
            }
            .process-desc {
              font-size: 0.85rem !important;
            }
            .process-title {
              font-size: 0.8rem !important;
            }
            .card-image-wrap {
              height: 140px !important;
            }
          }
          /* ── Premium Grooved Process Cards ── */

          @keyframes gold-pulse {
            0%, 100% { opacity: 0.55; transform: scale(1); }
            50% { opacity: 0.85; transform: scale(1.08); }
          }

          @keyframes shimmer-sweep {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }

          .process-card-wrapper {
            position: relative;
            flex-shrink: 0;
          }

          /* Big golden radial halo sitting behind each card */
          .card-gold-halo {
            position: absolute;
            inset: -30px;
            background: radial-gradient(
              ellipse at 50% 60%,
              rgba(201, 168, 76, 0.35) 0%,
              rgba(201, 168, 76, 0.15) 30%,
              rgba(201, 168, 76, 0.05) 50%,
              transparent 70%
            );
            border-radius: 50%;
            z-index: 0;
            animation: gold-pulse 4s ease-in-out infinite;
            pointer-events: none;
            will-change: transform, opacity;
          }

          /* The card itself */
          .process-card {
            position: relative;
            z-index: 1;
            width: 196px;
            min-height: 360px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 22px 18px 0 18px;
            /* Grooved background – dark layered with stardust mesh texture and gold corner tints */
            background:
              radial-gradient(circle at 0% 0%, rgba(201, 168, 76, 0.22) 0%, transparent 40%),
              radial-gradient(circle at 100% 100%, rgba(201, 168, 76, 0.05) 0%, transparent 35%),
              repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 14px),
              repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 14px),
              url("https://www.transparenttextures.com/patterns/black-paper.png"),
              #000000;
            
            /* Deep grooved border: outer gold line + inner dark inset + outer glow */
            border: 1px solid rgba(201, 168, 76, 0.55);
            border-radius: 16px;
            outline: 1.5px solid rgba(0, 0, 0, 0.85);
            outline-offset: -3.5px;
 
            /* Engraved inset + outer glow */
            box-shadow:
              /* outer ambient gold glow */
              0 0 20px rgba(201, 168, 76, 0.15),
              /* soft outer lift shadow */
              0 20px 45px rgba(0, 0, 0, 0.85),
              /* grooved inner top shadow (dark bevel) */
              inset 0 6px 14px rgba(0, 0, 0, 0.95),
              /* grooved inner bottom highlight */
              inset 0 -3px 8px rgba(201, 168, 76, 0.15),
              /* left groove shadow */
              inset 4px 0 8px rgba(0, 0, 0, 0.6),
              /* right groove highlight */
              inset -4px 0 8px rgba(0, 0, 0, 0.6);
 
            transition: transform 0.38s cubic-bezier(0.16,1,0.3,1),
                        box-shadow 0.38s cubic-bezier(0.16,1,0.3,1),
                        border-color 0.38s ease;
            overflow: hidden;
            will-change: transform, box-shadow;
          }

          /* Top grooved accent bar */
          .card-groove-top {
            position: absolute;
            top: 0;
            left: 14px;
            right: 14px;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(201,168,76,0.9) 30%, #e5c880 50%, rgba(201,168,76,0.9) 70%, transparent);
            border-radius: 0 0 4px 4px;
            box-shadow: 0 0 10px rgba(201,168,76,0.6);
          }

          /* Gold shimmer overlay on the card face */
          .process-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              120deg,
              transparent 30%,
              rgba(201, 168, 76, 0.06) 50%,
              transparent 70%
            );
            background-size: 200% 100%;
            animation: shimmer-sweep 5s linear infinite;
            pointer-events: none;
            z-index: 2;
          }

          /* Subtle diagonal etch texture */
          .process-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background-image:
              repeating-linear-gradient(
                135deg,
                rgba(201,168,76,0.03) 0px,
                rgba(201,168,76,0.03) 1px,
                transparent 1px,
                transparent 6px
              );
            pointer-events: none;
            z-index: 1;
            border-radius: 14px;
          }

          .process-card:hover {
            transform: translateY(-10px) scale(1.035);
            border-color: rgba(229, 200, 128, 0.95);
            box-shadow:
              0 0 35px rgba(201, 168, 76, 0.55),
              0 24px 60px rgba(0, 0, 0, 0.8),
              inset 0 3px 6px rgba(0, 0, 0, 0.9),
              inset 0 -2px 4px rgba(201, 168, 76, 0.2),
              inset 3px 0 6px rgba(0, 0, 0, 0.5),
              inset -2px 0 4px rgba(201, 168, 76, 0.12);
          }

          .process-card:hover .card-gold-halo {
            opacity: 1;
          }

          .process-number {
            font-size: 1.4rem;
            font-weight: 800;
            background: linear-gradient(135deg, #FFF6E0 0%, #D4AF37 55%, #C9A45D 75%, #8F6A2F 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0px 1.5px 2px rgba(0,0,0,0.55), 0px 4px 10px rgba(0,0,0,0.65);
            margin-bottom: 2px;
            letter-spacing: 0.05em;
            position: relative;
            z-index: 3;
          }
 
          .process-title {
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            background: linear-gradient(135deg, #FFF6E0 0%, #D4AF37 60%, #C9A45D 80%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0px 1.5px 2px rgba(0,0,0,0.55);
            margin-bottom: 14px;
            position: relative;
            z-index: 3;
          }
 
          .process-icon {
            width: 44px;
            height: 44px;
            stroke-width: 1.2;
            color: #c9a45d;
            margin-bottom: 12px;
            filter: drop-shadow(0 0 8px rgba(201,168,76,0.45));
            position: relative;
            z-index: 3;
          }
 
          .process-desc {
            font-size: 0.72rem;
            line-height: 1.55;
            color: #C8BFA9;
            text-shadow: 1px 1px 0px rgba(0,0,0,0.9);
            padding: 0 4px;
            margin-bottom: 14px;
            position: relative;
            z-index: 3;
          }

          .card-image-wrap {
            width: calc(100% - 24px);
            height: 118px;
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            margin-top: auto;
            margin-bottom: 14px;
            border: 1px solid rgba(201, 168, 76, 0.25);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          }

          .card-image-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(10,8,2,0.65) 0%, rgba(0,0,0,0.1) 100%);
            z-index: 1;
          }

          .card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            filter: sepia(0.25) contrast(1.1) brightness(0.85);
            transition: transform 0.5s ease, filter 0.5s ease;
          }

          .process-card:hover .card-image {
            transform: scale(1.08);
            filter: sepia(0.1) contrast(1.15) brightness(0.95);
          }

          .process-arrow {
            width: 22px;
            height: 22px;
            flex-shrink: 0;
            color: rgba(201,168,76,0.6);
            filter: drop-shadow(0 0 6px rgba(201,168,76,0.3));
          }

          /* Metrics Strip Layout */
          .spacefold-metrics {
              display: flex;
              justify-content: space-around;
              align-items: center;
              width: 100%;
              max-width: 860px;
              margin: 48px auto 0 auto;
              border: 1px solid rgba(201, 168, 76, 0.45);
              outline: 1.5px solid rgba(0, 0, 0, 0.85);
              outline-offset: -3.5px;
              border-radius: 16px;
              padding: 20px 28px;
              box-shadow:
                inset 0 6px 14px rgba(0, 0, 0, 0.95),
                inset 0 -3px 8px rgba(201, 168, 76, 0.15),
                0 15px 35px rgba(0, 0, 0, 0.7),
                0 0 25px rgba(201, 168, 76, 0.1);
              background:
                radial-gradient(circle at 0% 0%, rgba(201, 168, 76, 0.25) 0%, transparent 40%),
                radial-gradient(circle at 100% 100%, rgba(201, 168, 76, 0.05) 0%, transparent 30%),
                url("https://www.transparenttextures.com/patterns/black-paper.png"),
                #050A06;
              position: relative;
              overflow: hidden;
            }
          .metric-item .metric-value {
            font-size: 1.6rem;
            font-weight: 700;
            background: linear-gradient(135deg, #FFF6E0 0%, #D4AF37 55%, #C9A45D 75%, #8F6A2F 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0px 2px 3px rgba(0,0,0,0.55), 0px 4px 10px rgba(0,0,0,0.6);
            letter-spacing: 0.01em;
          }
          .metric-item .metric-label {
            font-size: 0.875rem;
            color: #A8A8A8;
            text-shadow: 1px 1px 0px rgba(0,0,0,0.85);
            font-weight: 400;
          }
          .metric-icon {
            filter: drop-shadow(0 0 5px rgba(201, 168, 76, 0.4));
          }

          /* CTA Button */
          .spacefold-cta {
            margin-top: 48px;
            text-align: center;
          }
          .cta-button {
              background:
                radial-gradient(circle at 35% 0%, rgba(255, 255, 255, 0.55), transparent 50%),
                linear-gradient(180deg, #ffd984 0%, #c9a45d 50%, #9e7631 100%);
              color: #0c0802;
              font-weight: 800;
              padding: 16px 36px;
              border-radius: 9999px;
              border: 1.5px solid rgba(255, 255, 255, 0.6);
              cursor: pointer;
              letter-spacing: 0.18em;
              text-shadow: none;
              box-shadow:
                inset 0 4px 6px rgba(255, 255, 255, 0.6),
                inset 0 -4px 10px rgba(0, 0, 0, 0.45),
                0 10px 24px rgba(201, 168, 76, 0.35),
                0 4px 8px rgba(0, 0, 0, 0.4);
              transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .cta-button:hover {
              transform: translateY(-5px) scale(1.03);
              box-shadow:
                inset 0 5px 8px rgba(255, 255, 255, 0.85),
                inset 0 -4px 10px rgba(0, 0, 0, 0.35),
                0 16px 32px rgba(201, 168, 76, 0.55),
                0 6px 12px rgba(0, 0, 0, 0.3);
            }

        .spacefold-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .badge-line {
          width: 24px;
          height: 1px;
          background-color: var(--moss-gold);
        }

        .badge-text {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-weight: 600;
          color: var(--moss-gold);
        }

        .spacefold-title {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(34px, 5.2vw, 68px);
          font-weight: 600;
          line-height: 1.15;
          margin: 0 0 24px 0;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .headline-groove-silver {
          background: linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 30%, #E0E0E0 65%, #B5B5B5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.2);
          filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.95)) drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.9));
        }

        .headline-groove-gold {
          background: linear-gradient(180deg, #FFF8E7 0%, #FFDF9F 25%, #F0B343 60%, #D4AF37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.15);
          filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.95)) drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.95));
        }

        .eyebrow-groove {
          background: linear-gradient(180deg, #FFE8B5 0%, #F5C25D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.8));
          font-weight: 800;
          letter-spacing: 0.25em;
        }

        .spacefold-subtitle {
          font-size: clamp(14px, 1.8vw, 17px);
          line-height: 1.75;
          color: #E2DCD0;
          font-weight: 400;
          margin: 0;
        }

        .subtitle-groove {
          color: #E2DCD0;
          text-shadow: 
            0px 2px 4px rgba(0, 0, 0, 0.95),
            0px 4px 10px rgba(0, 0, 0, 0.85);
          letter-spacing: 0.03em;
        }

        /* Split Workspace Grid */
        .spacefold-workspace {
          display: grid;
          grid-template-columns: 42% 58%;
          gap: 48px;
          align-items: start;
        }

        /* Left Side: Clickable Tabs Column */
        .spacefold-tabs-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .spacefold-tab-card {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 24px;
          background: rgba(22, 42, 28, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .spacefold-tab-card:hover {
          background: rgba(22, 42, 28, 0.45);
          border-color: rgba(199, 162, 90, 0.15);
          transform: translateX(4px);
        }

        .spacefold-tab-card.active {
          background: rgba(22, 42, 28, 0.7);
          border-color: var(--moss-border);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .tab-indicator {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--moss-gold);
          transform: scaleY(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spacefold-tab-card.active .tab-indicator {
          transform: scaleY(1);
        }

        .tab-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: rgba(199, 162, 90, 0.05);
          border: 1px solid rgba(199, 162, 90, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--moss-gold);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .spacefold-tab-card.active .tab-icon-wrapper {
          background: var(--moss-gold);
          color: var(--moss-deep);
        }

        .tab-text-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .tab-tag {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--moss-gold);
          font-weight: 700;
          margin-bottom: 4px;
        }

        .tab-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 6px 0;
          color: var(--moss-white);
        }

        .tab-desc {
          font-size: 13px;
          line-height: 1.45;
          color: var(--moss-muted);
          margin: 0;
        }

        /* Right Side: Virtual Screen Column */
        .spacefold-viewport-column {
          position: sticky;
          top: 40px;
        }

        .viewport-shell {
          width: 100%;
          border: 1px solid rgba(199, 162, 90, 0.2);
          border-radius: 16px;
          background: #060b08;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5),
                      0 0 40px rgba(199, 162, 90, 0.05);
        }

        /* Viewport Window Bar */
        .viewport-header {
          background: #090f0b;
          border-bottom: 1px solid rgba(199, 162, 90, 0.15);
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }

        .window-controls {
          display: flex;
          gap: 6px;
        }

        .control {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .viewport-title {
          font-family: monospace;
          font-size: 11px;
          color: var(--moss-muted);
        }

        .viewport-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #27c93f;
          box-shadow: 0 0 8px #27c93f;
        }

        .status-text {
          font-family: monospace;
          font-size: 10px;
          color: var(--moss-muted);
          letter-spacing: 0.05em;
        }

        /* Canvas Screen */
        .viewport-screen {
          position: relative;
          height: 480px;
          overflow: hidden;
          background: #040705;
        }

        .viewport-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .viewport-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        .viewport-cad-grid {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.15;
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(199, 162, 90, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(199, 162, 90, 0.3) 1px, transparent 1px);
        }

        .viewport-cad-lines {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        /* Technical HUD data values */
        .viewport-hud-readout {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 4;
          background: rgba(6, 11, 8, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 12px 16px;
          border-radius: 8px;
          backdrop-filter: blur(8px);
        }

        .hud-metric {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          line-height: 1;
        }

        .hud-metric-lbl {
          font-size: 8px;
          letter-spacing: 0.08em;
          color: var(--moss-muted);
          margin-bottom: 4px;
        }

        .hud-metric-val {
          font-size: 11px;
          font-weight: 600;
          color: var(--moss-white);
        }

        /* Floating Info Bar */
        .viewport-info-bar {
          position: relative;
          z-index: 5;
          margin: 20px;
          background: rgba(6, 11, 8, 0.9);
          border: 1px solid rgba(199, 162, 90, 0.2);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(12px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .info-main {
          flex: 1;
          text-align: left;
        }

        .info-title {
          display: block;
          font-size: 15px;
          font-weight: 600;
          color: var(--moss-white);
          margin-bottom: 4px;
        }

        .info-description {
          font-size: 12px;
          line-height: 1.45;
          color: var(--moss-muted);
          margin: 0;
        }

        .info-stats {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          border-left: 1px solid rgba(199, 162, 90, 0.2);
          padding-left: 20px;
          flex-shrink: 0;
        }

        .stat-label {
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--moss-gold);
          margin-bottom: 4px;
        }

        .stat-value {
          font-family: var(--font-cormorant), serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--moss-white);
          white-space: nowrap;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .spacefold-workspace {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .spacefold-viewport-column {
            position: relative;
            top: 0;
          }
          .spacefold-process {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 28px !important;
            justify-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            max-w-[600px] !important;
            margin: 0 auto !important;
          }
          .process-card-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .spacefold-process > .process-card-wrapper:last-of-type {
            grid-column: span 2 !important;
          }
          .process-card {
            width: 240px !important;
            min-height: auto !important;
            padding: 24px 20px 20px 20px !important;
          }
          .card-image-wrap {
            width: 100% !important;
            height: 120px !important;
            margin-top: 18px !important;
          }
          .process-arrow-wrapper {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .spacefold-process {
            grid-template-columns: 1fr !important;
            max-width: 300px !important;
          }
          .spacefold-process > .process-card-wrapper:last-of-type {
            grid-column: span 1 !important;
          }
          .spacefold-section {
            padding: 80px 16px;
          }
          .viewport-screen {
            height: 380px;
          }
          .viewport-info-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            margin: 12px;
          }
          .info-stats {
            align-items: flex-start;
            border-left: 0;
            border-top: 1px solid rgba(199, 162, 90, 0.2);
            padding-left: 0;
            padding-top: 12px;
          }
          .spacefold-metrics {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            padding: 16px !important;
            margin-top: 24px !important;
          }
        }
      `}</style>
    </>
  );
}
