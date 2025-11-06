import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Document } from '../../../../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/bankuser/documents`;

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }

  getDocumentById(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${id}`);
  }

  verifyDocument(id: number, isVerified: boolean, remarks?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/verify`, { isVerified, remarks });
  }
}