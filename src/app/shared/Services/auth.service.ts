import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7265/api/Login';

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
     return this.http.post(`${this.apiUrl}/login`, data);
  }
}
