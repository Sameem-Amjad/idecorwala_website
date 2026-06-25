"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./Civil.module.css";

export default function CivilCTA() {
  return (
    <section className={`${styles.section} ${styles.closing}`}>
      <div className={`${styles.container} ${styles.closingGrid}`}>
        <div>
          <h2 className={styles.sectionTitle}>
            Let&apos;s build structures that last<br />and facades that inspire.
          </h2>
          <p className={`${styles.sectionCopy} ${styles.closingCopy}`}>
            Partner with us to bring stability, safety, and modern facade performance to your next development.
          </p>
          <div className={styles.buttons}>
            <Link className={`${styles.button} ${styles.buttonOutline}`} href="/contact">
              Let&apos;s connect <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className={styles.closingVisual}>
          <Image 
            src="/images/services/civil/structural-steel.jpg" 
            alt="Structural steel framework of a modern building" 
            fill 
            sizes="(max-width: 1023px) 100vw, 57vw" 
          />
          <div className={styles.goldEdge} />
        </div>
      </div>
    </section>
  );
}
