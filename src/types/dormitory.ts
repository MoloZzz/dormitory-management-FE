export interface Dormitory {
    id: string;
    name: string;
    address: string;
    // Optional fields if provided by API
    roomCount?: number;
    occupancyRate?: number;
}

export interface CreateDormitoryDto {
    name: string;
    address: string;
}

export type UpdateDormitoryDto = CreateDormitoryDto;
