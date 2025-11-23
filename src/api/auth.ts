import { apiClient } from './client';
import type { LoginResponse } from '../types/auth';
import type { LoginCredentials } from '../features/auth/types';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        // MOCK: Simulate API call
        console.log('Mocking login for:', credentials);
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            token: 'mock-jwt-token',
            user: {
                id: '1',
                login: credentials.login,
                fullName: 'Test Admin',
                role: 'admin'
            }
        };
    },
    getProfile: async (): Promise<LoginResponse['user']> => {
        // MOCK: Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
            id: '1',
            login: 'admin',
            fullName: 'Test Admin',
            role: 'admin'
        };
    },
};
