import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { dormitoriesApi } from '../../api/dormitories';
import type { Dormitory, CreateDormitoryDto } from '../../types/dormitory';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { DormitoryForm } from './DormitoryForm';

export const DormitoryList: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDormitory, setEditingDormitory] = useState<Dormitory | undefined>(undefined);

    const { data: dormitories, isLoading, error } = useQuery({
        queryKey: ['dormitories'],
        queryFn: dormitoriesApi.getAll,
    });

    const createMutation = useMutation({
        mutationFn: dormitoriesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dormitories'] });
            closeModal();
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateDormitoryDto }) => dormitoriesApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dormitories'] });
            closeModal();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: dormitoriesApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dormitories'] });
        },
    });

    const openCreateModal = () => {
        setEditingDormitory(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (dormitory: Dormitory, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingDormitory(dormitory);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingDormitory(undefined);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this dormitory?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    const handleFormSubmit = async (data: CreateDormitoryDto) => {
        if (editingDormitory) {
            await updateMutation.mutateAsync({ id: editingDormitory.id, data });
        } else {
            await createMutation.mutateAsync(data);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading dormitories</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dormitories</h1>
                <Button onClick={openCreateModal}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Dormitory
                </Button>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {dormitories?.map((dormitory) => (
                            <tr
                                key={dormitory.id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => navigate(`/dormitories/${dormitory.id}`)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dormitory.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dormitory.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" size="icon" onClick={(e) => openEditModal(dormitory, e)}>
                                            <Edit className="h-4 w-4 text-blue-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={(e) => handleDelete(dormitory.id, e)}>
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {dormitories?.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No dormitories found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingDormitory ? 'Edit Dormitory' : 'Add Dormitory'}
            >
                <DormitoryForm
                    initialData={editingDormitory}
                    onSubmit={handleFormSubmit}
                    onCancel={closeModal}
                />
            </Modal>
        </div>
    );
};
