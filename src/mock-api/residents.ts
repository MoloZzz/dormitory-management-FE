import type { Resident } from '../types/resident';

export const mockResidentsApi = {
    getAll: async (): Promise<Resident[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { id: '1', fullName: 'John Doe', dormitoryName: 'Dormitory 1', roomNumber: '101' },
            { id: '2', fullName: 'Jane Smith', dormitoryName: 'Dormitory 1', roomNumber: '102' },
        ];
    },
};
