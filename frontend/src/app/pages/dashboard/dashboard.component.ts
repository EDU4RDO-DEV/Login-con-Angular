import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor() {}
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.userLoginOn = true;
  }
}
