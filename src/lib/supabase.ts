
import { createClient } from '@supabase/supabase-js';

// Provide fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ncirqbredempqlrzyhdp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Check if we have the required values before creating the client
if (!supabaseUrl || supabaseUrl === 'https://your-supabase-url.supabase.co') {
  console.warn('Supabase URL not provided. Authentication and database features will not work.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key') {
  console.warn('Supabase Anon Key not provided. Authentication and database features will not work.');
}

// Create the Supabase client with the provided or fallback values
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://your-supabase-url.supabase.co' && 
         supabaseAnonKey !== 'your-anon-key';
};
