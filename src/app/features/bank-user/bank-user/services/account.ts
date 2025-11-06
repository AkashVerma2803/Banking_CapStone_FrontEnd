import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Account } from '../../../../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/bankuser/accounts`;

  constructor(private http: HttpClient) {}

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  approveAccount(id: number, approve: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/approve`, { approve });
  }
}