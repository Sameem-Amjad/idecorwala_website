"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { volumeStats } from "@/data/highVolumeProducts";
import styles from "./HighVolume.module.css";

export default function StatsBand() {
  return <section className={styles.stats}><div className={styles.container}><div className={styles.statsGrid}>{volumeStats.map(({ icon: Icon, value, label }, index) => <motion.div className={styles.stat} key={label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: index * .07 }}><div className={styles.statIcon}><Icon size={24} strokeWidth={1.4} /></div><strong>{value}</strong><span>{label}</span></motion.div>)}</div><div className={styles.statsPhoto}><Image src="/images/products/high-volume/logistics.png" alt="Forklift loading finished products into a delivery truck" fill sizes="(max-width: 767px) 100vw, 45vw" /></div></div></section>;
}
