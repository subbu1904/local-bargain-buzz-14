
import { createClient } from '@supabase/supabase-js';

// Provide fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ncirqbredempqlrzyhdp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaXJxYnJlZGVtcHFscnp5aGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTA2MTYsImV4cCI6MjA1OTE2NjYxNn0.gwYybAmjkA4n5pGWpxNM6ZifXCGovpyv_FYJQvpfmdo';

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
