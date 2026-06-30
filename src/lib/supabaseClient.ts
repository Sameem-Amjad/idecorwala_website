import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-anon-key";

console.log("[Supabase Client] Initializing with URL:", supabaseUrl);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string | number;
  name: string;
  category: string;
  category_order: number;
  redirect_url: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
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
  content: Record<string, unknown> | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

// Fetch all active products sorted by category_order then display_order
export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("category_order", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching active products:", error);
    throw error;
  }
  return data || [];
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
