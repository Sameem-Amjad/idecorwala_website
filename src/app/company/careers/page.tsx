import React from "react";

import FooterSection from "@/components/sections/FooterSection";

import CareersHero from "@/components/careers/CareersHero";
import CareersValues from "@/components/careers/CareersValues";
import CareersWhyJoinCulture from "@/components/careers/CareersWhyJoinCulture";
import CareersCtaBanner from "@/components/careers/CareersCtaBanner";
import styles from "@/components/careers/Careers.module.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | iDecorwala Enterprise",
  description: "Build your career, shape spaces, and leave a legacy. Join the team at iDecorwala.",
  alternates: {
    canonical: "/company/careers",
  },
};

export default function CareersPage() {
  return (
    <main className={styles.page}>
      <CareersHero />
      <CareersValues />
      <CareersWhyJoinCulture />
      <CareersCtaBanner />
      <FooterSection />
    </main>
  );
}

