"use client";

import React from "react";
import { motion } from "framer-motion";
import { healthcareProcess } from "@/data/healthcare";
import styles from "./Healthcare.module.css";

export default function HealthcareProcess() {
  return (
    <section className={`${styles.section} ${styles.journey}`}>
      <div className={styles.container}>
        <div className={styles.centerHeading}>
          <div className={styles.eyebrow}>Our Process</div>
        </div>
        
        <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#781417] text-center mt-4 uppercase">
          Thoughtfully Designed. Precisely Delivered.
        </h2>

        <p className="font-sans text-[14px] text-[#655f58] leading-[1.6] max-w-[580px] mx-auto text-center mt-3">
          A streamlined process that ensures compliance, clarity, and consistency at every stage—so you can focus on what matters most: care.
        </p>

        <div className={styles.timeline}>
          {healthcareProcess.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.journeyStep}
              >
                <div className={styles.stepIcon}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                
                <div className={styles.stepNumber}>
                  {step.number}
                </div>
                
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
