
import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useAuthOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set your Supabase URL and anon key in the environment variables.');
      }
      
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast({
        title: "Success!",
        description: "Please check your email for verification link.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign up.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set your Supabase URL and anon key in the environment variables.');
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'facebook' | 'twitter') => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set your Supabase URL and anon key in the environment variables.');
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

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set your Supabase URL and anon key in the environment variables.');
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast({
        title: "Email sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send reset email.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (password: string) => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set your Supabase URL and anon key in the environment variables.');
      }
      
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to reset password.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthLoading: isLoading,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    forgotPassword,
    resetPassword,
  };
};
