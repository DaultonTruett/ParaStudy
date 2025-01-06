import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-delete-medication',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './delete-medication.component.html',
  styleUrl: './delete-medication.component.css'
})
export class DeleteMedicationComponent implements OnInit{
  medication_id = localStorage.getItem('medication_id');
  medication_name = localStorage.getItem('medication_name');
  medication_age = localStorage.getItem('medication_age');


  constructor(
    private router: Router,
    private medicationDataService: MedicationDataService
  ){}

  ngOnInit(){
    localStorage.removeItem('medication_id');
    localStorage.removeItem('medication_name');
    localStorage.removeItem('medication_age');
  };

  onSubmit(){
    let data = {
      medication_id: this.medication_id
    };

    this.medicationDataService.deleteMedication(data)
    .subscribe({
      next: (value: any) => {
        console.log(value);
        this.router.navigate(['list-medications']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  };


  onCancel(){
    this.router.navigate(['list-medications'])
  };

}; //end
