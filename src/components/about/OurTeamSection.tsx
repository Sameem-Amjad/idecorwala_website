"use client";

import React from "react";
import Image from "next/image";
import styles from "./OurTeam.module.css";

interface TeamMember {
  name: string;
  role: string;
  /** Headshot in /public. Leave unset to render the initials tile instead. */
  image?: string;
}

// The original headshots lived on Cloudinary and were deleted upstream. Until real
// photography is supplied, each member renders an initials tile — set `image` to a
// path under /public to switch any of them back to a photo.
const teamMembers: TeamMember[] = [
  { name: "Yamini Thaker", role: "Director - Operations", image: "/team/Yamini.jpg" },
  { name: "Arindam Banerjee", role: "Chief Revenue Officer", image: "/team/Arindam.jpg" },
  { name: "Druv Agarwal", role: "Chief Delivery Officer", image: "/team/Druv.webp" },
  { name: "Bhaskar Tyagi", role: "Head of Procurement", image: "/team/Bhaskar.webp" },
];

const CEO: TeamMember = { name: "Viral Thaker", role: "Founder & CEO" , image: "/team/Viral_Thaker_web.webp"};

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

function MemberVisual({ member, sizes }: { member: TeamMember; sizes: string }) {
  if (member.image) {
    return (
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes={sizes}
        className={styles.imageScale}
      />
    );
  }
  return (
    <div className={styles.initialsFallback} role="img" aria-label={member.name}>
      <span className={styles.initialsText}>{initialsOf(member.name)}</span>
    </div>
  );
}

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
            <MemberVisual member={CEO} sizes="(max-width: 1024px) 100vw, 25vw" />
            <div className={styles.labelOverlay}>
              <h4 className={styles.memberName}>{CEO.name}</h4>
              <p className={styles.memberRole}>{CEO.role}</p>
            </div>
          </div>

          {/* Other 4 Members */}
          <div className={styles.grid4}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.memberCard}>
                <MemberVisual member={member} sizes="(max-width: 640px) 100vw, 20vw" />
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
