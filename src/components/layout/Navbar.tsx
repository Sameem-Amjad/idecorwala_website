"use client";

import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { cn } from "@/lib/utils";
import { 
  ChevronUp, 
  Armchair, 
  Hammer, 
  Box, 
  Network, 
  User, 
  Lightbulb, 
  Handshake, 
  Phone, 
  ChevronRight, 
  X,
  Building,
  HardHat,
  Cpu
} from "lucide-react";
import { usePathname } from "next/navigation";
import { getActiveProducts, getProductCategories, ProductCategory, Product } from "@/lib/supabaseClient";
console.log("[Navbar] Initializing Navbar component...");
import { useMemo } from "react";

type DropdownItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

type NavDropdown = {
  key: string;
  trigger: string;
  links: DropdownItem[];
};

const NAV_DROPDOWNS: NavDropdown[] = [
  {
    key: "solutions",
    trigger: "SOLUTIONS",
    links: [
      { label: "Hospitality",        href: "/solutions/hospitality" },
      { label: "Healthcare",         href: "/solutions/healthcare" },
      { label: "Malls & Multiplexes",href: "/solutions/malls-multiplexes" },
      { label: "IT Park Campuses",   href: "/solutions/it-park-campuses" },
      { label: "Manufacturing & Infrastructure", href: "/solutions/manufacturing-infrastructure" },
    ],
  },
  {
    key: "services",
    trigger: "SERVICES",
    links: [
      { label: "Design & Architecture", href: "/services/design-architecture" },
      { label: "Civil, Structural & Facade", href: "/services/civil-structural-facade" },
      { label: "Interiors & Fitouts",   href: "/services/interiors-fitouts" },
    ],
  },
  {
    key: "products",
    trigger: "PRODUCTS",
    links: [
      { 
        label: "Walls", 
        href: "/products/high-volume#walls",
        subItems: [
          { label: "Wallpaper", href: "/products/walls/wallpaper" },
          { label: "Wall Murals", href: "/products/walls/murals" },
          { label: "Wall Art & Decals", href: "/products/walls/art-decals" },
          { label: "Wall Sculptures", href: "/products/walls/sculptures" },
          { label: "Finishes", href: "/products/walls/finishes" }
        ]
      },
      { 
        label: "Floors", 
        href: "/products/high-volume#floors",
        subItems: [
          { label: "Wood", href: "/products/floors/wood" },
          { label: "Vinyl", href: "/products/floors/vinyl" },
          { label: "Epoxy", href: "/products/floors/epoxy" },
          { label: "Carpet", href: "/products/floors/carpet" },
          { label: "Turf", href: "/products/floors/turf" }
        ]
      },
      { 
        label: "Ceilings", 
        href: "/products/high-volume#ceilings",
        subItems: [
          { label: "Gypsum", href: "/products/ceilings/gypsum" },
          { label: "PVC Panels", href: "/products/ceilings/pvc-panels" },
          { label: "Stretch Ceilings", href: "/products/ceilings/stretch-ceilings" },
          { label: "Ceiling Finishes", href: "/products/ceilings/finishes" }
        ]
      },
    ],
  },
  {
    key: "technology",
    trigger: "TECHNOLOGY",
    links: [
      { label: "Spacefold™", href: "/technology/spacefold" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isThoughtLeadership = false;
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [visibleOnScroll, setVisibleOnScroll] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [openMobileSubGroup, setOpenMobileSubGroup] = useState<string | null>(null);
  const [isHeadlineActive, setIsHeadlineActive] = useState(false);
  const [dbCategories, setDbCategories] = useState<ProductCategory[]>([]);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log("[Navbar] Fetching categories and products from Supabase...");
    Promise.all([getProductCategories(), getActiveProducts()])
      .then(([categoriesData, productsData]) => {
        setDbCategories(categoriesData);
        setDbProducts(productsData);
      })
      .catch((err) => {
        console.error("[Navbar] Error loading navbar data:", err);
      });
  }, []);

  const dynamicProductsLinks = useMemo(() => {
    if (!dbCategories || dbCategories.length === 0) {
      console.log("[Navbar] No categories fetched, using static fallback navigation.");
      return [
        {
          label: "Walls",
          href: "/products/walls",
          subItems: [
            { label: "Wallpaper", href: "/products/walls" },
            { label: "Wall Murals", href: "/products/walls" }
          ]
        },
        {
          label: "Floors",
          href: "/products/floor",
          subItems: [
            { label: "Wood", href: "/products/floor" },
            { label: "Vinyl", href: "/products/floor" }
          ]
        }
      ];
    }

    return dbCategories.map((category) => {
      const categoryProducts = dbProducts.filter((p) => String(p.category_id) === String(category.id));
      return {
        label: category.name,
        href: `/products/${category.slug}`,
        subItems: categoryProducts.map((p) => ({
          label: p.name,
          href: p.redirect_url
        }))
      };
    });
  }, [dbCategories, dbProducts]);

  const navDropdowns = useMemo(() => {
    return NAV_DROPDOWNS.map((dropdown) => {
      if (dropdown.key === "products") {
        return {
          ...dropdown,
          links: dynamicProductsLinks,
        };
      }
      return dropdown;
    });
  }, [dynamicProductsLinks]);

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    let lastScrollVal = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollVal = window.scrollY;
          setScrolled(currentScrollVal > 40);
          setAtTop(currentScrollVal < 80);

          if (currentScrollVal > lastScrollVal && currentScrollVal > 80) {
            setVisibleOnScroll(false);
          } else if (currentScrollVal < lastScrollVal) {
            setVisibleOnScroll(true);
          }

          if (pathname === "/") {
            const vh = window.innerHeight;
            setIsHeadlineActive(currentScrollVal >= 2.7 * vh && currentScrollVal <= 4.0 * vh);
          } else {
            setIsHeadlineActive(false);
          }

          lastScrollVal = currentScrollVal;
          ticking = false;
        });
        ticking = true;
      }
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1280);
    };
    handleScroll();
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).lenis && typeof (window as any).lenis.stop === "function") {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).lenis && typeof (window as any).lenis.start === "function") {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).lenis && typeof (window as any).lenis.start === "function") {
        (window as any).lenis.start();
      }
    };
  }, [mobileOpen]);

  const isVisible = !mounted || mobileOpen || activeDropdown !== null || isThoughtLeadership || visibleOnScroll || showNavbar || isHeadlineActive;

  return (
    <>
      {/* Dynamic Keyframes for the Nameplate Reveal Hinge Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nameplateReveal {
          0% {
            opacity: 0;
            transform: translateY(-10px) rotateX(-8deg);
            transform-origin: top center;
          }
          100% {
            opacity: 1;
            transform: translateY(0px) rotateX(0deg);
            transform-origin: top center;
          }
        }
      ` }} />

      {/* Invisible hover trigger zone at the top of the screen */}
      {!isMobile && (
        <div
          className="fixed top-0 left-0 right-0 z-40 pointer-events-auto"
          style={{ height: "20px" }}
          onMouseEnter={() => setShowNavbar(true)}
        />
      )}

      <header
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          height: isThoughtLeadership ? "auto" : (isMobile ? "76px" : "110px"),
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: isVisible ? "auto" : "none",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          backgroundColor: isThoughtLeadership ? "#F7F6F2" : "transparent",
          borderBottom: "none",
          boxShadow: "none",
        }}
        data-scrolled={scrolled.toString()}
        onMouseLeave={() => {
          if (!mobileOpen) {
            setShowNavbar(false);
            setActiveDropdown(null);
          }
        }}
      >
      <nav
        role="navigation"
        className="h-full flex items-center justify-between relative"
        style={{
          paddingLeft:  "clamp(16px, 2.5vw, 32px)",
          paddingRight: "clamp(16px, 2.5vw, 32px)",
          transition: "background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease",
          ...(!isThoughtLeadership && {
            background: (scrolled || pathname !== "/")
              ? "linear-gradient(rgba(250, 248, 245, 0.98), rgba(246, 242, 235, 0.98))"
              : "transparent",
            backdropFilter: (scrolled || pathname !== "/") ? "blur(12px)" : "none",
            WebkitBackdropFilter: (scrolled || pathname !== "/") ? "blur(12px)" : "none",
            border: "none",
            borderRadius: "0px",
            boxShadow: (scrolled || pathname !== "/")
              ? (isMobile
                  ? "0 4px 20px rgba(0, 0, 0, 0.08)"
                  : "0 6px 28px rgba(27, 23, 20, 0.12)")
              : "none",
            margin: "0px",
            width: "100%",
            height: isMobile ? "76px" : "84px",
          })
        }}
      >

        {/* ── LEFT: Logo ── */}
        {isThoughtLeadership ? (
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img 
              src="/id-logo-red.png" 
              alt="iDECORWALA Logo" 
              className="h-10 w-auto object-contain" 
            />
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-lg leading-none tracking-wide text-[#1B1714]">
                iDECORWALA
              </span>
              <span className="font-sans text-[8px] font-bold tracking-[0.15em] text-[#7A7670] uppercase leading-none mt-1">
                BUILDER BETTER ENVIRONMENTS
              </span>
            </div>
          </Link>
        ) : (
          <Link href="/" className="flex items-center flex-shrink-0">
            {/* No invert over the hero: this mark is a filled red disc with a white
                knockout, so brightness(0) invert(1) flattened it into a solid white
                blob. The hero frames are light beige throughout, and the red disc
                reads cleanly against them — same treatment as every other page. */}
            <img
              src="/id-logo-red.png"
              alt="iDECORWALA Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
        )}

        {/* ── CENTER: Desktop Nav Links with Dropdowns ── */}
        {isThoughtLeadership ? (
          <div className="hidden xl:flex items-center gap-8 ml-auto">
            {[
              { label: "About Us", href: "/company/about" },
              { label: "Services", href: "#", hasDropdown: true, dropdownKey: "services" },
              { label: "Products", href: "#", hasDropdown: true, dropdownKey: "products" },
              { label: "Thought Leadership", href: "/company/thought-leadership" },
              { label: "Careers", href: "/company/careers" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => {
              if (link.hasDropdown) {
                const nav = NAV_DROPDOWNS.find((d) => d.key === link.dropdownKey);
                if (!nav) return null;
                return (
                  <div
                    key={link.dropdownKey}
                    className="relative py-4"
                    onMouseEnter={() => setActiveDropdown(nav.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === nav.key}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: activeDropdown === nav.key ? "#B11216" : "#2B2724",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "0",
                        transition: "color 200ms ease",
                      }}
                      className="hover:text-[#B11216]"
                    >
                      {link.label} ▾
                    </button>
                    {activeDropdown === nav.key && (
                      <div
                        className="absolute z-50 transition-all duration-300 ease-out"
                        style={{
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "200px",
                          background: "#F7F6F2",
                          border: "1px solid rgba(201, 168, 76, 0.2)",
                          borderRadius: "4px",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                          overflow: "hidden",
                          padding: "6px 0",
                          zIndex: 50,
                        }}
                      >
                        {nav.links.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-6 py-2.5 font-sans text-[13px] text-[#2B2724] hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A] transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "hover:text-[#B11216] transition-colors relative py-1 font-sans text-[14px]",
                    isActive ? "text-[#B11216] font-semibold" : "text-[#2B2724]"
                  )}
                  style={{ textDecoration: "none" }}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#B11216]" />
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="hidden xl:flex items-center gap-4 xl:gap-8 ml-8 xl:ml-16 mr-auto">
            {/* Group A: Primary Nav Items */}
            <div className="flex items-center gap-3 xl:gap-4">
              {navDropdowns.map((nav, index) => {
                let IconComponent = Box;
                if (nav.key === "solutions") IconComponent = Building;
                else if (nav.key === "services") IconComponent = HardHat;
                else if (nav.key === "products") IconComponent = Box;
                else if (nav.key === "technology") IconComponent = Cpu;

                return (
                  <Fragment key={nav.key}>
                    <div
                      className="relative py-2 px-4 xl:px-6 flex-shrink-0"
                      onMouseEnter={() => setActiveDropdown(nav.key)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === nav.key}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4px",
                          padding: "0",
                          transition: "all 200ms ease",
                        }}
                      >
                        <IconComponent 
                          className="transition-transform duration-300"
                          style={{
                            width: "18px",
                            height: "18px",
                            color: (scrolled || pathname !== "/") ? "#C4973A" : "rgba(255,255,255,0.85)",
                            strokeWidth: 1.5,
                            transform: activeDropdown === nav.key ? "scale(1.1)" : "scale(1)",
                            transition: "color 0.4s ease, transform 200ms ease",
                          }} 
                        />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 800,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: activeDropdown === nav.key ? "#8B1A1A" : "#1A1715",
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                            transition: "color 0.4s ease",
                          }}
                        >
                          {nav.trigger}
                          <span style={{ fontSize: "6px", transition: "transform 200ms ease", transform: activeDropdown === nav.key ? "rotate(180deg)" : "rotate(0deg)" }}>
                            ▼
                          </span>
                        </span>
                      </button>

                      {/* Crimson triangle indicator below trigger when active */}
                      {activeDropdown === nav.key && (
                        <span style={{
                          position: "absolute",
                          bottom: "-1px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 0,
                          height: 0,
                          borderLeft: "6px solid transparent",
                          borderRight: "6px solid transparent",
                          borderBottom: "6px solid rgba(196, 151, 58, 0.50)",
                        }} />
                      )}

                      {/* Upward-pointing caret connecting triangle above the box */}
                      {activeDropdown === nav.key && (
                        <div style={{
                          position: "absolute",
                          top: "calc(100% + 4px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 0,
                          height: 0,
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderBottom: "8px solid #C4973A",
                          zIndex: 51,
                        }} />
                      )}

                      {/* Dropdown panel */}
                      <div
                        className={`absolute z-50 transition-all duration-300 ease-out ${
                          activeDropdown === nav.key
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-3 pointer-events-none"
                        }`}
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: nav.key === "products" ? "0" : "50%",
                          transform: nav.key === "products" ? "translateX(-30%)" : "translateX(-50%)",
                          width: nav.key === "products" ? "650px" : "285px",
                          paddingTop: "10px", // Acts as a bridge so mouse hover doesn't break
                          zIndex: 50,
                        }}
                      >
                        <div style={{
                          background: "#F5F0E8 url('https://www.transparenttextures.com/patterns/handmade-paper.png') repeat",
                          border: "none",
                          borderRadius: "20px",
                          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.25), inset 3px 3px 6px rgba(0, 0, 0, 0.1), inset -3px -3px 6px rgba(255, 255, 255, 0.7)",
                          overflow: "hidden",
                          perspective: "600px",
                        }}>
                          {/* Individual Nameplate Cards (one per link) */}
                          {nav.key === "products" ? (
                            <div style={{ padding: "10px 20px 20px 20px" }}>
                              {/* High-Volume Products — featured top row */}
                              {nav.links.filter(item => item.label === "High-Volume Products").map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "16px 20px",
                                    marginBottom: "20px",
                                    background: "rgba(255, 255, 255, 0.4)",
                                    border: "1px solid rgba(196, 151, 58, 0.15)",
                                    borderLeft: "4px solid #8B1A1A",
                                    borderRadius: "8px",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.02)",
                                    transition: "all 300ms cubic-bezier(0.25, 0.8, 0.25, 1)",
                                  }}
                                  className="group hover:bg-[rgba(196,151,58,0.06)] hover:border-[rgba(196,151,58,0.35)] hover:shadow-[0_8px_25px_rgba(139,26,26,0.06)]"
                                >
                                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: "9px",
                                      fontWeight: 800,
                                      letterSpacing: "0.22em",
                                      textTransform: "uppercase",
                                      color: "#C4973A",
                                    }}>
                                      01 // FINISHED MODULES
                                    </span>
                                    <p style={{
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: "15px",
                                      fontWeight: 800,
                                      color: "#8B1A1A",
                                      margin: 0,
                                      letterSpacing: "0.02em",
                                    }}>
                                      High-Volume Products
                                    </p>
                                    <p style={{
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: "11.5px",
                                      fontWeight: 500,
                                      color: "#5C5852",
                                      margin: 0,
                                    }}>
                                      Innovative plug-and-play finished goods
                                    </p>
                                  </div>
                                  <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(196, 151, 58, 0.2)",
                                    background: "rgba(255, 255, 255, 0.6)",
                                    color: "#8B1A1A",
                                    transition: "all 300ms cubic-bezier(0.25, 0.8, 0.25, 1)",
                                  }} className="group-hover:border-[#8B1A1A] group-hover:bg-[#8B1A1A] group-hover:text-white">
                                    <svg width="18" height="10" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform duration-300 transform group-hover:translate-x-0.5">
                                      <path d="M0 6H20M20 6L15 1M20 6L15 11" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                </Link>
                              ))}

                              {/* Walls / Floors / Ceilings — Dynamic category grid */}
                              {(() => {
                                const subLinks = nav.links.filter(item => item.label !== "High-Volume Products");
                                const numCols = subLinks.length;
                                return (
                                  <div style={{ 
                                    display: "grid", 
                                    gridTemplateColumns: numCols <= 4 ? `repeat(${numCols}, 1fr)` : "repeat(3, 1fr)", 
                                    gap: "20px" 
                                  }}>
                                    {subLinks.map((item, index) => (
                                  <div key={item.label}>
                                    <Link
                                      href={item.href}
                                      className="group hover:text-[#8B1A1A]"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        textDecoration: "none",
                                        marginBottom: "12px",
                                        animationName: activeDropdown === nav.key ? "nameplateReveal" : "none",
                                        animationDuration: "280ms",
                                        animationTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                                        animationFillMode: "both",
                                        animationDelay: activeDropdown === nav.key ? `${index * 40}ms` : "0ms",
                                      }}
                                    >
                                      <span style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "14.5px",
                                        fontWeight: 800,
                                        letterSpacing: "0.02em",
                                        color: "#8B1A1A",
                                        borderBottom: "1px solid rgba(139,26,26,0.3)",
                                        paddingBottom: "4px",
                                        width: "100%",
                                        transition: "color 150ms ease-out, border-color 150ms ease-out",
                                      }}>
                                        {item.label}
                                      </span>
                                    </Link>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                      {item.subItems?.map((sub, subIdx) => {
                                        const isExternal = sub.href.startsWith("http");
                                        const Tag = isExternal ? "a" : Link;
                                        const linkProps = isExternal 
                                          ? { href: sub.href, target: "_blank", rel: "noopener noreferrer" }
                                          : { href: sub.href };
                                        return (
                                          <Tag
                                            key={sub.label}
                                            {...linkProps}
                                            className="group hover:text-[#8B1A1A] hover:translate-x-1"
                                            style={{
                                              fontFamily: "'DM Sans', sans-serif",
                                              fontSize: "13px",
                                              fontWeight: 600,
                                              color: "#4A4541",
                                              textDecoration: "none",
                                              transition: "all 150ms ease-out",
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "6px",
                                              animationName: activeDropdown === nav.key ? "nameplateReveal" : "none",
                                              animationDuration: "280ms",
                                              animationTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                                              animationFillMode: "both",
                                              animationDelay: activeDropdown === nav.key ? `${(index * 40) + (subIdx * 20) + 100}ms` : "0ms",
                                            }}
                                          >
                                            <span style={{ fontSize: "10px", color: "#C4973A" }}>•</span>
                                            {sub.label}
                                          </Tag>
                                        );
                                      })}
                                    </div>
                                  </div>
                                    ))}
                                  </div>
                                );
                              })()}
                            </div>

                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", textAlign: "left", paddingTop: "8px" }}>
                              {nav.links.map((item, index) => (
                                <Fragment key={item.label}>
                                  <Link
                                    href={item.href ?? "#"}
                                    className="group hover:bg-[rgba(139,26,26,0.05)] border-l-[3px] border-transparent hover:border-[#C4973A]"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      padding: "12px 18px",
                                      textDecoration: "none",
                                      transition: "all 180ms ease",
                                      animationName: activeDropdown === nav.key ? "nameplateReveal" : "none",
                                      animationDuration: "280ms",
                                      animationTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                                      animationFillMode: "both",
                                      animationDelay: activeDropdown === nav.key ? `${index * 40}ms` : "0ms",
                                    }}
                                  >
                                    <span style={{
                                      color: "#C4973A",
                                      fontSize: "13px",
                                      lineHeight: 1,
                                      display: "inline-block",
                                      transition: "transform 150ms ease-out",
                                      flexShrink: 0,
                                    }}
                                    className="group-hover:translate-x-[4px]"
                                    >
                                      →
                                    </span>
                                    <span style={{
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: "13.5px",
                                      fontWeight: 600,
                                      letterSpacing: "0.01em",
                                      color: "#1A1715",
                                      transition: "color 150ms ease-out",
                                    }}
                                    className="group-hover:text-[#8B1A1A]"
                                    >
                                      {item.label}
                                    </span>
                                  </Link>
                                  {index < nav.links.length - 1 && (
                                    <div style={{
                                      height: "1px",
                                      margin: "0 18px",
                                      background: "linear-gradient(to right, transparent 0%, rgba(196,151,58,0.3) 20%, rgba(196,151,58,0.3) 80%, transparent 100%)",
                                    }} />
                                  )}
                                </Fragment>
                              ))}
                            </div>
                          )}

                          {/* Bottom padding on the last card */}
                          <div style={{ height: "8px" }} />
                        </div>
                      </div>
                    </div>
                    {/* Vertical Divider line between items */}
                    {index < NAV_DROPDOWNS.length - 1 && (
                      <div className="w-px h-6 self-center flex-shrink-0" style={{ background: (scrolled || pathname !== "/") ? "rgba(196,151,58,0.3)" : "rgba(255,255,255,0.25)", transition: "background 0.4s ease" }} />
                    )}
                  </Fragment>
                );
              })}
            </div>

            {/* Visual Divider (Separating Group A from Group B) */}
            <div className="w-px h-7 self-center flex-shrink-0 mx-3 xl:mx-5" style={{ background: (scrolled || pathname !== "/") ? "rgba(196,151,58,0.45)" : "rgba(255,255,255,0.35)", transition: "background 0.4s ease" }} />

            {/* Group B: Secondary Nav Links */}
            <div className="flex items-center gap-2 xl:gap-4">
              {[
                { label: "About Us", href: "/company/about" },
                { label: "Thought Leadership", href: "/company/thought-leadership" },
                { label: "Partner Portal", href: "/company/partner-portal" }
              ].map(({ label, href }, index) => {
                const isActive = pathname === href;
                return (
                  <Fragment key={label}>
                    <div className="px-4 xl:px-5 py-2 flex-shrink-0">
                      <Link
                        href={href}
                        className={cn(
                          "transition-colors relative py-1",
                          isActive
                            ? "text-[#B11216] font-bold"
                            : "text-[#1A1715] hover:text-[#8B1A1A]"
                        )}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          fontWeight: isActive ? 800 : 700,
                          letterSpacing: "0.04em",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          outline: "none",
                          transition: "color 0.4s ease",
                        }}
                      >
                        {label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-current" />
                        )}
                      </Link>
                    </div>
                    {/* Vertical Divider line between secondary items */}
                    {index < 2 && (
                      <div className="w-px h-5 self-center flex-shrink-0" style={{ background: (scrolled || pathname !== "/") ? "rgba(196,151,58,0.35)" : "rgba(255,255,255,0.3)", transition: "background 0.4s ease" }} />
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* ── RIGHT: CTA Button + Mobile Toggle ── */}
        <div className="flex items-center gap-4">

          {/* Desktop CTA */}
          <Link
            href="/contact"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #8B1A1A 0%, #520F0F 100%)",
              border: "1.5px solid #C9A84C",
              padding: "12px 28px",
              cursor: "pointer",
              display: (isMobile || isThoughtLeadership) ? "none" : "flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 300ms ease",
              borderRadius: "8px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(139, 26, 26, 0.35), inset 0 2px 0px rgba(255, 255, 255, 0.15), inset 0 -2px 0px rgba(0, 0, 0, 0.4)",
            }}
            className="hover:scale-[1.03] hover:shadow-[0_12px_28px_rgba(0,0,0,0.55),0_6px_16px_rgba(139,26,26,0.45)] hover:border-[#E6C280] hidden xl:inline-flex"
          >
            LET&apos;S CONNECT
            <span style={{ fontSize: "0.875rem" }}>→</span>
          </Link>
 
          {/* Mobile Hamburger */}
          <button
            className="xl:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            style={{ color: (scrolled || pathname !== "/") ? "var(--color-ink-800)" : "white", transition: "color 0.4s ease" }}
          >
            <span
              className={cn("block h-px w-6 bg-current transition-all duration-300", {
                "rotate-45 translate-y-2": mobileOpen,
              })}
            />
            <span
              className={cn("block h-px w-4 bg-current transition-all duration-300", {
                "opacity-0": mobileOpen,
              })}
            />
            <span
              className={cn("block h-px w-6 bg-current transition-all duration-300", {
                "-rotate-45 -translate-y-2.5": mobileOpen,
              })}
            />
          </button>
        </div>
      </nav>
      </header>

      {/* ── MOBILE MENU DRAWER ── */}
      <div 
        className={cn(
          "xl:hidden fixed inset-0 z-[100] transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop Overlay */}
        <div 
          className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />

        {/* Close Button on the backdrop overlay area */}
        <button
          onClick={() => setMobileOpen(false)}
          className={cn(
            "fixed top-6 right-6 z-[110] flex items-center justify-center w-12 h-12 rounded-full border border-[#C9A84C]/40 bg-black/40 text-white transition-all duration-300",
            mobileOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-90"
          )}
          aria-label="Close menu"
        >
          <X size={24} className="text-[#F4EBDD]" />
        </button>

        <div
          data-lenis-prevent
          className={cn(
            "relative h-full w-[85%] max-w-[390px] overflow-y-auto transition-transform duration-500 ease-out border-r border-[#C9A84C]/45",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          style={{
            backgroundColor: "#F5F0E8", // Parchment background
            backgroundImage: "url('https://www.transparenttextures.com/patterns/handmade-paper.png')",
            boxShadow: "25px 0 50px rgba(0, 0, 0, 0.3)",
            padding: "20px 20px 24px 20px",
          }}
        >
          <div className="relative z-10 flex flex-col min-h-full justify-between">
            {/* Elegant gold inner frame - placed here to dynamically expand with scroll height */}
            <div 
              className="absolute pointer-events-none z-0" 
              style={{
                top: "-10px",
                left: "-10px",
                right: "-10px",
                bottom: "-24px",
                border: "3px solid transparent",
                borderBottom: "none",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                background: `linear-gradient(#F5F0E8, #F5F0E8) padding-box, 
                             linear-gradient(135deg, 
                               #b38728 0%, 
                               #fbf5b7 25%, 
                               #996515 50%, 
                               #fcf6ba 75%, 
                               #b38728 100%
                             ) border-box`,
                boxShadow: "inset 0 0 8px rgba(187, 145, 51, 0.35), 0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            />

            <div className="relative z-10">
              {/* Logo Area */}
              <div className="flex items-center justify-between px-4 pb-2 pt-7">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                  <img 
                    src="/id-logo-red.png" 
                    alt="iDECORWALA Logo" 
                    className="h-[44px] w-auto object-contain" 
                    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.05))" }}
                  />
                </Link>
              </div>

              {/* Menu Items Container */}
              <nav className="flex flex-col gap-2.5 w-full" style={{ marginTop: "50px" }}>
                {[
                  { key: "solutions", label: "SOLUTIONS", subtitle: "Transforming Spaces", icon: Armchair, isDropdown: true },
                  { key: "services", label: "SERVICES", subtitle: "What We Offer", icon: Hammer, isDropdown: true },
                  { key: "products", label: "PRODUCTS", subtitle: "Curated Selections", icon: Box, isDropdown: true },
                  { key: "technology", label: "TECHNOLOGY", subtitle: "Innovation in Design", icon: Network, isDropdown: true },
                  { key: "about", label: "ABOUT US", subtitle: "Our Story", icon: User, href: "/about" },
                  { key: "thought-leadership", label: "THOUGHT LEADERSHIP", subtitle: "Insights & Ideas", icon: Lightbulb, href: "/thought-leadership" },
                  { key: "partner-portal", label: "PARTNER PORTAL", subtitle: "Collaborate with Us", icon: Handshake, href: "/partner-portal" }
                ].map((item) => {
                  const isOpen = openMobileGroup === item.key;
                  const IconComponent = item.icon;

                  if (item.isDropdown) {
                    return (
                      <div key={item.key} className="flex flex-col">
                        <button
                          onClick={() => setOpenMobileGroup(isOpen ? null : item.key)}
                          className="flex items-center justify-between p-2.5 transition-all duration-300 w-full text-left"
                          style={{
                            background: isOpen 
                              ? `linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 40%, #F3EFE6 100%) padding-box, 
                                 linear-gradient(135deg, 
                                   #b38728 0%, 
                                   #fbf5b7 25%, 
                                   #996515 50%, 
                                   #fcf6ba 75%, 
                                   #b38728 100%
                                 ) border-box` 
                              : "transparent",
                            border: "2px solid transparent",
                            borderRadius: "20px",
                            padding: "10px 14px",
                            boxShadow: isOpen 
                              ? "inset 0 0 6px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.06)" 
                              : "none",
                          }}
                        >
                          <div className="flex items-center gap-3.5">
                            <div 
                              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                              style={{
                                background: isOpen ? "linear-gradient(135deg, #E6C280 0%, #A37F3D 100%)" : "#F4EBDD",
                                border: "1px solid rgba(201, 168, 76, 0.45)",
                                boxShadow: isOpen ? "0 4px 10px rgba(163, 127, 61, 0.35)" : "inset 0 2px 4px rgba(0,0,0,0.03), 0 3px 6px rgba(0,0,0,0.03)",
                              }}
                            >
                              <IconComponent size={18} className={isOpen ? "text-[#520F0F]" : "text-[#8B1A1A]"} />
                            </div>
                            <div className="flex flex-col text-left">
                              <span 
                                className="font-serif text-[14px] font-bold tracking-wider transition-colors duration-300"
                                style={{ color: isOpen ? "#8B1A1A" : "#110D0B" }}
                              >
                                {item.label}
                              </span>
                              <span 
                                className="font-sans text-[11px] font-medium tracking-wide mt-0.5 transition-colors duration-300"
                                style={{ color: isOpen ? "#5C554E" : "#4E4943" }}
                              >
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                          <ChevronRight 
                            size={16} 
                            className="text-[#C9A84C] transition-transform duration-300" 
                            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                          />
                        </button>

                        {/* Expandable Dropdown List */}
                        <div
                          style={{
                            maxHeight: isOpen ? "300px" : "0px",
                            opacity: isOpen ? 1 : 0,
                            overflow: "hidden",
                            transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                            paddingLeft: "52px",
                            marginTop: isOpen ? "6px" : "0px",
                          }}
                        >
                          <div className="flex flex-col gap-2.5 pb-3 pl-1">
                            {navDropdowns.find(d => d.key === item.key)?.links.map((subLink) => {
                              const isSubOpen = openMobileSubGroup === subLink.label;
                              return (
                                <div key={subLink.label} className="flex flex-col">
                                  {subLink.subItems ? (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenMobileSubGroup(isSubOpen ? null : subLink.label);
                                      }}
                                      className="font-sans text-[14px] text-[#211C19] font-medium hover:text-[#8B1A1A] py-2 transition-colors flex items-center justify-between gap-2.5 text-left w-full"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <span 
                                          className="w-1.5 h-1.5 rotate-45 flex-shrink-0" 
                                          style={{
                                            background: "linear-gradient(135deg, #b38728 0%, #fbf5b7 50%, #996515 100%)",
                                            border: "1px solid #C9A84C",
                                            boxShadow: "0 1px 3px rgba(163, 127, 61, 0.4)",
                                          }}
                                        />
                                        {subLink.label}
                                      </div>
                                      <ChevronRight 
                                        size={14} 
                                        className="text-[#C9A84C] transition-transform duration-300" 
                                        style={{ transform: isSubOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                                      />
                                    </button>
                                  ) : (
                                    (() => {
                                      const isExternal = subLink.href.startsWith("http");
                                      const Tag = isExternal ? "a" : Link;
                                      const linkProps = isExternal 
                                        ? { href: subLink.href, target: "_blank", rel: "noopener noreferrer" }
                                        : { href: subLink.href, onClick: () => setMobileOpen(false) };
                                      return (
                                        <Tag
                                          {...linkProps}
                                          className="font-sans text-[14px] text-[#211C19] font-medium hover:text-[#8B1A1A] py-1 transition-colors flex items-center gap-2.5 text-left"
                                          style={{ textDecoration: "none" }}
                                        >
                                          <span 
                                            className="w-1.5 h-1.5 rotate-45 flex-shrink-0" 
                                            style={{
                                              background: "linear-gradient(135deg, #b38728 0%, #fbf5b7 50%, #996515 100%)",
                                              border: "1px solid #C9A84C",
                                              boxShadow: "0 1px 3px rgba(163, 127, 61, 0.4)",
                                            }}
                                          />
                                          {subLink.label}
                                        </Tag>
                                      );
                                    })()
                                  )}
                                  
                                  {subLink.subItems && (
                                    <div
                                      style={{
                                        maxHeight: isSubOpen ? "400px" : "0px",
                                        opacity: isSubOpen ? 1 : 0,
                                        overflow: "hidden",
                                        transition: "all 300ms ease-in-out",
                                        paddingLeft: "16px",
                                      }}
                                    >
                                      <div className="flex flex-col gap-2 py-2">
                                        {subLink.subItems.map((subItem) => {
                                          const isExternal = subItem.href.startsWith("http");
                                          const Tag = isExternal ? "a" : Link;
                                          const linkProps = isExternal 
                                            ? { href: subItem.href, target: "_blank", rel: "noopener noreferrer" }
                                            : { href: subItem.href, onClick: () => setMobileOpen(false) };
                                          return (
                                            <Tag
                                              key={subItem.label}
                                              {...linkProps}
                                              className="font-sans text-[13px] text-[#4A4541] font-medium hover:text-[#8B1A1A] py-1 transition-colors flex items-center gap-2 text-left"
                                              style={{ textDecoration: "none" }}
                                            >
                                              <span style={{ fontSize: "10px", color: "#C4973A" }}>•</span>
                                              {subItem.label}
                                            </Tag>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Standard Link Item (About, Thought Leadership, Partner Portal)
                  return (
                    <div key={item.key}>
                      <Link
                        href={item.href || "#"}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between p-2.5 w-full text-left"
                        style={{
                          padding: "10px 14px",
                          textDecoration: "none",
                        }}
                      >
                        <div className="flex items-center gap-3.5">
                          <div 
                            className="flex items-center justify-center w-10 h-10 rounded-full"
                            style={{
                              background: "#F4EBDD",
                              border: "1px solid rgba(201, 168, 76, 0.45)",
                              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.03), 0 3px 6px rgba(0,0,0,0.03)",
                            }}
                          >
                            <IconComponent size={18} className="text-[#8B1A1A]" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-serif text-[14px] font-bold tracking-wider text-[#110D0B]">
                              {item.label}
                            </span>
                            <span className="font-sans text-[11px] text-[#4E4943] font-medium tracking-wide mt-0.5">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-[#C9A84C]" />
                      </Link>
                    </div>
                  );
                })}
              
              </nav>
            </div>

            {/* Let's Connect CTA Button at the bottom */}
            <div className="px-3 pt-4 pb-2 flex justify-center w-full mt-auto z-10">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between w-full transition-all duration-300"
                style={{
                  padding: "14px 20px",
                  background: "linear-gradient(135deg, #8B1A1A 0%, #3D0707 50%, #170202 100%)",
                  border: "2.5px solid #C9A84C",
                  borderRadius: "14px",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.45), inset 0 2px 0px rgba(255, 255, 255, 0.15), inset 0 -2.5px 0px rgba(0, 0, 0, 0.8), inset 0 0 12px rgba(0, 0, 0, 0.6)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-center gap-3.5">
                  <div 
                    className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #E6C280 0%, #A37F3D 100%)",
                      border: "1px solid #C9A84C",
                      boxShadow: "0 3px 8px rgba(163, 127, 61, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <Phone size={18} className="text-[#520F0F]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-serif text-[14px] font-bold tracking-wider text-white">
                      LET'S CONNECT
                    </span>
                    <span className="font-sans text-[10px] text-[#E6C280] tracking-wide mt-0.5 font-medium">
                      We'd Love to Hear from You
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#E6C280]" />
              </Link>
            </div>

            {/* Bottom Ornament flourish */}
            <div className="flex items-center justify-center gap-4 w-full px-4 py-2 mt-4 z-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
              <div className="w-5 h-5 flex items-center justify-center border border-[#C9A84C]/60 rotate-45">
                <div className="w-2 h-2 bg-[#C9A84C]" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
