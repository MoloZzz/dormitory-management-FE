import React from 'react';
import { useParams } from 'react-router-dom';

export const DormitoryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <h1 className="text-2xl font-bold">Dormitory Details</h1>
            <p>ID: {id}</p>
            <p className="mt-4 text-gray-500">Rooms management will be implemented in Sprint 2.</p>
        </div>
    );
};
