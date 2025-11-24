import type { Student } from './student';
import type { Dormitory } from './dormitory';

export interface SearchResults {
    students: Student[];
    dormitories: Dormitory[];
}

export interface OccupancyStats {
    dormitoryId: string;
    dormitoryName: string;
    capacity: number;
    occupied: number;
    occupancyRate: number;
}
