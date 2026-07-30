"use client";

import { motion } from "framer-motion";
import { whyPartnerBenefits } from "./data";
import styles from "./PartnerPortal.module.css";

export default function WhyPartnerSection() {
  return (
    <section className={`${styles.section} ${styles.center}`}>
      <div className={styles.container}>
        <div className={styles.eyebrow}>Why Partner with iDecorwala?</div>
        <h2 className={styles.sectionTitle}>Built on Trust. Driven by Innovation.</h2>
        
        <div className={styles.ornament}>
          <i />
        </div>
        
        <p className={styles.sectionLead}>
          We collaborate with the industry's best to deliver seamless execution, unmatched quality, and exceptional value to every project.
        </p>

        <div className={styles.featureGrid}>
          {whyPartnerBenefits.map(({ icon: Icon, title, description }, index) => (
            <motion.article 
              key={title} 
              initial={{ opacity: 0, y: 22 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: index * 0.06 }} 
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
