import type { Metadata } from "next";
import FooterSection from "@/components/sections/FooterSection";
import ContactInfoStrip from "@/components/partner-portal/ContactInfoStrip";
import HeroSection from "@/components/partner-portal/HeroSection";
import HowItWorksNetworkWrapper from "@/components/partner-portal/HowItWorksNetworkWrapper";
import PartnerCTABanner from "@/components/partner-portal/PartnerCTABanner";
import PartnerResourcesSection from "@/components/partner-portal/PartnerResourcesSection";
import WhyPartnerSection from "@/components/partner-portal/WhyPartnerSection";
import styles from "@/components/partner-portal/PartnerPortal.module.css";

export const metadata: Metadata = {
  title: "Partner Portal | iDecorwala",
  description: "Join the iDecorwala partner network and build better environments through trusted collaboration.",
};

export default function PartnerPortalPage() {
  return (
    <main className={styles.page}>
      <HeroSection />
      <WhyPartnerSection />
      <HowItWorksNetworkWrapper />
      <PartnerResourcesSection />
      <PartnerCTABanner />
      <ContactInfoStrip />
      <FooterSection />
    </main>
  );
}

