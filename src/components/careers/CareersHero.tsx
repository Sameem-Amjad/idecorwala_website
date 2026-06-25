'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Careers.module.css';

export default function CareersHero() {
  const pillars = [
    {
      title: "INNOVATION-DRIVEN PROJECTS",
      desc: "Collaborate on state-of-the-art architectures using cutting-edge technology.",
      icon: Zap
    },
    {
      title: "CAREER PATHWAY GROWTH",
      desc: "Structured career development, mentorship programs, and leadership pathways.",
      icon: TrendingUp
    },
    {
      title: "COLLABORATIVE CULTURE",
      desc: "Work alongside industry experts in a supportive and inclusive environment.",
      icon: Users
    }
  ];

  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        {/* Left Column - Headings & CTAs */}
        <motion.div 
          initial={false} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.55 }}
        >
          <div className={styles.eyebrow}>Careers at iDecorwala</div>
          <div className={styles.ornament}><i /></div>
          
          <h1 className={styles.heroTitle}>
            <span>Build Your Career.</span>
            <em>Leave a Legacy.</em>
          </h1>
          
          <p className={styles.heroCopy} style={{ maxWidth: "500px" }}>
            At iDecorwala, we don&apos;t just build environments, we build possibilities. Join a dynamic team of designers, engineers, and creators who are redefining corporate, commercial, and institutional environments across the nation.
          </p>

          <div className={styles.buttons}>
            <Link className={styles.button} href="/contact">
              Explore Opportunities <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Visual team blueprint illustration */}
        <motion.div 
          className={styles.heroVisual} 
          initial={false} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{ overflow: 'visible' }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[8px]">
            <Image
              src="/images/about/team-blueprint.png"
              alt="Team collaborating on architectural blueprints"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 56vw"
            />
            <div className={styles.heroLines} />
          </div>
          
          <div className={styles.annotation} style={{ left: "-48px", zIndex: 10, background: "#faf6eebf", padding: "6px 12px", borderRadius: "4px", backdropFilter: "blur(2px)" }}>
            Build<br />Career →<br />Legacy
          </div>
        </motion.div>
      </div>

      {/* Career Pillars Section at the bottom of the Hero */}
      <div className={styles.container} style={{ paddingBottom: "48px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#dfd1ba] pt-8 mt-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="w-[28px] h-[28px] text-[#b8862e] mb-[12px]">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-bold text-[13px] text-[#1A1410] uppercase tracking-[0.05em] mb-[6px]">
                  {pillar.title}
                </h3>
                <p className="font-sans text-[13px] text-[#655f58] leading-[1.6] max-w-[280px]">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

