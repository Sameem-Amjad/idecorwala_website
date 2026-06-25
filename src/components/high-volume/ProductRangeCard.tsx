"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ProductRange } from "@/data/highVolumeProducts";
import styles from "./HighVolume.module.css";

type ProductRangeCardProps = ProductRange & {
  index: number;
};

export default function ProductRangeCard({
  icon: Icon,
  title,
  description,
  image,
  index,
}: ProductRangeCardProps) {
  return (
    <motion.article
      className={styles.productCard}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, delay: index * 0.06 }}
    >
      <Icon size={38} strokeWidth={1.35} />
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
    </motion.article>
  );
}
