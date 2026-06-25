import HeadlineSection   from "@/components/sections/HeadlineSection";
import StatsStrip      from "@/components/sections/StatsStrip";
import ScrollSequenceSection from "@/components/sections/ScrollSequenceSection";
import ExperienceDimensionsSection from "@/components/sections/ExperienceDimensionsSection";
import OneEcosystemSection from "@/components/sections/OneEcosystemSection";
import IndustriesWeServeSection from "@/components/sections/IndustriesWeServeSection";
import SpacefoldFeatureSection from "@/components/sections/SpacefoldFeatureSection";
import ProjectShowcaseSection from "@/components/sections/ProjectShowcaseSection";
import ClientsBrandsSection from "@/components/sections/ClientsBrandsSection";
import BlogsSection from "@/components/sections/BlogsSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main>
      <ScrollSequenceSection>
        <HeadlineSection />
      </ScrollSequenceSection>
      <StatsStrip />
      <ExperienceDimensionsSection />
      <OneEcosystemSection />
      <IndustriesWeServeSection />
      <SpacefoldFeatureSection />
      <ProjectShowcaseSection />
      <ClientsBrandsSection />
      <BlogsSection />
      <FooterSection />
    </main>
  );
}