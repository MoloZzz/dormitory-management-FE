import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../../types/auth';
import { authApi } from '../../api/auth';
import type { LoginCredentials } from './types';
import type { RegisterCredentials } from '../../types/auth';

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
        const initAuth = async () => {
            if (token) {
                try {
                    const userData = await authApi.getProfile();
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to fetch user profile', error);
                    logout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, [token]);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            // Use mockAuthApi for development if needed, or switch based on env
            // const response = await authApi.login(credentials);
            const response = await import('../../mock-api/auth').then(m => m.mockAuthApi.login(credentials));

            setToken(response.token);
            setUser(response.user);
            localStorage.setItem('token', response.token);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        setIsLoading(true);
        try {
            // Use mockAuthApi for development
            const response = await import('../../mock-api/auth').then(m => m.mockAuthApi.register(credentials));

            setToken(response.token);
            setUser(response.user);
            localStorage.setItem('token', response.token);
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
