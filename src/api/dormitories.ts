import { apiClient } from './client';
import type { Dormitory, CreateDormitoryDto, UpdateDormitoryDto } from '../types/dormitory';
import { mockDormitoriesApi } from '../mock-api/dormitories';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const dormitoriesApi = {
    getAll: async (): Promise<Dormitory[]> => {
        if (USE_MOCK) return mockDormitoriesApi.getAll();
        const response = await apiClient.get<Dormitory[]>('/dormitories');
        return response.data;
    },
    getById: async (id: string): Promise<Dormitory> => {
        if (USE_MOCK) return mockDormitoriesApi.getById(id);
        const response = await apiClient.get<Dormitory>(`/dormitories/${id}`);
        return response.data;
    },
    create: async (data: CreateDormitoryDto): Promise<Dormitory> => {
        if (USE_MOCK) return mockDormitoriesApi.create(data);
        const response = await apiClient.post<Dormitory>('/dormitories', data);
        return response.data;
    },
    update: async (id: string, data: UpdateDormitoryDto): Promise<Dormitory> => {
        if (USE_MOCK) return mockDormitoriesApi.update(id, data);
        const response = await apiClient.put<Dormitory>(`/dormitories/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        if (USE_MOCK) return mockDormitoriesApi.delete(id);
        await apiClient.delete(`/dormitories/${id}`);
    },
};
