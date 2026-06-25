"use client";

import { motion } from "framer-motion";
import { journeySteps } from "@/data/design-architecture/journeySteps";
import styles from "./DesignArchitecture.module.css";

export default function DesignJourneySection() {
  return <section className={`${styles.section} ${styles.journey}`} id="design-journey"><div className={styles.container}><div className={styles.centerHeading}><div className={styles.eyebrow}>Our Design Journey</div></div><div className={`${styles.ornament} ${styles.centerOrnament}`}><i /></div><div className={styles.timeline}>{journeySteps.map(({ id, icon: Icon, number, title, description }, index) => <motion.article className={styles.journeyStep} key={id} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: index * .07 }}><div className={styles.stepIcon}><Icon size={28} strokeWidth={1.35} /></div><div className={styles.stepNumber}>{number}</div><h3>{title}</h3><p>{description}</p></motion.article>)}</div></div></section>;
}
