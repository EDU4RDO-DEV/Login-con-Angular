import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Retornar el observable (json simulado)
  login(credentials: LoginRequest): Observable<User> {
    console.log(credentials);

    return this.http.get<User>('././assets/data.json');
  }
}
