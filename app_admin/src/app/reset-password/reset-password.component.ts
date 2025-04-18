import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  private _snack = inject(MatSnackBar);

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
      this._snack.open('Password reset successfully! Please log in with your new password', 'Ok', {
        duration: 3000
      })

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
      this._snack.open('Oops! Something went wrong... Please try again', 'Ok', {
        duration: 3000
      })
    }
  }

}
