import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-request-password-reset',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './request-password-reset.component.html',
  styleUrl: './request-password-reset.component.css'
})
export class RequestPasswordResetComponent implements OnInit{
  public formErrors: string = '';

  private _snack = inject(MatSnackBar);

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
    study_deck: [],
    quiz_results: [],
  };

  public requestPasswordResetSubmit(): void{
    if(!this.user.email){
      this.formErrors = "All fields required."
      this._snack.open('Oops! Something went wrong... Please try again', 'Ok', {
        duration: 5000
      });
    }else{
      this.authService.requestPasswordReset(this.user)
      .then( () => {
        this._snack.open('Please check your email for a reset link', 'Ok', {
          duration: 5000
        });

        this.router.navigate(['login'])
      })
      .catch( (message) => {
        this.formErrors = message
        this._snack.open('Oops! Something went wrong... Please try again', 'Ok', {
          duration: 5000
        });
      });
    }
  }
}
