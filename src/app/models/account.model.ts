export interface Account {
  accountId: number;
  accountNumber: string;
  accountTypeId: number;
  accountType?: AccountType;
  balance: number;
  clientId: number;
  client?: any;
  bankId: number;
  bank?: any;
  accountStatusId: number;
  accountStatus?: AccountStatus;
  openedDate: Date;
  closedDate?: Date;
  isActive: boolean;
}

export interface AccountType {
  typeId: number;
  typeName: string;
  description?: string;
}

export interface AccountStatus {
  statusId: number;
  statusName: string;
  description?: string;
}

export interface CreateAccountRequest {
  accountTypeId: number;
  clientId?: number;
}

export interface AccountStatement {
  accountId: number;
  accountNumber: string;
  fromDate: Date;
  toDate: Date;
  transactions: any[];
  openingBalance: number;
  closingBalance: number;
}