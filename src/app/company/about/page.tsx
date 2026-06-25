import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import ClosingQuote from "@/components/about/ClosingQuote";
import OurStorySection from "@/components/about/OurStorySection";
import OurValuesSection from "@/components/about/OurValuesSection";
import StatsStrip from "@/components/about/StatsStrip";
import TeamMissionSection from "@/components/about/TeamMissionSection";
import OurTeamSection from "@/components/about/OurTeamSection";
import FooterSection from "@/components/sections/FooterSection";
import styles from "@/components/about/About.module.css";

export const metadata: Metadata = {
  title: "About Us | iDecorwala",
  description: "Discover iDecorwala's story, values, scale and multidisciplinary team.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <AboutHero />
      <OurStorySection />
      <OurValuesSection />
      <StatsStrip />
      <TeamMissionSection />
      <OurTeamSection />
      <ClosingQuote />
      <FooterSection />
    </main>
  );
}