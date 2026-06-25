'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Careers.module.css';

export default function CareersCtaBanner() {
  return (
    <section className={`${styles.section} ${styles.closing}`}>
      <div className={`${styles.container} ${styles.closingGrid}`}>
        <div>
          <h2 className={styles.sectionTitle}>
            Let&apos;s build a better future, together.
          </h2>
          <p className={`${styles.sectionCopy} ${styles.closingCopy}`}>
            Take the next step in your career with iDecorwala. Explore our openings or connect with our recruitment team.
          </p>
          <div className={styles.buttons}>
            <Link className={`${styles.button} ${styles.buttonOutline}`} href="/contact">
              Join Our Team <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className={styles.closingVisual}>
          <Image 
            src="/images/careers/culture_photo.png" 
            alt="iDecorwala collaborative office team culture" 
            fill 
            sizes="(max-width: 1023px) 100vw, 57vw" 
            className="object-cover"
          />
          <div className={styles.goldEdge} />
        </div>
      </div>
    </section>
  );
}
