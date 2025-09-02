import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://localhost:5001/api/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> { return this.http.get<User[]>(this.apiUrl); }
  getUser(id: string): Observable<User> { return this.http.get<User>(\\/\\); }
  createUser(user: User): Observable<User> { return this.http.post<User>(this.apiUrl, user); }
  updateUser(id: string, user: any): Observable<User> { return this.http.put<User>(\\/\\, user); }
  deleteUser(id: string): Observable<void> { return this.http.delete<void>(\\/\\); }
}
