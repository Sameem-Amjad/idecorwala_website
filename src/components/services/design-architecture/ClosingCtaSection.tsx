import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./DesignArchitecture.module.css";

export default function ClosingCtaSection() {
  return <section className={`${styles.section} ${styles.closing}`}><div className={`${styles.container} ${styles.closingGrid}`}><div><h2 className={styles.sectionTitle}>Let&apos;s Design Spaces<br />That Inspire and Endure.</h2><p className={`${styles.sectionCopy} ${styles.closingCopy}`}>Share your vision with us. Together, we&apos;ll create environments that make a difference.</p><div className={styles.buttons}><Link className={`${styles.button} ${styles.buttonOutline}`} href="/contact">Let&apos;s connect <ArrowRight size={15} /></Link></div></div><div className={styles.closingVisual}><Image src="/images/services/design-architecture/closing-pavilion.png" alt="Architectural sketch of a modern glass pavilion" fill sizes="(max-width: 1023px) 100vw, 57vw" /><div className={styles.goldEdge} /></div></div></section>;
}
