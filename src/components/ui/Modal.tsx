import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4 sm:p-0">
            <div className="relative w-full max-w-lg rounded-lg bg-white shadow-lg sm:my-8">
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};
