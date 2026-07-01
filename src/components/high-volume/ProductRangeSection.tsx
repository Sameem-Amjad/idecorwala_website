"use client";

import { productRange } from "@/data/highVolumeProducts";
import ProductRangeCard from "./ProductRangeCard";
import styles from "./HighVolume.module.css";
import { Product } from "@/lib/supabaseClient";

interface ProductRangeSectionProps {
  products?: Product[];
  categoryName?: string;
}

export default function ProductRangeSection({ products, categoryName }: ProductRangeSectionProps) {
  const eyebrow = categoryName ? `Our ${categoryName} Range` : "Our High Volume Product Range";
  
  // If dynamic products are provided, adapt them to the ProductRangeCard props
  const itemsToRender = products 
    ? products.map(p => ({
        title: p.name,
        description: p.description || "",
        image: p.image_url || "/images/products/high-volume/doors.png",
        redirect_url: p.redirect_url
      }))
    : productRange;

  return <section className={styles.range} id="product-range"><div className={styles.container}><div className={styles.rangeHeading}><div className={styles.eyebrow}>{eyebrow}</div><div className={styles.ornament}><span /></div></div><div className={styles.rangeGrid}>{itemsToRender.map((product, index) => <ProductRangeCard key={product.title} {...product} index={index} />)}</div></div></section>;
}
