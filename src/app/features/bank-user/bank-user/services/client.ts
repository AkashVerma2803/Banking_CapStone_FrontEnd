import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Client } from '../../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/bankuser/clients`;

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  approveClient(id: number, approve: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/approve`, { approve });
  }

  updateClient(id: number, client: any): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }
}