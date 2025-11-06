import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SalaryDisbursement } from '../../../../models/salary-disbursement.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private apiUrl = `${environment.apiUrl}/bankuser/salary-disbursements`;

  constructor(private http: HttpClient) {}

  getAllDisbursements(): Observable<SalaryDisbursement[]> {
    return this.http.get<SalaryDisbursement[]>(this.apiUrl);
  }

  getDisbursementById(id: number): Observable<SalaryDisbursement> {
    return this.http.get<SalaryDisbursement>(`${this.apiUrl}/${id}`);
  }

  approveDisbursement(id: number, approve: boolean, remarks?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/approve`, { approve, remarks });
  }
}