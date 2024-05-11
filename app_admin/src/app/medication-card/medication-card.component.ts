import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Medication } from '../models/medication';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-medication-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medication-card.component.html',
  styleUrl: './medication-card.component.css'
})
export class MedicationCardComponent implements OnInit{
  @Input('medication') medication: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){};

  ngOnInit(){};

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  };

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
}
