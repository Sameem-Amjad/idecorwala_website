"use client";

import { productRange } from "@/data/highVolumeProducts";
import ProductRangeCard from "./ProductRangeCard";
import styles from "./HighVolume.module.css";

export default function ProductRangeSection() {
  return <section className={styles.range} id="product-range"><div className={styles.container}><div className={styles.rangeHeading}><div className={styles.eyebrow}>Our High Volume Product Range</div><div className={styles.ornament}><span /></div></div><div className={styles.rangeGrid}>{productRange.map((product, index) => <ProductRangeCard key={product.title} {...product} index={index} />)}</div></div></section>;
}
