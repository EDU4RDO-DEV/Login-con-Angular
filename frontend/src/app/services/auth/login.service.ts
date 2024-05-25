import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from './loginRequest';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private messageService: MessageService,
    private router: Router
  ) {}

  // Método para iniciar sesión
  login(credentials: LoginRequest): Observable<User> {
    return this.http
      .post<
        User & {
          token: string;
          id_usuario: number;
          correo_institucional: string;
          clave: string;
        }
      >('https://localhost:7090/Auth/Login', credentials)
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('id_usuario', response.id_usuario.toString());
          localStorage.setItem(
            'correo_institucional',
            response.correo_institucional
          );
          localStorage.setItem('clave', response.clave);
          // Actualiza el valor de userLoggedIn$ a true cuando el usuario inicia la sesión.
          this.userLoggedIn$.next(true);
          this.messageService.add({
            severity: 'success',
            summary: 'Inicio de sesión exitoso',
            detail: 'Bienvenido de nuevo!',
          });
          return response;
        }),
        catchError((error) => {
          console.log('Error:', error);
          this.handleError(error);
          return throwError(
            () => 'Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'
          );
        })
      );
  }

  logout() {
    // Elimina el token del almacenamiento local para cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('correo_institucional');
    localStorage.removeItem('clave');

    // Actualiza el valor de userLoggedIn$ a false cuando el usuario cierra la sesión.
    this.userLoggedIn$.next(false);

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']).then(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Sesión cerrada',
        detail: 'Has cerrado la sesión correctamente.',
      });
    });
  }

  // Comprobar si el usuario está autenticado
  public get loggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Comprueba si el token es válido
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  // Manejar errores de la solicitud HTTP
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error: ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado: ',
        error.status,
        error.error
      );
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Algo malo sucedió; por favor, inténtelo de nuevo más tarde.',
    });
    return throwError(
      () => 'Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
