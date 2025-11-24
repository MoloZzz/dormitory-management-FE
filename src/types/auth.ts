export interface User {
    id: string;
    login: string;
    fullName: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterCredentials {
    fullName: string;
    email: string;
    login: string;
    password: string;
    role: 'worker' | 'student';
}
