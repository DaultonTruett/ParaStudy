import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Medication } from '../models/medication';
import { MedicationCardComponent } from '../medication-card/medication-card.component';
import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-list-medications',
  standalone: true,
  imports: [CommonModule, MedicationCardComponent],
  templateUrl: './list-medications.component.html',
  styleUrl: './list-medications.component.css',
  providers: [MedicationDataService]
})

export class ListMedicationsComponent implements OnInit{
  medications!: Medication[];
  msg: string = '';

  constructor(
    private router: Router,
    private medicationDataService: MedicationDataService
  ){};

  ngOnInit(): void {
    this.getMeds();
  }

  private getMeds(): void {
    this.medicationDataService.getMedications()
    .subscribe({
      next: (value: any) => {
        this.medications = value;

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

  public addMed(): void{
    this.router.navigate(['add-medication']);
  };

}
