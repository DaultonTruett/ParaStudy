import { Component, OnInit, Input, ChangeDetectionStrategy, viewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';



import { Medication } from '../models/medication';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';


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

  accordion = viewChild.required(MatAccordion);
  readonly panelOpenState = signal(false);

  user!: User;
  userRole = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){};

  ngOnInit(){
    this.user = this.authService.getCurrentUser();
    this.userRole = this.user.role;
    console.log("med card" + this.medication)
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

  public editMed(medication: Medication){
    localStorage.removeItem('_id');
    localStorage.setItem('_id', medication._id);

    this.router.navigate(['edit-medication']);
  };

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
}
