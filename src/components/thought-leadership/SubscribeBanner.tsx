"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import styles from "./ThoughtLeadership.module.css";

export default function SubscribeBanner() {
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribeSubmit = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
  };

  return (
    <section className={styles.cta} id="subscribe">
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaIcon}>
            <Mail size={31} strokeWidth={1.4} />
          </div>
          
          <div className={styles.ctaText}>
            <h2>
              Subscribe to Our Insights
              <span>Let&apos;s build a smarter, better and more inspired future together.</span>
            </h2>
            <p>Stay updated with our latest perspectives, research and industry insights.</p>
          </div>

          <div className="flex items-center min-w-[240px] justify-end max-md:w-full">
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="subscribed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-sans text-sm font-bold tracking-[0.06em] text-[#b8862e] uppercase text-center w-full"
                >
                  ✓ Thank You For Subscribing
                </motion.div>
              ) : showInput ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-2.5 w-full"
                >
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1b1714] text-[#f7f6f2] font-sans text-xs border border-[#c9a050]/40 rounded-[4px] px-4 py-3.5 outline-none focus:border-[#c9a050] transition-colors"
                  />
                  <button
                    onClick={handleSubscribeSubmit}
                    className="w-full bg-[#851617] text-white font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-[4px] hover:bg-[#a01e1e] transition-colors cursor-pointer border-0"
                  >
                    SUBMIT
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="button"
                  onClick={() => setShowInput(true)}
                  className={styles.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  SUBSCRIBE NOW <ArrowRight size={15} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
