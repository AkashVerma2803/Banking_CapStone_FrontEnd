export interface Transaction {
  transactionId: number;
  clientId: number;
  client?: any;
  bankUserId?: number;
  bankUser?: any;
  amount: number;
  accountId?: number;
  account?: any;
  transactionTypeId: number;
  transactionType?: TransactionType;
  paymentId?: number;
  payment?: any;
  salaryDisbursementId?: number;
  salaryDisbursement?: any;
  balanceAfter: number;
  referenceNumber?: string;
  salaryDisbursementDetailId?: number;
  status: string;
  createdAt: Date;
}

export interface TransactionType {
  typeId: number;
  typeName: string;
  description?: string;
}

export interface TransactionFilter {
  fromDate?: Date;
  toDate?: Date;
  transactionTypeId?: number;
  clientId?: number;
  accountId?: number;
}