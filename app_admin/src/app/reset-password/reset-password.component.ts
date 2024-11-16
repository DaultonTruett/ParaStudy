import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
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

  ngOnInit(){
    
  }

  public user = {
    name: '',
    email: '',
    password: '',
    role: '',
    study_deck: []
  };

  public resetPasswordSubmit(): void{
    if(!this.user.password){
      this.formErrors = "All fields required."
    }else{
      let id = this.authService.getResetId();
      let resetToken = this.authService.getResetToken();

      this.authService.passwordReset({
        userId: id,
        token: resetToken,
        password: this.user.password
      })
      .then( () => {
        this.router.navigate(['login'])
    })
      .catch( (message) => this.formErrors = message);
    }
  }

}
