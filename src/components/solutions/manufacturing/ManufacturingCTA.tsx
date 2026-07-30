"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Factory } from "lucide-react";
import styles from "./Manufacturing.module.css";

export default function ManufacturingCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaIcon}>
            <Factory size={31} strokeWidth={1.4} />
          </div>
          
          <div className={styles.ctaText}>
            <h2>
              Let&apos;s Build Stronger Foundations
              <span>For a Smarter Tomorrow</span>
            </h2>
            <p>Partner with us to create industrial spaces that drive efficiency, ensure safety and deliver lasting value.</p>
          </div>

          <Link className={styles.button} href="/contact">
            Let&apos;s Connect <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
