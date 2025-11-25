import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dormitoriesApi } from '../../api/dormitories';

export const DormitoryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data: dorm, isLoading, error } = useQuery({
        queryKey: ['dormitory', id],
        queryFn: () => dormitoriesApi.getById(id!),
        enabled: !!id,
    });

    if (isLoading) return <div className="p-6">Loading dormitory...</div>;
    if (error || !dorm) return <div className="p-6 text-red-600">Dormitory not found</div>;

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">Dormitory details</h1>

            <div className="bg-white rounded-lg shadow p-6 space-y-3">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">{dorm.name}</h2>
                    <p className="text-gray-600">{dorm.address}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Rooms count</p>
                        <p className="text-lg font-medium text-gray-900">
                            {dorm.roomCount ?? 'Not specified'}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Occupancy rate</p>
                        <p className="text-lg font-medium text-gray-900">
                            {dorm.occupancyRate != null ? `${dorm.occupancyRate}%` : 'Not specified'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
