'use client';

import React from 'react';
import Link from 'next/link';
import { Grid, Briefcase, Box, Cpu, Handshake, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const quickLinks = [
  { id: 'solutions', icon: Grid, label: "Solutions", href: "/solutions" },
  { id: 'services', icon: Briefcase, label: "Services", href: "/services" },
  { id: 'products', icon: Box, label: "Products", href: "/products" },
  { id: 'technology', icon: Cpu, label: "Technology", href: "/technology" },
  { id: 'partner', icon: Handshake, label: "Partner Portal", href: "/partner-portal" },
  { id: 'thought', icon: BookOpen, label: "Thought Leadership", href: "/thought-leadership" },
];

export default function QuickNavStrip() {
  return (
    <section className="w-full bg-[#F5EFE6] py-[clamp(28px,3vw,40px)] z-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20">
        
        {/* Outer Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="w-full border border-[#E2D5C0] rounded-[12px] bg-[#FDFAF6] overflow-hidden"
        >
          {/* Grid Layout: 2 cols on mobile, 3 on tablet, 6 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-[#E2D5C0]">
            
            {/* For fixing the weird divide-y behaviour on multi-row grids, we can just use borders or a wrapper approach. 
                Using explicit border bottoms for rows if needed, but Tailwind's divide utilities handle simple grids ok if children count matches cols. 
                Since rows change based on breakpoint, we will rely on grid gap or border instead to be safe, 
                but let's use tailwind borders directly on children to ensure perfect 1px borders without doubling. */}
                
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link key={link.id} href={link.href} className="group block h-[110px]">
                  <div className="flex flex-col items-center justify-center h-full p-4 hover:bg-[#F5EFE6]/30 transition-colors duration-300 border-b lg:border-b-0 border-[#E2D5C0]">
                    <Icon className="w-9 h-9 text-[#C9A050] group-hover:text-[#B01219] transition-colors duration-300" strokeWidth={1.5} />
                    <span className="text-[12px] text-[#4A4540] tracking-[0.04em] text-center mt-2.5 font-inter">
                      {link.label}
                    </span>
                  </div>
                </Link>
              );
            })}

          </div>
        </motion.div>

      </div>
    </section>
  );
}
