"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Construction, Building, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Civil.module.css";

export default function CivilHero() {
  const features = [
    {
      title: "ENGINEERED FOR STRENGTH",
      desc: "Robust design that ensures safety, stability and long-term durability.",
      icon: Construction
    },
    {
      title: "DESIGNED FOR PERFORMANCE",
      desc: "High-performance facades that enhance efficiency and aesthetics.",
      icon: Building
    },
    {
      title: "BUILT FOR IMPACT",
      desc: "Integrated solutions delivered with precision, speed and quality.",
      icon: Settings2
    }
  ];

  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.hero3Col}`}>
        
        {/* Left Column - Headings & CTAs */}
        <motion.div 
          className={styles.heroLeftCol}
          initial={false} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.55 }}
        >
          <div className={styles.eyebrow} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            CIVIL, STRUCTURAL &amp; FACADE <span style={{ color: "var(--gold)" }}>→</span>
          </div>
          
          <h1 className={styles.heroTitle3Col}>
            <span>STRONG FOUNDATIONS.</span>
            <span>SMART STRUCTURES.</span>
            <span>ICONIC FACADES.</span>
          </h1>
          
          <p className={styles.heroCopy3Col}>
            We deliver integrated engineering solutions that bring strength, stability and sophistication to every project. From the ground up to the final envelope &mdash; we build with precision, performance and purpose.
          </p>
          
          <div className={styles.buttons}>
            <Link className={styles.button} href="#civil-process">
              EXPLORE OUR SERVICES <span style={{ marginLeft: "4px" }}>→</span>
            </Link>
            <Link className={`${styles.button} ${styles.buttonOutline}`} href="/contact" style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}>
              TALK TO OUR EXPERTS <span style={{ marginLeft: "4px" }}>→</span>
            </Link>
          </div>
        </motion.div>

        {/* Center Column - Tall Image & Diamond SVG Overlay */}
        <motion.div 
          className={styles.heroCenterCol}
          initial={false} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <Image 
            src="/images/services/civil/hero-sketch.jpg" 
            alt="Architectural pencil sketch of a structural building frame" 
            fill 
            priority 
            sizes="(max-width: 1023px) 100vw, 34vw" 
          />
          
          {/* Diamond overlay lines matching image 1 */}
          <div className={styles.diamondOverlay}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke="#C9A050" strokeWidth="0.75" />
            </svg>
          </div>
        </motion.div>

        {/* Right Column - Feature list */}
        <div className={styles.heroRightCol}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.featureItem}
              >
                <div className={styles.featureIcon}>
                  <Icon size={28} strokeWidth={1.2} />
                </div>
                <div className={styles.featureText}>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
