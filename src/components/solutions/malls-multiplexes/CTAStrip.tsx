import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ctaIcon as BuildingIcon } from "@/data/mallsMultiplexesData";
import styles from "./MallsMultiplexes.module.css";

export default function CTAStrip(){return <section className={styles.cta}><div className={`${styles.container} ${styles.ctaInner}`}><div className={styles.ctaText}><div className={styles.ctaIcon}><BuildingIcon size={31} strokeWidth={1.35}/></div><div><h2>Let&apos;s Build Iconic Destinations Together</h2><p>Partner with us to create malls and multiplexes that set new benchmarks in design, experience and commercial success.</p></div></div><Link className={styles.ctaButton} href="/contact">Let&apos;s Connect <ArrowRight size={15}/></Link></div></section>}

