import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { residentsApi } from '../../api/residents';

export const ResidentList: React.FC = () => {
    const { data: residents, isLoading, error } = useQuery({
        queryKey: ['residents'],
        queryFn: residentsApi.getAll,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading residents</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Residents</h1>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dormitory</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {residents?.map((resident) => (
                            <tr key={resident.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{resident.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.dormitoryName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.roomNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
