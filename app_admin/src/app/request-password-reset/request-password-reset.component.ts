import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-request-password-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-password-reset.component.html',
  styleUrl: './request-password-reset.component.css'
})
export class RequestPasswordResetComponent implements OnInit{
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

  public requestPasswordResetSubmit(): void{
    if(!this.user.email){
      this.formErrors = "All fields required."
    }else{
      this.authService.requestPasswordReset(this.user)
      .then( () => {
        this.router.navigate(['login'])
      })
      .catch( (message) => this.formErrors = message);
    }
  }
}
