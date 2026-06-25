import React from "react";
import type { Metadata } from "next";
import ManufacturingHero from "@/components/solutions/manufacturing/ManufacturingHero";
import ManufacturingStats from "@/components/solutions/manufacturing/ManufacturingStats";
import ManufacturingGrid from "@/components/solutions/manufacturing/ManufacturingGrid";
import ManufacturingProcess from "@/components/solutions/manufacturing/ManufacturingProcess";
import ManufacturingCTA from "@/components/solutions/manufacturing/ManufacturingCTA";
import FooterSection from "@/components/sections/FooterSection";
import styles from "@/components/solutions/manufacturing/Manufacturing.module.css";

export const metadata: Metadata = {
  title: "Manufacturing & Infrastructure | iDecorwala",
  description: "Engineered spaces and infrastructure built for operational performance.",
};

export default function ManufacturingSolutionsPage() {
  return (
    <main className={`${styles.page} pt-[76px]`}>
      <ManufacturingHero />
      <ManufacturingStats />
      <ManufacturingGrid />
      <ManufacturingProcess />
      <ManufacturingCTA />
      <FooterSection />
    </main>
  );
}
