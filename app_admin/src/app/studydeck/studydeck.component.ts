import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule}  from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { Medication } from '../models/medication';
import { User } from '../models/user';
import { MedicationDataService } from '../services/medication-data.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-studydeck',
  standalone: true,
  imports: [CommonModule,
    MatIconModule, MatButtonModule, MatRadioModule, MatSelectModule,
    MatCardModule
  ],
  templateUrl: './studydeck.component.html',
  styleUrl: './studydeck.component.css',
  providers: [MedicationDataService]
})
export class StudydeckComponent implements OnInit{
  user!: User;
  msg = '';

  deck: string[] = [];
  deckEmpty = true;

  flashCards: Medication[] = [];

  i: number = 0;
  j: number = 0;

  public constructor(
    private authService: AuthenticationService,
    private medicationDataService: MedicationDataService,
  ){}

  ngOnInit(){

    if(this.isLoggedIn()){
      this.user = this.authService.getCurrentUser();
      this.deck = this.user.study_deck;

      if(this.deck.length > 0){
        this.deckEmpty = false;
        this.getStudyMeds();
      };
    };

  };

  public getStudyMeds(){
    for(let i = 0; i < this.deck.length; i++){
    this.medicationDataService.getMedicationById(this.deck[i])
      .subscribe({
        next: (med: any) =>{
          this.flashCards.push(med[0])
          if (!med){
            this.msg = "No medications found in study deck";
          }
        },
        error: function(error: any){
          console.log("Error: " + error);
        }
      });
    };
  };

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  };

  public showMed(): any{
    return this.flashCards[this.j]
  };

  public getMedName(): any{
    return this.flashCards[this.j].name;
  };

  public nextMed(): void{    
    if(this.j === this.flashCards.length - 1){
      this.j = 0;
    }else{
      this.j += 1;
    };
  };

  public previousMed(): void{
    if(this.j === 0){
      this.j = this.flashCards.length - 1;
    }else{
      this.j -= 1;
    };
  };

  public flipCardBack(): void{
    let x = document.getElementById("side_2");
    let y = document.getElementById("side_1");

    if(x && y){
      x.className = "flip";
      y.className = "flip";
    };
  };

  public flipCardFront(): void{
    let x = document.getElementById("side_2");
    let y = document.getElementById("side_1");
    
    if(x && y){
      x.className = "flip flip_side_1";
      y.className = "flip flip_side_2";
    };
  };

};
