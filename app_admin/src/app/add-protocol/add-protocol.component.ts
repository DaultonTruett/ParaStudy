import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';

import { ProtocolDataService } from '../services/protocol-data.service';

@Component({
  selector: 'app-add-protocol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-protocol.component.html',
  styleUrl: './add-protocol.component.css'
})

export class AddProtocolComponent implements OnInit{
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private protocolDataService: ProtocolDataService
  ){}

  ngOnInit(){
    this.addForm = this.formBuilder.group({
      _id: [],
      category: ['', Validators.required],
      name: ['', Validators.required],
      protocol: ['', Validators.required]
    })
  };

  public onSubmit() {
    this.submitted = true;

    if(this.addForm.valid){
      this.protocolDataService.addProtocol(this.addForm.value)
      .subscribe({
        next: (data: any) =>{
          console.log(data);
          this.router.navigate(['list-protocols'])
        },
        error: (error: any) =>{
          console.log('Error: ' + error)
        }
      });
    };
  };

  get values(){
    return this.addForm.controls;
  };
}
