import type { Metadata } from "next";

import HeroSection from "@/components/solutions/ITParkPage/HeroSection";
import StatsBanner from "@/components/solutions/ITParkPage/StatsBanner";
import ServicesGrid from "@/components/solutions/ITParkPage/ServicesGrid";
import TechFeaturePanel from "@/components/solutions/ITParkPage/TechFeaturePanel";
import ProcessTimeline from "@/components/solutions/ITParkPage/ProcessTimeline";import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "IT Parks & Tech Campuses | iDecorwala",
  description:
    "Future-ready IT parks and technology campuses designed for innovation, productivity, resilience and enterprise growth.",
};

export default function ITParksTechCampusesPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-[#EDE5D6] pt-[76px]">
      <HeroSection />
      <StatsBanner />
      <ServicesGrid />
      <TechFeaturePanel />
      <ProcessTimeline />
      <FooterSection />
    </main>
  );
}
