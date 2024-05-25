import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  userForm = this.fb.group({
    id_usuario: [NaN, Validators.required],
    id_detalle_persona: [NaN, Validators.required],
    correo_institucional: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required],
    fecha_creacion: ['', Validators.required],
    ultima_conexion: ['', Validators.required],
    estado: ['', Validators.required],
  });

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    }, error => {
      console.error('Error obteniendo usuarios:', error);
    });
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser: User = {
        id_usuario: this.userForm.value.id_usuario ?? NaN,
        id_detalle_persona: this.userForm.value.id_detalle_persona ?? NaN,
        correo_institucional: this.userForm.value.correo_institucional ?? '',
        clave: this.userForm.value.clave ?? '',
        fecha_creacion: this.userForm.value.fecha_creacion ?? '',
        ultima_conexion: this.userForm.value.ultima_conexion ?? '',
        estado: this.userForm.value.estado ?? ''
      };
  
      this.userService.addUser(newUser).subscribe(user => {
        console.log('User added:', user); 
        this.users.push(user);
        this.userForm.reset({
          id_usuario: NaN,
          id_detalle_persona: NaN,
          correo_institucional: '',
          clave: '',
          fecha_creacion: '',
          ultima_conexion: '',
          estado: ''
        });
      }, error => {
        console.error('Error adding user:', error); 
      });
    }
  }
}