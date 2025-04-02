
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const useAuthSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase is not configured. Authentication features will not work.');
        setIsLoading(false);
        return;
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error(error);
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error fetching auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    let subscription: { unsubscribe: () => void } | null = null;
    
    if (isSupabaseConfigured()) {
      try {
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setIsLoading(false);
        });
        subscription = data.subscription;
      } catch (error) {
        console.error('Error setting up auth state change listener:', error);
        setIsLoading(false);
      }
    }

    setData();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return {
    user,
    session,
    isSessionLoading: isLoading
  };
};
