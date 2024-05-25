import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginError: string = '';

  loginForm = this.formBuilder.group({
    correo_institucional: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
        Validators.minLength(6),
      ],
    ],
    clave: [
      '',
      [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          this.router.navigate(['/inicio']);
          this.loginForm.reset();
          this.showToast();
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = 'Error al iniciar sesión';
          if (errorData.status === 400 && errorData.errors) {
            for (const key in errorData.errors) {
              this.messageService.add({severity:'error', summary:'Error de validación', detail:`${key}: ${errorData.errors[key]}`});
            }
          } else {
            this.messageService.add({severity:'error', summary:'Error de inicio de sesión', detail:'Error al iniciar sesión. Por favor, inténtalo de nuevo.'});
          }
        },
        complete: () => {
          console.log('Petición completada');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.messageService.add({severity:'warning', summary:'Error de validación', detail:'Por favor, completa todos los campos requeridos.'});
    }
  }

  get correo_institucional() {
    return this.loginForm.controls.correo_institucional;
  }

  get clave() {
    return this.loginForm.controls.clave;
  }

  showToast() {
    this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Operación realizada con éxito'});
  }

  onClick() {
    this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Botón de PrimeNG clicado'});
  }
}