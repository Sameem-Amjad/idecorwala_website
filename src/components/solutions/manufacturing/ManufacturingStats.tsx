"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { manufacturingStats } from "@/data/manufacturing";
import styles from "./Manufacturing.module.css";

export default function ManufacturingStats() {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {manufacturingStats.map(({ icon: Icon, value, label, desc }, index) => (
            <motion.div
              className={styles.stat}
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
            >
              <div className={styles.statIcon}>
                <Icon size={24} strokeWidth={1.4} />
              </div>
              <strong>{value}</strong>
              <span>{label} - {desc}</span>
            </motion.div>
          ))}
        </div>
        
        <div className={styles.statsPhoto}>
          <Image
            src="/images/manufacturing/hero-facility.jpg"
            alt="Forklift loading finished products into a delivery truck"
            fill
            sizes="(max-width: 767px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
