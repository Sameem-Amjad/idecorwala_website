"use client";

import { motion } from "framer-motion";
import { approachSteps } from "./data";
import styles from "./Hospitality.module.css";

export default function ProcessSection() {
  return (
    <section className={styles.section} style={{ background: "var(--cream)" }}>
      <div className={`${styles.container} ${styles.approachGrid}`} style={{ gridTemplateColumns: "38% 62%" }}>
        {/* Left Column: Heading and Intro */}
        <div>
          <div className={styles.eyebrow}>Our Approach</div>
          <h2 className={styles.approachTitle}>Thoughtfully Designed.<br />Precisely Delivered.</h2>
          
          <div className={styles.ornament}>
            <i />
          </div>
          
          <p className={styles.heroCopy}>
            We follow a streamlined process that ensures clarity, quality, and consistency at every stage—so you can focus on what you do best: delighting your guests.
          </p>
        </div>

        {/* Right Column: Timeline Steps */}
        <div className={styles.steps}>
          {approachSteps.map(({ icon: Icon, number, title, description }, index) => (
            <motion.article 
              key={number} 
              initial={{ opacity: 0, scale: 0.97, y: 12 }} 
              whileInView={{ opacity: 1, scale: 1, y: 0 }} 
              viewport={{ once: true, amount: 0.35 }} 
              transition={{ duration: 0.4, delay: index * 0.1 }} 
              className={styles.step}
            >
              <div className={styles.stepIcon}>
                <Icon size={22} strokeWidth={1.35} />
              </div>
              <strong>{number}</strong>
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}