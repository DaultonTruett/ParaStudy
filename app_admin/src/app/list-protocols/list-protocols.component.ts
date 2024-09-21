import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Protocol } from '../models/protocol';
import { ProtocolCardComponent } from '../protocol-card/protocol-card.component';
import { ProtocolDataService } from '../services/protocol-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';


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

  user!: User;
  userRole = '';

  constructor(
    private router: Router,
    private protocolDataService: ProtocolDataService,
    private authService: AuthenticationService
  ){}

  ngOnInit(){
    this.getProtocols();
    this.user = this.authService.getCurrentUser();
    this.userRole = this.user.role;
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

  public isAdmin(): boolean{
    if(this.userRole == 'admin'){
      return true;
    };
    
    return false;
  }

  public addProtocol(): void{
    this.router.navigate(['add-protocol']);
  }

}
