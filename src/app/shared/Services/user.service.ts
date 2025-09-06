// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateuserModel, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://localhost:7265/api/user';

  constructor(private http: HttpClient) {}

  getUsers(params: any): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { params });
  }
  searchusers(params: any): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl +'/searchusers', { params });
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // createUser(user: any): Observable<User> {
  //   return this.http.post<User>(this.apiUrl, user);
  // }
 createUser(user: any): Observable<CreateuserModel> {
    return this.http.post<CreateuserModel>(this.apiUrl+'/create', user);
  }
  updateUser(id: string, user: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
 getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updateProfile(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
