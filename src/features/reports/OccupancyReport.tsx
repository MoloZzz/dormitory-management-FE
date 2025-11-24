import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../../api/reports';

export const OccupancyReport: React.FC = () => {
    const { data: stats, isLoading, error } = useQuery({
        queryKey: ['occupancy-report'],
        queryFn: reportsApi.getOccupancyStats,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading report</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Occupancy Report</h1>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dormitory</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy Rate</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {stats?.map((stat) => (
                            <tr key={stat.dormitoryId}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.dormitoryName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.capacity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.occupied}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stat.occupancyRate > 90 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {stat.occupancyRate}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
