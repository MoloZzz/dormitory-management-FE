import { apiClient } from './client';
import type { OccupancyStats } from '../types/reports';
import { mockReportsApi } from '../mock-api/reports';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const reportsApi = {
    getOccupancyStats: async (): Promise<OccupancyStats[]> => {
        if (USE_MOCK) return mockReportsApi.getOccupancyStats();
        const response = await apiClient.get<OccupancyStats[]>('/reports/occupancy');
        return response.data;
    },
};
