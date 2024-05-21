import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Protocol } from '../models/protocol';
import { ProtocolDataService } from '../services/protocol-data.service';

@Component({
  selector: 'app-edit-protocol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-protocol.component.html',
  styleUrl: './edit-protocol.component.css'
})
export class EditProtocolComponent implements OnInit{
  public editForm!: FormGroup;
  public protocol!: Protocol;
  submitted = false;
  msg: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private protocolDataService: ProtocolDataService
  ){}

  ngOnInit(){
    let id = localStorage.getItem('_id');

    if(!id){
      alert('Something went wrong...please try again');
      this.router.navigate(['list-protocols']);
      return;
    };

    this.editForm = this.formBuilder.group({
      _id: [id],
      category: ['', Validators.required],
      name: ['', Validators.required],
      protocol: ['', Validators.required]
    });

    this.protocolDataService.getProtocolById(id)
    .subscribe({
      next: (value: any) => {
        this.protocol = value;
        this.editForm.patchValue(value[0]);

        if(!value){
          this.msg = 'Protocol not retrieved.';
        }else{
          this.msg = 'OK'
        };

        console.log(this.msg, value[0]);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  };

  onSubmit(){
    this.submitted = true;

    if(this.editForm.valid){
      this.protocolDataService.updateProtocol(this.editForm.value)
      .subscribe({
        next: (value: any) => {
          this.router.navigate(['list-protocols']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    };
  };

  get values(){
    return this.editForm.controls;
  };

}; // end
