import { apiClient } from './client';
import type { SearchResults } from '../types/reports';
import { mockSearchApi } from '../mock-api/search';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const searchApi = {
    search: async (query: string): Promise<SearchResults> => {
        if (USE_MOCK) return mockSearchApi.search(query);
        const response = await apiClient.get<SearchResults>('/search', { params: { q: query } });
        return response.data;
    },
};
