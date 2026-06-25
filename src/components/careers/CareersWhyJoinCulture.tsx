'use client';

import React from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { whyJoinItems } from '@/data/careersData';
import styles from './Careers.module.css';

const IconMap: Record<string, React.ElementType> = {
  people: LucideIcons.Users,
  growth: LucideIcons.TrendingUp,
  team: LucideIcons.Handshake,
  buildings: LucideIcons.Building2,
  bulb: LucideIcons.Award,
  balance: LucideIcons.Heart,
};

export default function CareersWhyJoinCulture() {
  return (
    <section className={styles.thoughtful}>
      <div className={styles.thoughtfulGrid}>
        
        {/* Left Side: Culture Visual Panel */}
        <div className={styles.visualPanel}>
          <div className={styles.maroonPanel} />
          <div className={styles.thoughtfulImage}>
            <Image 
              src="/images/careers/culture_photo.png" 
              alt="iDecorwala Office Culture" 
              fill 
              sizes="(max-width: 1023px) 100vw, 43vw" 
            />
          </div>
          <div className={styles.compassBadge}>
            <Users size={29} strokeWidth={1.35} />
          </div>
          <div className={styles.panelText}>
            <h2>OUR CULTURE</h2>
            <p>&ldquo;We are a team of dreamers, planners, creators and doers &mdash; united by purpose and driven by excellence.&rdquo;</p>
          </div>
        </div>

        {/* Right Side: Grid of 6 Differentiators */}
        <div className={styles.approach}>
          <div className={styles.eyebrow}>Why Join iDecorwala?</div>
          <div className={styles.approachGrid}>
            {whyJoinItems.map((item, index) => {
              const Icon = IconMap[item.icon] || LucideIcons.HelpCircle;
              return (
                <motion.article 
                  className={styles.approachItem} 
                  key={item.title} 
                  initial={false} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: .35, delay: index * .06 }}
                >
                  <Icon size={28} strokeWidth={1.35} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

