import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Medication } from '../models/medication';
import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-edit-medication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-medication.component.html',
  styleUrl: './edit-medication.component.css'
})
export class EditMedicationComponent implements OnInit{
  public editForm!: FormGroup;
  medication!: Medication;
  submitted = false;
  msg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private medDataService: MedicationDataService
  ){}
  ngOnInit(){
    let id = localStorage.getItem('_id');

    if(!id){
      alert("Something went wrong...please try again.")
      this.router.navigate(['list-medications']);
      return;
    };

    this.editForm = this.formBuilder.group({
      _id: [id],
      category: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      dose: ['', Validators.required],
      indications: ['', Validators.required],
      contraindications: ['', Validators.required],
      sideEffects: ['', Validators.required],
      actions: ['', Validators.required],
      notes: ['', Validators.required]
    })
    
    this.medDataService.getMedicationById(id)
    .subscribe({
      next: (value: any) => {
        this.medication = value;

        this.editForm.patchValue(value[0]);

        if(!value){
          this.msg = 'Medication not retrieved.';
        }else{
          this.msg = 'OK'
        }

        console.log(this.msg);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  };

  onSubmit(){
    this.submitted = true;

    if(this.editForm.valid){
      this.medDataService.updateMedication(this.editForm.value)
      .subscribe({
        next: (value: any) => {
          this.router.navigate(['list-medications']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    };
  };

  get values() {
    return this.editForm.controls;
  }

}; //end
