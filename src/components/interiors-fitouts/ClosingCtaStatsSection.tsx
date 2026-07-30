'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { stats } from '@/data/interiorsFitouts';
import styles from './Interiors.module.css';

const ClosingCtaStatsSection = () => {
  return (
    <>
      {/* 1. Statistics Band */}
      <section className={styles.stats}>
        <div className={`${styles.container} ${styles.statsGrid}`}>
          {stats.map((stat, index) => {
            const Icon = (LucideIcons as any)[stat.iconName] || LucideIcons.BarChart2;
            return (
              <motion.div 
                className={styles.stat} 
                key={stat.id} 
                initial={false} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: .35, delay: index * 0.07 }}
              >
                <Icon size={34} strokeWidth={1.3} />
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 2. Closing CTA Section */}
      <section className={`${styles.section} ${styles.closing}`}>
        <div className={`${styles.container} ${styles.closingGrid}`}>
          <div>
            <h2 className={styles.sectionTitle}>
              Let&apos;s Design Spaces<br />That Inspire and Endure.
            </h2>
            <p className={`${styles.sectionCopy} ${styles.closingCopy}`}>
              Share your vision with us. Together, we&apos;ll create environments that make a difference.
            </p>
            <div className={styles.buttons}>
              <Link className={`${styles.button} ${styles.buttonOutline}`} href="/contact">
                Schedule a Consultation <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className={styles.closingVisual}>
            <Image 
              src="/images/services/interiors/hero-sketch.png" 
              alt="Architectural pencil sketch of interior spaces" 
              fill 
              sizes="(max-width: 1023px) 100vw, 57vw" 
              style={{ mixBlendMode: 'multiply' }}
            />
            <div className={styles.goldEdge} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ClosingCtaStatsSection;
