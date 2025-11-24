import type { SearchResults } from '../types/reports';

export const mockSearchApi = {
    search: async (query: string): Promise<SearchResults> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (!query) return { students: [], dormitories: [] };

        return {
            students: [
                { id: '1', fullName: 'John Doe', dateOfBirth: '2000-01-01', course: 1 },
            ],
            dormitories: [
                { id: '1', name: 'Dormitory 1', address: '123 Main St' },
            ],
        };
    },
};
