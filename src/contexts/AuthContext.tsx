
import React, { createContext, useContext } from 'react';
import { useAuthSession } from '@/hooks/use-auth-session';
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, isSessionLoading } = useAuthSession();
  const { 
    isAuthLoading,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    forgotPassword,
    resetPassword
  } = useAuthOperations();
  
  // Combine loading states
  const isLoading = isSessionLoading || isAuthLoading;

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    forgotPassword,
    resetPassword,
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
