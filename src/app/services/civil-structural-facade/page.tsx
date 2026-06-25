import React from "react";
import type { Metadata } from "next";

import CivilBreadcrumb from "@/components/services/civil/CivilBreadcrumb";
import CivilHero from "@/components/services/civil/CivilHero";
import CivilSolutions from "@/components/services/civil/CivilSolutions";
import CivilProcess from "@/components/services/civil/CivilProcess";
import CivilCapabilities from "@/components/services/civil/CivilCapabilities";
import CivilProjectTypes from "@/components/services/civil/CivilProjectTypes";
import CivilStats from "@/components/services/civil/CivilStats";
import CivilCTA from "@/components/services/civil/CivilCTA";
import FooterSection from "@/components/sections/FooterSection";
import styles from "@/components/services/civil/Civil.module.css";

export const metadata: Metadata = {
  title: "Civil, Structural & Facade | iDecorwala",
  description: "We deliver integrated engineering solutions that bring strength, stability and sophistication to every project.",
};

export default function CivilStructuralFacadePage() {
  return (
    <main className={styles.page}>
      <CivilBreadcrumb />
      <CivilHero />
      <CivilSolutions />
      <CivilProcess />
      <CivilCapabilities />
      <CivilProjectTypes />
      <CivilStats />
      <CivilCTA />
      <FooterSection />
    </main>
  );
}
