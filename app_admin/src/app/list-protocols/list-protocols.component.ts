import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Protocol } from '../models/protocol';
import { ProtocolCardComponent } from '../protocol-card/protocol-card.component';
import { ProtocolDataService } from '../services/protocol-data.service';


@Component({
  selector: 'app-list-protocols',
  standalone: true,
  imports: [CommonModule, ProtocolCardComponent],
  templateUrl: './list-protocols.component.html',
  styleUrl: './list-protocols.component.css'
})
export class ListProtocolsComponent implements OnInit{
  protocols!: Protocol[];
  msg: string = '';

  constructor(
    private router: Router,
    private protocolDataService: ProtocolDataService
  ){}

  ngOnInit(){
    this.getProtocols();
  };

  private getProtocols(): void{
    this.protocolDataService.getProtocols()
    .subscribe({
      next: (value: any) =>{
        this.protocols = value;

        if(value.length > 0){
          this.msg = 'value.length' + 'protocols in DB';
        }else{
          this.msg = 'No protocols found.'
        }

      },
      error: function(error: any){
        console.log('Error: ' + error)
      }
    });
  };

  public addProtocol(): void{
    this.router.navigate(['add-protocol']);
  }

}
