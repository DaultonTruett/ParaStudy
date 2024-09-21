import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

user!: User;
userName = '';

  constructor(
    private authService: AuthenticationService
  ){}

  ngOnInit(){
    this.user = this.authService.getCurrentUser();
    this.userName = this.user.name;
  }

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }


}
