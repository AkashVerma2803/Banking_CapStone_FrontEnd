export interface Employee {
    employeeId: number;
    fullName: string;
    email: string;
    phoneNumber?: string;
    salary: number;
    clientIds: number;
    client?: any;
    isActive: boolean;
    createdAt?: Date;
}

export interface CreateEmployeeRequest {
    fullName: string;
    email: string;
    phoneNumber?: string;
    salary: number;
}

export interface UpdateEmployeeRequest {
    employeeId: number;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    salary?: number;
}

export interface BulkEmployeeUpload{
    file: File;
}

export interface EmployeeUploadResult{
    successCount: number;
    failedCount: number;
    errors :string[];
}