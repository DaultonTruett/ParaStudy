import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-add-medication-dose',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule,
    MatCardModule
  ],
  templateUrl: './add-medication-dose.component.html',
  styleUrl: './add-medication-dose.component.css'
})
export class AddMedicationDoseComponent implements OnInit{
  public add_dose_form!: FormGroup;
  submitted = false;

  medication_id = localStorage.getItem('medication_id');
  indication_id = localStorage.getItem('indication_id');
  medication_name = localStorage.getItem('medication_name');
  indication_name = localStorage.getItem('indication_name');

  constructor(
    private formBuilder: FormBuilder,
    private medService: MedicationDataService,
    private router: Router
  ){}

  ngOnInit(){
    localStorage.removeItem('medication_id');
    localStorage.removeItem('indication_id');
    localStorage.removeItem('medication_name');
    localStorage.removeItem('indication_name');

    this.add_dose_form = this.formBuilder.group({
      medication_id: [this.medication_id],
      indication_id: [this.indication_id],
      dose: ['', Validators.required],
      mu: ['', Validators.required],
      route: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit(){
    this.submitted = true;

    console.log(this.add_dose_form.value.medication_id)
    console.log(this.add_dose_form.value.indication_id)

    this.medService.addMedicationDose(this.add_dose_form.value)
    .subscribe({
      next: (value: any) => {
        console.log(value);
        this.router.navigate(['list-medications'])
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  };

  onCancel(){
    this.router.navigate(['list-medications']);
  }

  get values(){
    return this.add_dose_form.controls;
  };

};
