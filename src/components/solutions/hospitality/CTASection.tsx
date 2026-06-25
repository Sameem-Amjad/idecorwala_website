import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import styles from "./Hospitality.module.css";

export default function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={`${styles.container} ${styles.ctaInner}`}>
        <div className={styles.ctaText}>
          <div className={styles.ctaIcon}>
            <PhoneCall size={31} strokeWidth={1.35} />
          </div>
          <div>
            <h2>Let&apos;s Build Exceptional Hospitality Spaces</h2>
            <p>Together, we can create spaces that inspire your guests and elevate your brand.</p>
          </div>
        </div>
        <Link className={styles.ctaButton} href="/contact">
          Let&apos;s Connect <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}