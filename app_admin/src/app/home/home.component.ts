import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(){
    if (!this.isLoggedIn()){
      this.router.navigateByUrl('login')
    }else{
      this.user = this.authService.getCurrentUser();
      this.userName = this.user.name;
    }

  }

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }


}
