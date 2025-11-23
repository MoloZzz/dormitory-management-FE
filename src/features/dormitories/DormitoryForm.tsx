import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { CreateDormitoryDto, Dormitory } from '../../types/dormitory';

const dormitorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
});

interface DormitoryFormProps {
    initialData?: Dormitory;
    onSubmit: (data: CreateDormitoryDto) => Promise<void>;
    onCancel: () => void;
}

export const DormitoryForm: React.FC<DormitoryFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateDormitoryDto>({
        resolver: zodResolver(dormitorySchema),
        defaultValues: initialData ? {
            name: initialData.name,
            address: initialData.address,
        } : undefined,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                    id="name"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <Input
                    id="address"
                    {...register('address')}
                    className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
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
