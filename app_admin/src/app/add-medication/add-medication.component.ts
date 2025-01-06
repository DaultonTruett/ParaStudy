import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-add-medication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule,
    MatCardModule
  ],
  templateUrl: './add-medication.component.html',
  styleUrl: './add-medication.component.css'
})
export class AddMedicationComponent implements OnInit{

  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private medicationService: MedicationDataService
  ){}

  ngOnInit(){
    this.addForm = this.formBuilder.group({
      _id: [],
      classification: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      indication: ['', Validators.required],
      dose: ['', Validators.required],
      mu: ['', Validators.required],
      route: ['', Validators.required],
      contraindications: ['', Validators.required],
      side_effects: ['', Validators.required],
      actions: ['', Validators.required],
      notes: ['', Validators.required]
    })
  };

  public onSubmit() {
    this.submitted = true;

    if(this.addForm.valid){
      this.medicationService.addMedication(this.addForm.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['list-medications'])
        },
        error: (error: any) => {
          console.log('error: ', error)
        }
      });
    };
  };

  public onCancel(){
    this.router.navigate(['list-medications'])
  }

  get values(){
    return this.addForm.controls;
  }
}
