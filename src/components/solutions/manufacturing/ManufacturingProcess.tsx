"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { manufacturingProcess, manufacturingFeatures } from "@/data/manufacturing";
import styles from "./Manufacturing.module.css";

export default function ManufacturingProcess() {
  return (
    <section className={styles.why}>
      <div className={`${styles.container} ${styles.whyGrid}`}>
        {/* Left Column: Timeline Steps as reasons list */}
        <div>
          <div className={styles.whyHeader}>
            <div className={styles.eyebrow}>Our Process</div>
            <div className={styles.ornament}>
              <span />
            </div>
          </div>
          
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#761416] leading-[1.15] mb-6 uppercase">
            Planned with Precision.<br />Built for Impact.
          </h2>

          <div className={styles.reasonList}>
            {manufacturingProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article 
                  className={styles.reason} 
                  key={step.num}
                  initial={{ opacity: 0, x: -12 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <div className={styles.reasonIcon}>
                    <Icon size={27} strokeWidth={1.35} />
                  </div>
                  <div>
                    <h3>{step.num} - {step.name}</h3>
                    <p>{step.desc}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dark Quote Panel as Ideal section */}
        <div className={styles.ideal}>
          <div className={styles.whyHeader}>
            <div className={styles.eyebrow}>Core Capabilities</div>
            <div className={styles.ornament}>
              <span />
            </div>
          </div>

          <div className="rounded-[22px] bg-gradient-to-br from-[#1b1714] to-[#322c27] pl-12 sm:pl-16 lg:pl-20 pr-8 sm:pr-10 lg:pr-12 py-10 lg:py-12 text-[#fff8eb] shadow-xl mt-6 border border-[#c9a050]/20">
            <span className="font-serif text-[#c9a050] text-[48px] leading-none mb-2 block">“</span>
            <p className="font-serif italic text-lg sm:text-xl leading-[1.65] text-[#faf6ee] mb-6">
              We build environments that strengthen industries and shape the future of manufacturing.
            </p>
            
            <div className="w-16 h-[1.5px] bg-[#c9a050]/40 mb-8" />

            <div className="flex flex-col gap-8">
              {manufacturingFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full border border-[#c9a050]/40 flex items-center justify-center text-[#c9a050] shrink-0 mt-0.5">
                      <Icon size={16} strokeWidth={2} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-sans font-bold text-[16px] text-[#f7f6f2] leading-tight">{feature.title}</h4>
                      <p className="font-sans text-[14px] text-[#dfdccf]/85 mt-1 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
