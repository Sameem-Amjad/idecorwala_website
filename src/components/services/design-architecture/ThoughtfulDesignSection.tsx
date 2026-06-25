"use client";

import Image from "next/image";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";
import { approachItems } from "@/data/design-architecture/approachItems";
import styles from "./DesignArchitecture.module.css";

export default function ThoughtfulDesignSection() {
  return <section className={styles.thoughtful}><div className={styles.thoughtfulGrid}><div className={styles.visualPanel}><div className={styles.maroonPanel} /><div className={styles.thoughtfulImage}><Image src="/images/services/design-architecture/thoughtful-building.png" alt="Technical architectural sketch of a modern two-story building" fill sizes="(max-width: 1023px) 100vw, 43vw" /></div><div className={styles.compassBadge}><Compass size={29} strokeWidth={1.35} /></div><div className={styles.panelText}><h2>Thoughtful Design.<br />Meaningful Impact.</h2><p>Our approach balances creativity with practicality, creating future-ready spaces that are beautiful, efficient and built to last.</p></div></div><div className={styles.approach}><div className={styles.eyebrow}>Our Approach</div><div className={styles.approachGrid}>{approachItems.map(({ id, icon: Icon, title, description }, index) => <motion.article className={styles.approachItem} key={id} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: index * .06 }}><Icon size={28} strokeWidth={1.35} /><div><h3>{title}</h3><p>{description}</p></div></motion.article>)}</div></div></div></section>;
}
