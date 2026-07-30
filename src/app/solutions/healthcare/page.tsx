import React from "react";
import type { Metadata } from "next";

import HealthcareHero from "@/components/solutions/HealthcareHero";
import HealthcareServices from "@/components/solutions/HealthcareServices";
import HealthcareProcess from "@/components/solutions/HealthcareProcess";
import HealthcareAI from "@/components/solutions/HealthcareAI";
import HealthcareCTA from "@/components/solutions/HealthcareCTA";
import HealthcareTrustStrip from "@/components/solutions/HealthcareTrustStrip";
import FooterSection from "@/components/sections/FooterSection";
import styles from "@/components/solutions/Healthcare.module.css";

export const metadata: Metadata = {
  title: "Healthcare Solutions | iDecorwala",
  description: "Spaces designed for care. Built for impact. Discover end-to-end interior solutions for hospitals, clinics, and more.",
};

export default function HealthcareSolutionsPage() {
  return (
    <main className={styles.page}>
      <HealthcareHero />
      <HealthcareServices />
      <HealthcareProcess />
      <HealthcareAI />
      <HealthcareCTA />
      <HealthcareTrustStrip />
      <FooterSection />
    </main>
  );
}
