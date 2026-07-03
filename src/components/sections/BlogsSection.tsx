"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getPublishedBlogs, Blog as DbBlogPost } from "@/lib/supabaseClient";
import { RefreshCw } from "lucide-react";

export interface BlogPost {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "1",
    category: "INDUSTRY TRENDS",
    date: "May 08, 2025",
    readTime: "6 min read",
    title: "Industrializing the Interior Lifecycle",
    description: "An in-depth operational study examining how integrating factory production lines directly with on-site agile assembly frameworks mitigates supply-chain risks in multi-tiered infrastructure projects.",
    image: "/imgs/blogs_1.png",
    href: "#"
  },
  {
    id: "2",
    category: "DESIGN & ENGINEERING",
    date: "May 02, 2025",
    readTime: "5 min read",
    title: "The New Age of Climate Controls",
    description: "Exploring how early-stage architectural modeling and integrated MEP engineering maximize thermal efficiency, airflow performance, and long-term asset value in high-occupancy IT parks and retail centers.",
    image: "/imgs/blogs_2.png",
    href: "#"
  },
  {
    id: "3",
    category: "TECHNOLOGY",
    date: "Apr 28, 2025",
    readTime: "7 min read",
    title: "De-fragmenting Spatial Tech",
    description: "A technical overview of our patented Metaverse spatial interface, exploring its role in removing layout errors and automating the procurement pipeline for enterprise real estate developments.",
    image: "/imgs/blogs_3.png",
    href: "#"
  },
  {
    id: "4",
    category: "OPERATIONS",
    date: "Apr 21, 2025",
    readTime: "4 min read",
    title: "The Business Case for Better Spaces",
    description: "Analyzing how well-designed, efficiently executed spaces drive productivity, brand value, and revenue uplift across hospitality, corporate, and retail environments.",
    image: "/imgs/blogs_4.png",
    href: "#"
  }
];

function mapDbBlogToBlogPost(dbBlog: DbBlogPost): BlogPost {
  return {
    id: String(dbBlog.id),
    category: dbBlog.category ? dbBlog.category.toUpperCase() : "GENERAL",
    date: dbBlog.published_date 
      ? new Date(dbBlog.published_date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric"
        }) 
      : "No Date",
    readTime: dbBlog.reading_time ? `${String(dbBlog.reading_time).replace(/[^0-9]/g, "")} mins read` : "5 mins read",
    title: dbBlog.title || "",
    description: dbBlog.excerpt || "",
    image: dbBlog.cover_image || "/imgs/blogs_placeholder.png",
    href: `/company/thought-leadership/${dbBlog.slug}`
  };
}

interface BlogsSectionProps {
  posts?: BlogPost[];
  onSubscribe?: (email: string) => void;
}

export default function BlogsSection({ posts, onSubscribe }: BlogsSectionProps) {
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(!posts);
  const [error, setError] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const fetchFeaturedBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPublishedBlogs();
      const featured = data.filter(b => b.tags && b.tags.includes("featured"));
      setBlogsList(featured.map(mapDbBlogToBlogPost));
    } catch (err: any) {
      setError(err.message || "Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!posts) {
      fetchFeaturedBlogs();
    }
  }, [posts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    if (onSubscribe) {
      onSubscribe(email);
    }
    setSubscribed(true);
    setEmail("");
  };

  const activePosts = posts || blogsList;

  return (
    <section
      ref={sectionRef}
      className="blogs-section relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: "#FAF9F6", // --blog-bg
        backgroundImage: `
          radial-gradient(circle at center, transparent 0%, rgba(201, 169, 110, 0.02) 100%),
          url("https://www.transparenttextures.com/patterns/cream-paper.png")
        `,
        paddingTop: "clamp(40px, 5vw, 72px)",
        paddingBottom: "clamp(64px, 8vw, 120px)",
      }}
    >
      {/* SVG Grain Noise Definitions */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="blogs-grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.8  0 0 0 0 0.7  0 0 0 0 0.6  0 0 0 0.05 0" />
        </filter>
      </svg>

      {/* Global Section Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-6"
        style={{
          filter: "url(#blogs-grain-noise)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Decorative dot-grid pattern in top-right */}
      <div
        className="absolute top-0 right-0 w-[320px] h-[320px] pointer-events-none z-0 opacity-7"
        style={{
          backgroundImage: "radial-gradient(#2E2C28 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage: "radial-gradient(circle at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
          maskImage: "radial-gradient(circle at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Luxury Golden Threads Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%]" style={{ opacity: 0.50 }} viewBox="0 0 1200 800" fill="none">
          <line x1="-100" y1="200" x2="1300" y2="800" stroke="#C9A96E" strokeWidth="1.5" />
          <line x1="-100" y1="240" x2="1300" y2="840" stroke="#C9A96E" strokeWidth="1.0" strokeDasharray="6 10" />
          <line x1="-100" y1="160" x2="1300" y2="760" stroke="#C9A96E" strokeWidth="0.75" />
          <circle cx="250" cy="350" r="4.5" fill="#C9A96E" style={{ filter: "drop-shadow(0 0 6px #C9A96E)" }} />
          <circle cx="600" cy="500" r="4.5" fill="#C9A96E" style={{ filter: "drop-shadow(0 0 6px #C9A96E)" }} />
          <circle cx="950" cy="650" r="4.5" fill="#C9A96E" style={{ filter: "drop-shadow(0 0 6px #C9A96E)" }} />
        </svg>
      </div>

      {/* Dynamic styles and animations injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
        .blogs-card:hover .blogs-card-shimmer {
          animation: shimmerSweep 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .blogs-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .blogs-section .section-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .blogs-section .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2E2C28;
          text-shadow: 1px 1px 0px rgba(253, 250, 245, 0.8), 
                       -1px -1px 0px rgba(17, 17, 17, 0.15),
                       2px 3px 5px rgba(17, 17, 17, 0.08);
        }

        .blogs-section .section-subtitle {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: #6E6B64;
          margin-top: 8px;
          text-align: center;
          letter-spacing: 0.02em;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          align-items: stretch;
        }

        .blog-card {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: #FDFCFA;
          height: 100%;
          border: 1px solid rgba(196, 151, 58, 0.15);
        }

        .blog-card__image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          background-color: #EAE6DF;
        }

        .blog-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .blog-card__content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 28px 24px 32px 24px;
          text-align: left;
        }

        .blog-card__category {
          font-family: var(--font-sans);
          font-size: 0.725rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C4973A;
          margin-bottom: 6px;
        }

        .blog-card__date-time {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.725rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #8C8880;
          margin-bottom: 14px;
        }

        .blog-card__meta-separator {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: rgba(140, 136, 128, 0.4);
          display: inline-block;
          flex-shrink: 0;
        }

        .blog-card__title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          line-height: 1.35;
          margin-top: 0;
          margin-bottom: 12px;
          color: #2E2C28;
          text-align: left;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .blog-card__excerpt {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: #6E6B64;
          line-height: 1.55;
          margin-top: 0;
          margin-bottom: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-align: left;
        }

        .blog-card__cta {
          margin-top: auto;
          padding-top: 12px;
          font-size: 0.725rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C4973A;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: color 200ms ease;
        }

        .blog-card__cta:hover {
          color: #B8863D;
        }

        .newsletter-bar {
          margin-top: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: #F4ECDD;
          border-radius: 20px;
          padding: 28px 36px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06);
          flex-wrap: wrap;
          text-align: left;
        }

        .newsletter-bar__text {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: #2E2C28;
          max-width: 480px;
        }

        .newsletter-bar__text strong {
          display: block;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .newsletter-bar__form {
          display: flex;
          gap: 0;
          flex: 1;
          min-width: 260px;
          max-width: 420px;
        }

        .newsletter-bar__input {
          flex: 1;
          min-width: 0;
          box-sizing: border-box;
          padding: 12px 16px;
          border: 1px solid rgba(61,61,58,0.12);
          border-right: none;
          font-size: 0.875rem;
          outline: none;
          border-radius: 10px 0 0 10px;
          background: #FFFFFF;
          font-family: var(--font-sans);
          color: #2E2C28;
          transition: shadow 200ms ease;
        }
        .newsletter-bar__input:focus {
          box-shadow: 0 0 0 3px rgba(201,169,110,0.18);
        }

        .newsletter-bar__button {
          box-sizing: border-box;
          padding: 12px 20px;
          background: #B8863D;
          color: #FFFFFF;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
          border: none;
          cursor: pointer;
          border-radius: 0 10px 10px 0;
          white-space: nowrap;
          font-family: var(--font-sans);
          transition: background 200ms ease;
        }
        .newsletter-bar__button:hover {
          background: #a67530;
        }

        @media (max-width: 1024px) {
          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .blogs-container {
            padding: 0 20px;
          }
        }

        @media (max-width: 640px) {
          .blogs-grid {
            grid-template-columns: 1fr;
          }
          .newsletter-bar {
            padding: 24px 20px !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 20px !important;
          }
          .newsletter-bar__form {
            max-width: 100% !important;
            width: 100% !important;
            min-width: 0 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .blogs-card-shimmer {
            display: none !important;
          }
          .blogs-reveal-el {
            transform: none !important;
            transition-delay: 0ms !important;
          }
        }
      ` }} />

      <div className="blogs-container relative z-20">
        
        {/* ── HEADING BLOCK ── */}
        <div
          className="section-header blogs-reveal-el"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="section-title">
            Blogs
          </h2>
          
          {/* Gold divider line and diamond */}
          <div className="flex items-center justify-center gap-4 my-6">
            <span className="w-16 h-[1px]" style={{ background: "linear-gradient(to right, transparent, #C9A96E)" }} />
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: "#C9A96E", boxShadow: "0 0 8px #C9A96E" }} />
            <span className="w-16 h-[1px]" style={{ background: "linear-gradient(to left, transparent, #C9A96E)" }} />
          </div>

          <p className="section-subtitle">
            Insights, ideas and perspectives shaping the future of built environments.
          </p>
        </div>

        {/* ── CARD GRID ── */}
        {loading ? (
          <div className="blogs-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="blogs-card blog-card animate-pulse rounded-[16px] border border-transparent bg-neutral-200/50" style={{ height: "380px" }}>
                <div style={{ width: "100%", aspectRatio: "16/9", background: "#e5e5e5", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }} />
                <div style={{ padding: "28px 24px" }}>
                  <div style={{ width: "80px", height: "12px", background: "#e5e5e5", borderRadius: "4px", marginBottom: "8px" }} />
                  <div style={{ width: "140px", height: "12px", background: "#e5e5e5", borderRadius: "4px", marginBottom: "16px" }} />
                  <div style={{ width: "100%", height: "24px", background: "#e5e5e5", borderRadius: "4px", marginBottom: "12px" }} />
                  <div style={{ width: "100%", height: "48px", background: "#e5e5e5", borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div style={{ maxWidth: "450px", margin: "0 auto", padding: "40px 24px", background: "#ffffff", borderRadius: "12px", border: "1px solid rgba(139,26,26,0.15)", textAlign: "center" }}>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "#8c1515", marginBottom: "10px" }}>Unable to load articles</h4>
            <p style={{ fontSize: "14px", color: "#6E6B64", marginBottom: "20px" }}>{error}</p>
            <button onClick={fetchFeaturedBlogs} style={{ background: "#8B1A1A", color: "#fff", border: "none", borderRadius: "4px", padding: "10px 20px", cursor: "pointer", fontSize: "12px", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        ) : activePosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <p className="section-subtitle">No featured articles are available at the moment.</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {activePosts.map((post, index) => (
              <div
                key={post.id}
                className="blogs-card blog-card group relative overflow-hidden rounded-[16px] transition-all duration-300 blogs-reveal-el"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease",
                  transitionDelay: inView ? `${index * 100}ms` : "0ms",
                  boxShadow: "0 2px 12px rgba(61,61,58,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#C9A96E";
                  e.currentTarget.style.boxShadow = "0 0 0 1px #C9A96E, 0 12px 32px rgba(201,169,110,0.12)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(196, 151, 58, 0.15)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(61,61,58,0.04)";
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                {/* Card Image Wrapper */}
                <div className="blog-card__image-wrapper">
                  <Link href={post.href}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-card__image transition-transform duration-500 ease-out group-hover:scale-106"
                    />
                  </Link>
                  
                  {/* Specific stronger image grain layer */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10 opacity-12"
                    style={{
                      filter: "url(#blogs-grain-noise)",
                      mixBlendMode: "overlay",
                    }}
                  />

                  {/* Shimmer Sweeper Overlay */}
                  <div className="blogs-card-shimmer absolute inset-0 z-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(115deg, transparent 0%, rgba(201,169,110,0.25) 50%, transparent 100%)",
                      width: "150%",
                      transform: "translateX(-150%)",
                    }}
                  />
                </div>

                {/* Card Contents */}
                <div className="blog-card__content">
                  {/* Category / Meta Text */}
                  <span className="blog-card__category">
                    {post.category}
                  </span>

                  {/* Date + Read Time Row */}
                  <div className="blog-card__date-time">
                    <span>{post.date}</span>
                    <span className="blog-card__meta-separator" />
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="blog-card__title">
                    <Link href={post.href} className="hover:text-[#B8863D] transition-colors duration-200">
                      {post.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="blog-card__excerpt">
                    {post.description}
                  </p>

                  {/* Link */}
                  <Link
                    href={post.href}
                    className="blog-card__cta"
                  >
                    READ MORE
                    <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── NEWSLETTER BAR ── */}
        <div
          className="newsletter-bar blogs-reveal-el"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: inView ? "400ms" : "0ms",
          }}
        >
          {/* Left Block (Envelope Icon + Text) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 text-center sm:text-left">
            <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full bg-[#ECDCC0] flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            
            <div className="newsletter-bar__text">
              <strong>Stay updated with the latest insights and industry perspectives.</strong>
              <span>Subscribe to our newsletter and get curated updates delivered to your inbox.</span>
            </div>
          </div>

          {/* Right Block (Form capture) */}
          <form
            onSubmit={handleSubscribeSubmit}
            className="newsletter-bar__form flex items-stretch w-full lg:w-auto"
          >
            {subscribed ? (
              <div className="w-full text-center sm:text-left font-sans text-[14px] font-bold text-[#8B1A1A] py-3 tracking-wide">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-bar__input"
                />
                <button
                  type="submit"
                  className="newsletter-bar__button"
                >
                  Subscribe &nbsp;→
                </button>
              </>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
