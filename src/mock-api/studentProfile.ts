import type { StudentProfile } from '../types/studentProfile';

export const mockStudentProfileApi = {
    getMyProfile: async (): Promise<StudentProfile> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            id: '1',
            fullName: 'Test Student',
            dateOfBirth: '2002-05-15',
            course: 2,
            roomAssignment: {
                dormitoryId: '1',
                dormitoryName: 'North Hall',
                roomNumber: '203A'
            }
        };
    },
};
