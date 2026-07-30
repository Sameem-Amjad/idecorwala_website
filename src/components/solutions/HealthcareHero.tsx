"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { healthcareHeroChips } from "@/data/healthcare";
import styles from "./Healthcare.module.css";

export default function HealthcareHero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className={styles.breadcrumb}>
            <span>Solutions</span>
            <span className={styles.crumbArrow}>›</span>
            <b>Healthcare</b>
          </div>

          <h1 className={styles.heroTitle}>
            <span>Healthcare</span>
            <em>Spaces that heal. Built for performance.</em>
          </h1>

          <p className={styles.heroCopy}>
            We design and build healthcare environments that combine infection control, operational efficiency, and patient comfort—delivering spaces that support better outcomes and exceptional care.
          </p>

          {/* Chips instead of buttons, styled for high-end alignment */}
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-[420px]">
            {healthcareHeroChips.map((chip, index) => {
              const Icon = chip.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-[6px] border border-[#dfd1ba] bg-[#faf6ee]/50">
                  <div className="text-[#b8862e] shrink-0">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="font-sans font-bold text-[12px] text-[#1b1714] leading-tight">
                    {chip.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Hero Visual Block */}
        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Image
            src="/images/healthcare/healthcare-hero.jpg"
            alt="Healthcare reception lobby"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1023px) 100vw, 56vw"
          />
          <div className={styles.heroLines} />
          
          <div className={styles.annotation}>
            Care. Compassion. Commitment.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
