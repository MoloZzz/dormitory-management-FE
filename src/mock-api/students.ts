import type { Student, CreateStudentDto, UpdateStudentDto, StudentFilters } from '../types/student';

export const mockStudentsApi = {
    getAll: async (filters?: StudentFilters): Promise<Student[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const students = [
            { id: '1', fullName: 'John Doe', dateOfBirth: '2000-01-01', course: 1 },
            { id: '2', fullName: 'Jane Smith', dateOfBirth: '2001-02-02', course: 2 },
        ];
        if (filters?.fullName) {
            return students.filter(s => s.fullName.toLowerCase().includes(filters.fullName!.toLowerCase()));
        }
        return students;
    },
    getById: async (id: string): Promise<Student> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { id, fullName: 'John Doe', dateOfBirth: '2000-01-01', course: 1 };
    },
    create: async (data: CreateStudentDto): Promise<Student> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { id: Math.random().toString(), ...data };
    },
    update: async (id: string, data: UpdateStudentDto): Promise<Student> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { id, ...data };
    },
    delete: async (id: string): Promise<void> => {
        console.log('Mock delete', id);
        await new Promise(resolve => setTimeout(resolve, 500));
    },
};
