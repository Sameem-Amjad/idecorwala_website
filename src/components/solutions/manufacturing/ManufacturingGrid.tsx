"use client";

import React from "react";
import { motion } from "framer-motion";
import { manufacturingServices } from "@/data/manufacturing";
import { ArrowRight } from "lucide-react";
import styles from "./Manufacturing.module.css";

export default function ManufacturingGrid() {
  return (
    <section className={styles.range} id="product-range">
      <div className={styles.container}>
        <div className={styles.rangeHeading}>
          <div className={styles.eyebrow}>BUILT TO SUPPORT. DESIGNED TO SCALE.</div>
          <div className={styles.ornament}>
            <span />
          </div>
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#761416] text-center mt-3 uppercase">
            Solutions that Power Industries
          </h2>
        </div>

        <p className="text-[14px] text-center max-w-[620px] mx-auto text-[#655f58] mb-12">
          From factories to logistics hubs and utility infrastructure, we create spaces that streamline operations and support long-term growth.
        </p>

        <div className={styles.rangeGrid}>
          {manufacturingServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                className={styles.productCard}
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
              >
                <Icon size={38} strokeWidth={1.35} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className={styles.cardLink}>
                  Explore <ArrowRight size={13} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
