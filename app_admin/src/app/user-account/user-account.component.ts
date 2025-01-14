import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

import { User } from '../models/user';
import { UserDataService } from '../services/user-data.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-user-account',
  standalone: true,
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css',
  imports: [MatButtonModule, MatCardModule, MatDivider],
})
export class UserAccountComponent implements OnInit{
  private _snack = inject(MatSnackBar);

  user!: User;
  tmp_str_arr: string[] = [];
  tmp_num_arr: number[] = [];
  
  constructor(
    private userDataService: UserDataService,
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(){
    this.user = this.authService.getCurrentUser();
  }

  public studyDeckEmpty(): boolean{
    if(this.user.study_deck.length == 0){
      return true;
    };
    return false;
  }

  public quizResultsEmpty(): boolean{
    if(this.user.quiz_results.length == 0){
      return true;
    };
    return false;
  }

  public clearStudyDeck(){
    this.tmp_str_arr = this.user.study_deck;
    this.user.study_deck = [];

    return this.userDataService.deleteAllFlashcards(this.user)
    .subscribe({
      next: (value: any) => {
        console.log(value)
        this._snack.open('All flashcards successfully removed from study deck.', 'Ok', {
          duration: 3000
        });
        
        this.tmp_str_arr = []
        this.authService.updateToken(this.user.email);
      },
      error: (err: any) => {
        console.log(err);
        this._snack.open('All flashcards successfully removed from study deck.', 'Ok', {
          duration: 3000
        });

        this.user.study_deck = this.tmp_str_arr;
        this.tmp_str_arr = [];
      }
    })
  }

  public clearQuizResultsHistory(){
    this.tmp_num_arr = this.user.quiz_results;
    this.user.quiz_results = [];

    return this.userDataService.deleteAllQuizResults(this.user)    
    .subscribe({
      next: (value: any) => {
        console.log(value)
        this._snack.open('Quiz history cleared.', 'Ok', {
          duration: 3000
        });

        this.tmp_num_arr = [];
        this.authService.updateToken(this.user.email);
      },
      error: (err: any) => {
        console.log(err)
        this.user.quiz_results = this.tmp_num_arr;
        this.tmp_num_arr = [];
      }
    });
  };

  public logout(): void{
    this.router.navigate(['login'])
    this.authService.logout();
  };

  public deleteUserAccount(){
    this.router.navigate(['delete-account'])
  };

};

@Component({
  selector: 'dialog',
  standalone: true,
  templateUrl: './dialog.html',
  styleUrl: './user-account.component.css',
  imports: [MatButtonModule],
})
export class dialog{}
