import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogBySlug } from "@/lib/supabaseClient";
import BlogRenderer from "@/components/thought-leadership/BlogRenderer";
import FooterSection from "@/components/sections/FooterSection";
import styles from "@/components/thought-leadership/ThoughtLeadership.module.css";
import { Calendar, User, Clock, ArrowLeft, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | iDecorwala",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${blog.title} | iDecorwala`,
    description: blog.excerpt,
    alternates: {
      canonical: `/company/thought-leadership/${slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let blog = null;
  let errorMsg = null;

  try {
    blog = await getBlogBySlug(slug);
  } catch (err: unknown) {
    errorMsg = err instanceof Error ? err.message : String(err);
  }

  // Error State
  if (errorMsg) {
    return (
      <main className={`${styles.page} pt-[76px] min-h-screen flex flex-col justify-between`}>
        <div className={styles.container} style={{ paddingBlock: "80px" }}>
          <div style={{ maxWidth: "500px", margin: "0 auto", padding: "40px 32px", background: "#ffffff", borderRadius: "20px", border: "1px solid rgba(139,26,26,0.15)", textAlign: "center", boxShadow: "0 12px 36px rgba(0,0,0,0.05)" }}>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#8c1515", marginBottom: "12px", fontWeight: "600" }}>Unable to load article</h4>
            <p style={{ fontSize: "15px", color: "#6E6B64", marginBottom: "24px", lineHeight: "1.6" }}>{errorMsg}</p>
            <Link href="/company/thought-leadership" style={{ background: "#8B1A1A", color: "#fff", textDecoration: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "13px", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <ArrowLeft size={16} /> Back to Thought Leadership
            </Link>
          </div>
        </div>
        <FooterSection />
      </main>
    );
  }

  // Not Found State
  if (!blog) {
    return (
      <main className={`${styles.page} pt-[76px] min-h-screen flex flex-col justify-between`}>
        <div className={styles.container} style={{ paddingBlock: "100px" }}>
          <div style={{ maxWidth: "500px", margin: "0 auto", padding: "48px 32px", background: "#ffffff", borderRadius: "20px", border: "1px solid rgba(201,168,76,0.25)", textAlign: "center", boxShadow: "0 12px 36px rgba(0,0,0,0.05)" }}>
            <BookOpen size={48} className="text-[#C9A84C] mb-4" style={{ marginInline: "auto" }} />
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "#761416", marginBottom: "12px", fontWeight: "600" }}>Article Not Found</h3>
            <p style={{ fontSize: "15px", color: "#6E6B64", marginBottom: "28px", lineHeight: "1.6" }}>The article you are looking for does not exist or has not been published yet.</p>
            <Link href="/company/thought-leadership" style={{ background: "#8B1A1A", color: "#fff", textDecoration: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "13px", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <ArrowLeft size={16} /> Back to Thought Leadership
            </Link>
          </div>
        </div>
        <FooterSection />
      </main>
    );
  }

  const formattedDate = blog.published_date
    ? new Date(blog.published_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "No Date";

  const readingTimeVal = String(blog.reading_time || "5").replace(/[^0-9]/g, "");

  return (
    <main className={`${styles.page} pt-[76px] min-h-screen`}>
      {/* Dynamic Breadcrumbs */}
      <div className={styles.container}>
        <nav className={styles.breadcrumb} style={{ paddingTop: "28px" }} aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#8B1A1A] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
          <span className={styles.crumbArrow}>›</span>
          <Link href="/company/thought-leadership" className="hover:text-[#8B1A1A] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>Thought Leadership</Link>
          <span className={styles.crumbArrow}>›</span>
          <strong style={{ fontWeight: 600 }}>{blog.title}</strong>
        </nav>
      </div>

      {/* Article Container */}
      <article className={styles.container} style={{ paddingBlock: "48px 80px" }}>
        
        {/* Header Block */}
        <div style={{ maxWidth: "800px", margin: "0 auto 40px auto" }}>
          {blog.category && (
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, color: "#8B1A1A", background: "rgba(139, 26, 26, 0.06)", border: "1px solid rgba(139, 26, 26, 0.1)", padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
              {blog.category}
            </span>
          )}

          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, color: "#1B1714", lineHeight: 1.15, marginBottom: "20px" }}>
            {blog.title}
          </h1>

          <p style={{ fontSize: "clamp(16px, 1.8vw, 18px)", color: "#5c564f", lineHeight: 1.6, marginBottom: "24px", fontFamily: "var(--font-sans)", fontWeight: 400 }}>
            {blog.excerpt}
          </p>

          {/* Author/Meta bar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", paddingBlock: "16px", borderTop: "1px solid #E5D4B8", borderBottom: "1px solid #E5D4B8", fontSize: "13px", color: "#6E6B64", fontFamily: "var(--font-sans)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <User size={15} className="text-[#C9A84C]" />
              <span>By <strong>{blog.author || "iDecorwala Editorial"}</strong></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={15} className="text-[#C9A84C]" />
              <span>{formattedDate}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock size={15} className="text-[#C9A84C]" />
              <span>{readingTimeVal} mins read</span>
            </div>
          </div>
        </div>

        {/* Big Banner Cover Image */}
        <div style={{ position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto 48px auto", height: "clamp(240px, 48vw, 450px)", overflow: "hidden", borderRadius: "20px", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.03)" }}>
          <Image
            src={blog.cover_image || "/imgs/blogs_placeholder.png"}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 800px"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Content Body */}
        <div style={{ maxWidth: "760px", margin: "0 auto" }} className={styles.blogBody}>
          {blog.content ? (
            <BlogRenderer content={blog.content} />
          ) : (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: "#4D4740", fontStyle: "italic" }}>
              This article has no content preview.
            </p>
          )}

          {/* Back button */}
          <div style={{ marginTop: "64px", borderTop: "1px solid #E5D4B8", paddingTop: "32px", display: "flex", justifyContent: "flex-start" }}>
            <Link href="/company/thought-leadership" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#8B1A1A", textDecoration: "none", fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em" }} className="hover:text-[#C9A84C] transition-colors">
              <ArrowLeft size={16} /> Back to Insights
            </Link>
          </div>
        </div>

      </article>

      <FooterSection />
    </main>
  );
}
