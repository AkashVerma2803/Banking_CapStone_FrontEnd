import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BankUser,CreateBankUserRequest } from '../../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BankUserService {
  private apiUrl = `${environment.apiUrl}/superadmin/bankusers`;

  constructor(private http: HttpClient) {}

  getAllBankUsers(): Observable<BankUser[]> {
    return this.http.get<BankUser[]>(this.apiUrl);
  }

  getBankUserById(id: number): Observable<BankUser> {
    return this.http.get<BankUser>(`${this.apiUrl}/${id}`);
  }

  createBankUser(bankUser: CreateBankUserRequest): Observable<BankUser> {
    return this.http.post<BankUser>(this.apiUrl, bankUser);
  }

  updateBankUser(id: number, bankUser: any): Observable<BankUser> {
    return this.http.put<BankUser>(`${this.apiUrl}/${id}`, bankUser);
  }

  deleteBankUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  toggleBankUserStatus(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/toggle-status`, {});
  }
}