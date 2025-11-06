export interface Bank{
    bankId: number;
    bankName: string;
    ifscCode: string;
    address: string;
    contactNumber: string;
    supportEmail: string;
    superAdminId: number;
    isActive?: boolean;
    createdAt?: Date;
}

export interface CreateBankRequest{
    bankName: string;
    ifscCode: string;
    address: string;
    contactNumber: string;
    supportEmail: string;
}

export interface UpdateBankRequest{
    bankId: number;
    bankName: string;
    ifscCode: string;
    address: string;
    contactNumber: string;
    supportEmail: string;
}