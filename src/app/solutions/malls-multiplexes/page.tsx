import type { Metadata } from "next";
import CTAStrip from "@/components/solutions/malls-multiplexes/CTAStrip";
import HeroSection from "@/components/solutions/malls-multiplexes/HeroSection";
import OurApproachSection from "@/components/solutions/malls-multiplexes/OurApproachSection";
import WhatWeCreateSection from "@/components/solutions/malls-multiplexes/WhatWeCreateSection";
import WhyPartnerSection from "@/components/solutions/malls-multiplexes/WhyPartnerSection";
import styles from "@/components/solutions/malls-multiplexes/MallsMultiplexes.module.css";

export const metadata: Metadata = {
  title: "Malls & Multiplexes | iDecorwala",
  description: "High-performing retail, multiplex and entertainment destinations designed to increase footfall and long-term commercial value.",
};import FooterSection from "@/components/sections/FooterSection";

export default function MallsMultiplexesPage(){
  return <main className={styles.page}><HeroSection/><WhatWeCreateSection/><WhyPartnerSection/><OurApproachSection/><CTAStrip/><FooterSection /></main>;
}
