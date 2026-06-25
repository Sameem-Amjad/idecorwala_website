"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./Healthcare.module.css";

export default function HealthcareCTA() {
  return (
    <section className={`${styles.section} ${styles.closing}`}>
      <div className={`${styles.container} ${styles.closingGrid}`}>
        {/* Left Column: Text and Button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.closingCopy}
        >
          <div className={styles.eyebrow}>Let&apos;s Connect</div>
          
          <h2 className={styles.sectionTitle}>
            Let&apos;s Build Better Healthcare Spaces
          </h2>

          <div className={styles.ornament}>
            <i />
          </div>

          <p className="font-sans text-[15px] text-[#655f58] leading-[1.7] mt-5 mb-8">
            Partner with us to create healthcare environments that inspire trust, deliver care, and save lives.
          </p>

          <Link href="/contact" className={styles.button}>
            Let&apos;s Connect <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Right Column: Visual and Gold Edge line overlay */}
        <div className={styles.closingVisual}>
          <Image
            src="/images/healthcare/healthcare-hero.jpg"
            alt="Modern premium clinical corridor interior design"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 57vw"
          />
          <div className={styles.goldEdge} />
        </div>
      </div>
    </section>
  );
}
