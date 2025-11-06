export interface Payment{
    paymentId: number;
    clientId: number;
    client?: any;
    beneficiaryId: number;
    beneficiary?: any;
    amount: number;
    paymentDate: Date;
    paymentStatusId: number;
    paymentStatus?: PaymentStatus;
    bankUserId?: number;
    bankUser?: any;
    remarks?: string;
    approvalDate?: Date;
    referenceNumber?: string;
}

export interface PaymentStatus{
    statusId : number;
    statusName : string;
    description : string;
}

export interface CreatePaymentRequest{
    beneficiaryId: number;
    amount: number;
    remarks?: string;
}

export interface ApprovePaymentRequest{
    paymentId: number;
    approve : boolean;
    remarks?: string;
}