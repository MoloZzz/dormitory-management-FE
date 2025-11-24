import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchApi } from '../../api/search';
import { Input } from '../../components/ui/Input';
import { useDebounce } from '../../hooks/useDebounce';

export const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);

    const { data: results, isLoading } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: () => searchApi.search(debouncedQuery),
        enabled: !!debouncedQuery,
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Search</h1>
            <div className="max-w-xl">
                <Input
                    placeholder="Search students or dormitories..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {isLoading && <div>Searching...</div>}

            {results && (
                <div className="space-y-8">
                    {results.students.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Students</h2>
                            <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
                                {results.students.map((student) => (
                                    <li key={student.id} className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                                        <div className="text-sm text-gray-500">Course: {student.course}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {results.dormitories.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Dormitories</h2>
                            <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
                                {results.dormitories.map((dormitory) => (
                                    <li key={dormitory.id} className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{dormitory.name}</div>
                                        <div className="text-sm text-gray-500">{dormitory.address}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {results.students.length === 0 && results.dormitories.length === 0 && debouncedQuery && (
                        <div className="text-gray-500">No results found.</div>
                    )}
                </div>
            )}
        </div>
    );
};
