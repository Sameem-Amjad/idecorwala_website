"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { techChecklist } from "@/data/itParksData";
import GoldDivider from "./GoldDivider";
import { Check } from "./icons";
import styles from "./ITParkPage.module.css";

export default function TechFeaturePanel() {
  return (
    <section className={styles.techSection}>
      <div className={styles.techNoise} aria-hidden="true" />
      <motion.div
        className={styles.techCopy}
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.eyebrow}>Smart design. Stronger business.</span>
        <h2>
          Intelligent by Design.
          <br />
          Connected by Technology.
        </h2>
        <GoldDivider dark />
        <p>
          We integrate technology with thoughtful design to create campuses that are efficient,
          resilient and ready for the future.
        </p>
        <ul>
          {techChecklist.map((item) => (
            <li key={item}>
              <Check size={15} strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className={styles.techImageWrap}>
        <Image
          src="/images/solutions/it-parks/campus-night.png"
          alt="Luxury technology campus courtyard at dusk"
          fill
          sizes="(max-width: 900px) 100vw, 35vw"
          className={styles.techImage}
        />
      </div>

      <div className={styles.goldSlash} aria-hidden="true" />

      <motion.aside
        className={styles.quotePanel}
        initial={{ opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6 }}
      >
        <span aria-hidden="true">"</span>
        <blockquote>
          We don't just build buildings; we create ecosystems that accelerate innovation and
          business growth.
        </blockquote>
        <i />
      </motion.aside>
    </section>
  );
}
