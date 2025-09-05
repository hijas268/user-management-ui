import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface AuditLog {
  id: number;
  action: string;
  performedBy: string;
  entityName: string;
  entityId?: string;
  performedAt: string;
  ipAddress?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {
  private apiUrl = 'https://localhost:7265/api/AuditTrail'; // adjust your API URL

  constructor(private http: HttpClient) {}

  // Fetch logs with optional search, pagination
  getLogs(search: string = '', page: number = 1, pageSize: number = 10): Observable<{ data: AuditLog[], totalCount: number }> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ data: AuditLog[], totalCount: number }>(this.apiUrl, { params });
  }
}
