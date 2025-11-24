export interface Student {
    id: string;
    fullName: string;
    dateOfBirth: string; // ISO date string
    course: number;
}

export interface CreateStudentDto {
    fullName: string;
    dateOfBirth: string;
    course: number;
}

export type UpdateStudentDto = CreateStudentDto;

export interface StudentFilters {
    fullName?: string;
}
