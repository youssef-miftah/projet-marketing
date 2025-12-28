'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, User } from '@/lib/api';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nom?: string, prenom?: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await authAPI.getMe();
          if (response.success) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          Cookies.remove('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    if (response.success) {
      setUser(response.data.user);
    } else {
      throw new Error(response.message || 'Erreur de connexion');
    }
  };

  const register = async (email: string, password: string, nom?: string, prenom?: string) => {
    const response = await authAPI.register({ email, password, nom, prenom });
    if (response.success) {
      setUser(response.data.user);
    } else {
      throw new Error(response.message || 'Erreur d\'inscription');
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

