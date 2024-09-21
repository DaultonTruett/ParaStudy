import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Medication } from '../models/medication';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';


@Component({
  selector: 'app-medication-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medication-card.component.html',
  styleUrl: './medication-card.component.css'
})
export class MedicationCardComponent implements OnInit{
  @Input('medication') medication!: any;

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
