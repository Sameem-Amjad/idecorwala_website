"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import styles from "./PartnerPortal.module.css";

export default function PartnerCTABanner() {
  return (
    <section className={styles.cta}>
      <div className={`${styles.container} ${styles.ctaInner}`}>
        <div className={styles.ctaText}>
          <div className={styles.ctaIcon}>
            <Users size={31} strokeWidth={1.35} />
          </div>
          <div>
            <h2>Let&apos;s build better environments, together.</h2>
            <p>Join our partner network and be a part of a journey that creates impact.</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link className={styles.ctaButton} href="/contact">
            Join Our Partner Network <ArrowRight size={15} />
          </Link>
          <Link 
            className="inline-flex items-center gap-4 px-8 py-3.5 border border-[#c39a48] rounded-[4px] text-[12px] font-bold uppercase tracking-[0.1em] text-[#a77824] transition-all hover:bg-[#c39a48] hover:text-[#1b1714]" 
            href="/partner-portal"
          >
            Login to Portal <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
