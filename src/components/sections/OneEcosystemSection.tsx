"use client";

import React from "react";
import { motion } from "framer-motion";

const CARDS = [
  {
    num: "01",
    title: "HIGH-VOLUME PRODUCTS",
    subtitle: "(Walls / Floors / Ceilings / Spaces)",
    bullets: [
      "Engineered for scale",
      "Consistent quality",
      "Wide range of finishes",
      "Built for performance and durability"
    ],
    icon: (
      <svg width="56" height="56" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[56px] h-[56px]">
        {/* Layer 1 (top) */}
        <path d="M 50,15 L 85,30 L 50,45 L 15,30 Z" />
        {/* Layer 2 (middle) */}
        <path d="M 15,42 L 50,57 L 85,42" />
        <path d="M 15,30 L 15,42" />
        <path d="M 50,45 L 50,57" />
        <path d="M 85,30 L 85,42" />
        {/* Layer 3 (bottom) */}
        <path d="M 15,54 L 50,69 L 85,54" />
        <path d="M 15,42 L 15,54" />
        <path d="M 50,57 L 50,69" />
        <path d="M 85,42 L 85,54" />
      </svg>
    )
  },
  {
    num: "02",
    title: "CHANNEL SALES",
    subtitle: "(Disrupting Traditional Trade)",
    bullets: [
      "Optimized distribution network",
      "Reorganizing traditional trade market",
      "Transparent supply chain logistics",
      "Robust B2B merchant partnerships"
    ],
    icon: (
      <svg width="56" height="56" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[56px] h-[56px]">
        {/* Handshake/Network styled SVG */}
        <path d="M 20,50 L 35,65 L 80,20" />
        <path d="M 35,65 L 50,50" />
        <circle cx="20" cy="50" r="5" fill="currentColor" />
        <circle cx="35" cy="65" r="5" fill="currentColor" />
        <circle cx="80" cy="20" r="5" fill="currentColor" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
        <path d="M 20,50 L 50,50" strokeDasharray="4 4" />
        <path d="M 35,65 L 80,20" strokeDasharray="4 4" />
      </svg>
    )
  },
  {
    num: "03",
    title: "TURNKEY INSTITUTIONAL SERVICES",
    subtitle: "(Civil / MEP / EPC / HVAC)",
    bullets: [
      "End-to-end project delivery",
      "Integrated expertise",
      "On-time, on-budget",
      "Safety and compliance assured"
    ],
    icon: (
      <svg width="56" height="56" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[56px] h-[56px]">
        <path d="M 20,85 L 20,40 L 50,20 L 80,40 L 80,85 Z" />
        <path d="M 50,20 L 50,85" />
        <path d="M 20,55 L 80,55" />
        <path d="M 20,70 L 80,70" />
        <path d="M 40,85 L 40,70 L 60,70 L 60,85" />
        <line x1="30" y1="47" x2="40" y2="47" />
        <line x1="60" y1="47" x2="70" y2="47" />
        <line x1="30" y1="62" x2="40" y2="62" />
        <line x1="60" y1="62" x2="70" y2="62" />
      </svg>
    )
  },
  {
    num: "04",
    title: "SPACEFOLD AI METAVERSE",
    subtitle: "",
    bullets: [
      "AI-powered design intelligence",
      "Immersive visualization",
      "Virtual walkthroughs",
      "Smarter decisions, better outcomes"
    ],
    icon: (
      <svg width="56" height="56" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[56px] h-[56px]">
        <rect x="15" y="32" width="70" height="36" rx="10" />
        <rect x="22" y="38" width="56" height="24" rx="6" />
        <path d="M 15,50 L 5,50 L 5,35" />
        <path d="M 85,50 L 95,50 L 95,35" />
        <path d="M 42,68 C 45,64 55,64 58,68" />
      </svg>
    )
  }
];

// Staggered entry animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const elementVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 0.61, 0.36, 1] as const,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: idx * 0.08, // Stagger card delays
      duration: 0.8,
      ease: [0.22, 0.61, 0.36, 1] as const,
    }
  })
};

const panelVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 1.0,
      ease: [0.22, 0.61, 0.36, 1] as const,
    }
  }
};

export default function OneEcosystemSection() {
  return (
    <section
      className="w-full relative overflow-hidden flex items-center justify-center py-20 lg:py-28"
      style={{
        backgroundColor: "#090909",
        minHeight: "100vh",
        backgroundImage: `
          /* Bottom-right soft gold light streak only */
          radial-gradient(ellipse at 100% 100%, rgba(201, 168, 76, 0.12) 0%, transparent 60%),
          /* Subtle marble grain via noise pattern */
          url("https://www.transparenttextures.com/patterns/black-paper.png")
        `,
      }}
    >
      {/* Container - Centered, 1440px Max Width with generous safe padding to prevent browser side contact */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-[1440px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 relative z-30 flex flex-col xl:flex-row items-stretch justify-between gap-12 xl:gap-16"
      >
        {/* Left Column - Perfectly aligned and spaced */}
        <motion.div
          variants={elementVariants}
          className="w-full xl:w-[30%] flex flex-col justify-center items-center xl:items-start text-center xl:text-left self-center"
        >
          {/* Eyebrow Label */}
          <div className="flex items-center gap-3 mb-8 xl:self-start justify-center xl:justify-start">
            <span className="font-sans text-[11px] xl:text-[12px] font-bold tracking-[0.2em] uppercase ecosystem-eyebrow-text">
              ONE ECOSYSTEM
            </span>
            <div className="w-[40px] h-[1px] bg-gradient-to-r from-[#FF453A] to-transparent" />
          </div>

          {/* Headline (48px on desktop, elegantly scaled down on mobile) */}
          <h2 className="font-serif text-[24px] sm:text-[34px] xl:text-[48px] leading-[1.15] tracking-wide mb-4 sm:mb-8 select-none text-center xl:text-left flex flex-col gap-1 sm:gap-1.5 font-bold">
            <span className="block ecosystem-header-silver">DESIGN.</span>
            <span className="block ecosystem-header-silver">TECHNOLOGY.</span>
            <span className="block ecosystem-header-silver">MANUFACTURING.</span>
            <span className="block ecosystem-header-red">EXECUTION.</span>
          </h2>

          {/* Decorative Divider */}
          <div className="flex items-center w-[130px] sm:w-[160px] gap-2 my-4 sm:my-8 text-[#C7A86B] xl:self-start" style={{ opacity: 0.6 }}>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C7A86B]" />
            <span className="text-[10px] select-none">✦</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C7A86B]" />
          </div>

          {/* Supporting Copy */}
          <p className="font-sans font-light text-[12.5px] sm:text-[14px] xl:text-[15px] leading-[1.65] text-[#E2DCD0] max-w-[300px] sm:max-w-[340px] text-center xl:text-left mt-1 sm:mt-2" style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.95)" }}>
            End-to-end integration that brings clarity, control and confidence to every project.
          </p>
        </motion.div>

        {/* Vertical Separator Divider (Desktop only) */}
        <motion.div
          variants={elementVariants}
          className="hidden xl:flex w-[2px] relative flex-shrink-0 items-center justify-center self-stretch"
          style={{
            background: "linear-gradient(to bottom, transparent, #6A4E1D 15%, #C5A059 35%, #FFF0D0 50%, #D4AF37 65%, #6A4E1D 85%, transparent)",
            boxShadow: "0 0 20px rgba(212, 175, 55, 0.35), 0 0 40px rgba(212, 175, 55, 0.15)",
          }}
        >
          {/* Inner metallic highlight core line */}
          <div 
            className="absolute inset-0 w-[1px] opacity-90 mx-auto" 
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 80%, transparent)"
            }}
          />
          
          {/* Energy Highlight Node */}
          <div
            className="w-[12px] h-[12px] rounded-full flex-shrink-0 sticky top-1/2 -translate-y-1/2 z-10"
            style={{
              background: "radial-gradient(circle at 35% 35%, #FFFCE0 0%, #D4AF37 60%, #8A6623 100%)",
              boxShadow: "0 0 25px 8px rgba(255, 252, 224, 0.8), 0 0 45px 15px rgba(212, 175, 55, 0.5), inset 0 1px 2px rgba(255,255,255,0.6)",
              border: "1.5px solid #6A4E1D",
            }}
          />
        </motion.div>

        {/* Right Column - Beautiful spacing and clear limits */}
        <div className="w-full xl:w-[62%] flex flex-col gap-8 justify-center">

          {/* Ecosystem Cards - Grid with comfortable margins */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 justify-items-center gap-x-3 gap-y-8 sm:gap-6 relative z-10">
            {CARDS.map((card, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                transition={{
                  y: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const }
                }}
                className="relative w-full max-w-[300px] xl:max-w-none flex flex-col items-center group cursor-pointer transition-all duration-500 pt-5 pb-7 px-3 sm:pt-8 sm:pb-6 sm:px-6 select-none overflow-hidden h-auto sm:h-full sm:min-h-[440px] xl:min-h-[480px] ecosystem-card-grooved"
              >
                {/* Texture Layers */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[16px] opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500"
                  style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/crumpled-paper.png")`,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none rounded-[16px] opacity-[0.10] group-hover:opacity-[0.18] transition-opacity duration-500"
                  style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/rough-paper.png")`,
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none rounded-[16px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
                  style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                  }}
                />

                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-[radial-gradient(circle_at_top_right,rgba(201,168,107,0.15),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_top_right,rgba(201,168,107,0.36),transparent_70%)] transition-all duration-500 pointer-events-none rounded-tr-[16px]" />

                {/* Card Content Wrapper */}
                <div className="relative z-10 flex flex-col items-center h-full w-full">
                  <span
                    className="font-serif text-[22px] sm:text-[38px] lg:text-[42px] font-bold block ecosystem-num-grooved mb-1 sm:mb-4"
                  >
                    {card.num}
                  </span>

                  {/* Gold divider — desktop only */}
                  <div className="hidden sm:flex relative w-full items-center justify-center" style={{ marginTop: "8px", marginBottom: "12px" }}>
                    <div className="w-[50px] h-[1px] bg-gradient-to-r from-transparent via-[#C7A86B] to-transparent opacity-60" />
                    <div className="absolute text-[#C7A86B] text-[8px] select-none">✦</div>
                    <div className="absolute w-[8px] h-[8px] rounded-full bg-[#FFFCE0] blur-[2px] opacity-40" />
                  </div>

                  <div className="w-[38px] h-[38px] sm:w-[72px] sm:h-[72px] [&>svg]:w-[30px] [&>svg]:h-[30px] sm:[&>svg]:w-[64px] sm:[&>svg]:h-[64px] flex items-center justify-center mb-2 sm:mb-6 ecosystem-icon-wrapper">
                    {card.icon}
                  </div>

                  <h4
                    className="font-sans font-bold text-[10px] sm:text-[14px] lg:text-[16px] tracking-[0.04em] sm:tracking-[0.08em] uppercase mt-0 sm:mt-2 text-center max-w-[95%] mb-0 sm:mb-3 leading-tight ecosystem-title-grooved"
                  >
                    {card.title}
                  </h4>

                  {/* Subtitle — hidden on mobile to save space */}
                  {card.subtitle ? (
                    <p
                      className="hidden sm:block font-sans text-[11px] lg:text-[12px] text-[#8C8C8C] text-center leading-normal"
                      style={{ marginBottom: "10px" }}
                    >
                      {card.subtitle}
                    </p>
                  ) : null}

                  {/* Bullets — shown on all sizes */}
                  <div
                    className="w-full flex-grow flex flex-col justify-start items-start text-left"
                    style={{ marginTop: "16px", paddingLeft: "8px", paddingRight: "4px" }}
                  >
                    <ul className="space-y-2.5 sm:space-y-3.5 lg:space-y-4" style={{ margin: 0, padding: 0, listStyle: "none", width: "100%" }}>
                      {card.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start text-[11.5px] sm:text-[13px] lg:text-[14px] leading-snug font-sans">
                          <span
                            className="rounded-full flex-shrink-0 ecosystem-bullet-dot"
                            style={{
                              width: "5px",
                              height: "5px",
                              marginTop: "5px",
                              marginRight: "6px"
                            }}
                          />
                          <span className="flex-1 ecosystem-bullet-text">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow button — removed on all devices as requested */}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Statement Panel */}
          <div className="w-full flex justify-center relative mt-6 lg:mt-8" style={{ zIndex: 30 }}>
            <div
              className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[60%] h-[15px] rounded-full bg-[#D7B06A] pointer-events-none filter blur-[30px]"
              style={{ opacity: 0.03 }}
            />

            <motion.div
              variants={panelVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="w-full min-h-[90px] lg:min-h-[100px] rounded-[16px] border border-[#000000] bg-gradient-to-br from-[#1a150f] via-[#120e0a] to-[#0c0906] shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),inset_0_-1px_2px_rgba(0,0,0,0.8),0_0_0_1px_rgba(199,168,107,0.18),0_12px_36px_-8px_rgba(0,0,0,0.9)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),inset_0_-1px_2px_rgba(0,0,0,0.8),0_0_0_1px_rgba(199,168,107,0.45),0_20px_45px_-10px_rgba(0,0,0,1),0_0_30px_rgba(199,168,107,0.22)] transition-all duration-500 p-5 lg:py-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-6 text-left relative overflow-hidden group/panel"
              style={{ zIndex: 30 }}
            >
              {/* Texture Layers */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[16px] opacity-[0.15] group-hover/panel:opacity-[0.25] transition-opacity duration-500"
                style={{
                  backgroundImage: `url("https://www.transparenttextures.com/patterns/crumpled-paper.png")`,
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-[16px] opacity-[0.10] group-hover/panel:opacity-[0.18] transition-opacity duration-500"
                style={{
                  backgroundImage: `url("https://www.transparenttextures.com/patterns/rough-paper.png")`,
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-[16px] opacity-[0.06] group-hover/panel:opacity-[0.12] transition-opacity duration-500"
                style={{
                  backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                }}
              />

              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,rgba(199,168,107,0.12),transparent_70%)] group-hover/panel:bg-[radial-gradient(circle_at_top_right,rgba(199,168,107,0.32),transparent_70%)] transition-all duration-500 pointer-events-none rounded-tr-[16px]" />

              <div className="absolute inset-2 pointer-events-none select-none z-10">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C7A86B]/25" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C7A86B]/25" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C7A86B]/25" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C7A86B]/25" />
              </div>

              <div className="flex-1 flex flex-col justify-center gap-1 text-center z-10">
                <h4 className="font-sans font-medium text-[14px] sm:text-[15px] lg:text-[17px] text-[#c00000] leading-tight select-none uppercase tracking-wide">
                  One ecosystem. <br className="sm:hidden" />One standard of excellence.
                </h4>
                <p className="font-sans font-light text-[11px] sm:text-[12px] leading-snug text-[#D8D8D8]">
                  Because every great space begins with perfect alignment.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Subtle Frame Overlay */}
      <div className="absolute inset-4 pointer-events-none rounded-sm border border-[rgba(201,168,76,0.03)]" />
      
      <style>{`
        .ecosystem-eyebrow-text {
          background: linear-gradient(180deg, #FF453A 0%, #C00000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(1.5px 1.5px 1px rgba(0, 0, 0, 0.95));
        }

        .ecosystem-header-silver {
          background: linear-gradient(180deg, #FFFFFF 0%, #E6E6E6 45%, #CCCCCC 75%, #A8A8A8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.2);
          filter: drop-shadow(2.5px 2.5px 1.5px rgba(0, 0, 0, 0.95));
        }

        .ecosystem-header-red {
          background: linear-gradient(180deg, #FF453A 0%, #C00000 55%, #8B0000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.15);
          filter: drop-shadow(2.5px 2.5px 1.5px rgba(0, 0, 0, 0.95));
        }

        .ecosystem-card-grooved {
          background: 
            radial-gradient(circle at 100% 50%, rgba(201, 168, 76, 0.18) 0%, transparent 60%),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 14px),
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 14px),
            url("https://www.transparenttextures.com/patterns/black-paper.png"),
            #0B0B0B;

          /* Subtle dark outline on most borders, gold tint only in the right edge */
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-right: 2px solid rgba(201, 168, 76, 0.75);
          border-radius: 16px;
          
          /* Embossed 3D groove shadow */
          box-shadow: 
            0 12px 36px -8px rgba(0, 0, 0, 0.95),
            /* deep inset shadow around borders */
            inset 0 4px 10px rgba(0, 0, 0, 0.95),
            inset 0 -3px 8px rgba(201, 168, 76, 0.06),
            /* left bevel shadow and right golden reflect */
            inset 4px 0 8px rgba(0, 0, 0, 0.75),
            inset -4px 0 8px rgba(201, 168, 76, 0.12);
            
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease;
        }

        .ecosystem-card-grooved:hover {
          transform: translateY(-8px);
          border-right: 2px solid rgba(229, 200, 128, 1);
          box-shadow: 
            0 22px 50px -10px rgba(0, 0, 0, 1),
            0 0 25px rgba(201, 168, 76, 0.28),
            inset 0 3px 6px rgba(0, 0, 0, 0.95),
            inset 0 -2px 4px rgba(201, 168, 76, 0.15),
            inset 3px 0 5px rgba(0, 0, 0, 0.6),
            inset -3px 0 8px rgba(201, 168, 76, 0.35);
        }

        .ecosystem-num-grooved {
          background: linear-gradient(180deg, #FF453A 0%, #C00000 55%, #8B0000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.95)) drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.75));
        }

        .ecosystem-icon-wrapper {
          color: #FF453A;
          filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.95)) drop-shadow(0px 0px 10px rgba(192, 0, 0, 0.35));
        }

        .ecosystem-title-grooved {
          background: linear-gradient(180deg, #FFFFFF 0%, #E2E2E2 40%, #B5B5B5 75%, #8A8A8A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.3px rgba(255, 255, 255, 0.15);
          filter: drop-shadow(0px 1.5px 2px rgba(0, 0, 0, 0.95));
        }

        .ecosystem-bullet-dot {
          background: linear-gradient(135deg, #FF453A 0%, #C00000 100%);
          box-shadow: 0 0 6px rgba(192, 0, 0, 0.8), 0 1px 1.5px rgba(0, 0, 0, 0.6);
        }

        .ecosystem-bullet-text {
          color: #E2DCD0;
          text-shadow: 1px 1.5px 1px rgba(0, 0, 0, 0.95);
        }
      `}</style>
    </section>
  );
}

