import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MedicationDataService } from '../services/medication-data.service';

@Component({
  selector: 'app-edit-medication-indication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule,
    MatCardModule
  ],
  templateUrl: './edit-medication-indication.component.html',
  styleUrl: './edit-medication-indication.component.css'
})
export class EditMedicationIndicationComponent implements OnInit{
  public edit_form!: FormGroup;
  submitted = false;

  medication_id = localStorage.getItem('medication_id');
  indication_id = localStorage.getItem('indication_id');
  indication_name = localStorage.getItem('indication_name');


  constructor(
    private formBuilder: FormBuilder,
    private medService: MedicationDataService,
    private router: Router
  ){};

  ngOnInit(){
    localStorage.removeItem('medication_id');
    localStorage.removeItem('indication_id');
    localStorage.removeItem('indication_name');

    this.edit_form = this.formBuilder.group({
      medication_id: [this.medication_id],
      indication_id: [this.indication_id],
      indication: [this.indication_name, Validators.required]
    });
  };

  public onSubmit(){
    this.submitted = true;

    if(this.edit_form.valid){
      this.medService.updateMedicationIndication(this.edit_form.value)
      .subscribe({
        next: () => {
          this.router.navigate(['list-medications']);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    };
  };

  public onCancel(){
    this.router.navigate(['list-medications'])
  };

  get values(){
    return this.edit_form.controls;
  }

};
