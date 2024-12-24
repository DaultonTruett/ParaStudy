import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-edit-medication-dose',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule,
    MatCardModule
  ],
  templateUrl: './edit-medication-dose.component.html',
  styleUrl: './edit-medication-dose.component.css'
})
export class EditMedicationDoseComponent implements OnInit{

  public edit_form!: FormGroup;
  submitted = false;

  medication_name = localStorage.getItem('medication_name');
  indication_name = localStorage.getItem('indication_name');

  medication_id = localStorage.getItem('medication_id');
  indication_id = localStorage.getItem('indication_id');
  dose_id = localStorage.getItem('dose_id');
  dose = localStorage.getItem('dose');
  mu = localStorage.getItem('mu');
  route = localStorage.getItem('route');

  constructor(
    private formBuilder: FormBuilder,
    private medService: MedicationDataService,
    private router: Router
  ){};

  ngOnInit(){
    localStorage.removeItem('medication_name');
    localStorage.removeItem('indication_name')
    localStorage.removeItem('medication_id');
    localStorage.removeItem('indication_id');
    localStorage.removeItem('dose_id');
    localStorage.removeItem('dose');
    localStorage.removeItem('mu');
    localStorage.removeItem('route');

    this.edit_form = this.formBuilder.group({
      medication_id: [this.medication_id],
      indication_id: [this.indication_id],
      dose_id: [this.dose_id],
      dose: [this.dose, Validators.required],
      mu: [this.mu, Validators.required],
      route: [this.route, Validators.required]
    });
  };

  public onSubmit(){
    this.submitted = true;

    this.medService.updateMedicationDose(this.edit_form.value)
    .subscribe({
      next: () => {
        this.router.navigate(['list-medications']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  };

  public onCancel(){
    this.router.navigate(['list-medications']);
  };

  get values(){
    return this.edit_form.controls;
  }

};
