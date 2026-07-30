"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DoorOpen, DoorClosed, PanelTop, Layers3, SlidersHorizontal, Wrench } from "lucide-react";
import styles from "./HighVolume.module.css";

const fallbackIcons = [DoorOpen, DoorClosed, PanelTop, Layers3, SlidersHorizontal, Wrench];

type ProductRangeCardProps = {
  title: string;
  description: string;
  image: string;
  icon?: any;
  redirect_url?: string;
  index: number;
};

export default function ProductRangeCard({
  icon: Icon,
  title,
  description,
  image,
  redirect_url,
  index,
}: ProductRangeCardProps) {
  const ResolvedIcon = Icon || fallbackIcons[index % fallbackIcons.length];

  const cardContent = (
    <>
      <ResolvedIcon size={38} strokeWidth={1.35} />
      <h3>{title}</h3>
      <div className={styles.productPhoto}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 767px) 42vw, (max-width: 1100px) 28vw, 15vw"
        />
      </div>
      <p>{description}</p>
    </>
  );

  const containerProps = {
    className: `${styles.productCard} ${redirect_url ? "cursor-pointer hover:border-[#8B1A1A] transition-all" : ""}`,
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.42, delay: index * 0.06 }
  };

  if (redirect_url) {
    return (
      <motion.a
        href={redirect_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
        {...containerProps}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.article {...containerProps}>
      {cardContent}
    </motion.article>
  );
}
