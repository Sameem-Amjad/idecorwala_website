"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { partnerResources } from "./data";
import styles from "./PartnerPortal.module.css";

export default function PartnerResourcesSection() {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${styles.resourcesBox}`}>
        <div className={styles.eyebrow}>Partner Resources</div>
        <div className={styles.ornament} style={{ marginTop: "8px", marginBottom: "24px" }}>
          <i />
        </div>

        <div className={styles.resourcesGrid}>
          {partnerResources.map(({ icon: Icon, title, description, href }, index) => (
            <motion.article 
              key={title} 
              initial={{ opacity: 0, y: 16 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.4, delay: index * 0.07 }} 
              className={styles.resourceCard}
            >
              <Link href={href} className={styles.resourceLink}>
                <Icon className={styles.resourceIcon} size={28} strokeWidth={1.5} />
                <div className={styles.resourceText}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
