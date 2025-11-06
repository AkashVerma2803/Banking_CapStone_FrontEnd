export interface Query {
  queryId: number;
  clientId: number;
  client?: any;
  subject: string;
  description: string;
  status: string;
  isResolved: boolean;
  createdAt: Date;
  resolvedAt?: Date;
  resolvedBy?: number;
  response?: string;
}

export interface CreateQueryRequest {
  subject: string;
  description: string;
}

export interface ResolveQueryRequest {
  queryId: number;
  response: string;
}