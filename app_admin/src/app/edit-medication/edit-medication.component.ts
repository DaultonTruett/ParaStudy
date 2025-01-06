import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Medication } from '../models/medication';
import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-edit-medication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule,
    MatCardModule
  ],
  templateUrl: './edit-medication.component.html',
  styleUrl: './edit-medication.component.css'
})
export class EditMedicationComponent implements OnInit{
  public editForm!: FormGroup;

  medication!: Medication;

  submitted = false;
  msg: string = '';

  medication_id = localStorage.getItem('medication_id');
  classification =   localStorage.getItem('classification');
  medication_name = localStorage.getItem('medication_name');
  age = localStorage.getItem('age');
  contraindications = localStorage.getItem('contraindications');
  side_effects = localStorage.getItem('side_effects');
  actions = localStorage.getItem('actions');
  notes = localStorage.getItem('notes');


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private medDataService: MedicationDataService
  ){}

  ngOnInit(){
    localStorage.removeItem('medication_id');
    localStorage.removeItem('classification');
    localStorage.removeItem('medication_name');
    localStorage.removeItem('age');
    localStorage.removeItem('contraindications');
    localStorage.removeItem('side_effects');
    localStorage.removeItem('actions');
    localStorage.removeItem('notes');

    if (!this.medication_id){
      this.router.navigate(['list-medications'])
    };

    this.editForm = this.formBuilder.group({
      _id: [this.medication_id],
      classification: [this.classification, Validators.required],
      name: [this.medication_name, Validators.required],
      age: [this.age, Validators.required],
      contraindications: [this.contraindications, Validators.required],
      side_effects: [this.side_effects, Validators.required],
      actions: [this.actions, Validators.required],
      notes: [this.notes, Validators.required]
    });

  };

  onSubmit(): void{
    this.submitted = true;

    if(this.editForm.valid){
      this.medDataService.updateMedication(this.editForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['list-medications']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    };
  };

  onCancel(): void{
    this.router.navigate(['list-medications'])
  }

  get values() {
    return this.editForm.controls;
  };

}; //end
