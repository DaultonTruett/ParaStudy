import { Component, OnInit, Input, ChangeDetectionStrategy, viewChild, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';

import { User } from '../models/user';
import { Medication } from '../models/medication';
import { AuthenticationService } from '../services/authentication.service';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-medication-card',
  templateUrl: './medication-card.component.html',
  styleUrl: './medication-card.component.css',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatAccordion,
    MatExpansionModule, MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicationCardComponent implements OnInit{
  @Input('medication') medication!: any;
  
  private _snack = inject(MatSnackBar);

  accordion = viewChild.required(MatAccordion);
  readonly panelOpenState = signal(false);

  user!: User;
  userRole = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userDataService: UserDataService
  ){};

  ngOnInit(){
    this.user = this.authService.getCurrentUser();
    this.userRole = this.user.role;
    
  };

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  };

  public isAdmin(): boolean{
    if(this.userRole == 'admin'){
      return true;
    };
    
    return false;
  }

  public addMedToStudydeck(medication: Medication){
    this.user.study_deck.push(medication._id);
    this._snack.open(`${medication.name} added to study deck`, 'Ok', {
      duration: 3000
    })

    this.userDataService.addFlashcard(this.user, medication._id)
    .subscribe({
      next: () => {
        this.authService.updateToken(this.user.email);
      },
      error: (err: any) => {
        this._snack.open("Something went wrong...", 'Ok', {
          duration: 3000
        })

        for(let i = 0; i < this.user.study_deck.length; i++){
          if (this.medication._id == this.user.study_deck[i]){
            delete this.user.study_deck[i]
          };
        };
      }
    });

  };

  public removeMedFromStudydeck(medication: Medication){
    for(let i = 0; i < this.user.study_deck.length; i++){
      if (this.medication._id == this.user.study_deck[i]){
        delete this.user.study_deck[i]
        this.authService.updateToken(this.user.email);
      };
    };
    this._snack.open(`${medication.name} removed from study deck`, 'Ok', {
      duration: 3000
    });

    this.userDataService.removeFlashcard(this.user, medication._id)
    .subscribe({
      next: () => {
        this.authService.updateToken(this.user.email);
      },
      error: (err: any) => {
        this._snack.open("Something went wrong...", 'Ok', {
          duration: 3000
        });

        this.user.study_deck.push(medication._id);
      }
    });

  };

  public reloadPage(){
    window.location.reload()
  }

  // Admin
  public editMed(medication: Medication){
    localStorage.removeItem('_id');
    localStorage.setItem('_id', medication._id);

    this.router.navigate(['edit-medication']);
  };

  // Admin
  public deleteMed(medication: Medication){
    localStorage.removeItem('_id');
    localStorage.setItem('_id', medication._id);

    this.router.navigate(['delete-medication']);
  };

  public checkMed(): boolean{
    if(this.medication._id){
      return true;
    }
    return false;
  }

  public inStudyDeck(): boolean{
    for(let i = 0; i < this.user.study_deck.length; i++){
      if (this.medication._id == this.user.study_deck[i]){
        return true
      }
    }
    return false;
  }

}
