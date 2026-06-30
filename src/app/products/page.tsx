import type { Metadata } from "next";
import ProductsList from "@/components/products/ProductsList";
import FooterSection from "@/components/sections/FooterSection";
import styles from "@/components/products/ProductsPage.module.css";

export const metadata: Metadata = {
  title: "Products | iDecorwala",
  description: "Explore our dynamic range of high-performance architectural materials, ceiling systems, wall surfaces, flooring systems, and panels.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <main className={`${styles.page} pt-[76px]`}>
      {/* Breadcrumb */}
      <div className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <span>Home</span>
        <span className={styles.crumbArrow}>›</span>
        <strong>Products</strong>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.eyebrow}>Our Range</div>
          <div className={styles.ornament}>
            <span />
          </div>
          <h1 className={styles.heroTitle}>Architectural Solutions & Products</h1>
          <p className={styles.heroCopy}>
            Engineered for speed, consistency, and cost-efficiency. Access India's most agile spatial component pipeline directly.
          </p>
        </div>
      </section>

      {/* Dynamic Products List */}
      <ProductsList />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
