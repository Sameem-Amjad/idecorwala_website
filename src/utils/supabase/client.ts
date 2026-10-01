import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_SCHEMA } from "@/lib/supabaseSchema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
    { db: { schema: SUPABASE_SCHEMA } },
  );
