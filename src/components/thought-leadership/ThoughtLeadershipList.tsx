"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw, BookOpen, Tag as TagIcon, Layers } from "lucide-react";
import { getPublishedBlogs, Blog } from "@/lib/supabaseClient";
import styles from "./ThoughtLeadership.module.css";

export default function ThoughtLeadershipList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      const data = await getPublishedBlogs();
      setBlogs(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchBlogs();
  };

  // Compute unique categories dynamically
  const categories = useMemo(() => {
    const cats = new Set<string>();
    blogs.forEach((blog) => {
      if (blog.category) {
        cats.add(blog.category.trim());
      }
    });
    return Array.from(cats).sort();
  }, [blogs]);

  // Compute unique tags dynamically
  const tags = useMemo(() => {
    const uniqueTags = new Set<string>();
    blogs.forEach((blog) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach((t) => {
          if (t) uniqueTags.add(t.trim());
        });
      }
    });
    return Array.from(uniqueTags).sort();
  }, [blogs]);

  // Filtered blogs list
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        !selectedCategory ||
        (blog.category && blog.category.trim() === selectedCategory);
      
      const matchesTag =
        !selectedTag ||
        (blog.tags &&
          Array.isArray(blog.tags) &&
          blog.tags.some((t) => t && t.trim() === selectedTag));

      return matchesCategory && matchesTag;
    });
  }, [blogs, selectedCategory, selectedTag]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  if (loading) {
    return (
      <section className={styles.range}>
        <div className={styles.container}>
          <div className="flex flex-col items-center justify-center py-16">
            <RefreshCw className="animate-spin text-[#c9a050] mb-4" size={32} />
            <p className={styles.heroCopy}>Loading insights and articles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.range}>
        <div className={styles.container}>
          <div style={{ maxWidth: "450px", margin: "0 auto", padding: "40px 24px", background: "#ffffff", borderRadius: "12px", border: "1px solid rgba(139,26,26,0.15)", textAlign: "center" }}>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "#8c1515", marginBottom: "10px" }}>Unable to load articles</h4>
            <p style={{ fontSize: "14px", color: "#6E6B64", marginBottom: "20px" }}>{error}</p>
            <button onClick={handleRetry} style={{ background: "#8B1A1A", color: "#fff", border: "none", borderRadius: "4px", padding: "10px 20px", cursor: "pointer", fontSize: "12px", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.range} style={{ background: "rgba(255, 255, 255, 0.05)" }}>
      <div className={styles.container}>
        
        {/* Dynamic Filters Section */}
        <div className={styles.filterPanel}>
          
          {/* Categories */}
          <div className={styles.filterGroup}>
            <div className={styles.filterHeader}>
              <Layers size={14} className="text-[#C9A84C]" />
              Filter by Category
            </div>
            <div className={styles.filterButtons}>
              <button
                onClick={() => setSelectedCategory(null)}
                className={!selectedCategory ? styles.filterPillCategoryActive : styles.filterPillCategoryInactive}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? styles.filterPillCategoryActive : styles.filterPillCategoryInactive}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className={styles.filterGroup}>
              <div className={styles.filterHeader}>
                <TagIcon size={14} className="text-[#C9A84C]" />
                Filter by Tag
              </div>
              <div className={styles.filterButtons}>
                <button
                  onClick={() => setSelectedTag(null)}
                  className={!selectedTag ? styles.filterPillTagActive : styles.filterPillTagInactive}
                >
                  All Tags
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={selectedTag === tag ? styles.filterPillTagActive : styles.filterPillTagInactive}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters Clear Indicator */}
          {(selectedCategory || selectedTag) && (
            <div className={styles.filterMetaRow}>
              <span className="text-[12px] font-medium text-[#6E6B64]">
                Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
              </span>
              <button
                onClick={resetFilters}
                className="text-[12px] font-bold text-[#8B1A1A] hover:text-[#520F0F] transition-colors bg-transparent border-0 cursor-pointer underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Card Grid */}
        <AnimatePresence mode="popLayout">
          {filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 bg-[#FFFFFF] rounded-[20px] border border-dashed border-[#E3D9C7] max-w-[500px] margin-inline-auto"
              style={{ marginInline: "auto" }}
            >
              <BookOpen size={48} className="text-[#C9A84C]/50 margin-inline-auto mb-4" style={{ marginInline: "auto" }} />
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "#761416", marginBottom: "8px", fontWeight: "600" }}>No articles found</h3>
              <p className={styles.heroCopy}>No articles match your selected filters.</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className={styles.rangeGrid}
            >
              {filteredBlogs.map((article, index) => (
                <motion.article
                  layout
                  className={styles.productCard}
                  key={article.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                >
                  <div className={styles.productPhoto}>
                    <Link href={`/company/thought-leadership/${article.slug}`} className="block relative w-full h-full">
                      <Image
                        src={article.cover_image || "/imgs/blogs_placeholder.png"}
                        alt={article.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="transition-transform duration-500 ease-out"
                      />
                    </Link>
                  </div>
                  
                  <div className={styles.productContent}>
                    <div className={styles.cardMeta}>
                      {article.category ? (
                        <span className={styles.cardCategory}>
                          {article.category}
                        </span>
                      ) : (
                        <span></span>
                      )}
                      <span className={styles.cardReadingTime}>
                        {(() => {
                          const timeVal = String(article.reading_time || "5").replace(/[^0-9]/g, "");
                          return `${timeVal} mins read`;
                        })()}
                      </span>
                    </div>

                    <h3>
                      <Link href={`/company/thought-leadership/${article.slug}`} className="hover:text-[#8b1a1a] transition-colors duration-200">
                        {article.title}
                      </Link>
                    </h3>
                    
                    <p>{article.excerpt}</p>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className={styles.cardTags}>
                        {article.tags.map((tag) => (
                          <span key={tag} className={styles.cardTag}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className={styles.cardFooter}>
                      <span className={styles.cardAuthor}>
                        By {article.author || "iDecorwala Editorial"}
                      </span>
                      <Link href={`/company/thought-leadership/${article.slug}`} className={styles.cardLink}>
                        Read More <ArrowRight size={13} className="transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
