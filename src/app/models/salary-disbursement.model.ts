export interface SalaryDisbursement {
  salaryDisbursementId: number;
  clientId: number;
  client?: any;
  totalAmount: number;
  disbursementDate: Date;
  status: string;
  approvedByBankUserId?: number;
  approvedBy?: any;
  approvalDate?: Date;
  remarks?: string;
  createdAt: Date;
  details?: SalaryDisbursementDetails[];
}

export interface SalaryDisbursementDetails {
  detailId: number;
  salaryDisbursementId: number;
  employeeId: number;
  employee?: any;
  amount: number;
  status: string;
  remarks?: string;
}

export interface CreateSalaryDisbursementRequest {
  disbursementDate: Date;
  employeeSalaries: EmployeeSalary[];
  remarks?: string;
}

export interface EmployeeSalary {
  employeeId: number;
  amount: number;
}

export interface ApproveSalaryDisbursementRequest {
  salaryDisbursementId: number;
  approve: boolean;
  remarks?: string;
}