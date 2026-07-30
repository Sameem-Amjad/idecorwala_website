"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Globe, Award, PenTool, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./ThoughtLeadership.module.css";

const heroFeatures = [
  {
    icon: Globe,
    label: "Future-Ready\nPerspectives",
  },
  {
    icon: PenTool,
    label: "Research-Led\nInsights",
  },
  {
    icon: MessageSquare,
    label: "Industry\nConversations",
  },
  {
    icon: BookOpen,
    label: "Knowledge\nSharing",
  },
];

export default function ThoughtHero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <div className={styles.eyebrow}>Thought Leadership</div>
          <div className={styles.ornament}>
            <span />
          </div>
          
          <h1 className={styles.heroTitle}>
            Ideas that inspire.<br />Insights that build.
          </h1>
          
          <div className={styles.ornament}>
            <span />
          </div>
          
          <p className={styles.heroCopy}>
            We share our perspectives on the ideas, innovations and industry shifts shaping the built environment. Because when we exchange knowledge, we build a better tomorrow.
          </p>
          
          <div className={styles.heroFeatures}>
            {heroFeatures.map(({ icon: Icon, label }) => (
              <div className={styles.heroFeature} key={label}>
                <Icon size={28} strokeWidth={1.5} />
                <span>{label}</span>
              </div>
            ))}
          </div>
          
          <Link className={styles.button} href="#subscribe">
            Subscribe to Insights <ArrowRight size={15} />
          </Link>
        </motion.div>

        <motion.div 
          className={styles.heroVisual} 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className={styles.heroFrame}>
            <div className={styles.heroImage}>
              <Image 
                src="/imgs/thought_hero.png" 
                alt="Flat lay of architectural sketches, blueprints, fountain pen, glasses, and a coffee cup" 
                fill 
                priority 
                sizes="(max-width: 767px) 100vw, 54vw" 
              />
            </div>
          </div>
          
          <div className={styles.heroBadge}>
            <BookOpen size={30} strokeWidth={1.4} />
            <p>Great spaces are not just built with materials, but with ideas, intent and responsibility.</p>
            <i />
          </div>
          
          <div className={styles.sampleCard}>
            <Image 
              src="/imgs/interior_lounge.png" 
              alt="Layered wood and laminate panel samples" 
              fill 
              sizes="245px" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
