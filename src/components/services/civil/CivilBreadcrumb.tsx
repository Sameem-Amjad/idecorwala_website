import React from "react";
import Link from "next/link";
import styles from "./Civil.module.css";

export default function CivilBreadcrumb() {
  return (
    <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
      <Link href="/" className="hover:text-[#1A1410] transition-colors">Home</Link>
      <span className={styles.crumbArrow}>›</span>
      <Link href="/services" className="hover:text-[#1A1410] transition-colors">Services</Link>
      <span className={styles.crumbArrow}>›</span>
      <b>Civil, Structural &amp; Facade</b>
    </nav>
  );
}
