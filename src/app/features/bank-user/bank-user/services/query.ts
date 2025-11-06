import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Query } from '@angular/core';
import { ResolveQueryRequest } from '../../../../models/query.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private apiUrl = `${environment.apiUrl}/bankuser/queries`;

  constructor(private http: HttpClient) {}

  getAllQueries(): Observable<Query[]> {
    return this.http.get<Query[]>(this.apiUrl);
  }

  getQueryById(id: number): Observable<Query> {
    return this.http.get<Query>(`${this.apiUrl}/${id}`);
  }

  respondToQuery(id: number, response: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/respond`, { response });
  }

  resolveQuery(id: number, data: ResolveQueryRequest): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/resolve`, data);
  }
}