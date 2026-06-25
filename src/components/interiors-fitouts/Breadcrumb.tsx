import React from 'react';
import Link from 'next/link';
import styles from './Interiors.module.css';

const Breadcrumb = () => {
  return (
    <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
      <Link href="/" className="hover:text-[#1A1410] transition-colors">
        Home
      </Link>
      <span className={styles.crumbArrow}>›</span>
      <Link href="/services" className="hover:text-[#1A1410] transition-colors">
        Services
      </Link>
      <span className={styles.crumbArrow}>›</span>
      <b>Interiors &amp; Fitouts</b>
    </nav>
  );
};

export default Breadcrumb;
