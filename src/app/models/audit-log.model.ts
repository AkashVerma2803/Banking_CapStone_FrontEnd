import { from } from "rxjs";

export interface AuditLog {
    logid: number;
    userId: number;
    user?: any;
    action: string;
    tableName?: string;
    recordId?: number;
    oldValue?: string;
    newValue?: string;
    timestamp: Date;
    ipAddress?: string;
}

export interface AuditLogFilter{
    fromDate?: Date;
    toDate?: Date;
    userId?: number;
    action?: string;
    tableName?: string;
}