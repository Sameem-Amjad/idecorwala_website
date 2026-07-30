'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactCTAPanel() {
  return (
    <section className="w-full bg-[#F5EFE6] py-[clamp(48px,5vw,72px)] pb-24 z-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20">
        
        {/* Outer Split Panel Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="w-full rounded-[16px] bg-[#F0E8D8] overflow-hidden flex flex-col md:flex-row min-h-[360px] group cursor-default shadow-sm border border-[#E2D5C0]/50"
        >
          
          {/* Left Column (Image - 38%) */}
          <div className="w-full md:w-[38%] h-[280px] md:h-auto relative overflow-hidden flex-shrink-0">
            <Image
              src="/images/contact/cta_interior.png"
              alt="Premium luxury interior"
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Right Column (Text - 62%) */}
          <div className="w-full md:w-[62%] p-[clamp(32px,4vw,64px)] lg:px-[clamp(48px,5vw,72px)] flex flex-col justify-center relative overflow-hidden">
            
            {/* Background Decorative Arc */}
            <svg 
              className="absolute right-0 bottom-0 w-[200px] h-[200px] pointer-events-none opacity-[0.15] translate-x-1/4 translate-y-1/4"
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="80" stroke="#C9A050" strokeWidth="2" />
              <circle cx="100" cy="100" r="100" stroke="#C9A050" strokeWidth="1" />
            </svg>

            <div className="relative z-10">
              <h2 className="font-cormorant font-semibold text-[clamp(28px,3.5vw,44px)] leading-[1.1] mb-5">
                <span className="block text-[#1A1614]">READY TO BUILD</span>
                <span className="block text-[#B01219]">SPACES THAT PERFORM?</span>
              </h2>
              
              <div className="w-10 h-[2px] bg-[#C9A050] mb-5" />
              
              <p className="text-[14px] text-[#4A4540] leading-[1.65] font-inter max-w-md">
                Let's create experiences that inspire, perform and deliver measurable impact.
              </p>

              <div className="mt-7">
                <Link href="#rfp-form">
                  <button className="bg-[#B01219] text-white text-[13px] uppercase tracking-[0.1em] px-8 py-3.5 rounded font-satoshi font-bold hover:bg-[#8e0f14] hover:-translate-y-[1px] hover:shadow-md transition-all duration-300">
                    Let's Connect &rarr;
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
