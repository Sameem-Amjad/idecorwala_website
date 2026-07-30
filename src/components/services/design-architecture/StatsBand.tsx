"use client";

import { motion } from "framer-motion";
import { designStats } from "@/data/design-architecture/stats";
import styles from "./DesignArchitecture.module.css";

export default function StatsBand() {
  return <section className={styles.stats}><div className={`${styles.container} ${styles.statsGrid}`}>{designStats.map(({ id, icon: Icon, value, label }, index) => <motion.div className={styles.stat} key={id} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: index * .07 }}><Icon size={34} strokeWidth={1.3} /><div><strong>{value}</strong><span>{label}</span></div></motion.div>)}</div></section>;
}
