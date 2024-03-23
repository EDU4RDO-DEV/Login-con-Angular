import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  userLoginOn:boolean = false;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.userLoginOn = true;
    }
  }
}
