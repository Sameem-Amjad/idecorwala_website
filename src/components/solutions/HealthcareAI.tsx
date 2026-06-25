"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, Activity, Clock3, Sparkles } from "lucide-react";
import { healthcareChecklist, healthcareStats } from "@/data/healthcare";
import styles from "./Healthcare.module.css";

export default function HealthcareAI() {
  const statIcons = [Clock3, Activity, Shield, Sparkles];

  return (
    <section className={`${styles.section} ${styles.thoughtful}`}>
      <div className={`${styles.container} ${styles.thoughtfulGrid}`}>
        
        {/* Left Column: Visual Panel (Masked Panel & Image) */}
        <div className={styles.visualPanel}>
          <div className={styles.maroonPanel}>
            <div className={styles.panelText}>
              <h2>Built on Intelligence</h2>
              <p>Our proprietary platform ensures seamless planning, accurate BOQs, and efficient execution—reducing timelines, errors, and costs.</p>
              
              <ul className={styles.checklistList}>
                {healthcareChecklist.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={styles.checklistItem}
                  >
                    <CheckCircle2 size={15} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={styles.thoughtfulImage}>
            <Image
              src="/images/healthcare/healthcare-ai.jpg"
              alt="Tablet displaying 3D architectural interior render on blueprints"
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 42vw"
            />
          </div>
          
          <div className={styles.compassBadge}>
            <Activity size={24} strokeWidth={1.5} />
          </div>
        </div>

        {/* Right Column: Approach Grid (Stats Grid) */}
        <div className={styles.approach}>
          <div className={styles.eyebrow}>Performance Metrics</div>
          <h2 className={styles.sectionTitle}>Engineered for Excellence</h2>
          
          <div className={styles.ornament}>
            <i />
          </div>

          <div className={styles.approachGrid}>
            {healthcareStats.map((stat, index) => {
              const Icon = statIcons[index] || Shield;
              return (
                <div key={index} className={styles.approachItem}>
                  <Icon size={26} strokeWidth={1.4} />
                  <div>
                    <h3>{stat.number}</h3>
                    <p>{stat.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
