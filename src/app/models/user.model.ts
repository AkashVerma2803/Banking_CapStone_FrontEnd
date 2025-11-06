import { Role } from "./common.model";  

export interface UserBase{
    id: number;
    username: string;
    email: string;
    fullname? : string;
    roleId   : number;
    isActive: boolean;
    createdAt: Date;
    userType : 'SuperAdmin' | 'BankUser' | 'Client';
}

export interface SuperAdmin extends UserBase{
    userType : 'SuperAdmin';
}

export interface BankUser extends UserBase{
    userType : 'BankUser';
    bankId   : number;
    bankName : string;
}

export interface Client extends UserBase{
    userType : 'Client';
    clientName: string;
    accountNumber: string;
    accountBalance: number;
    bankId   : number;
    bank? : Bank;
    address?: string;
    panNumber?: string;
    gstNumber?: string;
}

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

export interface UserRole{
    roleId: number;
    role : Role;
    description?: string;
}

export interface CreateBankUserRequest{
    username: string;
    email: string;
    fullname? : string;
    password: string;
    bankId   : number;
}

export interface CreateClientRequest{
    username: string;
    email: string;
    password: string;
    clientName: string;
    address: string;
    panNumber: string;
    gstNumber: string;
    bankId   : number;
}