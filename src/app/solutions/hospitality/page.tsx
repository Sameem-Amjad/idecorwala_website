import type { Metadata } from "next";
import FooterSection from "@/components/sections/FooterSection";
import AISection from "@/components/solutions/hospitality/AISection";
import CTASection from "@/components/solutions/hospitality/CTASection";
import HeroSection from "@/components/solutions/hospitality/HeroSection";
import ProcessSection from "@/components/solutions/hospitality/ProcessSection";
import ServicesSection from "@/components/solutions/hospitality/ServicesSection";
import styles from "@/components/solutions/hospitality/Hospitality.module.css";

export const metadata: Metadata = {
  title: "Hospitality Interior Solutions | iDecorwala",
  description: "Premium hospitality interiors designed for exceptional guest experiences and operational performance.",
};

export default function HospitalityPage() {
  return (
    <main className={styles.page}>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <AISection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
