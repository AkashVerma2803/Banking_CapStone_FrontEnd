import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Bank , CreateBankUserRequest  } from '../../../../models/user.model';
import { CreateBankRequest, UpdateBankRequest } from '../../../../models/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = `${environment.apiUrl}/superadmin/banks`;

  constructor(private http: HttpClient) {}

  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.apiUrl);
  }

  getBankById(id: number): Observable<Bank> {
    return this.http.get<Bank>(`${this.apiUrl}/${id}`);
  }

  createBank(bank: CreateBankRequest): Observable<Bank> {
    return this.http.post<Bank>(this.apiUrl, bank);
  }

  updateBank(id: number, bank: UpdateBankRequest): Observable<Bank> {
    return this.http.put<Bank>(`${this.apiUrl}/${id}`, bank);
  }

  deleteBank(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}