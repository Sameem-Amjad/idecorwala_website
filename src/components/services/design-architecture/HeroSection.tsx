"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./DesignArchitecture.module.css";

export default function HeroSection() {
  return <section className={styles.hero}><div className={`${styles.container} ${styles.heroGrid}`}><motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><div className={styles.eyebrow}>Design &amp; Architecture</div><div className={styles.ornament}><i /></div><h1 className={styles.heroTitle}><span>We don&apos;t just design spaces.</span><em>We design what they become.</em></h1><p className={styles.heroCopy}>From concept creation and spatial planning to technical detailing and execution-ready documentation, we transform vision into environments engineered for performance, longevity and measurable impact.</p><div className={styles.buttons}><Link className={styles.button} href="#design-journey">Discover our process <ArrowRight size={15} /></Link><Link className={`${styles.button} ${styles.buttonOutline}`} href="/projects">View projects <ArrowRight size={15} /></Link></div></motion.div><motion.div className={styles.heroVisual} initial={false} animate={{ opacity: 1 }} transition={{ duration: .65, delay: .1 }}><Image src="/images/services/design-architecture/hero-flatlay.png" alt="Architectural blueprints, material swatches and drafting pens" fill priority sizes="(max-width: 1023px) 100vw, 56vw" /><div className={styles.heroLines} /><div className={styles.annotation}>Form<br />Function →<br />Flow</div></motion.div></div></section>;
}
