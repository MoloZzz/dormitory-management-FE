import { apiClient } from './client';
import type { Worker, CreateWorkerDto } from '../types/worker';
import { mockWorkersApi } from '../mock-api/workers';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const workersApi = {
    getAll: async (): Promise<Worker[]> => {
        if (USE_MOCK) return mockWorkersApi.getAll();
        const response = await apiClient.get<Worker[]>('/workers');
        return response.data;
    },
    create: async (data: CreateWorkerDto): Promise<Worker> => {
        if (USE_MOCK) return mockWorkersApi.create(data);
        const response = await apiClient.post<Worker>('/workers', data);
        return response.data;
    },
};
