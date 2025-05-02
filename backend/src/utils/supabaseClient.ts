import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

// Get Supabase credentials from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

let client: SupabaseClient | null = null;

/**
 * Initialize and return a Supabase client
 */
export function supabaseClient(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing Supabase credentials in environment variables");
  }

  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  return client;
}
