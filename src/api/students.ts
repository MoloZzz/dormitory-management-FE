import { apiClient } from './client';
import type { Student, CreateStudentDto, UpdateStudentDto, StudentFilters } from '../types/student';
import { mockStudentsApi } from '../mock-api/students';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const studentsApi = {
    getAll: async (filters?: StudentFilters): Promise<Student[]> => {
        if (USE_MOCK) return mockStudentsApi.getAll(filters);
        const params = new URLSearchParams();
        if (filters?.fullName) {
            params.append('fullName', filters.fullName);
        }
        const response = await apiClient.get<Student[]>('/students', { params });
        return response.data;
    },
    getById: async (id: string): Promise<Student> => {
        if (USE_MOCK) return mockStudentsApi.getById(id);
        const response = await apiClient.get<Student>(`/students/${id}`);
        return response.data;
    },
    create: async (data: CreateStudentDto): Promise<Student> => {
        if (USE_MOCK) return mockStudentsApi.create(data);
        const response = await apiClient.post<Student>('/students', data);
        return response.data;
    },
    update: async (id: string, data: UpdateStudentDto): Promise<Student> => {
        if (USE_MOCK) return mockStudentsApi.update(id, data);
        const response = await apiClient.put<Student>(`/students/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        if (USE_MOCK) return mockStudentsApi.delete(id);
        await apiClient.delete(`/students/${id}`);
    },
};
