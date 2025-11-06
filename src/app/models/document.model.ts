export interface Document {
  documentId: number;
  clientId: number;
  client?: any;
  proofTypeId: number;
  proofType?: ProofType;
  documentPath: string;
  uploadedDate: Date;
  verifiedDate?: Date;
  isVerified: boolean;
  verifiedBy?: number;
  remarks?: string;
}

export interface ProofType {
  proofTypeId: number;
  proofTypeName: string;
  description?: string;
}

export interface UploadDocumentRequest {
  proofTypeId: number;
  file: File;
}

export interface VerifyDocumentRequest {
  documentId: number;
  isVerified: boolean;
  remarks?: string;
}