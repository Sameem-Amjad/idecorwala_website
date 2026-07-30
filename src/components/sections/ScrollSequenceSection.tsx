"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 230;

const frameSrc = (frameIndex: number) => {
  const fileIndex = Math.min(FRAME_COUNT, Math.max(1, frameIndex + 1));
  return `/imgs/hero%20section%20frames/ezgif-frame-${String(fileIndex).padStart(3, '0')}.jpg`;
};

// Sliding-window frame cache. Only frames near the playhead stay decoded and the rest are
// released, so memory is bounded by the window size rather than the sequence length — a
// decoded 1280x720 frame costs ~3.7MB, so ~40 resident frames is ~150MB no matter how long
// the sequence gets. This replaces decimation, so every frame is now available and the
// animation is temporally smoother than before, at full resolution.
//
// Ahead > behind because scrolling down is the common direction, and the behind buffer
// keeps small back-scrolls from thrashing. Released frames stay in the browser's HTTP
// cache, so re-entering a frame is a decode rather than a network round-trip.
const WINDOW_AHEAD_DESKTOP = 30;
const WINDOW_BEHIND_DESKTOP = 10;
const WINDOW_AHEAD_MOBILE = 16;
const WINDOW_BEHIND_MOBILE = 6;

export default function ScrollSequenceSection({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const cornerLeftRef = useRef<HTMLDivElement>(null);
  const cornerRightRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const initialOverlaysRef = useRef<HTMLDivElement>(null);
  const mobileBlurOverlayRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef<boolean>(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showTransitionImg, setShowTransitionImg] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // On mobile we skip past the corner-fade frames so the logo is clear from the start
  const MOBILE_FRAME_OFFSET = 34;

  // Premium Metallic Gradient from the new aesthetic - Authentic multi-stop gold shader
  const premiumGoldGradient = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Detect mobile before sizing the frame cache — it decides the memory budget below.
    const mobile = window.innerWidth <= 640;
    isMobileRef.current = mobile;
    setIsMobile(mobile);

    const windowAhead = mobile ? WINDOW_AHEAD_MOBILE : WINDOW_AHEAD_DESKTOP;
    const windowBehind = mobile ? WINDOW_BEHIND_MOBILE : WINDOW_BEHIND_DESKTOP;

    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    const resident = new Set<number>();
    const inFlight = new Set<number>();
    let windowLo = 0;
    let windowHi = 0;
    let windowCenter = -1;
    let currentIdx = 0;
    // Last frame actually painted — the guarantee that the canvas is never blank even if
    // the playhead outruns decoding on a fast flick.
    let lastPainted: HTMLImageElement | null = null;

    const drawImageScaled = (img: HTMLImageElement, ctx: CanvasRenderingContext2D) => {
        const canvasElement = ctx.canvas;
        const hRatio = canvasElement.width / img.width;
        const vRatio = canvasElement.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvasElement.width - img.width * ratio) / 2;
        const centerShift_y = (canvasElement.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    // On mobile start at frame 34 (MOBILE_FRAME_OFFSET) so the central logo is clean
    // and visible immediately.
    const startFrame = mobile ? MOBILE_FRAME_OFFSET : 0;

    const requestFrame = (i: number) => {
      if (i < 0 || i >= FRAME_COUNT) return;
      if (images[i] || inFlight.has(i)) return;
      inFlight.add(i);
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        inFlight.delete(i);
        // Before the first paint, take whatever decodes first — on a very fast flick the
        // window can outrun every in-flight frame, and this is what stops the canvas
        // sitting blank until the scroll settles.
        if (!lastPainted) {
          drawImageScaled(img, context);
          lastPainted = img;
        }
        // The playhead may have moved on while this was decoding; if this frame is no
        // longer in the window, drop it rather than growing the cache past its budget.
        if (i < windowLo || i > windowHi) return;
        images[i] = img;
        resident.add(i);
        if (i === currentIdx) {
          drawImageScaled(img, context);
          lastPainted = img;
        }
      };
      img.onerror = () => inFlight.delete(i);
      img.src = frameSrc(i);
    };

    // Re-centre the window: release what fell outside, then request what's inside,
    // nearest-to-playhead first so the most urgently needed frames win the connection.
    const recentreWindow = (center: number) => {
      windowLo = Math.max(0, center - windowBehind);
      windowHi = Math.min(FRAME_COUNT - 1, center + windowAhead);

      for (const i of resident) {
        if (i < windowLo || i > windowHi) {
          images[i] = null;
          resident.delete(i);
        }
      }

      const span = Math.max(center - windowLo, windowHi - center);
      for (let d = 0; d <= span; d++) {
        requestFrame(center + d);
        if (d > 0) requestFrame(center - d);
      }
    };

    // Synchronous, zero-latency frame drawer
    const drawFrame = (frameIndex: number) => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, frameIndex));
      currentIdx = idx;
      if (idx !== windowCenter) {
        windowCenter = idx;
        recentreWindow(idx);
      }

      let activeImg = images[idx];

      // Nearest resident frame — bounded by the window, so this stays cheap.
      if (!activeImg) {
        for (let d = 1; d <= windowAhead + windowBehind; d++) {
          const lo = idx - d;
          const hi = idx + d;
          if (lo >= 0 && images[lo]) { activeImg = images[lo]; break; }
          if (hi < FRAME_COUNT && images[hi]) { activeImg = images[hi]; break; }
        }
      }

      // Nothing resident yet: hold the previous paint rather than flashing empty.
      if (!activeImg) activeImg = lastPainted;

      if (activeImg) {
        drawImageScaled(activeImg, context);
        lastPainted = activeImg;
      }
    };

    // Prime the window around the opening frame.
    currentIdx = startFrame;
    windowCenter = startFrame;
    recentreWindow(startFrame);

    // Helper function to animate overlays smoothly with fade + translate/scale physics
    const animateOverlay = (
      ref: React.RefObject<HTMLDivElement | null>,
      progress: number,
      startFrame: number,
      peakFrame: number,
      fadeFrame: number,
      endFrame: number,
      direction: "left" | "right" | "center"
    ) => {
      const start = startFrame / FRAME_COUNT;
      const peak = peakFrame / FRAME_COUNT;
      const fade = fadeFrame / FRAME_COUNT;
      const end = endFrame / FRAME_COUNT;

      if (!ref.current) return;

      if (progress >= start && progress <= end) {
        let opacity = 1;
        let tx = 0;
        let ty = 0;
        let scale = 1;

        if (progress < peak) {
          // Fade in phase
          const localProgress = (progress - start) / (peak - start);
          opacity = localProgress;
          if (direction === "left") {
            tx = -60 * (1 - opacity);
          } else if (direction === "right") {
            tx = 60 * (1 - opacity);
          } else {
            scale = 0.95 + 0.05 * opacity;
          }
        } else if (progress > fade) {
          // Fade out phase
          const localProgress = (progress - fade) / (end - fade);
          opacity = 1 - localProgress;
          ty = -30 * (1 - opacity);
        }

        ref.current.style.opacity = String(opacity);
        ref.current.style.visibility = "visible";
        if (direction === "center") {
          ref.current.style.transform = `scale3d(${scale}, ${scale}, 1) translate3d(0, ${ty}px, 0)`;
        } else {
          ref.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        }
      } else {
        ref.current.style.opacity = "0";
        ref.current.style.visibility = "hidden";
      }
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Redraw current frame on size change if ScrollTrigger exists
      const trigger = ScrollTrigger.getById("hero-canvas-trigger");
      if (trigger) {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          isMobileRef.current
            ? Math.floor(trigger.progress * (FRAME_COUNT - MOBILE_FRAME_OFFSET)) + MOBILE_FRAME_OFFSET
            : Math.floor(trigger.progress * FRAME_COUNT)
        );
        drawFrame(frameIndex);
      }
    };
    
    setCanvasSize();

    // Initialize GSAP ScrollTrigger for unified, layout-thrash-free rendering
    const trigger = ScrollTrigger.create({
      id: "hero-canvas-trigger",
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        // On mobile: offset the canvas frame by MOBILE_FRAME_OFFSET so scroll
        // starts from the clean logo frame (past corner fade-out).
        const effectiveFrameIndex = Math.min(
          FRAME_COUNT - 1,
          isMobileRef.current
            ? Math.floor(self.progress * (FRAME_COUNT - MOBILE_FRAME_OFFSET)) + MOBILE_FRAME_OFFSET
            : Math.floor(self.progress * FRAME_COUNT)
        );

        drawFrame(effectiveFrameIndex);

        // Apply Mobile Blur Overlay only when scroll progress is zero
        if (isMobileRef.current && mobileBlurOverlayRef.current) {
          if (self.progress === 0) {
            mobileBlurOverlayRef.current.style.opacity = "1";
            mobileBlurOverlayRef.current.style.visibility = "visible";
          } else {
            mobileBlurOverlayRef.current.style.opacity = "0";
            mobileBlurOverlayRef.current.style.visibility = "hidden";
          }
        }

        // Corner/overlay animations — desktop and mobile (starts at MOBILE_FRAME_OFFSET on mobile)
        const startFade = isMobileRef.current ? MOBILE_FRAME_OFFSET : 0;
        const endFade = isMobileRef.current ? MOBILE_FRAME_OFFSET + 12 : 12;

        if (effectiveFrameIndex <= endFade) {
          const fadeProgress = (effectiveFrameIndex - startFade) / (endFade - startFade);
          const opacity = Math.max(0, Math.min(1, 1 - fadeProgress));

          if (cornerLeftRef.current) {
            cornerLeftRef.current.style.opacity = String(opacity);
            cornerLeftRef.current.style.visibility = "visible";
          }
          if (cornerRightRef.current) {
            cornerRightRef.current.style.opacity = String(opacity);
            cornerRightRef.current.style.visibility = "visible";
          }
          if (lightingRef.current) {
            lightingRef.current.style.opacity = String(opacity);
            lightingRef.current.style.visibility = "visible";
          }
          if (backdropRef.current) {
            backdropRef.current.style.opacity = String(opacity);
            backdropRef.current.style.visibility = "visible";
          }
          if (initialOverlaysRef.current) {
            initialOverlaysRef.current.style.opacity = String(opacity);
            initialOverlaysRef.current.style.visibility = "visible";
          }
        } else {
          if (cornerLeftRef.current) {
            cornerLeftRef.current.style.opacity = "0";
            cornerLeftRef.current.style.visibility = "hidden";
          }
          if (cornerRightRef.current) {
            cornerRightRef.current.style.opacity = "0";
            cornerRightRef.current.style.visibility = "hidden";
          }
          if (lightingRef.current) {
            lightingRef.current.style.opacity = "0";
            lightingRef.current.style.visibility = "hidden";
          }
          if (backdropRef.current) {
            backdropRef.current.style.opacity = "0";
            backdropRef.current.style.visibility = "hidden";
          }
          if (initialOverlaysRef.current) {
            initialOverlaysRef.current.style.opacity = "0";
            initialOverlaysRef.current.style.visibility = "hidden";
          }
        }

        // Animate all 4 phase-text sliders (both mobile and desktop)
        animateOverlay(text1Ref, self.progress, 22, 35, 55, 68, "left");
        animateOverlay(text2Ref, self.progress, 74, 87, 107, 120, "right");
        animateOverlay(text3Ref, self.progress, 126, 139, 159, 172, "center");
        animateOverlay(text4Ref, self.progress, 178, 191, 205, 218, "right");

        // Show headline children when near the end (last 8% of scroll)
        const isHeadlineVisible = self.progress > 0.92;
        setShowHeadline(isHeadlineVisible);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("headlineActiveChange", { detail: isHeadlineVisible }));
        }
        setShowTransitionImg(self.progress > 0.88);
      }
    });

    window.addEventListener("resize", setCanvasSize);
    
    return () => {
      trigger.kill();
      window.removeEventListener("resize", setCanvasSize);
      // Drop bitmap references so navigating away releases the frame cache.
      images.fill(null);
      resident.clear();
      inFlight.clear();
      lastPainted = null;
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "400vh", position: "relative", backgroundColor: "#000" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", transform: "translateZ(0)", willChange: "transform" }}>
        {/* Hidden global SVG assets for definitions */}
        <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
          <defs>
            <linearGradient id="gold-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BF953F" />
              <stop offset="25%" stopColor="#FCF6BA" />
              <stop offset="50%" stopColor="#B38728" />
              <stop offset="75%" stopColor="#FBF5B7" />
              <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>
          </defs>
        </svg>

        <canvas 
          ref={canvasRef} 
          style={{ 
            display: "block", 
            width: "100%", 
            height: "100%", 
            transform: "translateZ(0)", 
            willChange: "transform"
          }} 
        />

        {/* Dynamic radial blur mask overlay to keep central logo sharp while blurring surrounds */}
        <div ref={mobileBlurOverlayRef} className="mobile-blur-overlay" />



        {/* Transition Image Fade In */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            opacity: showTransitionImg ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            pointerEvents: "none",
          }}
        >
          <img
            src="/imgs/hero%20section%20frames/ezgif-frame-230.jpg"
            alt="Final Frame"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Luxury Architectural Wall Surface System (hero4.md) */}
        <div 
          ref={backdropRef}
          className="absolute inset-0 pointer-events-none z-5 hero-backdrop"
          style={{
            opacity: 1,
            visibility: "visible",
            willChange: "opacity",
            transition: "opacity 0.05s ease-out",
            mixBlendMode: "multiply",
          }}
        >
          <svg
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <defs>
              {/* Fine organic paper fiber texture */}
              <filter id="paperTexture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.025 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>

              {/* Microscopic wall grain */}
              <filter id="wallGrain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.035 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>

              {/* Base Warm Ivory-Beige Gradient */}
              <linearGradient id="wallBaseGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F7F3EC" />
                <stop offset="35%" stopColor="#F5F0E7" />
                <stop offset="70%" stopColor="#F2ECE2" />
                <stop offset="100%" stopColor="#EEE7DC" />
              </linearGradient>

              {/* Ambient illumination from top-left */}
              <radialGradient id="wallLight" cx="20%" cy="20%" r="90%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
              </radialGradient>
            </defs>

            {/* Subtle light wash overlay */}
            <rect width="100%" height="100%" fill="url(#wallLight)" />

            {/* Microscopic fiber texture */}
            <rect width="100%" height="100%" fill="url(#wallBaseGrad)" filter="url(#paperTexture)" style={{ mixBlendMode: 'multiply' }} opacity="0.4" />

            {/* Microscopic grain overlay */}
            <rect width="100%" height="100%" fill="url(#wallBaseGrad)" filter="url(#wallGrain)" style={{ mixBlendMode: 'overlay' }} opacity="0.4" />
          </svg>
        </div>

        {/* Golden Lighting & Material Physics System (hero3.md) */}
        <div 
          ref={lightingRef}
          className="absolute inset-0 pointer-events-none z-10 hero-lighting"
          style={{
            opacity: 1,
            visibility: "visible",
            willChange: "opacity",
            transition: "opacity 0.05s ease-out",
          }}
        >
          {/* Primary Warm Champagne Light Wash from Top-Left (3000K-3500K) */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 15% 15%, rgba(234, 220, 185, 0.16) 0%, rgba(214, 190, 146, 0.04) 50%, transparent 80%)",
            }}
          />

          {/* Top-Left Corner Bounce Glow: Warm gold reflections from the corner ribbon onto the background */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 8% 8%, rgba(201, 168, 76, 0.12) 0%, transparent 40%)",
            }}
          />

          {/* Bottom-Right Corner Bounce Glow: Warm gold reflections from the sweep onto the background */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 92% 92%, rgba(201, 168, 76, 0.1) 0%, transparent 35%)",
            }}
          />

          {/* Center Logo Ambient Aura: Soft champagne ambient glow behind the central logo area */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(234, 220, 185, 0.06) 0%, transparent 45%)",
            }}
          />
        </div>

        {/* Mobile hero overlay styles */}
        <style>{`
          .mobile-blur-overlay {
            display: none;
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 2;
            backdrop-filter: blur(8px) contrast(1.05) brightness(1.02);
            -webkit-backdrop-filter: blur(8px) contrast(1.05) brightness(1.02);
            mask-image: radial-gradient(circle at center, transparent 22%, black 58%);
            -webkit-mask-image: radial-gradient(circle at center, transparent 22%, black 58%);
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s;
          }
          .mobile-corner-vignette {
            display: none;
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: -1;
          }
          @media (max-width: 640px) {
            .mobile-blur-overlay {
              display: block;
            }
            .mobile-corner-vignette {
              display: none !important;
            }
            /* On mobile, corner/overlay elements are shown at the start (frame 15) and fade out from there. */
            .hero-topright-block {
              right: 4vw !important;
              top: 8vh !important;
              gap: 8px !important;
            }
            .hero-topright-block span {
              font-size: 8px !important;
              letter-spacing: 0.15em !important;
            }
            .hero-topright-block div {
              gap: 8px !important;
            }
            .hero-topright-block a {
              width: 28px !important;
              height: 28px !important;
            }
            .hero-topright-block svg {
              width: 12px !important;
              height: 12px !important;
            }
            .hero-bottomright-text {
              right: 3vw !important;
              bottom: 9vh !important;
            }
            .hero-bottomright-text span {
              font-size: 10px !important;
              letter-spacing: 0.12em !important;
            }
            .hero-bottomright-text span:first-child {
              font-size: 12px !important;
            }
            .hero-headline-h1 {
              font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
              line-height: 1.12 !important;
            }
            .hero-left-desc {
              font-size: 13px !important;
              max-width: 240px !important;
              line-height: 1.55 !important;
            }
            .hero-left-block {
              top: 14vh !important;
              left: 4vw !important;
            }
            .hero-scroll-indicator {
              display: none !important;
            }
          }
          @media (max-width: 1024px) and (min-width: 641px) {
            .hero-left-desc {
              font-size: 16px !important;
              max-width: 320px !important;
              line-height: 1.6 !important;
            }
            .hero-bottomright-text span {
              font-size: 13px !important;
              letter-spacing: 0.15em !important;
            }
            .hero-bottomright-text span:first-child {
              font-size: 16px !important;
            }
            .hero-scroll-indicator span {
              font-size: 13px !important;
            }
            .hero-topright-block span {
              font-size: 12px !important;
            }
          }
        `}</style>

        {/* The top-left ribbon and bottom-right sweep used to render here from Cloudinary
            (idc_lc / idc_rc). Those assets were deleted upstream and rendered as broken
            images, so the markup is removed. cornerLeftRef/cornerRightRef and their
            opacity driving in the scroll handler are left in place and null-guarded —
            re-adding the two <div> wrappers with local art restores the effect as-is. */}

        {/* Initial Screen Text & Social Overlays (fades out in frames 0-12) */}
        <div 
          ref={initialOverlaysRef}
          className="absolute inset-0 pointer-events-none z-30 hero-initial-overlays"
          style={{
            opacity: 1,
            visibility: "visible",
            willChange: "opacity",
            transition: "opacity 0.05s ease-out",
          }}
        >
          {/* Mobile Corner Vignette Overlay */}
          <div className="mobile-corner-vignette" />
          {/* Top-Left Stacked Texts: DESIGN IT. BUILD IT. LIVING IT. */}
          <div className="absolute left-[5vw] top-[26vh] flex flex-col items-start select-none hero-left-block">
            <h1 
              className="hero-headline-h1"
              style={{ 
                fontFamily: "var(--font-cormorant), 'Playfair Display', serif", 
                fontSize: "clamp(2rem, 3.6vw, 3.8rem)", 
                fontWeight: 600, 
                lineHeight: 1.05, 
                letterSpacing: "0.02em", 
                color: "#2C2621",
                margin: 0,
                filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.85)) drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))"
              }}
            >
              DESIGN IT.<br />
              BUILD IT.<br />
              <span style={{ color: "#781B1B" }}>LIVING IT.</span>
            </h1>
            
            <div className="hero-left-desc-wrap" style={{ display: "flex", alignItems: "flex-start", marginTop: "clamp(10px, 2vw, 28px)", maxWidth: "320px" }}>
              <span style={{ 
                display: "inline-block", 
                width: "6px", 
                height: "6px", 
                background: "linear-gradient(135deg, #CFAC62 0%, #EDD397 50%, #A37C3F 100%)", 
                transform: "rotate(45deg)", 
                flexShrink: 0, 
                marginTop: "7px", 
                marginRight: "10px",
                boxShadow: "0 0 4px rgba(218, 178, 106, 0.6), 0px 1.5px 2px rgba(0, 0, 0, 0.55)"
              }} />
              <p 
                className="hero-left-desc"
                style={{ 
                  fontFamily: "var(--font-dm-sans), sans-serif", 
                  fontSize: "15px", 
                  fontWeight: 450, 
                  lineHeight: 1.55, 
                  color: "#3C3530", 
                  margin: 0,
                  filter: "drop-shadow(0px 1.5px 2px rgba(0, 0, 0, 0.45))"
                }}
              >
                We design and build future-ready spaces with precision, performance and purpose.
              </p>
            </div>
            
            <div style={{ 
              width: "140px", 
              height: "1.5px", 
              background: "linear-gradient(to right, #CFAC62 0%, #EDD397 30%, #A37C3F 70%, rgba(163, 124, 63, 0) 100%)", 
              marginTop: "12px",
              filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.45))"
            }} />
          </div>

          {/* Top-Right Vertical Text & Social Icons — hidden on mobile */}
          <div 
            className="absolute right-[8vw] top-[14vh] flex flex-col items-end gap-6 select-none hero-topright-block"
            style={{ pointerEvents: "auto" }}
          >
            {/* Innovate, Integrate, Inspire + vertical line */}
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" }}>
                <span style={{ 
                  fontFamily: "var(--font-inter), sans-serif", 
                  fontSize: "12px", 
                  letterSpacing: "0.25em", 
                  fontWeight: 700, 
                  backgroundImage: "linear-gradient(135deg, #CFAC62 0%, #EDD397 30%, #C89F4F 60%, #F5E5C9 85%, #A37C3F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.85)) drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))"
                }}>INNOVATE</span>
                <span style={{ 
                  fontFamily: "var(--font-inter), sans-serif", 
                  fontSize: "12px", 
                  letterSpacing: "0.25em", 
                  fontWeight: 700, 
                  backgroundImage: "linear-gradient(135deg, #CFAC62 0%, #EDD397 30%, #C89F4F 60%, #F5E5C9 85%, #A37C3F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.85)) drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))"
                }}>INTEGRATE</span>
                <span style={{ 
                  fontFamily: "var(--font-inter), sans-serif", 
                  fontSize: "12px", 
                  letterSpacing: "0.25em", 
                  fontWeight: 700, 
                  backgroundImage: "linear-gradient(135deg, #CFAC62 0%, #EDD397 30%, #C89F4F 60%, #F5E5C9 85%, #A37C3F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.85)) drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))"
                }}>INSPIRE</span>
              </div>
              <div style={{ 
                width: "2px", 
                height: "50px", 
                background: "linear-gradient(to bottom, #A37C3F, #EDD397, #CFAC62, #A37C3F)",
                filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.85))"
              }} />
            </div>
            
            {/* Social Icons Row aligned under the text */}
            <div style={{ display: "flex", gap: "14px", marginRight: "17px" }}>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)",
                  padding: "1.5px",
                  display: "block",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))"
                }}
                onMouseEnter={(e) => {
                  const inner = e.currentTarget.firstElementChild as HTMLElement;
                  if (inner) inner.style.backgroundColor = "rgba(20, 18, 16, 0.65)";
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.08)";
                  e.currentTarget.style.filter = "drop-shadow(0px 0px 12px rgba(251, 245, 183, 0.8)) drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.6))";
                }}
                onMouseLeave={(e) => {
                  const inner = e.currentTarget.firstElementChild as HTMLElement;
                  if (inner) inner.style.backgroundColor = "rgba(20, 18, 16, 0.85)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.filter = "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))";
                }}
                aria-label="Instagram"
              >
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "rgba(20, 18, 16, 0.85)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s ease"
                }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="url(#gold-icon-grad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)",
                  padding: "1.5px",
                  display: "block",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))"
                }}
                onMouseEnter={(e) => {
                  const inner = e.currentTarget.firstElementChild as HTMLElement;
                  if (inner) inner.style.backgroundColor = "rgba(20, 18, 16, 0.65)";
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.08)";
                  e.currentTarget.style.filter = "drop-shadow(0px 0px 12px rgba(251, 245, 183, 0.8)) drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.6))";
                }}
                onMouseLeave={(e) => {
                  const inner = e.currentTarget.firstElementChild as HTMLElement;
                  if (inner) inner.style.backgroundColor = "rgba(20, 18, 16, 0.85)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.filter = "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))";
                }}
                aria-label="LinkedIn"
              >
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "rgba(20, 18, 16, 0.85)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s ease"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="url(#gold-icon-grad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:info@idecorwala.com" 
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)",
                  padding: "1.5px",
                  display: "block",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))"
                }}
                onMouseEnter={(e) => {
                  const inner = e.currentTarget.firstElementChild as HTMLElement;
                  if (inner) inner.style.backgroundColor = "rgba(20, 18, 16, 0.65)";
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.08)";
                  e.currentTarget.style.filter = "drop-shadow(0px 0px 12px rgba(251, 245, 183, 0.8)) drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.6))";
                }}
                onMouseLeave={(e) => {
                  const inner = e.currentTarget.firstElementChild as HTMLElement;
                  if (inner) inner.style.backgroundColor = "rgba(20, 18, 16, 0.85)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.filter = "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))";
                }}
                aria-label="Email"
              >
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "rgba(20, 18, 16, 0.85)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s ease"
                }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="url(#gold-icon-grad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom-Right Corner Text (SPACES THAT PERFORM, etc.) - Positioned over burgundy sweep */}
          <div className="absolute right-[4.5vw] bottom-[12vh] flex flex-col items-end select-none hero-bottomright-text">
            <span style={{ 
              fontFamily: "var(--font-inter), sans-serif", 
              fontSize: "15px", 
              letterSpacing: "0.18em", 
              fontWeight: 600, 
              backgroundImage: "linear-gradient(135deg, #CFAC62 0%, #EDD397 30%, #C89F4F 60%, #F5E5C9 85%, #A37C3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.5)"
            }}>
              SPACES THAT PERFORM.
            </span>
            
            <div style={{ display: "flex", alignItems: "center", width: "160px", gap: "8px", margin: "6px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(163, 124, 63, 0) 0%, rgba(237, 211, 151, 0.5) 30%, rgba(237, 211, 151, 0.5) 70%, rgba(163, 124, 63, 0) 100%)" }} />
              <div style={{ 
                width: "4px", 
                height: "4px", 
                background: "linear-gradient(135deg, #CFAC62 0%, #EDD397 50%, #A37C3F 100%)", 
                transform: "rotate(45deg)",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.6)"
              }} />
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(163, 124, 63, 0) 0%, rgba(237, 211, 151, 0.5) 30%, rgba(237, 211, 151, 0.5) 70%, rgba(163, 124, 63, 0) 100%)" }} />
            </div>

            <span style={{ 
              fontFamily: "var(--font-inter), sans-serif", 
              fontSize: "13px", 
              letterSpacing: "0.15em", 
              fontWeight: 400, 
              color: "#F4EFE6",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.85), 0px 4px 10px rgba(0, 0, 0, 0.5)"
            }}>
              BUILT ON CERTAINTY.
            </span>
            <span style={{ 
              fontFamily: "var(--font-inter), sans-serif", 
              fontSize: "13px", 
              letterSpacing: "0.15em", 
              fontWeight: 400, 
              color: "#F4EFE6",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.85), 0px 4px 10px rgba(0, 0, 0, 0.5)"
            }}>
              DELIVERED WITH IMPACT.
            </span>
          </div>

          {/* Bottom Center Scroll to Explore Indicator */}
          <div 
            className="absolute bottom-[3vh] left-[50%] -translate-x-[50%] flex flex-col items-center gap-2 select-none hero-scroll-indicator"
          >
            {/* Custom Micro-Bounce Style for Golden Arrow */}
            <style>{`
              @keyframes goldChevronBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(4px); }
              }
              .gold-chevron-bounce {
                animation: goldChevronBounce 1.6s ease-in-out infinite;
              }
            `}</style>

            <span style={{ 
              fontFamily: "var(--font-inter), sans-serif", 
              fontSize: "12px", 
              letterSpacing: "0.25em", 
              fontWeight: 600, 
              backgroundImage: "linear-gradient(135deg, #CFAC62 0%, #EDD397 30%, #C89F4F 60%, #F5E5C9 85%, #A37C3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              filter: "drop-shadow(0px 1.5px 2px rgba(0, 0, 0, 0.75))"
            }}>
              SCROLL TO EXPLORE
            </span>

            {/* Glowing Golden Bounce Arrow */}
            <svg 
              className="gold-chevron-bounce" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="url(#gold-icon-grad)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ 
                display: "block",
                filter: "drop-shadow(0px 1.5px 2px rgba(0, 0, 0, 0.85)) drop-shadow(0px 0px 4px rgba(251, 245, 183, 0.4))"
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>

            {/* Divider line with glowing center diamond */}
            <div style={{ display: "flex", alignItems: "center", width: "240px", position: "relative", marginTop: "2px" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(163, 124, 63, 0), rgba(237, 211, 151, 0.6))" }} />
              <div style={{ 
                width: "6px", 
                height: "6px", 
                backgroundColor: "#FFDF9E", 
                transform: "rotate(45deg)", 
                margin: "0 10px", 
                boxShadow: "0 0 8px #FFD580, 0 0 16px #FFB300, 0 0 24px rgba(255, 179, 0, 0.6)" 
              }} />
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, rgba(163, 124, 63, 0), rgba(237, 211, 151, 0.6))" }} />
            </div>
          </div>
        </div>
        
        {/* Phase Texts */}
        {/* Slider 1 Overlay */}
        <div 
          ref={text1Ref}
          className="absolute bottom-[16vh] left-[6vw] max-w-[550px] flex flex-col items-start pointer-events-none opacity-0 z-40"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Backdrop Radial Glow Plate */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55)_0%,_rgba(0,0,0,0.25)_40%,_rgba(0,0,0,0)_70%)] blur-xl -z-10 pointer-events-none"></div>

          <h2 style={{ 
            fontFamily: "var(--font-cormorant), 'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 2.5vw, 2.8rem)", 
            fontWeight: 700, 
            lineHeight: 1.15,
            letterSpacing: "0.02em",
            margin: 0,
            filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))"
          }}>
            <span style={{
              backgroundImage: "linear-gradient(135deg, #CFAC62 0%, #EDD397 30%, #C89F4F 60%, #F5E5C9 85%, #A37C3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block"
            }}>VAST IN SCALE.</span><br />
            <span style={{ color: "#EBE4D8" }}>DEEP IN </span>
            <span style={{ color: "#D32F2F" }}>DIMENSION.</span>
          </h2>
          
          <div style={{ display: "flex", gap: "14px", alignItems: "stretch", marginTop: "12px" }}>
            <div style={{ 
              width: "2.5px", 
              background: "linear-gradient(to bottom, #CFAC62, #A37C3F)",
              filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.6))",
              flexShrink: 0
            }} />
            <p style={{ 
              fontFamily: "var(--font-dm-sans), sans-serif", 
              fontSize: "clamp(0.8rem, 0.95vw, 1.05rem)", 
              fontWeight: 400, 
              lineHeight: 1.6, 
              color: "#EBE4D8",
              margin: 0,
              textShadow: "0px 1.5px 3px rgba(0, 0, 0, 0.9)"
            }}>
              From expansive infrastructure and civil engineering to precision product development, we command the horizontal span of scale and the vertical depth of innovation—across every dimension of space.
            </p>
          </div>
        </div>

        {/* Slider 2 Overlay */}
        <div 
          ref={text2Ref}
          className="absolute top-[18vh] right-[6vw] max-w-[550px] flex flex-col items-end pointer-events-none opacity-0 z-40"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Backdrop Radial Glow Plate */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55)_0%,_rgba(0,0,0,0.25)_40%,_rgba(0,0,0,0)_70%)] blur-xl -z-10 pointer-events-none"></div>

          <h2 style={{ 
            fontFamily: "var(--font-cormorant), 'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 2.5vw, 2.8rem)", 
            fontWeight: 700, 
            lineHeight: 1.15,
            letterSpacing: "0.02em",
            textAlign: "right",
            margin: 0,
            filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))"
          }}>
            <span style={{
              backgroundImage: "linear-gradient(135deg, #CFAC62 0%, #EDD397 30%, #C89F4F 60%, #F5E5C9 85%, #A37C3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block"
            }}>DISRUPTING TRADITIONAL TRADE.</span><br />
            <span style={{ color: "#EBE4D8" }}>RE-ORGANIZING THE </span>
            <span style={{ color: "#D32F2F" }}>MARKET.</span>
          </h2>
          
          <div style={{ display: "flex", gap: "14px", alignItems: "stretch", marginTop: "12px" }}>
            <p style={{ 
              fontFamily: "var(--font-dm-sans), sans-serif", 
              fontSize: "clamp(0.8rem, 0.95vw, 1.05rem)", 
              fontWeight: 400, 
              lineHeight: 1.6, 
              color: "#EBE4D8",
              margin: 0,
              textAlign: "right",
              textShadow: "0px 1.5px 3px rgba(0, 0, 0, 0.9)"
            }}>
              Built on a legacy of precision product development, we are rewriting the rules of channel trade—replacing fragmented, traditional supply chains with engineered innovation and an organized, tech-driven market infrastructure.
            </p>
            <div style={{ 
              width: "2.5px", 
              background: "linear-gradient(to bottom, #CFAC62, #A37C3F)",
              filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.6))",
              flexShrink: 0
            }} />
          </div>
        </div>

        {/* Slider 3 Overlay */}
        <div 
          ref={text3Ref}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 z-40"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Backdrop Radial Glow Plate */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.65)_0%,_rgba(0,0,0,0.3)_40%,_rgba(0,0,0,0)_70%)] blur-2xl -z-10 pointer-events-none"></div>

          <div className="max-w-[720px] flex flex-col items-center text-center px-6">
            <h2 style={{ 
              fontFamily: "var(--font-cormorant), 'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 2.8vw, 3.2rem)", 
              fontWeight: 700, 
              lineHeight: 1.15,
              letterSpacing: "0.02em",
              margin: 0,
              filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))"
            }}>
              <span style={{
                backgroundImage: "linear-gradient(135deg, #CFAC62 0%, #EDD397 30%, #C89F4F 60%, #F5E5C9 85%, #A37C3F 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block"
              }}>IMAGINE IN MINUTES.</span><br />
              <span style={{ color: "#EBE4D8" }}>ENGINEER IN </span>
              <span style={{ color: "#D32F2F" }}>MOMENTS.</span>
            </h2>
            
            <p style={{ 
              fontFamily: "var(--font-dm-sans), sans-serif", 
              fontSize: "clamp(0.8rem, 0.95vw, 1.05rem)", 
              fontWeight: 400, 
              lineHeight: 1.6, 
              color: "#EBE4D8",
              marginTop: "14px",
              marginInline: "auto",
              textShadow: "0px 1.5px 3px rgba(0, 0, 0, 0.9)"
            }}>
              Step into Spacefold—iDecorwala’s futuristic metaverse platform that transforms spaces instantly. Generate AI-based, immersive walkthroughs in minutes, and seamlessly output production-ready BOM, BOQ, and CAM drawings for flawless production and last-mile delivery.
            </p>
          </div>
        </div>

        {/* Slider 4 Overlay */}
        <div 
          ref={text4Ref}
          className="absolute top-[18vh] right-[6vw] max-w-[550px] flex flex-col items-end pointer-events-none opacity-0 z-40"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Backdrop Radial Glow Plate */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55)_0%,_rgba(0,0,0,0.25)_40%,_rgba(0,0,0,0)_70%)] blur-xl -z-10 pointer-events-none"></div>

          <h2 style={{ 
            fontFamily: "var(--font-cormorant), 'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 2.5vw, 2.8rem)", 
            fontWeight: 700, 
            lineHeight: 1.15,
            letterSpacing: "0.02em",
            textAlign: "right",
            margin: 0,
            filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))"
          }}>
            <span style={{
              backgroundImage: "linear-gradient(135deg, #CFAC62 0%, #EDD397 30%, #C89F4F 60%, #F5E5C9 85%, #A37C3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block"
            }}>ENGINEERING SPACES.</span><br />
            <span style={{ color: "#EBE4D8" }}>TRANSCENDING </span>
            <span style={{ color: "#D32F2F" }}>DIMENSIONS.</span>
          </h2>
          
          <div style={{ display: "flex", gap: "14px", alignItems: "stretch", marginTop: "12px" }}>
            <p style={{ 
              fontFamily: "var(--font-dm-sans), sans-serif", 
              fontSize: "clamp(0.8rem, 0.95vw, 1.05rem)", 
              fontWeight: 400, 
              lineHeight: 1.6, 
              color: "#EBE4D8",
              margin: 0,
              textAlign: "right",
              textShadow: "0px 1.5px 3px rgba(0, 0, 0, 0.9)"
            }}>
              From civil foundations to the Spacefold Metaverse—we engineer excellence across all 6 dimensions of space.
            </p>
            <div style={{ 
              width: "2.5px", 
              background: "linear-gradient(to bottom, #CFAC62, #A37C3F)",
              filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.6))",
              flexShrink: 0
            }} />
          </div>
        </div>

        <div style={{ 
          position: "absolute", 
          top: 0, left: 0, width: "100%", height: "100%", 
          opacity: showHeadline ? 1 : 0,
          pointerEvents: showHeadline ? "auto" : "none",
          transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 50
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
