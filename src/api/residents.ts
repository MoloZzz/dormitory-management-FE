import { apiClient } from './client';
import type { Resident } from '../types/resident';
import { mockResidentsApi } from '../mock-api/residents';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const residentsApi = {
    getAll: async (): Promise<Resident[]> => {
        if (USE_MOCK) return mockResidentsApi.getAll();
        const response = await apiClient.get<Resident[]>('/residents');
        return response.data;
    },
};
