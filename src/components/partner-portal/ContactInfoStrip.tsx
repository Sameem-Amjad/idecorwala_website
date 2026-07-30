"use client";

import { motion } from "framer-motion";
import { contactInfoItems } from "./data";
import styles from "./PartnerPortal.module.css";

export default function ContactInfoStrip() {
  return (
    <section className={styles.contactStrip}>
      <div className={`${styles.container} ${styles.contactGrid}`}>
        {contactInfoItems.map(({ icon: Icon, title, value }, index) => (
          <motion.article 
            key={title} 
            initial={{ opacity: 0, y: 16 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.4, delay: index * 0.07 }} 
            className={styles.contactCard}
          >
            <Icon className={styles.contactIcon} size={29} strokeWidth={1.5} />
            <div className={styles.contactText}>
              <h2>{title}</h2>
              <p>{value}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
