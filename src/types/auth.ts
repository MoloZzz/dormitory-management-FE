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
