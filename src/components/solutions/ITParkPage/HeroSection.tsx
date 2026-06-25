"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroFeatures } from "@/data/itParksData";
import GoldDivider from "./GoldDivider";
import { DraftingCompass, iconMap } from "./icons";
import styles from "./ITParkPage.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className={styles.breadcrumb}>
              <Link href="/solutions">Solutions</Link>
              <span>{">"}</span>
              <strong>IT Parks & Tech Campuses</strong>
            </div>
            <h1 className={styles.heroTitle}>
              IT PARKS &amp;
              <br />
              TECH CAMPUSES
            </h1>
            <GoldDivider />
            <h2 className={styles.heroTagline}>
              Built for Innovation.
              <br />
              Designed for Impact.
            </h2>
            <p className={styles.heroBody}>
              We design and build future-ready IT parks and tech campuses that foster productivity,
              collaboration, and wellbeing-delivering intelligent spaces that adapt to today's
              dynamic businesses and tomorrow's growth.
            </p>
            <div className={styles.heroFeatures}>
              {heroFeatures.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <motion.div
                    className={styles.heroFeature}
                    key={feature.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 + index * 0.06 }}
                  >
                    <Icon size={30} strokeWidth={1.55} />
                    <span>{feature.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.heroImageColumn}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
        >
          <div className={styles.heroImageClip}>
            <Image
              src="/images/solutions/it-parks/hero-campus.png"
              alt="Modern glass IT park campus with landscaped central plaza"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroInfoCard}>
            <span className={styles.heroInfoBadge}>
              <DraftingCompass size={24} strokeWidth={1.55} />
            </span>
            <p>Intelligent spaces that power ideas, people and progress.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
