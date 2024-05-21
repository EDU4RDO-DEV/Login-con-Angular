import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'https://localhost:7090/api'; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/Usuario`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/Usuario`, user);
  }
}