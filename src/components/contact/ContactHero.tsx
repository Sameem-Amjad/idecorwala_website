'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './contact.module.css';

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <span>Home</span>
        <span>›</span>
        <b>Contact Us</b>
      </nav>
      
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <div className={styles.ornament}>
            <i />
          </div>
          
          <h2 className={styles.heroSubhead}>
            Let&apos;s Build<br />Experiences That Last.
          </h2>
          
          <p className={styles.heroCopy}>
            Partner with India&apos;s most agile institutional solutions provider. From concept to execution, we deliver environments that perform.
          </p>
          
          <a className={styles.button} href="mailto:partner@idecorwala.com">
            Get In Touch <ArrowRight size={15} />
          </a>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroFrame}>
            <div className={styles.heroImage}>
              <Image 
                src="/images/contact/hero_architecture.png" 
                alt="Modern structural architecture blueprint render" 
                fill 
                priority 
                sizes="(max-width: 1100px) 100vw, 57vw" 
                className="object-cover mix-blend-multiply"
              />
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.heroCardIcon}>
              <ArrowRight size={28} strokeWidth={1.35} />
            </div>
            <div>
              <p>Connect with us.<br />Collaborate on certainty.<br />Build with impact.</p>
              <div className={styles.heroCardLine} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
