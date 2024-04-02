import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    // Definición de los campos del formulario con sus respectivas validaciones
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
        Validators.minLength(6),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ],
    ],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  // Funcion para enviar los datos del formulario
  login() {
    if (this.loginForm.valid) {
      console.log('Llamar al servicio de login');
    } else {
      this.loginForm.markAllAsTouched(); //Marca los campos como tocados
      alert('Error al ingresar los datos.');
    }
  }

  // Funciones para obtener los campos del formulario
  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
