"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/itParksData";
import { iconMap } from "./icons";
import styles from "./ITParkPage.module.css";

export default function ProcessTimeline() {
  return (
    <section className={styles.processSection}>
      <div className={styles.processInner}>
        <motion.div
          className={styles.processCopy}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>Our Process</span>
          <h2>
            Planned.
            <br />
            Precise.
            <br />
            Purposeful.
          </h2>
        </motion.div>

        <div className={styles.timeline}>
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.article
                className={styles.timelineStep}
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
              >
                <span className={styles.stepCircle}>
                  <Icon size={28} strokeWidth={1.55} />
                </span>
                <strong>{step.step}</strong>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
