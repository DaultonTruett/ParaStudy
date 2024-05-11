import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-delete-medication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-medication.component.html',
  styleUrl: './delete-medication.component.css'
})
export class DeleteMedicationComponent implements OnInit{
  id!: string;

  constructor(
    private router: Router,
    private medicationDataService: MedicationDataService
  ){}

  ngOnInit(){
    let id = localStorage.getItem('_id');

    if(!id){
      alert("Medication not found, something went wrong");

      this.router.navigate(['']);
      return;
    }

    this.medicationDataService.deleteMedication(id)
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

}; //end
