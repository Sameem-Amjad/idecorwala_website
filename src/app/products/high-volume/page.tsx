import type { Metadata } from "next";
import Breadcrumb from "@/components/high-volume/Breadcrumb";
import ClosingCTABanner from "@/components/high-volume/ClosingCTABanner";
import HeroSection from "@/components/high-volume/HeroSection";
import ProductRangeSection from "@/components/high-volume/ProductRangeSection";
import StatsBand from "@/components/high-volume/StatsBand";
import WhyChooseSection from "@/components/high-volume/WhyChooseSection";
import styles from "@/components/high-volume/HighVolume.module.css";

export const metadata: Metadata = { 
  title: "High Volume Products | iDecorwala", 
  description: "Scalable doors, frames, partitions, ceiling systems, panels and fittings for high-volume projects." 
};

import FooterSection from "@/components/sections/FooterSection";

export default function HighVolumeProductsPage() {
  return <main className={`${styles.page} pt-[76px]`}>
    <Breadcrumb />
    <HeroSection />
    <ProductRangeSection />
    <StatsBand />
    <WhyChooseSection />
    <ClosingCTABanner />
    <FooterSection />
    </main>;
}
