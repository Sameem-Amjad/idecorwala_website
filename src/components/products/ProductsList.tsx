"use client";

import { useEffect, useState, useMemo } from "react";
import { ArrowRight, RefreshCw, Layers } from "lucide-react";
import { getActiveProducts, Product } from "@/lib/supabaseClient";
import styles from "./ProductsPage.module.css";

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActiveProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load products from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Group and memoize active products by category field
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: Product[] } = {};
    
    // Sort products by category_order, then display_order
    const sorted = [...products].sort((a, b) => {
      if (a.category_order !== b.category_order) {
        return a.category_order - b.category_order;
      }
      return a.display_order - b.display_order;
    });

    sorted.forEach((product) => {
      const cat = product.category || "General";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(product);
    });

    return groups;
  }, [products]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.sectionsContainer}>
          {[1, 2].map((i) => (
            <div key={i} className={styles.categorySection}>
              <div className={styles.skeletonHeading} />
              <div className={styles.productsGrid}>
                {[1, 2, 3].map((j) => (
                  <div key={j} className={styles.skeletonCard} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.stateContainer}>
          <h3 className={styles.stateTitle}>Unable to Load Products</h3>
          <p className={styles.stateText}>{error}</p>
          <button onClick={fetchProducts} className={styles.retryButton}>
            <RefreshCw size={14} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.stateContainer}>
          <h3 className={styles.stateTitle}>No Products Available</h3>
          <p className={styles.stateText}>No products are currently available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.sectionsContainer}>
        {Object.entries(groupedProducts).map(([category, items]) => (
          <section key={category} id={category.toLowerCase()} className={styles.categorySection}>
            <div className={styles.categoryHeading}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              <div className={styles.categorySeparator} />
            </div>
            
            {items.length === 0 ? (
              <p className={styles.stateText}>No products are available in this category.</p>
            ) : (
              <div className={styles.productsGrid}>
                {items.map((product) => (
                  <a
                    key={product.id}
                    href={product.redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.productCard}
                  >
                    <div className={styles.productInfo}>
                      <span className={styles.productName}>{product.name}</span>
                    </div>
                    <ArrowRight size={18} className={styles.arrowIcon} />
                  </a>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
