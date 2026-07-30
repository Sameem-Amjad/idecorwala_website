import type { Metadata } from "next";
import Breadcrumb from "@/components/services/design-architecture/Breadcrumb";
import ClosingCtaSection from "@/components/services/design-architecture/ClosingCtaSection";
import DesignJourneySection from "@/components/services/design-architecture/DesignJourneySection";
import HeroSection from "@/components/services/design-architecture/HeroSection";
import StatsBand from "@/components/services/design-architecture/StatsBand";
import ThoughtfulDesignSection from "@/components/services/design-architecture/ThoughtfulDesignSection";
import WhatWeOfferSection from "@/components/services/design-architecture/WhatWeOfferSection";
import styles from "@/components/services/design-architecture/DesignArchitecture.module.css";

export const metadata: Metadata = {
  title: "Design & Architecture | iDecorwala",
  description: "End-to-end architectural design, interior architecture and spatial strategy for high-performance environments.",
};import FooterSection from "@/components/sections/FooterSection";

export default function DesignArchitecturePage() {
  return <main className={styles.page}><Breadcrumb /><HeroSection /><DesignJourneySection /><WhatWeOfferSection /><ThoughtfulDesignSection /><StatsBand /><ClosingCtaSection /><FooterSection /></main>;
}
