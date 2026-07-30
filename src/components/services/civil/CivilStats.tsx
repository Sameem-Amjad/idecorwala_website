"use client";

import React from "react";
import { motion } from "framer-motion";
import { civilStats } from "@/data/civil";
import styles from "./Civil.module.css";

export default function CivilStats() {
  return (
    <section className={styles.stats}>
      <div className={`${styles.container} ${styles.statsGrid}`}>
        {civilStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              className={styles.stat} 
              key={index} 
              initial={false} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: .35, delay: index * .07 }}
            >
              <Icon size={34} strokeWidth={1.3} />
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
