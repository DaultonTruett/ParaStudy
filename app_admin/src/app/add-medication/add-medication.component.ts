import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-add-medication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      category: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      dose: ['', Validators.required],
      mu: ['', Validators.required],
      indications: ['', Validators.required],
      contraindications: ['', Validators.required],
      sideEffects: ['', Validators.required],
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

  get values(){
    return this.addForm.controls;
  }
}
