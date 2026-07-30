"use client";

import { motion } from "framer-motion";
import { idealFor } from "@/data/highVolumeProducts";
import styles from "./HighVolume.module.css";

export default function IdealForGrid() {
  return (
    <div className={styles.idealGrid}>
      {idealFor.map(({ icon: Icon, label }, index) => (
        <motion.div
          className={styles.idealItem}
          key={label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
        >
          <Icon size={39} strokeWidth={1.25} />
          <span>{label}</span>
        </motion.div>
      ))}
    </div>
  );
}
