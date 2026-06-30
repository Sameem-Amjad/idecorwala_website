import React from "react";
import type { Metadata } from "next";
import Breadcrumb from "@/components/thought-leadership/Breadcrumb";
import ThoughtHero from "@/components/thought-leadership/ThoughtHero";
import OurPerspective from "@/components/thought-leadership/OurPerspective";
import ThoughtLeadershipList from "@/components/thought-leadership/ThoughtLeadershipList";
import ExploreByTopic from "@/components/thought-leadership/ExploreByTopic";
import SubscribeBanner from "@/components/thought-leadership/SubscribeBanner";
import FooterSection from "@/components/sections/FooterSection";
import styles from "@/components/thought-leadership/ThoughtLeadership.module.css";

export const metadata: Metadata = {
  title: "Thought Leadership | iDecorwala / Spacefold InteriorTech",
  description:
    "Ideas that inspire. Insights that build a better future. Explore our perspectives on sustainable design, future built environments, and industry trends.",
  alternates: {
    canonical: "/company/thought-leadership",
  },
};

export default function ThoughtLeadershipPage() {
  return (
    <main className={`${styles.page} pt-[76px]`}>
      <Breadcrumb />
      <ThoughtHero />
      <OurPerspective />
      <ThoughtLeadershipList />
      <ExploreByTopic />
      <SubscribeBanner />
      <FooterSection />
    </main>
  );
}
