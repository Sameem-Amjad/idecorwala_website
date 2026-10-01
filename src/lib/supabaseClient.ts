import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SCHEMA } from "./supabaseSchema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-anon-key";

console.log("[Supabase Client] Initializing with URL:", supabaseUrl);
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: SUPABASE_SCHEMA },
});

export interface ProductCategory {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  category_order: number;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image_url?: string;
  is_active: boolean;
  created_at?: string;
}

export interface Product {
  id: string | number;
  category_id: string | number;
  name: string;
  description?: string;
  image_url?: string;
  redirect_url: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  product_categories?: ProductCategory;
}

export interface HeadingBlock {
  type: "heading";
  level: number;
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BulletListBlock {
  type: "bullet_list";
  items: string[];
}

export interface NumberedListBlock {
  type: "numbered_list";
  items: string[];
}

export interface QuoteBlock {
  type: "quote";
  text: string;
}

export interface DividerBlock {
  type: "divider";
}

export interface CalloutBlock {
  type: "callout";
  title?: string;
  text: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt?: string;
  caption?: string;
}

export type BlogBlock =
  | HeadingBlock
  | ParagraphBlock
  | BulletListBlock
  | NumberedListBlock
  | QuoteBlock
  | DividerBlock
  | CalloutBlock
  | ImageBlock;

export interface BlogContent {
  blocks: BlogBlock[];
}

export interface Blog {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  category: string;
  tags: string[];
  author: string;
  published_date: string;
  reading_time: string;
  content: BlogContent | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

// Fetch all active products, joining with categories
export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_categories(*)")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching active products:", error);
    throw error;
  }
  return data || [];
}

// Fetch all active product categories
export async function getProductCategories(): Promise<ProductCategory[]> {
  const { data, error } = await supabase
    .from("product_categories")
    .select("*")
    .eq("is_active", true)
    .order("category_order", { ascending: true });

  if (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
  return data || [];
}

// Fetch a specific category and its products by slug
export async function getCategoryWithProducts(slug: string): Promise<{ category: ProductCategory; products: Product[] } | null> {
  const { data: categoryData, error: categoryError } = await supabase
    .from("product_categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (categoryError) {
    if (categoryError.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching category by slug:", categoryError);
    throw categoryError;
  }

  if (!categoryData) return null;

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryData.id)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (productsError) {
    console.error("Error fetching products for category:", productsError);
    throw productsError;
  }

  return {
    category: categoryData,
    products: productsData || [],
  };
}

// Fetch all published blogs
export async function getPublishedBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("published_date", { ascending: false });

  if (error) {
    console.error("Error fetching published blogs:", error);
    throw error;
  }
  return data || [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching blog by slug:", error);
    throw error;
  }
  return data;
}
