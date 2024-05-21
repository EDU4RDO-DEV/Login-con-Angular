import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Retornar el observable (json simulado)
  login(credentials: LoginRequest): Observable<User> {
    console.log(credentials);

    return this.http.get<User>('././assets/data.json').pipe(
      catchError(this.handleError)
    );
  }

  // Manejador de errores
  private handleError(error:HttpErrorResponse){
    if (error.status === 0){
      console.error('Error: ', error.error);
    }
    else{
      console.error('Backend retornó el código de eestado: ', error.status, error.error);
    }
    return throwError(() => 'Algo malo sucedió; por favor, inténtelo de nuevo más tarde.');
  }
}
