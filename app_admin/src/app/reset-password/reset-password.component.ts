import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

  public formErrors: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  )
  {}

  ngOnInit(){}

  public user = {
    name: '',
    email: '',
    password: '',
    role: '',
    study_deck: []
  };

  public resetPasswordSubmit(): void{
    if(!this.user.email || !this.user.password){
      this.formErrors = "All fields required."
    }else{
      this.authService.login(this.user)
      .then( () => this.router.navigateByUrl(''))
      .catch( (message) => this.formErrors = message);
    }
  }

}
