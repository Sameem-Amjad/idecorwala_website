"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory } from "lucide-react";
import { motion } from "framer-motion";
import { heroFeatures } from "@/data/highVolumeProducts";
import styles from "./HighVolume.module.css";

export default function HeroSection() {
  return <section className={styles.hero}><div className={`${styles.container} ${styles.heroGrid}`}><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><div className={styles.eyebrow}>High Volume Products</div><div className={styles.ornament}><span /></div><h1 className={styles.heroTitle}>BUILT FOR SCALE.<br />DELIVERED FOR IMPACT.</h1><div className={styles.ornament}><span /></div><p className={styles.heroCopy}>Our high volume products are engineered for speed, consistency and cost-efficiency without compromising on quality. Designed to meet the demands of large-scale projects across generations and geographies.</p><div className={styles.heroFeatures}>{heroFeatures.map(({ icon: Icon, label }) => <div className={styles.heroFeature} key={label}><Icon size={28} strokeWidth={1.5} /><span>{label}</span></div>)}</div><Link className={styles.button} href="#product-range">Explore our products <ArrowRight size={15} /></Link></motion.div><motion.div className={styles.heroVisual} initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .1 }}><div className={styles.heroFrame}><div className={styles.heroImage}><Image src="/images/products/high-volume/factory-floor.png" alt="Door and panel manufacturing facility" fill priority sizes="(max-width: 767px) 100vw, 54vw" /></div></div><div className={styles.heroBadge}><Factory size={30} strokeWidth={1.4} /><p>Engineered for volume. Built for performance.</p><i /></div><div className={styles.sampleCard}><Image src="/images/products/high-volume/material-stack.png" alt="Layered wood and laminate panel samples" fill sizes="245px" /></div></motion.div></div></section>;
}
