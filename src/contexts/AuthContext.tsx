
import React, { createContext, useContext } from 'react';
import { useAuthSession } from '@/hooks/use-auth-session';
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, isSessionLoading } = useAuthSession();
  const { 
    isAuthLoading,
    signInWithProvider,
    signOut,
  } = useAuthOperations();
  
  // Combine loading states
  const isLoading = isSessionLoading || isAuthLoading;

  // Create dummy functions for removed methods
  const dummyFunction = async () => {
    throw new Error('This authentication method is not supported. Please use Google authentication.');
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    signUp: dummyFunction,
    signIn: dummyFunction,
    signInWithProvider,
    signOut,
    forgotPassword: dummyFunction,
    resetPassword: dummyFunction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
