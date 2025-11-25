import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { studentsApi } from '../../api/students';
import { User, Calendar } from 'lucide-react';

export const StudentDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data: student, isLoading, error } = useQuery({
        queryKey: ['student', id],
        queryFn: () => studentsApi.getById(id!),
        enabled: !!id,
    });

    if (isLoading) return <div className="p-6">Loading student...</div>;
    if (error || !student) return <div className="p-6 text-red-600">Student not found</div>;

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <User className="h-6 w-6 text-blue-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">Student information</h2>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Full name:</span>
                        <span className="font-medium text-gray-900">{student.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Date of birth:</span>
                        <span className="font-medium text-gray-900">
                            {new Date(student.dateOfBirth).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Course:</span>
                        <span className="font-medium text-gray-900">{student.course}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-600">Academic info</p>
                    <p className="text-lg font-semibold text-gray-900">Course year: {student.course}</p>
                </div>
            </div>
        </div>
    );
};
