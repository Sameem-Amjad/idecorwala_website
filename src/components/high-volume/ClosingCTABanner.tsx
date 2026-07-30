import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";
import styles from "./HighVolume.module.css";

export default function ClosingCTABanner() {
  return <section className={styles.cta}><div className={styles.container}><div className={styles.ctaCard}><div className={styles.ctaIcon}><Boxes size={31} strokeWidth={1.4} /></div><div className={styles.ctaText}><h2>High Volume. High Standards.<span>One Partner You Can Rely On.</span></h2><p>Let&apos;s build better, together.</p></div><Link className={styles.button} href="/contact">Talk to our experts <ArrowRight size={15} /></Link></div></div></section>;
}
