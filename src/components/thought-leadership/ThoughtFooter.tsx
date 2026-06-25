"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import OutlinedCTA from "@/components/shared/OutlinedCTA";

export default function ThoughtFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#E8DCC8] py-16 overflow-hidden">
      {/* SVG Grain Noise Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="footer-grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.8  0 0 0 0 0.7  0 0 0 0 0.6  0 0 0 0.05 0" />
        </filter>
      </svg>

      {/* Global Section Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-60"
        style={{
          filter: "url(#footer-grain-noise)",
          mixBlendMode: "overlay",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12">
          
          {/* LEFT: 35% (4 cols out of 12) */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            {/* Skyline architectural illustration */}
            <div className="mb-6 text-[#C9A050] opacity-80">
              <svg viewBox="0 0 200 60" className="w-[180px] h-auto" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 60 V30 H30 V60 M30 60 V20 H50 V60 M50 60 V40 H70 V60 M70 60 V10 H90 V60 M90 60 V35 H110 V60 M110 60 V15 H130 V60 M130 60 V25 H150 V60 M150 60 V5 H170 V60 M170 60 V30 H190 V60" />
                <line x1="40" y1="20" x2="40" y2="60" strokeDasharray="2 2" />
                <line x1="80" y1="10" x2="80" y2="60" strokeDasharray="2 2" />
                <line x1="120" y1="15" x2="120" y2="60" strokeDasharray="2 2" />
                <line x1="160" y1="5" x2="160" y2="60" strokeDasharray="2 2" />
              </svg>
            </div>

            {/* Tagline */}
            <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#1B1714] leading-[1.3] mb-6 max-w-xs">
              Let&apos;s shape the future of built environments.
            </h4>

            {/* Outlined CTA */}
            <OutlinedCTA label="LET'S CONNECT" href="/contact" variant="charcoal" className="px-5 py-2.5 text-[11px]" />
          </div>

          {/* CENTER-RIGHT: 35% (4 cols out of 12) */}
          <div className="md:col-span-4 flex flex-col items-start justify-center text-left space-y-4 md:pl-6 border-t md:border-t-0 md:border-l border-[#C9C4B4]/40 pt-8 md:pt-0">
            {/* Phone */}
            <div className="flex items-center gap-3 group">
              <span className="text-[#C9A050] transition-transform duration-200 group-hover:scale-110">
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <a href="tel:+911244566000" className="font-sans text-sm text-[#1B1714] hover:text-[#C9A050] transition-colors">
                +91 124 456 6000
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 group">
              <span className="text-[#C9A050] transition-transform duration-200 group-hover:scale-110">
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <a href="mailto:connect@idecorwala.com" className="font-sans text-sm text-[#1B1714] hover:text-[#C9A050] transition-colors">
                connect@idecorwala.com
              </a>
            </div>

            {/* Website */}
            <div className="flex items-center gap-3 group">
              <span className="text-[#C9A050] transition-transform duration-200 group-hover:scale-110">
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <a href="https://www.idecorwala.com" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-[#1B1714] hover:text-[#C9A050] transition-colors">
                www.idecorwala.com
              </a>
            </div>
          </div>

          {/* FAR RIGHT: 30% (3 cols out of 12) */}
          <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-center md:justify-center gap-4 border-t md:border-t-0 border-[#C9C4B4]/40 pt-8 md:pt-0">
            <span className="hidden md:inline font-sans text-[10px] font-bold tracking-widest text-[#C9A050] uppercase mb-2">
              Follow Our Journey
            </span>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-[#C9A050]/60 flex items-center justify-center text-[#C9A050] hover:text-[#B8862E] hover:border-[#B8862E] hover:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all duration-300"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#C9A050]/60 flex items-center justify-center text-[#C9A050] hover:text-[#B8862E] hover:border-[#B8862E] hover:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all duration-300"
              >
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-[#C9A050]/60 flex items-center justify-center text-[#C9A050] hover:text-[#B8862E] hover:border-[#B8862E] hover:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all duration-300"
              >
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96C5.12 19.08 12 19.08 12 19.08s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z" />
                  <polygon points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-10 h-10 rounded-full border border-[#C9A050]/60 flex items-center justify-center text-[#C9A050] hover:text-[#B8862E] hover:border-[#B8862E] hover:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all duration-300"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0c-6.627 0-12 5.373-12 12 0 5.077 3.146 9.426 7.602 11.196-.104-.94-.199-2.378.041-3.402.217-.923 1.4-5.922 1.4-5.922s-.358-.715-.358-1.773c0-1.66 1.002-2.9 2.115-2.9.997 0 1.479.749 1.479 1.648 0 1.002-.639 2.502-.969 3.894-.275 1.163.585 2.11 1.733 2.11 2.08 0 3.678-2.198 3.678-5.371 0-2.808-2.018-4.774-4.904-4.774-3.34 0-5.3 2.505-5.3 5.093 0 1.009.388 2.091.874 2.682.096.117.11.219.082.331-.09.375-.293 1.198-.332 1.36-.052.212-.17.257-.393.154-1.468-.684-2.385-2.834-2.385-4.561 0-3.714 2.7-7.126 7.785-7.126 4.088 0 7.265 2.913 7.265 6.808 0 4.062-2.56 7.332-6.114 7.332-1.195 0-2.32-.62-2.704-1.355 0 0-.592 2.253-.736 2.806-.267 1.026-.989 2.312-1.472 3.093 1.124.347 2.317.535 3.555.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#C9C4B4]/40 pt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
          <p className="font-sans text-[11px] text-[#7A7670] tracking-wide">
            &copy; {currentYear} iDecorwala / Spacefold InteriorTech. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-sans text-[11px] text-[#7A7670] hover:text-[#C9A050] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-sans text-[11px] text-[#7A7670] hover:text-[#C9A050] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
