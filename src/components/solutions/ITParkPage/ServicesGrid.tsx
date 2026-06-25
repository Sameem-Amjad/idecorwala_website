"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/data/itParksData";
import { iconMap } from "./icons";
import styles from "./ITParkPage.module.css";

export default function ServicesGrid() {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesInner}>
        <motion.div
          className={styles.servicesCopy}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>Spaces that empower business</span>
          <h2>
            Work Better.
            <br />
            Innovate Faster.
            <br />
            Grow Together.
          </h2>
          <p>
            From collaborative zones to focused work areas, we create environments that inspire
            innovation, enhance employee experience and accelerate business success.
          </p>
          <Link className={styles.ctaButton} href="/contact">
            Explore Our Approach <ArrowRight size={15} strokeWidth={1.8} />
          </Link>
        </motion.div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.article
                className={styles.serviceCard}
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Icon size={34} strokeWidth={1.55} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
