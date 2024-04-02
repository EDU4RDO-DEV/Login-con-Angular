import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = this.formBuilder.group({
    // Valor por defecto, campo requerido, email valido, maximo de caracteres
    email: ['', [Validators.required, Validators.email, Validators.maxLength(25)]],
    password: ['', [Validators.required, Validators.maxLength(25)]]
  })
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  // Funcion para enviar los datos del formulario
  login(){
    if(this.loginForm.valid){
      console.log('Llamar al servicio de login');
    }else{
      alert('Error al ingresar los datos.');
    }
  }
}
