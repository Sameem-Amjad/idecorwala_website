"use client";

import { motion } from "framer-motion";
import { offerCards } from "@/data/design-architecture/offerCards";
import styles from "./DesignArchitecture.module.css";

export default function WhatWeOfferSection() {
  return <section className={`${styles.section} ${styles.offer}`}><div className={`${styles.container} ${styles.offerGrid}`}><aside><div className={styles.eyebrow}>What We Offer</div><h2 className={styles.sectionTitle}>End-to-End Design &amp; Architecture Solutions</h2><div className={styles.ornament}><i /></div><p className={styles.sectionCopy}>We offer comprehensive architectural and interior design services tailored to diverse typologies and project scales.</p></aside><div className={styles.offerCards}>{offerCards.map(({ id, icon: Icon, title, description }, index) => <motion.article className={styles.offerCard} key={id} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: index * .06 }}><Icon size={33} strokeWidth={1.35} /><h3>{title}</h3><p>{description}</p></motion.article>)}</div></div></section>;
}
