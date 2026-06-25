"use client";

import React from "react";
import { motion } from "framer-motion";
import { civilProjectTypes } from "@/data/civil";
import styles from "./Civil.module.css";

export default function CivilProjectTypes() {
  return (
    <section className={styles.section} style={{ borderTop: "1px solid #eadfce" }}>
      <div className={styles.container}>
        {/* Section Label */}
        <div className={styles.centerHeading}>
          <div className={styles.eyebrow}>We Work Across Diverse Projects</div>
        </div>
        <div className={`${styles.ornament} ${styles.centerOrnament}`}>
          <i />
        </div>

        {/* Icons Grid */}
        <div className="flex flex-wrap justify-center gap-y-[32px] md:gap-y-[40px] lg:flex-nowrap lg:justify-between w-full mt-10">
          {civilProjectTypes.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col items-center justify-center w-[25%] md:w-[20%] lg:w-auto px-[10px] cursor-default"
              >
                <div className="w-[40px] h-[40px] md:w-[44px] md:h-[44px] text-[#b8862e] mb-[12px] transition-transform duration-300 group-hover:scale-[1.08] flex items-center justify-center">
                  <Icon size={40} strokeWidth={1} className="w-full h-full" />
                </div>
                <span className="font-sans font-semibold text-[11px] md:text-[12px] text-[#1b1714] text-center tracking-[0.06em] uppercase whitespace-pre-line transition-colors duration-300 group-hover:text-[#b8862e]">
                  {project.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
