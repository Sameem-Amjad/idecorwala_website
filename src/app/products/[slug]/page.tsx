"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { getCategoryWithProducts, ProductCategory, Product } from "@/lib/supabaseClient";
import Breadcrumb from "@/components/high-volume/Breadcrumb";
import ClosingCTABanner from "@/components/high-volume/ClosingCTABanner";
import HeroSection from "@/components/high-volume/HeroSection";
import ProductRangeSection from "@/components/high-volume/ProductRangeSection";
import StatsBand from "@/components/high-volume/StatsBand";
import WhyChooseSection from "@/components/high-volume/WhyChooseSection";
import FooterSection from "@/components/sections/FooterSection";
import styles from "@/components/high-volume/HighVolume.module.css";

export default function CategoryProductsPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryData = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getCategoryWithProducts(slug);
      if (data) {
        setCategory(data.category);
        setProducts(data.products);
      } else {
        setError(`Product Category "${slug}" was not found.`);
      }
    } catch (err: any) {
      console.error("Error loading category data:", err);
      setError(err.message || "Failed to load product category from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [slug]);

  if (loading) {
    return (
      <main className={`${styles.page} pt-[76px] flex flex-col min-h-screen justify-between`}>
        <div className="flex-grow flex flex-col items-center justify-center py-32 text-center">
          <RefreshCw className="animate-spin text-[#8B1A1A] mb-4" size={32} />
          <p className="text-sm font-medium text-[#6E6B64]">Loading category details...</p>
        </div>
        <FooterSection />
      </main>
    );
  }

  if (error || !category) {
    return (
      <main className={`${styles.page} pt-[76px] flex flex-col min-h-screen justify-between`}>
        <div className="flex-grow flex flex-col items-center justify-center py-32 px-4 max-w-md mx-auto text-center">
          <div className="p-6 bg-[#FFFFFF] rounded-[20px] border border-[rgba(139,26,26,0.15)] shadow-[0_4px_24px_rgba(0,0,0,0.02)] w-full">
            <h3 className="font-serif text-lg text-[#8c1515] mb-2">Category Not Found</h3>
            <p className="text-sm text-[#6E6B64] mb-6">{error || "The requested category could not be resolved."}</p>
            <button
              onClick={fetchCategoryData}
              className="bg-[#8B1A1A] text-white border-none rounded-md px-6 py-2.5 cursor-pointer text-xs font-bold inline-flex items-center gap-2 hover:bg-[#520F0F] transition-all"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        </div>
        <FooterSection />
      </main>
    );
  }

  return (
    <main className={`${styles.page} pt-[76px]`}>
      <Breadcrumb categoryName={category.name} />
      <HeroSection category={category} isDynamicSlug={true} />
      <ProductRangeSection products={products} categoryName={category.name} />
      <StatsBand />
      <WhyChooseSection />
      <ClosingCTABanner />
      <FooterSection />
    </main>
  );
}
