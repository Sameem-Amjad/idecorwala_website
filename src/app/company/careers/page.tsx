import React from "react";

import FooterSection from "@/components/sections/FooterSection";

import CareersHero from "@/components/careers/CareersHero";
import CareersValues from "@/components/careers/CareersValues";
import CareersWhyJoinCulture from "@/components/careers/CareersWhyJoinCulture";
import CareersCtaBanner from "@/components/careers/CareersCtaBanner";
import styles from "@/components/careers/Careers.module.css";

export const metadata = {
  title: "Careers | iDecorwala Enterprise",
  description: "Build your career, shape spaces, and leave a legacy. Join the team at iDecorwala.",
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

