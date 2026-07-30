'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, ShieldCheck, Target, Leaf } from 'lucide-react';
import { values } from '@/data/careersData';
import styles from './Careers.module.css';

// Map icon names to Lucide components
const IconMap: Record<string, React.ElementType> = {
  people: Users,
  bulb: Lightbulb,
  shield: ShieldCheck,
  target: Target,
  leaf: Leaf,
};

export default function CareersValues() {
  return (
    <section className={`${styles.section} ${styles.journey}`} style={{ borderTop: "1px solid #eadfce" }}>
      <div className={styles.container}>
        <div className={styles.centerHeading}>
          <div className={styles.eyebrow}>Our Values</div>
        </div>
        <div className={`${styles.ornament} ${styles.centerOrnament}`}>
          <i />
        </div>

        <div className={styles.timeline}>
          {values.map((val, index) => {
            const Icon = IconMap[val.icon] || Users;
            const stepNumber = `0${index + 1}`;
            return (
              <motion.article
                className={styles.journeyStep}
                key={val.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className={styles.stepIcon}>
                  <Icon size={28} strokeWidth={1.35} />
                </div>
                <div className={styles.stepNumber}>{stepNumber}</div>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
