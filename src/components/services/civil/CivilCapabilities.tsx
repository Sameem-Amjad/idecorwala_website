"use client";

import React from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { civilCapabilities } from "@/data/civil";
import styles from "./Civil.module.css";

export default function CivilCapabilities() {
  return (
    <section className={styles.thoughtful}>
      <div className={styles.thoughtfulGrid}>
        {/* Visual Panel - Left */}
        <div className={styles.visualPanel}>
          <div className={styles.maroonPanel} />
          <div className={styles.thoughtfulImage}>
            <Image 
              src="/images/services/civil/capabilities-building.jpg" 
              alt="Dramatic upward-looking architectural photography of a curved glass and steel building" 
              fill 
              sizes="(max-width: 1023px) 100vw, 43vw" 
            />
          </div>
          <div className={styles.compassBadge}>
            <Building2 size={29} strokeWidth={1.35} />
          </div>
          <div className={styles.panelText}>
            <h2>Engineering Excellence.<br />Building Tomorrow.</h2>
            <p>We combine technical expertise with innovative thinking to deliver structures and facades that inspire confidence.</p>
          </div>
        </div>

        {/* Capabilities Approach Grid - Right */}
        <div className={styles.approach}>
          <div className={styles.eyebrow}>Our Capabilities</div>
          <div className={styles.approachGrid}>
            {civilCapabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <motion.article 
                  className={styles.approachItem} 
                  key={cap.title} 
                  initial={false} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: .35, delay: index * .06 }}
                >
                  <Icon size={28} strokeWidth={1.35} />
                  <div>
                    <h3>{cap.title}</h3>
                    <p>{cap.description}</p>
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
