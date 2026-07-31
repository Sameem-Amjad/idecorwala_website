"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, PenTool, Globe, BookOpen } from "lucide-react";
import styles from "./ThoughtLeadership.module.css";

const ARTICLES = [
  {
    image: "/imgs/green_building.png",
    tag: "SUSTAINABILITY",
    icon: Leaf,
    title: "Designing for a Greener Tomorrow",
    desc: "How sustainable design choices today create resilient and responsible spaces for tomorrow.",
    href: "/company/thought-leadership/designing-for-a-greener-tomorrow",
  },
  {
    image: "/imgs/interior_lounge.png",
    tag: "DESIGN THINKING",
    icon: PenTool,
    title: "Human-Centric Spaces That Inspire",
    desc: "Why the future of design lies in understanding people and crafting meaningful experiences.",
    href: "/company/thought-leadership/human-centric-spaces-that-inspire",
  },
  {
    image: "/imgs/construction_sunset.png",
    tag: "INDUSTRY TRENDS",
    icon: Globe,
    title: "Building Smarter at Every Step",
    desc: "Emerging technologies and innovations transforming construction and delivery.",
    href: "/company/thought-leadership/building-smarter-at-every-step",
  },
  {
    image: "/imgs/person_sketching.png",
    tag: "INSIGHTS",
    icon: BookOpen,
    title: "From Vision to Value: The iDecorwala Way",
    desc: "Our approach to turning ideas into impactful, enduring built environments.",
    href: "/company/thought-leadership/from-vision-to-value",
  },
];

export default function FeaturedInsights() {
  return (
    <section className={styles.range} style={{ background: "rgba(255, 255, 255, 0.05)" }}>
      <div className={styles.container}>
        <div className={styles.rangeHeading}>
          <div className={styles.eyebrow}>Featured Insights</div>
          <div className={styles.ornament}>
            <span />
          </div>
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#761416] text-center mt-3 uppercase">
            Ideas That Build Better Outcomes
          </h2>
        </div>

        <div className={styles.rangeGrid}>
          {ARTICLES.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.article
                className={styles.productCard}
                key={article.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
              >
                <Icon size={38} strokeWidth={1.35} />
                <h3>{article.title}</h3>
                
                <div className={styles.productPhoto}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                </div>
                
                <p>{article.desc}</p>
                
                <Link href={article.href} className={styles.cardLink}>
                  Read More <ArrowRight size={13} />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
