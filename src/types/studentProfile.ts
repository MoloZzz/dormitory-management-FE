export interface StudentProfile {
    id: string;
    fullName: string;
    email: string;
    dateOfBirth: string;
    course: number;
    roomAssignment?: {
        dormitoryId: string;
        dormitoryName: string;
        roomNumber: string;
    };
}
