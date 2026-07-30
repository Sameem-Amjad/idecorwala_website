"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Leaf, Cpu, Laptop, BedDouble, Factory } from "lucide-react";
import styles from "./ThoughtLeadership.module.css";

const TOPICS = [
  {
    label: "Architecture & Design",
    icon: Building2,
  },
  {
    label: "Sustainability",
    icon: Leaf,
  },
  {
    label: "Innovation & Technology",
    icon: Cpu,
  },
  {
    label: "Workplace Transformation",
    icon: Laptop,
  },
  {
    label: "Hospitality Design",
    icon: BedDouble,
  },
  {
    label: "Manufacturing & Infrastructure",
    icon: Factory,
  },
];

export default function ExploreByTopic() {
  return (
    <section className={styles.why} style={{ background: "#ede3d0" }}>
      <div className={`${styles.container} ${styles.whyGrid}`}>
        {/* Left Column: Title Intro */}
        <div>
          <div className={styles.whyHeader}>
            <div className={styles.eyebrow}>Explore By Topic</div>
            <div className={styles.ornament}>
              <span />
            </div>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#761416] leading-[1.15] mb-4 uppercase">
            Dive Deeper Into<br />What Matters
          </h2>
          <p className={styles.heroCopy}>
            Navigate our complete library of articles, white papers, and expert analysis categorised by industry topic. Find the knowledge you need to drive performance and value.
          </p>
        </div>

        {/* Right Column: Topics Grid */}
        <div className={styles.ideal}>
          <div className={styles.whyHeader}>
            <div className={styles.eyebrow}>Categories</div>
            <div className={styles.ornament}>
              <span />
            </div>
          </div>

          <div className={styles.idealGrid}>
            {TOPICS.map(({ label, icon: Icon }, index) => (
              <motion.div
                key={label}
                className={styles.idealItem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <Icon size={42} strokeWidth={1.3} />
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
