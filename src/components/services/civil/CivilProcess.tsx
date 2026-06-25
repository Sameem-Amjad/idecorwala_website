"use client";

import React from "react";
import { motion } from "framer-motion";
import { civilProcess } from "@/data/civil";
import styles from "./Civil.module.css";

export default function CivilProcess() {
  return (
    <section className={`${styles.section} ${styles.journey}`} id="civil-process">
      <div className={styles.container}>
        <div className={styles.centerHeading}>
          <div className={styles.eyebrow}>Our Engineering Process</div>
        </div>
        <div className={`${styles.ornament} ${styles.centerOrnament}`}>
          <i />
        </div>

        <div className={styles.timeline}>
          {civilProcess.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                className={styles.journeyStep}
                key={step.number}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className={styles.stepIcon}>
                  <Icon size={28} strokeWidth={1.35} />
                </div>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
