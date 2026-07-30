'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface IconGridItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface IconGridSectionProps {
  eyebrow: string;
  title: React.ReactNode;
  items: IconGridItem[];
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const IconGridSection: React.FC<IconGridSectionProps> = ({ 
  eyebrow, 
  title, 
  items, 
  columns = 3,
  backgroundColor = "transparent"
}) => {

  const getGridColsClass = () => {
    switch(columns) {
      case 2: return "lg:grid-cols-2";
      case 4: return "lg:grid-cols-4";
      case 3:
      default: return "lg:grid-cols-3";
    }
  };

  return (
    <section className={`py-20 lg:py-28 w-full`} style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#8C1515] font-inter uppercase tracking-widest text-sm font-semibold block mb-4">
              {eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-semibold text-[#1A1A1A] leading-tight max-w-3xl">
              {title}
            </h2>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div 
          className={`grid grid-cols-1 md:grid-cols-2 ${getGridColsClass()} gap-10 md:gap-x-12 md:gap-y-16`}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item) => {
            // Dynamically resolve icon from lucide-react
            const Icon = (LucideIcons as any)[item.iconName] || LucideIcons.HelpCircle;

            return (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                className="group flex flex-col"
              >
                {/* Icon Container with hover fill effect */}
                <div className="w-16 h-16 rounded-full bg-[#F1E8D9] flex items-center justify-center mb-6 text-[#1A1A1A] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300 relative overflow-hidden">
                   <Icon className="w-8 h-8 z-10 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                
                {/* Title with animated underline */}
                <h3 className="text-xl font-cormorant font-semibold text-[#1A1A1A] mb-3 relative inline-block self-start">
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </h3>
                
                {/* Description */}
                <p className="text-[#4A4A4A] font-inter text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default IconGridSection;
