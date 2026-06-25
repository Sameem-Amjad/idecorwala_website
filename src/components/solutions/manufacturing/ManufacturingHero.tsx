"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { manufacturingPillars } from "@/data/manufacturing";
import { Factory, ArrowRight } from "lucide-react";
import styles from "./Manufacturing.module.css";

export default function ManufacturingHero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <div className={styles.breadcrumb}>
            <span>Solutions</span>
            <span className={styles.crumbArrow}>›</span>
            <b>Manufacturing &amp; Infrastructure</b>
          </div>
          
          <div className={styles.ornament}>
            <span />
          </div>
          
          <h1 className={styles.heroTitle}>
            MANUFACTURING<br />&amp; INFRASTRUCTURE
          </h1>
          
          <div className={styles.ornament}>
            <span />
          </div>
          
          <p className={styles.heroCopy}>
            We design and build high-performance environments that support efficient operations, ensure safety, and adapt to the evolving needs of industry.
          </p>

          <div className={styles.heroFeatures}>
            {manufacturingPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div className={styles.heroFeature} key={pillar.label}>
                  <Icon size={28} strokeWidth={1.5} />
                  <span>{pillar.label}</span>
                </div>
              );
            })}
          </div>

          <Link className={styles.button} href="#product-range">
            Explore Solutions <ArrowRight size={15} />
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
                src="/images/manufacturing/hero-facility.jpg" 
                alt="Large modern manufacturing facility" 
                fill 
                priority 
                sizes="(max-width: 767px) 100vw, 54vw" 
              />
            </div>
          </div>
          
          <div className={styles.heroBadge}>
            <Factory size={30} strokeWidth={1.4} />
            <p>Spaces that drive production, performance and progress.</p>
            <i />
          </div>
          
          <div className={styles.sampleCard}>
            <Image 
              src="/images/manufacturing/hero-facility.jpg" 
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
