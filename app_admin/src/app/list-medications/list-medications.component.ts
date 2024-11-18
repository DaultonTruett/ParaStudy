import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';

import { Medication } from '../models/medication';
import { MedicationCardComponent } from '../medication-card/medication-card.component';
import { MedicationDataService } from '../services/medication-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';


@Component({
  selector: 'app-list-medications',
  standalone: true,
  imports: [CommonModule, MedicationCardComponent, MatTabsModule],
  templateUrl: './list-medications.component.html',
  styleUrl: './list-medications.component.css',
  providers: [MedicationDataService]
})

export class ListMedicationsComponent implements OnInit{
  medications!: Medication[];
  msg: string = '';

  user!: User;
  userRole = '';

  constructor(
    private router: Router,
    private medicationDataService: MedicationDataService,
    private authService: AuthenticationService
  ){};

  ngOnInit(): void {
    this.getMeds();

    if(this.isLoggedIn()){
      this.user = this.authService.getCurrentUser();
      this.userRole = this.user.role;
    }

  }

  private getMeds(): void {
    this.medicationDataService.getMedications()
    .subscribe({
      next: (value: any) => {
        this.medications = value;
        console.log(this.medications)

        if(value.length > 0){
          this.msg = value.length + 'meds in DB';
        }else{
          this.msg = 'No medications found.'
        }

      },
      error: function(error: any){
        console.log('Error: ' + error);
      }
    });
  };

  public isAdmin(): boolean{
    if(this.userRole == 'admin'){
      return true;
    };
    
    return false;
  };

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  public addMed(): void{
    this.router.navigate(['add-medication']);
  };

}
