'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { deliverItems } from '@/data/interiorsFitouts';
import styles from './Interiors.module.css';

const WhatWeDeliverSection = () => {
  return (
    <section className={`${styles.section} ${styles.offer}`}>
      <div className={`${styles.container} ${styles.offerGrid}`}>
        <aside>
          <div className={styles.eyebrow}>What We Offer</div>
          <h2 className={styles.sectionTitle}>Comprehensive Interior Capabilities</h2>
          <div className={styles.ornament}>
            <i />
          </div>
          <p className={styles.sectionCopy}>
            We design and deliver highly resolved spatial experiences, balancing fine craftsmanship with architectural details.
          </p>
        </aside>

        <div className={styles.offerCards}>
          {deliverItems.map((item, index) => {
            const Icon = (LucideIcons as any)[item.iconName] || LucideIcons.HelpCircle;
            return (
              <motion.article
                className={styles.offerCard}
                key={item.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Icon size={33} strokeWidth={1.35} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDeliverSection;
