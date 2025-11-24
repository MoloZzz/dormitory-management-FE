export interface Worker {
    id: string;
    fullName: string;
    login: string;
    role: 'worker';
}

export interface CreateWorkerDto {
    fullName: string;
    login: string;
    password: string;
}
