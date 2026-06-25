'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Interiors.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        {/* Left Column - Headings & CTAs */}
        <motion.div 
          initial={false} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.55 }}
        >
          <div className={styles.eyebrow}>Interiors &amp; Fitouts</div>
          <div className={styles.ornament}><i /></div>
          
          <h1 className={styles.heroTitle}>
            <span>Architectural Integrity meets</span>
            <em>Refined Interiors.</em>
          </h1>
          
          <p className={styles.heroCopy}>
            From structural blueprints to the finest material finishes, Spacefold engineers 
            environments that command presence and foster extraordinary living and working experiences.
          </p>

          <div className={styles.buttons}>
            <Link className={styles.button} href="#interiors-process">
              Start Your Project <ArrowRight size={15} />
            </Link>
            <Link className={`${styles.button} ${styles.buttonOutline}`} href="/projects">
              View Our Portfolio <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Visual image with diagonal split */}
        <motion.div 
          className={styles.heroVisual} 
          initial={false} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{ overflow: 'visible' }}
        >
          {/* Inner wrapper to clip image corners */}
          <div className="absolute inset-0 overflow-hidden rounded-[8px]">
            <Image
              src="/images/services/interiors/process-livingroom.png"
              alt="Luxurious finished interior living room design"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 56vw"
            />
            <div className={styles.heroLines} />
          </div>

          {/* Floating annotation shifted outside the image container */}
          <div className={styles.annotation} style={{ left: "-48px", zIndex: 10, background: "#faf6eebf", padding: "6px 12px", borderRadius: "4px", backdropFilter: "blur(2px)" }}>
            Concept<br />to Comfort →<br />Detail
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
