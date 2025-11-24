import { apiClient } from './client';
import type { LoginResponse, RegisterCredentials } from '../types/auth';
import type { LoginCredentials } from '../features/auth/types';
import { mockAuthApi } from '../mock-api/auth';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        if (USE_MOCK) return mockAuthApi.login(credentials);
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },
    register: async (credentials: RegisterCredentials): Promise<LoginResponse> => {
        if (USE_MOCK) return mockAuthApi.register(credentials);
        const response = await apiClient.post<LoginResponse>('/auth/register', credentials);
        return response.data;
    },
    getProfile: async (): Promise<LoginResponse['user']> => {
        if (USE_MOCK) return mockAuthApi.getProfile();
        const response = await apiClient.get<LoginResponse['user']>('/auth/me');
        return response.data;
    },
};
