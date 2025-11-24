import type { OccupancyStats } from '../types/reports';

export const mockReportsApi = {
    getOccupancyStats: async (): Promise<OccupancyStats[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { dormitoryId: '1', dormitoryName: 'Dormitory 1', capacity: 100, occupied: 85, occupancyRate: 85 },
            { dormitoryId: '2', dormitoryName: 'Dormitory 2', capacity: 150, occupied: 120, occupancyRate: 80 },
        ];
    },
};
