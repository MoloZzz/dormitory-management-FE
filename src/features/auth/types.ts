import { z } from 'zod';

export const loginSchema = z.object({
    login: z.string().min(1, 'Login is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
