"use client";

import React from "react";
import { motion } from "framer-motion";
import { healthcareServices } from "@/data/healthcare";
import styles from "./Healthcare.module.css";

export default function HealthcareServices() {
  return (
    <section className={`${styles.section} ${styles.offer}`}>
      <div className={`${styles.container} ${styles.offerGrid}`}>
        {/* Left Column: Heading and Intro */}
        <div>
          <div className={styles.eyebrow}>Spaces designed for care. Built for impact.</div>
          <h2 className={styles.sectionTitle}>Built for Every Healthcare Need</h2>
          <p className={styles.sectionCopy}>
            From hospitals to specialty clinics, we deliver end-to-end interior solutions that balance clinical functionality, safety standards, and human comfort.
          </p>
        </div>

        {/* Right Column: Cards Grid */}
        <div className={styles.offerCards}>
          {healthcareServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={styles.offerCard}
              >
                <Icon size={28} strokeWidth={1.5} />
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
