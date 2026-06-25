"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { partnerNetworkTypes } from "./data";
import styles from "./PartnerPortal.module.css";

export default function PartnerNetworkSection() {
  return (
    <div>
      <div className={styles.eyebrow}>Our Partner Network</div>
      <div className={styles.ornament} style={{ marginTop: "8px", marginBottom: "24px" }}>
        <i />
      </div>

      <div className={styles.networkGrid}>
        {partnerNetworkTypes.map(({ icon: Icon, title, description, href }, index) => (
          <motion.article 
            key={title} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.45, delay: index * 0.08 }} 
            className={styles.networkCard}
          >
            <div className={styles.networkIconWrapper}>
              <Icon size={31} strokeWidth={1.4} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link href={href} className={styles.networkLink}>
              Know More <ArrowRight size={13} />
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
