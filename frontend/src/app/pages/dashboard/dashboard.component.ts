import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userLoginOn: boolean | undefined;
  grades: any;
projectMembers: any;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.userLoginOn = this.loginService.loggedIn;
  }
}
