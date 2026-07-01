"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory } from "lucide-react";
import { motion } from "framer-motion";
import { heroFeatures } from "@/data/highVolumeProducts";
import styles from "./HighVolume.module.css";

import type { ProductCategory } from "@/lib/supabaseClient";

interface HeroSectionProps {
  category?: ProductCategory;
  isDynamicSlug?: boolean;
}

export default function HeroSection({ category, isDynamicSlug }: HeroSectionProps) {
  const eyebrow = category?.name || "High Volume Products";
  const title = category?.hero_title || "BUILT FOR SCALE.\nDELIVERED FOR IMPACT.";
  const copy = category?.hero_subtitle || category?.description || "Our high volume products are engineered for speed, consistency and cost-efficiency without compromising on quality. Designed to meet the demands of large-scale projects across generations and geographies.";
  const heroImage = category?.hero_image_url || "/images/products/high-volume/factory-floor.png";
  const sampleCardImage = "/images/products/high-volume/material-stack.png";

  return <section className={styles.hero}><div className={`${styles.container} ${styles.heroGrid}`}><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><div className={styles.eyebrow}>{eyebrow}</div><div className={styles.ornament}><span /></div><h1 className={styles.heroTitle}>{title.split('\n').map((line, i) => <span key={i}>{line}{i < title.split('\n').length - 1 && <br />}</span>)}</h1><div className={styles.ornament}><span /></div><p className={styles.heroCopy}>{copy}</p><div className={styles.heroFeatures}>{heroFeatures.map(({ icon: Icon, label }) => <div className={styles.heroFeature} key={label}><Icon size={28} strokeWidth={1.5} /><span>{label}</span></div>)}</div><Link className={styles.button} href="#product-range">Explore our products <ArrowRight size={15} /></Link></motion.div><motion.div className={styles.heroVisual} initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .1 }}><div className={styles.heroFrame}><div className={styles.heroImage}><Image src={heroImage} alt={category?.name || "Door and panel manufacturing facility"} fill priority sizes="(max-width: 767px) 100vw, 54vw" /></div></div>{!isDynamicSlug && <div className={styles.heroBadge}><Factory size={30} strokeWidth={1.4} /><p>Engineered for volume. Built for performance.</p><i /></div>}{!isDynamicSlug && <div className={styles.sampleCard}><Image src={sampleCardImage} alt="Layered wood and laminate panel samples" fill sizes="245px" /></div>}</motion.div></div></section>;
}
