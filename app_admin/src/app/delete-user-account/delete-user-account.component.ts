import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-delete-user-account',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './delete-user-account.component.html',
  styleUrl: './delete-user-account.component.css'
})
export class DeleteUserAccountComponent implements OnInit{
  private _snack = inject(MatSnackBar);

  user!: User;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(){
    this.user = this.authService.getCurrentUser();
  };

  public onSubmit(){
    
    this._snack.open('Account deleted...redirecting', 'Ok', {
      duration: 5000
    })
    setTimeout(() => {
      5000
    });

    this.authService.logout()
    this.router.navigate(['']);

    return this.authService.deleteUserAccount(this.user)
    .subscribe({
      error: (err: any) => {
        console.log(err)
        this._snack.open('ERROR: something went wrong...please try again.', 'Ok', {
          duration: 5000
        })
        setTimeout(() => {
          5000
        });
      }
    })
  };

  public onCancel(){
    this.router.navigate(['my-account'])
  }

}
