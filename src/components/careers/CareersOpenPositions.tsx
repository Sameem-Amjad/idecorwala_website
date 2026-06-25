'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { departments, openPositions } from '@/data/careersData';
import Link from 'next/link';
import styles from './Careers.module.css';

export default function CareersOpenPositions() {
  const [activeDepartment, setActiveDepartment] = useState("All Departments");

  const filteredPositions = activeDepartment === "All Departments" 
    ? openPositions 
    : openPositions.filter(pos => pos.department === activeDepartment);

  return (
    <section id="open-positions" className={styles.section} style={{ borderTop: "1px solid #eadfce" }}>
      <div className={styles.container}>
        
        {/* Section Label */}
        <div className={styles.centerHeading}>
          <div className={styles.eyebrow}>Open Positions</div>
        </div>
        <div className={`${styles.ornament} ${styles.centerOrnament}`}>
          <i />
        </div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="w-full overflow-x-auto no-scrollbar mb-10 mt-10"
        >
          <div className="flex flex-row items-center justify-start lg:justify-center gap-[clamp(16px,2vw,32px)] min-w-max px-2 pb-4">
            {departments.map((dept) => {
              const isActive = activeDepartment === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`transition-all duration-200 text-[14px] font-inter ${
                    isActive 
                      ? "bg-[#781417] text-white px-[20px] py-[10px] rounded-full font-medium" 
                      : "text-[#4A463F] hover:text-[#781417] bg-transparent px-2"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Job List Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="w-full border border-[#dfd1ba] rounded-[8px] bg-white overflow-hidden py-2"
        >
          <div className="flex flex-col divide-y divide-[#dfd1ba]">
            <AnimatePresence mode="popLayout">
              {filteredPositions.map((job, index) => (
                <motion.div
                  key={`${job.title}-${job.department}`}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col md:flex-row items-start md:items-center px-[clamp(20px,3vw,32px)] py-6 hover:bg-[#faf6ee] transition-colors duration-150 cursor-pointer"
                >
                  
                  {/* Title (26%) */}
                  <div className="w-full md:w-[26%] mb-3 md:mb-0 pr-4">
                    <h3 className="text-[16px] font-semibold text-[#1b1714] font-inter">
                      {job.title}
                    </h3>
                  </div>

                  {/* Meta Items Container for Mobile Wrap */}
                  <div className="w-full md:w-[68%] flex flex-wrap md:flex-nowrap items-center gap-y-3 gap-x-6 md:gap-0">
                    
                    {/* Department (20%) */}
                    <div className="w-auto md:w-[29%] flex items-center text-[14px] text-[#655f58] font-inter">
                      <Briefcase className="w-[15px] h-[15px] mr-2 text-[#b8862e]" strokeWidth={2} />
                      <span className="truncate">{job.department}</span>
                    </div>

                    {/* Location (22%) */}
                    <div className="w-auto md:w-[32%] flex items-center text-[14px] text-[#655f58] font-inter">
                      <MapPin className="w-[15px] h-[15px] mr-2 text-[#b8862e]" strokeWidth={2} />
                      <span className="truncate">{job.location}</span>
                    </div>

                    {/* Experience (18%) */}
                    <div className="w-auto md:w-[26%] flex items-center text-[14px] text-[#655f58] font-inter">
                      <Clock className="w-[15px] h-[15px] mr-2 text-[#b8862e]" strokeWidth={2} />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  {/* Trailing Arrow */}
                  <div className="absolute top-6 right-[clamp(20px,3vw,32px)] md:static md:w-[6%] flex justify-end">
                    <div className="w-9 h-9 rounded-full border border-[#b8862e] flex items-center justify-center group-hover:bg-[#b8862e] transition-colors duration-200">
                      <ArrowRight className="w-4 h-4 text-[#b8862e] group-hover:text-white transition-colors duration-200" strokeWidth={2} />
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

            {filteredPositions.length === 0 && (
              <div className="py-12 text-center text-[#655f58] font-inter">
                No open positions found in this department currently.
              </div>
            )}
          </div>
        </motion.div>

        {/* View All Openings Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <Link href="#open-positions" className="group flex items-center text-[14px] uppercase tracking-[0.1em] font-bold text-[#781417] hover:text-[#951c1f] transition-colors">
            View All Openings
            <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
