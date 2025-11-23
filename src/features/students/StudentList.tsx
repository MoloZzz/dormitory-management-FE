import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { studentsApi } from '../../api/students';
import type { Student, CreateStudentDto } from '../../types/student';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { StudentForm } from './StudentForm';
import { useDebounce } from '../../hooks/useDebounce';

export const StudentList: React.FC = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: students, isLoading, error } = useQuery({
        queryKey: ['students', debouncedSearch],
        queryFn: () => studentsApi.getAll({ fullName: debouncedSearch }),
    });

    const createMutation = useMutation({
        mutationFn: studentsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            closeModal();
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateStudentDto }) => studentsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            closeModal();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: studentsApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });

    const openCreateModal = () => {
        setEditingStudent(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (student: Student) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingStudent(undefined);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    const handleFormSubmit = async (data: CreateStudentDto) => {
        if (editingStudent) {
            await updateMutation.mutateAsync({ id: editingStudent.id, data });
        } else {
            await createMutation.mutateAsync(data);
        }
    };

    if (isLoading && !students) return <div>Loading...</div>;
    if (error) return <div>Error loading students</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Students</h1>
                <Button onClick={openCreateModal}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 max-w-sm"
                />
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students?.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.course}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEditModal(student)}>
                                            <Edit className="h-4 w-4 text-blue-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(student.id)}>
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {students?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingStudent ? 'Edit Student' : 'Add Student'}
            >
                <StudentForm
                    initialData={editingStudent}
                    onSubmit={handleFormSubmit}
                    onCancel={closeModal}
                />
            </Modal>
        </div>
    );
};
