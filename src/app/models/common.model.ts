export interface ApiResponse<T> {
    success : boolean;
    message : string;
    data    : T;
}

export interface PaginatedResponse<T>  {
    items       : T[];
    totalCount : number;
    totalNumber : number;
    pageSize   : number;
    totalPages  : number;
}

export enum Role {
    SUPER_ADMIN = 1,
    BANK_USER = 2,
    CLIENT_USER = 3,
    CLIENT
}


export interface SelectOption {
    label : string;
    value : any;
}