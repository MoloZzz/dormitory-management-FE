import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { StudentDashboard } from './StudentDashboard';

export const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    if (user?.role === 'student') {
        return <StudentDashboard />;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Placeholder cards */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Total Dormitories</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">--</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">--</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Current Residents</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">--</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Occupancy Rate</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">--%</p>
                </div>
            </div>
        </div>
    );
};
