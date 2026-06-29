"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Layers, Activity } from "lucide-react";
import { PROJECTS, PROJECT_DETAILS, type ProjectData } from "@/data/projectsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectShowcaseSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const gridShellRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const placeholderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Split projects into 3 columns for interlocking masonry layout
  const col1 = PROJECTS.filter((_, i) => i % 3 === 0);
  const col2 = PROJECTS.filter((_, i) => i % 3 === 1);
  const col3 = PROJECTS.filter((_, i) => i % 3 === 2);

  const handleProjectClick = (project: ProjectData) => {
    router.push(`/projects/${project.slug}`);
  };

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current || !triggerRef.current || !gridShellRef.current) return;

      let tl: gsap.core.Timeline | null = null;
      let lastWidth = 0;
      let lastHeight = 0;
      let isRecreating = false;

      const runMorphAnimation = () => {
        if (isRecreating) return;
        isRecreating = true;

        // 1. Revert existing timeline to reset card styles
        if (tl) {
          tl.revert();
          tl.kill();
          tl = null;
        }

        // 2. Revert ScrollTriggers associated with this section to clear pinning / pin-spacers
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === sectionRef.current) {
            t.kill(true);
          }
        });

        // 3. Clear all inline styles on the cards to get clean measurements
        PROJECTS.forEach((_, index) => {
          const card = cardRefs.current[index];
          if (card) {
            gsap.set(card, { clearProps: "all" });
          }
        });

        // Force document reflow for layout consistency
        document.body.offsetHeight;

        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;

        const isMobile = viewportW < 768;
        const carouselCardW = isMobile ? 260 : 440;
        const carouselCardH = isMobile ? 360 : 600;
        const gap = isMobile ? 12 : 24;

        const totalCards = PROJECTS.length;
        const trackWidth = totalCards * carouselCardW + (totalCards - 1) * gap;
        const trackStart = viewportW / 2 - trackWidth / 2;
        const trackY = viewportH / 2 - carouselCardH / 2;

        // 4. Measure clean unpinned heights
        const gridShellHeight = gridShellRef.current!.offsetHeight;
        const gridShellTop = gridShellRef.current!.offsetTop;
        const bottomPadding = isMobile ? 60 : 100;
        const totalContentHeight = gridShellTop + gridShellHeight + bottomPadding;

        // Set stable minHeight on the outer section container
        const pinScrollLength = viewportH * 1.0;
        sectionRef.current!.style.minHeight = `${totalContentHeight + pinScrollLength}px`;

        // Measure placeholder and container rects under clean relative conditions
        const placeholderRects = PROJECTS.map((_, index) => {
          const placeholder = placeholderRefs.current[index];
          return placeholder ? placeholder.getBoundingClientRect() : null;
        });
        const containerRect = containerRef.current!.getBoundingClientRect();

        // 5. Create the new ScrollTrigger and timeline
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${pinScrollLength}`,
            scrub: 1,
            pin: triggerRef.current, // Pin only the inner content wrapper
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
              if (triggerRef.current) triggerRef.current.style.height = "100vh";
            },
            onLeave: () => {
              if (triggerRef.current) {
                triggerRef.current.style.height = "auto";
                ScrollTrigger.refresh();
              }
            },
            onEnterBack: () => {
              if (triggerRef.current) triggerRef.current.style.height = "100vh";
            },
            onLeaveBack: () => {
              if (triggerRef.current) {
                triggerRef.current.style.height = "auto";
                ScrollTrigger.refresh();
              }
            },
          },
        });

        // Fade out intro text
        tl.fromTo(
          ".project-intro-text",
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: -50, scale: 0.95, duration: 0.2 },
          0
        );

        // Animate from carousel layout to grid layout
        PROJECTS.forEach((project, index) => {
          const placeholderRect = placeholderRects[index];
          const card = cardRefs.current[index];
          if (!placeholderRect || !card) return;

          const gridX = placeholderRect.left - containerRect.left;
          const gridY = placeholderRect.top - containerRect.top;

          const carouselX = trackStart + index * (carouselCardW + gap);
          const carouselY = trackY;

          const startX = carouselX - gridX;
          const startY = carouselY - gridY;

          gsap.set(card, {
            position: "absolute",
            left: 0,
            top: 0,
            width: carouselCardW,
            height: carouselCardH,
            x: startX,
            y: startY,
            zIndex: 20,
            borderRadius: "12px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
          });

          tl!.to(
            card,
            {
              x: 0,
              y: 0,
              width: "100%",
              height: "100%",
              borderRadius: "4px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              ease: "power2.inOut",
              duration: 1.0,
            },
            0.05
          );
        });

        isRecreating = false;
      };

      // Use ResizeObserver on the grid shell to detect layout shifts (images loading, resizing)
      const resizeObserver = new ResizeObserver((entries) => {
        if (isRecreating) return;
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          // Apply a small tolerance (2px) to prevent loop triggers on fractional/scrollbar changes
          if (Math.abs(width - lastWidth) > 2 || Math.abs(height - lastHeight) > 2) {
            lastWidth = width;
            lastHeight = height;
            
            // Disconnect observer to avoid triggers while reconstructing
            resizeObserver.disconnect();
            runMorphAnimation();
            ScrollTrigger.refresh();
            
            // Re-observe in the next frame so layout shifts from pinning settle
            requestAnimationFrame(() => {
              if (gridShellRef.current) {
                resizeObserver.observe(gridShellRef.current);
              }
            });
          }
        }
      });

      if (gridShellRef.current) {
        // Initial dimensions
        lastWidth = gridShellRef.current.offsetWidth;
        lastHeight = gridShellRef.current.offsetHeight;
        resizeObserver.observe(gridShellRef.current);
      }

      // Run initial layout
      runMorphAnimation();

      // Also listen to window load to catch cached image heights or final font rendering
      const handleLoad = () => {
        runMorphAnimation();
        ScrollTrigger.refresh();
      };
      window.addEventListener("load", handleLoad);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("load", handleLoad);

        if (tl) {
          tl.revert();
          tl.kill();
        }
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === sectionRef.current) {
            t.kill(true);
          }
        });
      };
    },
    { dependencies: [], scope: containerRef, revertOnUpdate: true }
  );

  const renderProjectCard = (project: ProjectData, index: number) => {
    return (
      <div
        key={project.id}
        ref={(el) => {
          placeholderRefs.current[index] = el;
        }}
        className={`relative w-full ${project.aspect} bg-transparent rounded-lg pointer-events-none`}
      >
        <div
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="group absolute inset-0 w-full h-full overflow-hidden pointer-events-auto cursor-pointer"
          style={{
            transformOrigin: "center center",
          }}
          onClick={() => handleProjectClick(project)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-85 pointer-events-none" />

          {/* Lower-third hover banner */}
          <div
            className="absolute bottom-0 left-0 w-full h-[30%] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between px-6 py-4 pointer-events-none overflow-hidden"
            style={{
              backgroundColor: project.color,
            }}
          >
            <div className="flex flex-col justify-between h-full z-10 text-white select-none">
              <div>
                <h4 className="text-md md:text-lg font-light tracking-wide leading-tight text-white/95" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  {project.title}
                </h4>
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/70" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  {project.category}
                </p>
              </div>
            </div>

            {/* Logo Text background stamp */}
            <div
              className="absolute right-[-10px] bottom-[-15px] text-[48px] md:text-[68px] text-white/5 select-none pointer-events-none leading-none tracking-widest font-extrabold uppercase"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                textShadow: "1px 1px 1px rgba(255, 255, 255, 0.08), -1px -1px 2px rgba(0, 0, 0, 0.45)",
                mixBlendMode: "overlay",
              }}
            >
              {project.logoText}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#0A0A0A",
        backgroundImage: `
          radial-gradient(ellipse at 10% 0%, rgba(201, 168, 76, 0.15) 0%, transparent 40%),
          radial-gradient(ellipse at 90% 0%, rgba(201, 168, 76, 0.1) 0%, transparent 35%),
          radial-gradient(ellipse at 0% 100%, rgba(201, 168, 76, 0.1) 0%, transparent 40%),
          radial-gradient(ellipse at 100% 100%, rgba(201, 168, 76, 0.15) 0%, transparent 45%),
          url("https://www.transparenttextures.com/patterns/stardust.png")
        `,
      }}
    >
      {/* Cinematic ambient lighting top and bottom overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, rgba(201, 168, 76, 0.5), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to top, rgba(201, 168, 76, 0.5), transparent)",
          }}
        />
      </div>

      <div
        ref={triggerRef}
        className="w-full relative overflow-x-clip overflow-y-visible"
        style={{ height: "100vh" }} // Initial height starts as 100vh
      >
        <div ref={containerRef} className="relative w-full h-full min-h-screen pt-24 pb-20 px-6 md:px-16 z-20 overflow-x-clip flex flex-col items-center">
          {/* Intro text visible during the horizontal state */}
          <div className="project-intro-text absolute top-[10%] left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none flex flex-col items-center justify-center w-[90%] md:w-auto">
            <div className="relative inline-flex flex-col items-center justify-center w-full min-w-0 sm:min-w-[500px] md:min-w-[660px] max-w-[720px] px-6 sm:px-12 md:px-16 py-14 md:py-20 overflow-hidden rounded-2xl">
              {/* Elegant glassmorphism backdrop with grainy meshy black theme, gold edge tint, and deep recessed grooved frame */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  border: "1px solid rgba(201, 164, 93, 0.45)",
                  outline: "1.5px solid rgba(0, 0, 0, 0.85)",
                  outlineOffset: "-3px",
                  boxShadow: `
                    inset 0 6px 16px rgba(0, 0, 0, 0.95),
                    inset 0 -4px 10px rgba(201, 164, 93, 0.18),
                    inset 5px 0 10px rgba(0, 0, 0, 0.7),
                    inset -5px 0 10px rgba(0, 0, 0, 0.7),
                    0 25px 60px rgba(0,0,0,0.98),
                    0 0 35px rgba(201, 164, 93, 0.12)
                  `,
                  background: `
                    radial-gradient(circle at 0% 0%, rgba(201, 164, 93, 0.28) 0%, transparent 45%),
                    radial-gradient(circle at 100% 100%, rgba(201, 164, 93, 0.06) 0%, transparent 35%),
                    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 14px),
                    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 14px),
                    url("https://www.transparenttextures.com/patterns/black-paper.png"),
                    #000000
                  `,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              ></div>

              {/* Glow effect behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-[#C9A45D]/10 blur-[50px] rounded-full"></div>

              <div className="relative z-10 flex flex-col items-center">
                <h2
                  className="text-[#C9A45D] text-xs md:text-sm tracking-[0.5em] uppercase mb-3 font-bold select-none"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    textShadow: "0 0 12px rgba(201, 164, 93, 0.4), 1px 1px 0px rgba(0,0,0,0.9)",
                  }}
                >
                  Project Showcase
                </h2>
                <h3
                  className="text-[28px] sm:text-4xl md:text-6xl font-normal tracking-wide leading-tight uppercase text-center select-none"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    background: "linear-gradient(135deg, #FFF6E0 0%, #D4AF37 40%, #C9A45D 70%, #8F6A2F 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0px 2px 3px rgba(0,0,0,0.5), 0px 8px 16px rgba(0,0,0,0.7)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Elite Spaces Built
                </h3>

              </div>
            </div>

            {/* Premium scroll indicator outside the box */}
            <div className="flex items-center gap-4 mt-8 bg-black/95 border border-[#C9A45D]/30 px-6 py-3 rounded-full shadow-[0_12px_28px_rgba(0,0,0,0.95)] backdrop-blur-md">
              <div className="h-[1px] w-6 md:w-10 bg-gradient-to-r from-transparent to-[#C9A45D]/60"></div>
              <p
                className="text-white text-[10px] md:text-[12px] tracking-[0.3em] font-medium uppercase select-none"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                Scroll Down to Explore Grid
              </p>
              <div className="h-[1px] w-6 md:w-10 bg-gradient-to-l from-transparent to-[#C9A45D]/60"></div>
            </div>
          </div>

          {/* Masonry Grid Container */}
          <div ref={gridShellRef} className="w-full max-w-[1280px] mx-auto mt-24 z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
              {/* Column 1 */}
              <div className="flex flex-col gap-6 md:gap-8">
                {col1.map((project) => {
                  const originalIndex = PROJECTS.findIndex((p) => p.id === project.id);
                  return renderProjectCard(project, originalIndex);
                })}
              </div>
              {/* Column 2 */}
              <div className="flex flex-col gap-6 md:gap-8">
                {col2.map((project) => {
                  const originalIndex = PROJECTS.findIndex((p) => p.id === project.id);
                  return renderProjectCard(project, originalIndex);
                })}
              </div>
              {/* Column 3 */}
              <div className="flex flex-col gap-6 md:gap-8">
                {col3.map((project) => {
                  const originalIndex = PROJECTS.findIndex((p) => p.id === project.id);
                  return renderProjectCard(project, originalIndex);
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
