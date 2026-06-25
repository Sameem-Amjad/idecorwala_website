import React from "react";
import FooterSection from "@/components/sections/FooterSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactCategoryStrip from "@/components/contact/ContactCategoryStrip";
import PanIndiaSection from "@/components/contact/PanIndiaSection";
import StatsStrip from "@/components/contact/StatsStrip";

export const metadata = {
  title: "Contact Us | iDecorwala Enterprise",
  description: "Connect with India's most agile institutional solutions provider.",
};

export default function ContactPage() {
  return <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#F5EFE6] pt-[76px]"><div className="flex-grow"><ContactHero /><ContactCategoryStrip /><PanIndiaSection /><StatsStrip /></div><FooterSection /></main>;
}
