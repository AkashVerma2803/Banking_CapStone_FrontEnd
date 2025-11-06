import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Transaction ,TransactionFilter } from '../../../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/bankuser/transactions`;

  constructor(private http: HttpClient) {}

  getAllTransactions(filter?: TransactionFilter): Observable<Transaction[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.fromDate) {
        params = params.set('fromDate', filter.fromDate.toISOString());
      }
      if (filter.toDate) {
        params = params.set('toDate', filter.toDate.toISOString());
      }
      if (filter.transactionTypeId) {
        params = params.set('transactionTypeId', filter.transactionTypeId.toString());
      }
      if (filter.clientId) {
        params = params.set('clientId', filter.clientId.toString());
      }
    }

    return this.http.get<Transaction[]>(this.apiUrl, { params });
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }
}