import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { ChartComponent } from '../chart/chart.component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [],
  imports: [CommonModule, ChartComponent,
    MatCardModule, MatButtonModule
  ]
})
export class HomeComponent implements OnInit{

  user!: User;
  user_email = this.authService.getCurrentUser().email;

  average!: any;

  constructor(
    private authService: AuthenticationService,
  ){}

  ngOnInit(){
    if(this.isLoggedIn()){
      this.user = this.authService.getCurrentUser();

      let curr = 0;
      if(this.user.quiz_results.length > 0){
        for(let i = 0; i < this.user.quiz_results.length; i++){
          curr += this.user.quiz_results[i]
        }
        this.average = Math.round((curr / this.user.quiz_results.length) * 10);
      }else{
        this.average = 'No quizes taken';
      };

    };

  };

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

}
