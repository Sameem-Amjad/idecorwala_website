'use client';

import React from 'react';
import Image from 'next/image';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { differentiators } from '@/data/interiorsFitouts';
import styles from './Interiors.module.css';

const DifferentiatorsSection = () => {
  return (
    <section className={styles.thoughtful}>
      <div className={styles.thoughtfulGrid}>
        
        {/* Left Side: Visual Panel */}
        <div className={styles.visualPanel}>
          <div className={styles.maroonPanel} />
          <div className={styles.thoughtfulImage}>
            <Image 
              src="/images/services/interiors/material-flatlay.png" 
              alt="Luxury interior design material flatlay" 
              fill 
              sizes="(max-width: 1023px) 100vw, 43vw" 
            />
          </div>
          <div className={styles.compassBadge}>
            <Award size={29} strokeWidth={1.35} />
          </div>
          <div className={styles.panelText}>
            <h2>The Spacefold Standard.<br />Enduring Luxury.</h2>
            <p>We combine design innovation with flawless craftsmanship to execute residential, commercial, and custom fitout spaces.</p>
          </div>
        </div>

        {/* Right Side: Grid of 6 Differentiators */}
        <div className={styles.approach}>
          <div className={styles.eyebrow}>The Spacefold Standard</div>
          <div className={styles.approachGrid}>
            {differentiators.map((diff, index) => {
              const Icon = (LucideIcons as any)[diff.iconName] || LucideIcons.HelpCircle;
              return (
                <motion.article 
                  className={styles.approachItem} 
                  key={diff.id} 
                  initial={false} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: .35, delay: index * .06 }}
                >
                  <Icon size={28} strokeWidth={1.35} />
                  <div>
                    <h3>{diff.title}</h3>
                    <p>{diff.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DifferentiatorsSection;
