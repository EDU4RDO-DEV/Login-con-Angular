import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn = false; 

  constructor(private router: Router, public loginService: LoginService) { }

  // Verifica si el usuario ha iniciado sesión
  ngOnInit() {
    this.userLoginOn = this.loginService.isLoggedIn(); 
    this.loginService.userLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.userLoginOn = isLoggedIn;
    });
  }

  // Método para cerrar sesión
  logout() {
    this.loginService.logout(); 
    this.userLoginOn = false;
    this.router.navigate(['/iniciar-sesion']); 
  }
  
}