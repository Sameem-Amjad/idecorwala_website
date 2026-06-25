"use client";

import { motion } from "framer-motion";
import { hospitalityNeeds } from "./data";
import styles from "./Hospitality.module.css";

export default function ServicesSection() {
  return (
    <section className={`${styles.section} ${styles.center}`}>
      <div className={styles.container}>
        <div className={styles.eyebrow}>Designing Spaces. Defining Experiences.</div>
        <h2 className={styles.sectionTitle}>Built for Every Hospitality Need</h2>
        
        <div className={styles.ornament}>
          <i />
        </div>
        
        <p className={styles.sectionLead}>
          From luxury hotels to boutique stays and vibrant restaurants, we craft spaces that are functional, beautiful, and built to last.
        </p>

        <div className={styles.featureGrid}>
          {hospitalityNeeds.map(({ icon: Icon, title, description }, index) => (
            <motion.article 
              key={title} 
              initial={{ opacity: 0, y: 16 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, amount: 0.2 }} 
              transition={{ duration: 0.45, delay: index * 0.09 }} 
              className={styles.featureCard}
            >
              <Icon size={34} strokeWidth={1.35} />
              <h3>{title}</h3>
              <p>{description}</p>
              <div className={styles.cardLine} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}