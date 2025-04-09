
import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useAuthOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const signInWithProvider = async (provider: 'google' | 'facebook' | 'twitter') => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set your Supabase URL and anon key in the environment variables.');
      }
      
      // Only allow Google provider
      if (provider !== 'google') {
        throw new Error('Only Google authentication is currently supported.');
      }
      
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || `Failed to sign in with ${provider}.`,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set your Supabase URL and anon key in the environment variables.');
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign out.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthLoading: isLoading,
    signInWithProvider,
    signOut,
  };
};
