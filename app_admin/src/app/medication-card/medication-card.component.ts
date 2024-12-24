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
import { MedicationDataService } from '../services/medication-data.service';
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
    private medService: MedicationDataService,
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

    // Admin functions below

    // Medications
    public editMed(medication: Medication){
      localStorage.removeItem('medication_id');
      localStorage.setItem('medication_id', medication._id);
  
      this.router.navigate(['edit-medication']);
    };
  
    public deleteMed(medication: Medication){
      localStorage.removeItem('medication_id');
      localStorage.setItem('medication_id', medication._id);
  
      this.router.navigate(['delete-medication']);
    };
  
    // Medication indications
    public addMedicationIndication(medication_id: string, medication_name: string){
      localStorage.removeItem('medication_id');
      localStorage.removeItem('medication_name')

      localStorage.setItem('medication_id', medication_id);
      localStorage.setItem('medication_name', medication_name);
  
      this.router.navigate(['add-medication-indication']);
    };
  
    public editMedicationIndication(medication_id: string, indication_id: string, indication_name: string){
      localStorage.removeItem('medication_id');
      localStorage.removeItem('indication_id');
      localStorage.removeItem('indication_name');
  
      localStorage.setItem('medication_id', medication_id);
      localStorage.setItem('indication_id', indication_id);
      localStorage.setItem('indication_name', indication_name);
  
      this.router.navigate(['edit-medication-indication'])
    };
  
    public deleteMedicationIndication(medication_id: string, indication_id: string){
      let data = {
        medication_id: medication_id,
        indication_id: indication_id
      };
      this.medService.deleteMedicationIndication(data)
      .subscribe({
        next: () => {
          this.reloadPage();
        },
        error: (err: any) => {
          console.log(err)
        }
      });
    };
  
    // Medication indication doses
    public addMedicationDose(medication_id: string, indication_id: string, medication_name: string, indication_name: string){
      localStorage.removeItem('medication_id');
      localStorage.removeItem('indication_id');
      localStorage.removeItem('medication_name');
      localStorage.removeItem('indication_name');
  
      localStorage.setItem('medication_id', medication_id);
      localStorage.setItem('indication_id', indication_id);
      localStorage.setItem('medication_name', medication_name);
      localStorage.setItem('indication_name', indication_name);
  
      this.router.navigate(['add-medication-dose'])
    };

    public editMedicationDose(medication_name: string, indication_name: string, medication_id: string, indication_id: string, dose_id: string, dose: string, mu: string, route: string){
      localStorage.removeItem('medication_name');
      localStorage.removeItem('indication_name');
      localStorage.removeItem('medication_id');
      localStorage.removeItem('indication_id');
      localStorage.removeItem('dose_id');
      localStorage.removeItem('dose');
      localStorage.removeItem('mu');
      localStorage.removeItem('route');

      localStorage.setItem('medication_name', medication_name);
      localStorage.setItem('indication_name', indication_name);
      localStorage.setItem('medication_id', medication_id);
      localStorage.setItem('indication_id', indication_id);
      localStorage.setItem('dose_id', dose_id);
      localStorage.setItem('dose', dose);
      localStorage.setItem('mu', mu);
      localStorage.setItem('route', route);

      this.router.navigate(['edit-medication-dose']);
    };

    public deleteMedicationDose(medication_id: string, indication_id: string, dose_id: string){
      const data = {
        medication_id: medication_id,
        indication_id: indication_id,
        dose_id: dose_id
      };
      
      this.medService.deleteMedicationDose(data)
      .subscribe({
        next: (value: any) => {
          this.reloadPage();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    };

}
