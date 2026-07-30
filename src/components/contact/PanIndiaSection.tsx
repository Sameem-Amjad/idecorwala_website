'use client';

import React from 'react';
import styles from './contact.module.css';

const cities = [
  { name: "Mumbai", Icon: () => (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[35px] text-[#bd8a30] stroke-current stroke-[1.5] mx-auto">
      <path d="M10 50h40M15 50V20h30v30M22 50V35a8 8 0 0 1 16 0v15M10 20h40M15 20v-5h30v5M18 15V5h4v10M38 15V5h4v10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { name: "Pune", Icon: () => (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[35px] text-[#bd8a30] stroke-current stroke-[1.5] mx-auto">
      <path d="M5 50h50M15 50V25l5-5h20l5 5v25M25 50V35a5 5 0 0 1 10 0v15M10 25v-5l5-5h30l5 5v5M15 15V5l5-2h20l5 2v10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { name: "Bangalore", Icon: () => (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[35px] text-[#bd8a30] stroke-current stroke-[1.5] mx-auto">
      <path d="M5 50h50M10 50V30h40v20M15 30v-5h30v5M30 25a15 15 0 0 0-15-15h30a15 15 0 0 0-15 15zM28 10V2h4v8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { name: "Hyderabad", Icon: () => (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[35px] text-[#bd8a30] stroke-current stroke-[1.5] mx-auto">
      <path d="M10 50h40M15 50V15M45 50V15M20 50v-5h20v5M25 45V30a5 5 0 0 1 10 0v15M15 15h30M10 15V5l5-3 5 3v10M40 15V5l5-3 5 3v10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { name: "Delhi NCR", Icon: () => (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[35px] text-[#bd8a30] stroke-current stroke-[1.5] mx-auto">
      <path d="M5 50h50M15 50V15h30v35M22 50V30a8 8 0 0 1 16 0v20M10 15h40M25 15v-5h10v5M28 10V5h4v5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { name: "Chennai", Icon: () => (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[35px] text-[#bd8a30] stroke-current stroke-[1.5] mx-auto">
      <path d="M10 50h40M15 50l5-35h20l5 35M20 40h20M22 30h16M24 20h12M20 15l2-10h16l2 10M30 5V0" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { name: "Ahmedabad", Icon: () => (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[35px] text-[#bd8a30] stroke-current stroke-[1.5] mx-auto">
      <path d="M10 50h40M15 50V25a15 15 0 0 1 30 0v25M15 25h30M30 25v25M30 25C25 35 20 40 15 50M30 25c5 10 10 15 15 25M30 25c-5 0-10-5-10-10M30 25c5 0 10-5 10-10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
];

export default function PanIndiaSection() {
  return (
    <section className={styles.panIndia}>
      <div className={styles.valueWedge} style={{ width: '290px' }} />
      <div className={`${styles.container} ${styles.panIndiaInner}`}>
        <div className={styles.panIndiaHeading}>
          <div className={styles.eyebrow}>Our Reach</div>
          <h2 className={styles.sectionTitle}>Pan India<br />Execution</h2>
          <div className={styles.ornament}><i /></div>
        </div>
        
        <div className={styles.panIndiaGrid}>
          {cities.map((city) => {
            const IconComponent = city.Icon;
            return (
              <article className={styles.panIndiaItem} key={city.name}>
                <div className={styles.panIndiaIcon}>
                  <IconComponent />
                </div>
                <h3>{city.name}</h3>
              </article>
            );
          })}
        </div>
        
        <p className={styles.panIndiaCopy}>
          Delivering projects across hospitality, healthcare, workplaces, retail, and infrastructure.
        </p>
      </div>
    </section>
  );
}
