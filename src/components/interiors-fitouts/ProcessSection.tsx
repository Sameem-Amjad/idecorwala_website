'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenLine, Palette, FileText, CheckCircle } from 'lucide-react';
import { processSteps } from '@/data/interiorsFitouts';
import styles from './Interiors.module.css';

const stepIcons = [Search, PenLine, Palette, FileText, CheckCircle];

const ProcessSection = () => {
  return (
    <section className={`${styles.section} ${styles.journey}`} id="interiors-process">
      <div className={styles.container}>
        <div className={styles.centerHeading}>
          <div className={styles.eyebrow}>Methodology</div>
        </div>
        <div className={`${styles.ornament} ${styles.centerOrnament}`}>
          <i />
        </div>

        <div className={styles.timeline}>
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index] || Search;
            return (
              <motion.article
                className={styles.journeyStep}
                key={step.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className={styles.stepIcon}>
                  <Icon size={28} strokeWidth={1.35} />
                </div>
                <div className={styles.stepNumber}>{step.stepNumber}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
