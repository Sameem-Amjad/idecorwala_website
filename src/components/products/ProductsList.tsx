"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";
import { getProductCategories, ProductCategory } from "@/lib/supabaseClient";
import styles from "./ProductsPage.module.css";

export default function ProductsList() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Failed to load categories from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.sectionsContainer}>
          <div className={styles.categorySection}>
            <div className={styles.productsGrid}>
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className={styles.skeletonCard} style={{ height: "130px" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.stateContainer}>
          <h3 className={styles.stateTitle}>Unable to Load Categories</h3>
          <p className={styles.stateText}>{error}</p>
          <button onClick={fetchCategories} className={styles.retryButton}>
            <RefreshCw size={14} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.stateContainer}>
          <h3 className={styles.stateTitle}>No Categories Available</h3>
          <p className={styles.stateText}>No product categories are currently available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.sectionsContainer}>
        <section className={styles.categorySection}>
          <div className={styles.productsGrid}>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className={styles.productCard}
                style={{ display: "flex", flexDirection: "row", alignItems: "center", minHeight: "120px", padding: "24px" }}
              >
                <div className={styles.productInfo} style={{ flexGrow: 1, paddingRight: "16px" }}>
                  <span className={styles.productName} style={{ fontSize: "18px", fontWeight: 700, color: "#1b1714" }}>
                    {category.name}
                  </span>
                  {category.description && (
                    <p style={{ fontSize: "13px", color: "#625b52", marginTop: "6px", lineHeight: "1.45" }}>
                      {category.description}
                    </p>
                  )}
                </div>
                <ArrowRight size={20} className={styles.arrowIcon} style={{ flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
