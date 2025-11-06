import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Payment } from '../../../../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/bankuser/payments`;

  constructor(private http: HttpClient) {}

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  approvePayment(id: number, approve: boolean, remarks?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/approve`, { approve, remarks });
  }
}