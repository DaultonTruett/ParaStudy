import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-add-medication-indication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule,
    MatCardModule
  ],
  templateUrl: './add-medication-indication.component.html',
  styleUrl: './add-medication-indication.component.css'
})
export class AddMedicationIndicationComponent implements OnInit{
  public indicationForm!: FormGroup;
  submitted = false;

  medication_id = localStorage.getItem('medication_id');
  medication_name = localStorage.getItem('medication_name');


  constructor(
    private formBuilder: FormBuilder,
    private medService: MedicationDataService,
    private router: Router
  ){}

  ngOnInit(){
    localStorage.removeItem('medication_id');
    localStorage.removeItem('medication_name');

    this.indicationForm = this.formBuilder.group({
      medication_id: [this.medication_id],
      indication: ['', Validators.required],
      dose: ['', Validators.required],
      mu: ['', Validators.required],
      route: ['', Validators.required]
    });
  };

  onSubmit(){
    this.submitted = true;
    console.log(this.medication_id)

    this.medService.addMedicationIndication(this.indicationForm.value)
    .subscribe({
      next: (value: any) => {
        this.router.navigate(['list-medications'])
        console.log('success: ', value)
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  };

  onCancel(){
    this.router.navigate(['list-medications'])
  }

  get values(){
    return this.indicationForm.controls;
  }

}
