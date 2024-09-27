import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

import { MedicationDataService } from '../services/medication-data.service';
import { MedicationCardComponent } from '../medication-card/medication-card.component';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Medication } from '../models/medication';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MedicationCardComponent, MatButtonModule,
    MatTabsModule, MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MedicationDataService],
})
export class HomeComponent implements OnInit{

user!: User;
userName = '';
medication!: Medication;
msg = '';


  constructor(
    private medService: MedicationDataService,
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(){
    if (this.isLoggedIn()){
      this.user = this.authService.getCurrentUser();
      this.userName = this.user.name;
    }
    this.getSampleMed();
  }

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  private getSampleMed(): void{
    this.medService.getMedicationById("66309adb3b43284a779cafd0")
    .subscribe({
      next: (value: any) => {
        this.medication = value[0];
        
        if(!value){
          this.msg = 'Medication not retrieved.';
        }else{
          this.msg = 'OK'
        }

        console.log(this.msg);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
