"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Box, Users, BarChart } from "lucide-react";
import styles from "./ThoughtLeadership.module.css";

const TOPICS = [
  {
    icon: Leaf,
    title: "Sustainable By Design",
    desc: "Exploring how responsible design and smart choices create a lasting impact on people and the planet.",
  },
  {
    icon: Box,
    title: "Future Of Built Environments",
    desc: "Unpacking trends, technologies and ideas that are redefining the way we design, build and experience spaces.",
  },
  {
    icon: Users,
    title: "People & Experiences",
    desc: "Understanding how spaces influence well-being, productivity and connections in everyday life and work.",
  },
  {
    icon: BarChart,
    title: "Performance & Value",
    desc: "Insights on enhancing efficiency, quality and long-term value across every stage of the project lifecycle.",
  },
];

export default function OurPerspective() {
  return (
    <section className={styles.why}>
      <div className={`${styles.container} ${styles.whyGrid}`}>
        {/* Left Column: Heading and Intro */}
        <div>
          <div className={styles.whyHeader}>
            <div className={styles.eyebrow}>Our Perspective</div>
            <div className={styles.ornament}>
              <span />
            </div>
          </div>
          
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#761416] leading-[1.15] mb-4 uppercase">
            Shaping Conversations.<br />Driving Change.
          </h2>
          
          <p className={styles.heroCopy}>
            From sustainability and innovation to design thinking and delivery excellence, we write and speak about what matters most to our industry, our clients and our planet.
          </p>
          
          <div className="mt-8">
            <Link className={styles.button} href="/insights">
              Explore Insights <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Right Column: Key Topics stepper list */}
        <div className={styles.ideal}>
          <div className={styles.whyHeader}>
            <div className={styles.eyebrow}>Key Topics</div>
            <div className={styles.ornament}>
              <span />
            </div>
          </div>
          
          <div className={styles.reasonList}>
            {TOPICS.map(({ icon: Icon, title, desc }, index) => (
              <motion.article 
                className={styles.reason} 
                key={title}
                initial={{ opacity: 0, x: 12 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <div className={styles.reasonIcon}>
                  <Icon size={27} strokeWidth={1.35} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
