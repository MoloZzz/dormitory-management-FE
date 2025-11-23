import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { CreateStudentDto, Student } from '../../types/student';

const studentSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    course: z.coerce.number().min(1).max(6, 'Course must be between 1 and 6'),
});

interface StudentFormProps {
    initialData?: Student;
    onSubmit: (data: CreateStudentDto) => Promise<void>;
    onCancel: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(studentSchema),
        defaultValues: initialData ? {
            fullName: initialData.fullName,
            dateOfBirth: initialData.dateOfBirth.split('T')[0], // Format for date input
            course: initialData.course,
        } : undefined,
    });

    const onFormSubmit = (data: any) => {
        onSubmit(data as CreateStudentDto);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <Input
                    id="fullName"
                    {...register('fullName')}
                    className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Input
                    id="dateOfBirth"
                    type="date"
                    {...register('dateOfBirth')}
                    className={errors.dateOfBirth ? 'border-red-500' : ''}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
            </div>
            <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                <select
                    id="course"
                    {...register('course')}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.course ? 'border-red-500' : ''}`}
                >
                    <option value="">Select Course</option>
                    {[1, 2, 3, 4, 5, 6].map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course.message}</p>}
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {initialData ? 'Update' : 'Create'}
                </Button>
            </div>
        </form>
    );
};
