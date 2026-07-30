import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import styles from "./About.module.css";

export default function AboutHero() {
  return <section className={styles.hero}><nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb"><span>Home</span><span>›</span><b>About Us</b></nav><div className={`${styles.container} ${styles.heroGrid}`}><div><h1 className={styles.heroTitle}>About Us</h1><div className={styles.ornament}><i /></div><h2 className={styles.heroSubhead}>Designing Spaces.<br />Building Better Futures.</h2><p className={styles.heroCopy}>At iDecorwala, we believe that great spaces have the power to inspire, perform, and transform lives.</p><Link className={styles.button} href="#our-story">Our story <ArrowRight size={15} /></Link></div><div className={styles.heroVisual}><div className={styles.heroFrame}><div className={styles.heroImage}><Image src="/images/about/about-lobby.png" alt="Warm double-height corporate reception lobby" fill priority sizes="(max-width: 1100px) 100vw, 57vw" /></div><div className={styles.wordmark}><div className={styles.brandMark} /><strong>iDECORWALA</strong></div></div><div className={styles.heroCard}><div className={styles.heroCardIcon}><Building2 size={28} strokeWidth={1.35} /></div><div><p>Spaces that perform.<br />Built on certainty.<br />Delivered with impact.</p><div className={styles.heroCardLine} /></div></div></div></div></section>;
}
