import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';


const registerSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    login: z.string().min(1, 'Login is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['worker', 'student']),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
    const { register: registerUser, isLoading } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'student',
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            await registerUser(data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <Input
                                id="fullName"
                                type="text"
                                {...register('fullName')}
                                placeholder="Full Name"
                            />
                            {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium text-gray-700">Login</label>
                            <Input
                                id="login"
                                type="text"
                                {...register('login')}
                                placeholder="Login"
                            />
                            {errors.login && <p className="text-sm text-red-600 mt-1">{errors.login.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                {...register('role')}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                            >
                                <option value="student">Student</option>
                                <option value="worker">Worker</option>
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing up...' : 'Sign up'}
                        </Button>
                    </div>
                    <div className="text-center">
                        <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
