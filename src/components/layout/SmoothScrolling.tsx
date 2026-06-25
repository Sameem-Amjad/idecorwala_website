'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized premium physics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut easing for organic decelerations
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // natural scroll multiplier
      touchMultiplier: 1.5, // comfortable touch response
      syncTouch: false, // Use native GPU-accelerated touch scrolling on mobile to eliminate lag
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync with GSAP ticker for frame-rate independent physics
    const updateTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTick);

    // Disable GSAP lag smoothing to keep scrolling perfectly synced
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).lenis;
      }
      lenis.destroy();
      gsap.ticker.remove(updateTick);
    };
  }, []);

  return <>{children}</>;
}
