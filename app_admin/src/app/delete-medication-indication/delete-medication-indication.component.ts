import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-delete-medication-indication',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './delete-medication-indication.component.html',
  styleUrl: './delete-medication-indication.component.css'
})
export class DeleteMedicationIndicationComponent implements OnInit{
  medication_id = localStorage.getItem('medication_id');
  indication_id = localStorage.getItem('indication_id');

  medication_name = localStorage.getItem('medication_name');
  indication_name = localStorage.getItem('indication_name');

  data = {
    medication_id: this.medication_id,
    indication_id: this.indication_id,
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
  };

  onSubmit(){
    this.medService.deleteMedicationIndication(this.data)
    .subscribe({
      next: () => {
        this.router.navigate(['list-medications'])
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  };

  onCancel(){
    this.router.navigate(['list-medications'])
  };

};
