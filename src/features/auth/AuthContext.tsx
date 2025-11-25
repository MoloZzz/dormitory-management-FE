import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../../types/auth';
import { authApi } from '../../api/auth';
import type { LoginCredentials } from './types';
import type { RegisterCredentials } from '../../types/auth';
import { apiClient } from '../../api/client';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await authApi.getProfile();
          setUser(userData);
        } catch (error: any) {
          console.error('Failed to fetch profile', error);
          logout();
          toast.error(error.userMessage || 'Не вдалося отримати профіль');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(credentials);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);
    } catch (error: any) {
      console.error(error);
      toast.error(error.userMessage || 'Невірний логін або пароль');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const response = await authApi.register(credentials);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);
    } catch (error: any) {
      console.error(error);
      toast.error(error.userMessage || 'Помилка при реєстрації');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
