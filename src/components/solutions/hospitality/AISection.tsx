"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, ShieldCheck, Eye } from "lucide-react";
import { spacefoldChecklist, spacefoldStats } from "./data";
import styles from "./Hospitality.module.css";

export default function AISection() {
  const statIcons = [Clock3, ShieldCheck, Eye];

  return (
    <section className={styles.partner}>
      {/* Left Panel */}
      <div className={styles.partnerPanel}>
        <div className={styles.eyebrow}>Built on Intelligence</div>
        <h2 className={styles.sectionTitle}>Powered by Spacefold&trade; AI</h2>
        
        <div className={styles.ornament}>
          <i />
        </div>
        
        <p>
          Our proprietary platform ensures seamless planning, real-time visualization, accurate BOQs, and efficient execution—reducing timelines, errors, and costs.
        </p>

        <ul className={styles.bulletList}>
          {spacefoldChecklist.map((feature, index) => (
            <motion.li 
              initial={{ opacity: 0, x: -8 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.06 }} 
              key={feature} 
              className={styles.bulletItem}
            >
              <CheckCircle2 size={15} />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Right Panel: Stats Grid */}
      <div className={styles.partnerStats}>
        {spacefoldStats.map(({ value, label }, index) => {
          const Icon = statIcons[index] || ShieldCheck;
          return (
            <div className={styles.partnerStat} key={label}>
              <Icon size={29} strokeWidth={1.3} />
              <strong>{value}</strong>
              <h3>{label}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}