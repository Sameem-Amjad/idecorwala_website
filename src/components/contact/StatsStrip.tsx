'use client';

import React from 'react';
import { Box, Users, Award, ShieldCheck } from 'lucide-react';
import styles from './contact.module.css';

const stats = [
  { id: 'projects', value: "150+", label: "Projects Delivered", Icon: Box },
  { id: 'clients', value: "100+", label: "Happy Clients", Icon: Users },
  { id: 'years', value: "20+", label: "Years of Excellence", Icon: Award },
  { id: 'pan_india', value: "Pan India", label: "Execution Capability", Icon: ShieldCheck },
];

export default function StatsStrip() {
  return (
    <section className={styles.statsSection}>
      <div className={`${styles.container} ${styles.statsPanel}`}>
        {stats.map(({ id, Icon, value, label }) => (
          <div className={styles.stat} key={id}>
            <div className={styles.statIcon}>
              <Icon size={24} strokeWidth={1.35} />
            </div>
            <div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
