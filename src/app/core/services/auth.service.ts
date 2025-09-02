import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/auth';
  private tokenKey = 'auth_token';
  constructor(private http: HttpClient, private router: Router) {}
  
  login(username: string, password: string) {
    return this.http.post<{ token: string }>(\\/login\, { username, password })
      .pipe(tap(res => localStorage.setItem(this.tokenKey, res.token)));
  }

  logout() { localStorage.removeItem(this.tokenKey); this.router.navigate(['/auth/login']); }

  isAuthenticated(): boolean { return !!localStorage.getItem(this.tokenKey); }

  getRole(): string {
    const token = localStorage.getItem(this.tokenKey);
    if(!token) return '';
    const decoded: any = jwt_decode(token);
    return decoded.role;
  }
}
