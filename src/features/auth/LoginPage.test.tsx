import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { LoginPage } from './LoginPage';

// Mock the auth api
vi.mock('../../api/auth', () => ({
    authApi: {
        login: vi.fn(),
    },
}));

const renderLoginPage = () => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                <LoginPage />
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('LoginPage', () => {
    it('renders login form', () => {
        renderLoginPage();
        expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Login/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        renderLoginPage();

        const submitButton = screen.getByRole('button', { name: /Sign in/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Login is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
        });
    });

    it('shows validation error for short password', async () => {
        renderLoginPage();

        const passwordInput = screen.getByPlaceholderText(/Password/i);
        fireEvent.change(passwordInput, { target: { value: '123' } });

        const submitButton = screen.getByRole('button', { name: /Sign in/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
        });
    });
});
