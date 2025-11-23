import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <Sidebar />
            <main className="pl-64 pt-16 min-h-screen">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
