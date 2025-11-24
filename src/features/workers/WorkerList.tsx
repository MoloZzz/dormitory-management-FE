import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { workersApi } from '../../api/workers';

export const WorkerList: React.FC = () => {
    const { data: workers, isLoading, error } = useQuery({
        queryKey: ['workers'],
        queryFn: workersApi.getAll,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading workers</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Workers</h1>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {workers?.map((worker) => (
                            <tr key={worker.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{worker.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.login}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
