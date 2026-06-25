import React from 'react';

import FooterSection from '@/components/sections/FooterSection';
import Breadcrumb from '@/components/interiors-fitouts/Breadcrumb';
import HeroSection from '@/components/interiors-fitouts/HeroSection';
import WhatWeDeliverSection from '@/components/interiors-fitouts/WhatWeDeliverSection';
import ProcessSection from '@/components/interiors-fitouts/ProcessSection';
import DifferentiatorsSection from '@/components/interiors-fitouts/DifferentiatorsSection';
import ClosingCtaStatsSection from '@/components/interiors-fitouts/ClosingCtaStatsSection';
import styles from '@/components/interiors-fitouts/Interiors.module.css';

export const metadata = {
  title: 'Interiors & Fitouts | iDecorwala',
  description: 'Premium interiors and bespoke fitouts engineered with architectural integrity. Discover our comprehensive services spanning residential, commercial, retail, and hospitality spaces.',
};

export default function InteriorsFitoutsPage() {
  return (
    <main className={styles.page}>
      <Breadcrumb />
      <HeroSection />
      <WhatWeDeliverSection />
      <ProcessSection />
      <DifferentiatorsSection />
      <ClosingCtaStatsSection />
      <FooterSection />
    </main>
  );
}

