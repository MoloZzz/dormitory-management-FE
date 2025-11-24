import type { Dormitory, CreateDormitoryDto, UpdateDormitoryDto } from '../types/dormitory';

export const mockDormitoriesApi = {
    getAll: async (): Promise<Dormitory[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { id: '1', name: 'Dormitory 1', address: '123 Main St' },
            { id: '2', name: 'Dormitory 2', address: '456 Oak Ave' },
        ];
    },
    getById: async (id: string): Promise<Dormitory> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { id, name: `Dormitory ${id}`, address: '123 Main St' };
    },
    create: async (data: CreateDormitoryDto): Promise<Dormitory> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { id: Math.random().toString(), ...data };
    },
    update: async (id: string, data: UpdateDormitoryDto): Promise<Dormitory> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { id, ...data };
    },
    delete: async (id: string): Promise<void> => {
        console.log('Mock delete', id);
        await new Promise(resolve => setTimeout(resolve, 500));
    },
};
