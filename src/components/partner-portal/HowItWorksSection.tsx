"use client";

import { motion } from "framer-motion";
import { howItWorksSteps } from "./data";
import styles from "./PartnerPortal.module.css";

export default function HowItWorksSection() {
  return (
    <div>
      <div className={styles.eyebrow}>How It Works</div>
      <div className={styles.ornament} style={{ marginTop: "8px", marginBottom: "24px" }}>
        <i />
      </div>
      
      <ol className={styles.verticalSteps}>
        {howItWorksSteps.map(({ icon: Icon, stepNumber, title, description }, index) => (
          <motion.li 
            key={stepNumber} 
            initial={{ opacity: 0, x: -18 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.45, delay: index * 0.09 }} 
            className={styles.verticalStep}
          >
            <div className={styles.verticalStepIcon}>
              <Icon size={19} strokeWidth={1.5} />
            </div>
            <span className={styles.verticalStepNumber}>{stepNumber}</span>
            <div className={styles.verticalStepText}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
