import { isNgTemplate } from "@angular/compiler";

export interface LoginRequest{
    username: string;
    password: string;
}

export interface LoginResponse{
    token: string;
    user : UserInfo;
    message: string;
}

export interface UserInfo{
    id: number;
    username: string;
    email: string;
   fullname? : string;
   roleId   : number;
   userType: 'SuperAdmin' | 'BankUser' | 'Client';
   bankId? : number;
   bankName?: string;
   clientName?: string;
   accountNumber?: string;
   isActive: boolean;
}

export interface ChangePasswordRequest{
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}