"use client";

import Link from "next/link";
import EyebrowLabel from "@/components/ui/EyebrowLabel";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function HeadlineSection() {
  return (
    <section
      className="headline-section"
      style={{
        backgroundColor: "transparent",
        padding:         0,
        textAlign:       "center",
        position:        "relative",
        overflow:        "hidden",
        width:           "100%",
      }}
    >
      <style>{`
        @keyframes text-glare-effect {
          0% { background-position: -200% 0, 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 200% 0, 0 0, 0 0, 0 0, 0 0; }
        }
        .glare-animation {
          animation: text-glare-effect 2.5s cubic-bezier(0.4, 0, 0.2, 1) 0.8s 1 forwards;
        }

        /* Eyebrow style */
        .headline-eyebrow-grooved {
          font-size: 13px;
          letter-spacing: 0.2em;
          color: #C00000;
          font-weight: 700;
        }

        /* Headline main text with parallax/3D look */
        .headline-main-text {
          margin-top: clamp(14px, 1.8vw, 24px);
          font-size: clamp(2.8rem, 4.5vw, 4.2rem);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.01em;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .headline-text-grooved-dark {
          color: #111111;
          text-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.1);
        }

        .headline-text-grooved-red {
          color: #C00000;
          text-shadow: 0px 3px 8px rgba(192, 0, 0, 0.2), 0px 1px 3px rgba(192, 0, 0, 0.1);
        }

        /* Subheadlines */
        .headline-sub-grooved {
          font-size: clamp(0.875rem, 1.2vw, 1.1rem);
          letter-spacing: 0.15em;
          color: #2D2722;
        }

        /* Spacing container rules */
        .headline-cta-row {
          margin-top: clamp(36px, 4vw, 54px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(24px, 3vw, 40px);
          flex-wrap: wrap;
        }

        .primary-cta-button {
          font-size: 0.8125rem;
          letter-spacing: 0.15em;
          border-radius: 6px;
          padding: 16px 40px;
        }

        .secondary-play-circle {
          width: 52px;
          height: 52px;
        }

        .secondary-cta-text-large {
          font-size: 0.8125rem;
          letter-spacing: 0.18em;
        }

        .secondary-cta-text-small {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
        }

        /* ═══════════════════════════════════════════════════════
           TABLET & PORTRAIT VIEWPORT OPTIMIZATIONS (601px - 1024px)
           ═══════════════════════════════════════════════════════ */
        @media (max-width: 1024px) and (min-width: 601px) {
          .headline-eyebrow-grooved {
            font-size: 13px !important;
            letter-spacing: 0.22em !important;
          }

          .headline-main-text {
            margin-top: 18px !important;
            font-size: clamp(2.4rem, 5vw, 3.2rem) !important;
            gap: 8px !important;
          }

          .headline-sub-grooved {
            font-size: clamp(0.95rem, 1.6vw, 1.15rem) !important;
            letter-spacing: 0.16em !important;
          }

          .headline-cta-row {
            margin-top: 36px !important;
            gap: 28px !important;
          }

          .primary-cta-button {
            font-size: 0.8125rem !important;
            letter-spacing: 0.16em !important;
            padding: 16px 42px !important;
          }

          .secondary-play-circle {
            width: 52px !important;
            height: 52px !important;
          }

          .secondary-cta-text-large {
            font-size: 0.8125rem !important;
            letter-spacing: 0.18em !important;
          }

          .secondary-cta-text-small {
            font-size: 0.75rem !important;
            letter-spacing: 0.15em !important;
          }
        }

        /* ═══════════════════════════════════════════════════════
           MOBILE VIEWPORT ONLY OPTIMIZATIONS (strictly under 600px)
        ═══════════════════════════════════════════════════════ */
        @media (max-width: 600px) {
          .headline-eyebrow-grooved {
            font-size: 10px !important;
            letter-spacing: 0.2em !important;
          }

          .headline-main-text {
            margin-top: 12px !important;
            font-size: clamp(18px, 5vw, 24px) !important;
            font-weight: 500 !important;
            line-height: 0.92 !important;
            letter-spacing: 0.01em !important;
            gap: 0px !important;
          }

          .headline-sub-grooved {
            font-size: 11.5px !important;
            font-weight: 500 !important;
            color: #111111 !important;
            letter-spacing: 0.12em !important;
            line-height: 1.6 !important;
            text-shadow: none !important;
          }

          .headline-cta-row {
            margin-top: 110px !important;
            gap: 12px !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
          }

          .primary-cta-button {
            font-size: 0.65rem !important;
            letter-spacing: 0.12em !important;
            border-radius: 4px !important;
            padding: 10px 18px !important;
          }

          .secondary-play-circle {
            width: 36px !important;
            height: 36px !important;
          }

          .secondary-cta-text-large {
            font-size: 0.65rem !important;
            letter-spacing: 0.12em !important;
          }

          .secondary-cta-text-small {
            font-size: 0.58rem !important;
            letter-spacing: 0.1em !important;
          }
        }
      `}</style>

      {/* ── Geometric Guide Lines (r1.md spec) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 3, /* Pull to front, over the hero image */
          opacity: 0.6, /* Increased opacity */
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Concentric ellipses anchored at the top center */}
          <ellipse cx="50%" cy="20%" rx="35%" ry="60%" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
          <ellipse cx="50%" cy="20%" rx="50%" ry="80%" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
          <ellipse cx="50%" cy="20%" rx="65%" ry="100%" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
          <ellipse cx="50%" cy="20%" rx="80%" ry="120%" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ── Subtle radial parchment glow — center warmth ── */}
      <div
        aria-hidden="true"
        style={{
          position:     "absolute",
          inset:        0,
          background:   "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Content wrapper — above the glow ── */}
      <div style={{ 
        position: "relative", 
        zIndex: 1,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{ pointerEvents: "auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0 16px" }}>
            
            {/* 1. Eyebrow Label — first in */}
            <AnimatedSection delay={0} direction="up">
              <div className="flex items-center justify-center gap-3">
                <span className="font-sans font-bold uppercase headline-eyebrow-grooved">
                  Beyond Interiors
                </span>
              </div>
            </AnimatedSection>
 
            {/* 2. Main Headline — slight delay */}
            <AnimatedSection delay={80} direction="up">
              <h2
                className="font-serif uppercase headline-main-text"
              >
                <span className="headline-text-grooved-dark">WE DESIGN</span>
                <span className="headline-text-grooved-red">EXPERIENCES.</span>
                <span className="headline-text-grooved-dark">WE DELIVER</span>
                <span className="headline-text-grooved-dark">OUTCOMES.</span>
              </h2>
            </AnimatedSection>
 
            {/* 3. Ornamental Divider */}
            <AnimatedSection delay={160} direction="fade">
              <div style={{ marginTop: "clamp(18px, 3vw, 36px)", display: "flex", justifyContent: "center" }}>
                <OrnamentalDivider width="100px" />
              </div>
            </AnimatedSection>
 
            {/* 4. Sub-headline */}
            <AnimatedSection delay={220} direction="up">
              <div style={{ marginTop: "clamp(14px, 2vw, 28px)" }}>
                <p className="font-sans uppercase headline-sub-grooved" style={{
                  lineHeight: 1.6,
                }}>
                  Where Vision Meets Precision.
                </p>
                <p className="font-sans uppercase headline-sub-grooved" style={{
                  lineHeight: 1.6,
                  marginTop: "4px"
                }}>
                  Spaces that perform. Experiences that last.
                </p>
              </div>
            </AnimatedSection>
          </div>
      </div>
    </section>
  );
}
