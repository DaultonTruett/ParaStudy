import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProtocolDataService } from '../services/protocol-data.service';

@Component({
  selector: 'app-delete-protocol',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-protocol.component.html',
  styleUrl: './delete-protocol.component.css'
})
export class DeleteProtocolComponent implements OnInit{
  id!: string;

  constructor(
    private router: Router,
    private protocolDataService: ProtocolDataService
  ){}

  ngOnInit(){
    let id = localStorage.getItem('_id');

    if(!id){
      alert("Protocol not found, something went wrong");

      this.router.navigate(['']);
      return;
    };

    this.protocolDataService.deleteProtocol(id)
    .subscribe({
      next: (value: any) => {
        console.log(value);
        this.router.navigate(['list-protocols']);
      },
      error: (error:any) => {
        console.log(error);
      }
    });
  };

}; //end
