"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { civilSolutions } from "@/data/civil";
import styles from "./Civil.module.css";

export default function CivilSolutions() {
  return (
    <section className={`${styles.section} ${styles.offer}`}>
      <div className={`${styles.container} ${styles.offerGrid}`}>
        <aside>
          <div className={styles.eyebrow}>What We Offer</div>
          <h2 className={styles.sectionTitle}>Integrated Civil &amp; Structural Solutions</h2>
          <div className={styles.ornament}>
            <i />
          </div>
          <p className={styles.sectionCopy}>
            We offer comprehensive civil, structural, and facade engineering solutions designed to deliver long-term stability and high performance.
          </p>
        </aside>

        <div className={styles.offerCards}>
          {civilSolutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.article
                className={styles.offerCard}
                key={solution.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                style={{ display: "flex", flexDirection: "column", height: "auto" }}
              >
                <Icon size={33} strokeWidth={1.35} />
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                
                <ul className="flex flex-col gap-[6px] mt-4 mb-4" style={{ flexGrow: 1 }}>
                  {solution.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-[6px] text-[12px] text-[#655f58]">
                      <span className="text-[#b8862e]">+</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative w-full h-[120px] overflow-hidden rounded-[3px] mt-auto">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
