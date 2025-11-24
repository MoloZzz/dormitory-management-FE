import { apiClient } from './client';
import type { StudentProfile } from '../types/studentProfile';
import { mockStudentProfileApi } from '../mock-api/studentProfile';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const studentProfileApi = {
    getMyProfile: async (): Promise<StudentProfile> => {
        if (USE_MOCK) return mockStudentProfileApi.getMyProfile();
        const response = await apiClient.get<StudentProfile>('/students/profile/me');
        return response.data;
    },
};
