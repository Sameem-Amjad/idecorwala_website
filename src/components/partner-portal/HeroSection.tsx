"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./PartnerPortal.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div>
          <div className={styles.breadcrumb}>
            <span>Collaborate</span>
            <span>›</span>
            <b>Create &amp; Grow</b>
          </div>
          
          <h1 className={styles.heroTitle}>Partner<br />Portal</h1>
          
          <div className={styles.ornament}>
            <i />
          </div>
          
          <h2 className={styles.tagline}>
            Stronger Partnerships.<br />Better Spaces. Greater Impact.
          </h2>
          
          <p className={styles.heroCopy}>
            Welcome to iDecorwala Partner Portal &mdash; your gateway to collaborate, create and grow with us. Together, we deliver innovative solutions and build environments that inspire.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 18 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.25 }} 
            className="mt-12 flex flex-col gap-4 sm:flex-row items-stretch sm:items-center justify-start"
          >
            <Link 
              href="/contact" 
              className="inline-flex h-12 items-center justify-center gap-3 bg-[#861619] px-8 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#c39a48] shrink-0 text-center"
              style={{ minWidth: "245px" }}
            >
              <span className="w-full text-center flex items-center justify-center gap-2">
                Join Our Partner Network <ArrowRight size={14} className="inline-block" />
              </span>
            </Link>
            <Link 
              href="/partner-portal" 
              className="inline-flex h-12 items-center justify-center gap-3 border border-[#1b1714] px-8 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1b1714] transition-all hover:-translate-y-0.5 hover:border-[#c39a48] hover:text-[#c39a48] shrink-0 text-center"
              style={{ minWidth: "210px" }}
            >
              <span className="w-full text-center flex items-center justify-center gap-2">
                Login to Portal <ArrowRight size={14} className="inline-block" />
              </span>
            </Link>
          </motion.div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImage}>
            <Image 
              src="/images/partner-portal/hero-render.jpg" 
              alt="Modern glass architecture with blueprint rolls and drafting pen" 
              fill 
              priority 
              sizes="(max-width:1023px) 100vw,54vw"
              className="object-cover"
            />
            <div className={styles.goldLine} />
          </div>
          <div className={styles.quoteCard}>
            <div className={styles.quoteMark}>“</div>
            <p>Building better environments through trusted partnerships.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
