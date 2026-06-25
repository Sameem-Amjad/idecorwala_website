"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./About.module.css";

export default function ClosingQuote() {
  const line1 = "We don't just design spaces.";
  const line2 = "We create environments that empower people and elevate businesses.";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let index1 = 0;
    let index2 = 0;
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    const typeLine1 = () => {
      if (index1 < line1.length) {
        setText1(line1.substring(0, index1 + 1));
        index1++;
        timer1 = setTimeout(typeLine1, 40);
      } else {
        timer2 = setTimeout(typeLine2, 100);
      }
    };

    const typeLine2 = () => {
      if (index2 < line2.length) {
        setText2(line2.substring(0, index2 + 1));
        index2++;
        timer2 = setTimeout(typeLine2, 30);
      }
    };

    typeLine1();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [startTyping]);

  return (
    <section className={styles.quote} ref={containerRef}>
      <div className={styles.quoteInner}>
        <div className={styles.quoteMark}>“</div>
        <blockquote className="min-h-[110px] sm:min-h-[90px] font-serif italic text-2xl sm:text-3xl font-medium tracking-wide">
          <div className="text-[#1e1915]">{text1}</div>
          <div className="mt-2 text-[#761417]">{text2}</div>
        </blockquote>
        <div className={styles.ornament}>
          <i />
        </div>
      </div>
    </section>
  );
}
