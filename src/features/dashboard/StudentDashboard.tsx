import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthContext';
import { studentProfileApi } from '../../api/studentProfile';
import { User, Home, Calendar, BookOpen } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
    const { user } = useAuth();

    const { data: profile, isLoading, error } = useQuery({
        queryKey: ['student-profile'],
        queryFn: studentProfileApi.getMyProfile,
    });

    if (isLoading) return <div className="p-6">Loading your profile...</div>;
    if (error) return <div className="p-6 text-red-600">Error loading profile</div>;

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.fullName}!</h1>
                <p className="text-blue-100">Here's your student dashboard</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <User className="h-6 w-6 text-blue-600 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Full Name:</span>
                            <span className="font-medium text-gray-900">{profile?.fullName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Date of Birth:</span>
                            <span className="font-medium text-gray-900">
                                {profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Course:</span>
                            <span className="font-medium text-gray-900">Year {profile?.course}</span>
                        </div>
                    </div>
                </div>

                {/* Room Assignment Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <Home className="h-6 w-6 text-green-600 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-900">Room Assignment</h2>
                    </div>
                    {profile?.roomAssignment ? (
                        <div className="space-y-3">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Dormitory:</span>
                                <span className="font-medium text-gray-900">{profile.roomAssignment.dormitoryName}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Room Number:</span>
                                <span className="font-medium text-gray-900">{profile.roomAssignment.roomNumber}</span>
                            </div>
                            <div className="mt-4 p-3 bg-green-50 rounded-md">
                                <p className="text-sm text-green-800">
                                    ✓ You are currently assigned to a room
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 bg-yellow-50 rounded-md">
                            <p className="text-yellow-800 font-medium">No Room Assigned</p>
                            <p className="text-sm text-yellow-700 mt-1">
                                You have not been assigned to a dormitory room yet. Please contact the administration.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4 flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 mr-4">
                        <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Academic Year</p>
                        <p className="text-lg font-semibold text-gray-900">2024-2025</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 flex items-center">
                    <div className="p-3 rounded-full bg-green-100 mr-4">
                        <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Current Course</p>
                        <p className="text-lg font-semibold text-gray-900">Year {profile?.course}</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 mr-4">
                        <Home className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Housing Status</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {profile?.roomAssignment ? 'Assigned' : 'Unassigned'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
