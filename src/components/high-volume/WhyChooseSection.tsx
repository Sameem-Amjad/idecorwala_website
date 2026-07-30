"use client";

import { motion } from "framer-motion";
import { reasons } from "@/data/highVolumeProducts";
import IdealForGrid from "./IdealForGrid";
import styles from "./HighVolume.module.css";

export default function WhyChooseSection() {
  return <section className={styles.why}><div className={`${styles.container} ${styles.whyGrid}`}><div><div className={styles.whyHeader}><div className={styles.eyebrow}>Why choose our high volume products</div><div className={styles.ornament}><span /></div></div><div className={styles.reasonList}>{reasons.map(({ icon: Icon, title, description }, index) => <motion.article className={styles.reason} key={title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: index * .06 }}><div className={styles.reasonIcon}><Icon size={27} strokeWidth={1.35} /></div><div><h3>{title}</h3><p>{description}</p></div></motion.article>)}</div></div><div className={styles.ideal}><div className={styles.whyHeader}><div className={styles.eyebrow}>Ideal for</div><div className={styles.ornament}><span /></div></div><IdealForGrid /></div></div></section>;
}
