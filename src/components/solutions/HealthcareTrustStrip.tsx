"use client";

import React from "react";
import { motion } from "framer-motion";
import { healthcareTrust } from "@/data/healthcare";
import styles from "./Healthcare.module.css";

export default function HealthcareTrustStrip() {
  return (
    <section className={styles.stats}>
      <div className={`${styles.container} ${styles.statsGrid}`} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {healthcareTrust.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.stat}
            >
              <Icon size={25} strokeWidth={1.3} />
              <div>
                <strong style={{ fontSize: "16px", textTransform: "uppercase" }}>{item.label}</strong>
                <span style={{ marginTop: "3px" }}>{item.body}</span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
