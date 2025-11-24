import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { loginSchema, type LoginCredentials } from './types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginCredentials) => {
        try {
            await login(data);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError('root', {
                message: 'Incorrect login or password'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Dormitory Management
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to your account
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="login" className="sr-only">Login</label>
                            <Input
                                id="login"
                                type="text"
                                placeholder="Login or Email"
                                {...register('login')}
                                className={errors.login ? 'border-red-500' : ''}
                            />
                            {errors.login && (
                                <p className="text-red-500 text-xs mt-1">{errors.login.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register('password')}
                                className={errors.password ? 'border-red-500' : ''}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    {errors.root && (
                        <div className="text-red-500 text-sm text-center">
                            {errors.root.message}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
