import type { Worker, CreateWorkerDto } from '../types/worker';

export const mockWorkersApi = {
    getAll: async (): Promise<Worker[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { id: '1', fullName: 'Worker One', login: 'worker1', role: 'worker' },
            { id: '2', fullName: 'Worker Two', login: 'worker2', role: 'worker' },
        ];
    },
    create: async (data: CreateWorkerDto): Promise<Worker> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            id: Math.random().toString(),
            fullName: data.fullName,
            login: data.login,
            role: 'worker',
        };
    },
};
