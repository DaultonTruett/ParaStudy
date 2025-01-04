import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MedicationDataService } from '../services/medication-data.service';


@Component({
  selector: 'app-delete-medication-dose',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './delete-medication-dose.component.html',
  styleUrl: './delete-medication-dose.component.css'
})
export class DeleteMedicationDoseComponent implements OnInit{

  medication_id = localStorage.getItem('medication_id');
  indication_id = localStorage.getItem('indication_id');
  dose_id = localStorage.getItem('dose_id');

  medication_name = localStorage.getItem('medication_name');
  indication_name = localStorage.getItem('indication_name');
  dose = localStorage.getItem('dose');
  mu = localStorage.getItem('mu');
  route = localStorage.getItem('route');

  data = {
    medication_id: this.medication_id,
    indication_id: this.indication_id,
    dose_id: this.dose_id
  };

  constructor(
    private router: Router,
    private medService: MedicationDataService,
  ){};

  ngOnInit(){
    localStorage.removeItem('medication_name');
    localStorage.removeItem('indication_name');
    localStorage.removeItem('medication_id');
    localStorage.removeItem('indication_id');
    localStorage.removeItem('dose_id');
    localStorage.removeItem('dose');
    localStorage.removeItem('mu');
    localStorage.removeItem('route');

  };
  
  onSubmit(){
    this.medService.deleteMedicationDose(this.data)
    .subscribe({
      next: (value: any) => {
        this.router.navigate(['list-medications']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  };

  onCancel(){
    this.router.navigate(['list-medications'])
  }

}
