export interface Beneficiary{
    beneficiaryId: number;
    beneficiaryName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    clientId: number;
    client? : any;
    isActive : boolean;
    ceatedAt?: Date;
}

export interface CreateBeneficiaryRequest{
    beneficiaryName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
}

export interface UpdateBeneficiaryRequest{
    beneficiaryId: number;
    beneficiaryName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
}