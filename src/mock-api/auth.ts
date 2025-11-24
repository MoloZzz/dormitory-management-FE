import type { LoginCredentials } from '../features/auth/types';
import type { LoginResponse, RegisterCredentials } from '../types/auth';

const STORAGE_KEY = 'mock_auth_user';

export const mockAuthApi = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        console.log('Mocking login for:', credentials);
        await new Promise(resolve => setTimeout(resolve, 500));

        const role = credentials.login.toLowerCase().includes('student') ? 'student' : 'worker';
        const user = {
            id: '1',
            login: credentials.login,
            fullName: role === 'student' ? 'Test Student' : 'Test Worker',
            role: role
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

        return {
            token: 'mock-jwt-token',
            user
        };
    },
    register: async (credentials: RegisterCredentials): Promise<LoginResponse> => {
        console.log('Mocking register for:', credentials);
        await new Promise(resolve => setTimeout(resolve, 500));

        const user = {
            id: Math.random().toString(),
            login: credentials.login,
            fullName: credentials.fullName,
            role: credentials.role
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

        return {
            token: 'mock-jwt-token',
            user
        };
    },
    getProfile: async (): Promise<LoginResponse['user']> => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
            return JSON.parse(storedUser);
        }

        // Default fallback if no session exists
        return {
            id: '1',
            login: 'worker',
            fullName: 'Test Worker',
            role: 'worker'
        };
    },
};
