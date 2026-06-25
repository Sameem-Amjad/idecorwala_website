"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import styles from "./OurTeam.module.css";

const teamMembers = [
  {
    name: "Yamini Thaker",
    role: "Director - Operations",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1782103899/Screenshot_2026-06-22_101754_l1jgnt.png",
  },
  {
    name: "Arindam Banerjee",
    role: "Chief Revenue Officer",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1782103899/Screenshot_2026-06-22_101815_alenlm.png",
  },
  {
    name: "Druv Agarwal",
    role: "Chief Delivery Officer",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1782103899/Screenshot_2026-06-22_101803_ab3a0z.png",
  },
  {
    name: "Bhaskar Tyagi",
    role: "Head of Procurement",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1782103899/Screenshot_2026-06-22_101824_sgcenp.png",
  },
];

export default function OurTeamSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Column: Title & Intro */}
        <div className={styles.leftCol}>
          <span className={styles.eyebrow}>People Behind the Purpose</span>
          <h2 className={styles.title}>
            OUR<br />TEAM
          </h2>
          <h3 className={styles.subhead}>
            Our Solid Team Leader
          </h3>
          <p className={styles.desc}>
            Our team at iDecorwala comprises seasoned experts in interior design project management, driving innovation with a tech-first approach. We excel in strategic project procurement and ensure efficient, high-performance delivery, transforming your vision into accomplished spaces with speed and precision.
          </p>
        </div>

        {/* Right Column: Interactive Grid Layout */}
        <div className={styles.rightCol}>
          {/* CEO: Large grid item */}
          <div className={styles.ceoCard}>
            <Image 
              src="https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1782103900/Screenshot_2026-06-22_101735_qkelri.png" 
              alt="Viral Thaker" 
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className={styles.imageScale}
            />
            <div className={styles.labelOverlay}>
              <h4 className={styles.memberName}>Viral Thaker</h4>
              <p className={styles.memberRole}>Founder & CEO</p>
            </div>
          </div>

          {/* Other 4 Members */}
          <div className={styles.grid4}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.memberCard}>
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  sizes="(max-width: 640px) 100vw, 20vw"
                  className={styles.imageScale}
                />
                <div className={styles.labelOverlayBottom}>
                  <h4 className={styles.memberName}>{member.name}</h4>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
