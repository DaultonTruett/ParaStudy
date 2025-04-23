import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public formErrors: string = '';

  public user = {
    name: '',
    email: '',
    password: '',
    role: '',
    study_deck: [],
    quiz_results: [],
  };

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  ngOnInit(){}

  public loginSubmit(): void{
    if(!this.user.email || !this.user.password){
      this.formErrors = "All fields required."
      return;
    };

    this.authService.login(this.user)
    .then( () => this.router.navigateByUrl(''))
    .catch( (err) => {
      console.log(err);
      this.formErrors = "Incorrect email or password."
    });
  }
}
