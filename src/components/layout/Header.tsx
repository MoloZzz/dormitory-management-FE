import React from 'react';
import { useAuth } from '../../features/auth/AuthContext';
import { Button } from '../ui/Button';
import { LogOut } from 'lucide-react';

export const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 fixed w-full z-10">
            <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-800">DMS</h1>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                    Welcome, {user?.fullName || 'Worker'}
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>
        </header>
    );
};
