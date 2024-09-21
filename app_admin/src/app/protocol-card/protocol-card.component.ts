import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Protocol } from '../models/protocol';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';


@Component({
  selector: 'app-protocol-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protocol-card.component.html',
  styleUrl: './protocol-card.component.css'
})
export class ProtocolCardComponent implements OnInit{
  @Input('protocol') protocol: any;

  user!: User;
  userRole = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  ngOnInit(){
    this.user = this.authService.getCurrentUser();
    this.userRole = this.user.role;
  }

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  };

  public isAdmin(): boolean{
    if(this.userRole == 'admin'){
      return true;
    };
    
    return false;
  }

  public editProtocol(protocol: Protocol){
    localStorage.removeItem('_id');
    localStorage.setItem('_id', protocol._id);

    this.router.navigate(['edit-protocol']);
  };

  public deleteProtocol(protocol: Protocol){
    localStorage.removeItem('_id');
    localStorage.setItem('_id', protocol._id);

    this.router.navigate(['delete-protocol']);
  };
}
