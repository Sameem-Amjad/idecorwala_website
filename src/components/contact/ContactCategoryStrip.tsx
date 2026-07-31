'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Users, User, ArrowRight } from 'lucide-react';
import styles from './contact.module.css';

const contactCategories = [
  { 
    id: 'consultation',
    icon: Phone, 
    title: "Technical Consultation", 
    desc: "Speak with our experts for tailored solutions.", 
    href: "tel:+918448440910"
  },
  { 
    id: 'enquiries',
    icon: Mail, 
    title: "Project Enquiries", 
    desc: "Drop us an email and we'll get back to you shortly.", 
    href: "mailto:partner@idecorwala.com" 
  },
  { 
    id: 'vendor',
    icon: Users, 
    title: "OEM & Vendor Relations", 
    desc: "Partner with us for mutual growth.", 
    href: "mailto:partner@idecorwala.com" 
  },
  { 
    id: 'careers',
    icon: User, 
    title: "Join Our Team", 
    desc: "Explore career opportunities and grow with us.", 
    href: "/company/careers" 
  },
];

export default function ContactCategoryStrip() {
  return (
    <section className={`${styles.section} ${styles.categoryStrip}`} id="contact-categories">
      <div className={styles.container}>
        <div className={styles.categoryGrid}>
          {contactCategories.map((category) => {
            const Icon = category.icon;
            return (
              <article key={category.id} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <Icon size={31} strokeWidth={1.35} />
                </div>
                <h3>{category.title}</h3>
                <p>{category.desc}</p>
                <Link href={category.href} className={styles.categoryLink}>
                  Connect <ArrowRight size={13} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
