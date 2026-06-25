"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/itParksData";
import { iconMap } from "./icons";
import styles from "./ITParkPage.module.css";

export default function StatsBanner() {
  return (
    <section className={styles.statsSection}>
      <motion.div
        className={styles.statsPanel}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon];
          return (
            <div className={styles.statItem} key={stat.label}>
              <span className={styles.statBadge}>
                <Icon size={24} strokeWidth={1.55} />
              </span>
              <div>
                <strong>{stat.value}</strong>
                <h3>{stat.label}</h3>
                <p>{stat.desc}</p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
