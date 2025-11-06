import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuditLog ,AuditLogFilter } from '../../../../models/audit-log.model';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private apiUrl = `${environment.apiUrl}/superadmin/auditlogs`;

  constructor(private http: HttpClient) {}

  getAllAuditLogs(filter?: AuditLogFilter): Observable<AuditLog[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.fromDate) {
        params = params.set('fromDate', filter.fromDate.toISOString());
      }
      if (filter.toDate) {
        params = params.set('toDate', filter.toDate.toISOString());
      }
      if (filter.userId) {
        params = params.set('userId', filter.userId.toString());
      }
      if (filter.action) {
        params = params.set('action', filter.action);
      }
      if (filter.tableName) {
        params = params.set('tableName', filter.tableName);
      }
    }

    return this.http.get<AuditLog[]>(this.apiUrl, { params });
  }

  getAuditLogById(id: number): Observable<AuditLog> {
    return this.http.get<AuditLog>(`${this.apiUrl}/${id}`);
  }
}