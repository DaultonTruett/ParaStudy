import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Medication } from '../models/medication';
import { User } from '../models/user';

import { MedicationCardComponent } from '../medication-card/medication-card.component';

import { MedicationDataService } from '../services/medication-data.service';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-studydeck',
  standalone: true,
  imports: [CommonModule, MedicationCardComponent],
  templateUrl: './studydeck.component.html',
  styleUrl: './studydeck.component.css',
  providers: [MedicationDataService]
})
export class StudydeckComponent implements OnInit{
  user!: User;
  deck: string[] = [];

  medications: any[] = [];
  //med = {} as Medication;
  msg: string = '';

  j: number = 0;

  public constructor(
    private authService: AuthenticationService,
    private medicationDataService: MedicationDataService,
  ){}

  ngOnInit(){
    this.user = this.authService.getCurrentUser();
    this.deck = this.user.study_deck;
    this.getStudyMeds();
  }

  public getStudyMeds(): void{
    for(let i = 0; i < this.deck.length; i++){
      this.medicationDataService.getMedicationById(this.deck[i])
      .subscribe({
        next: (value: any) =>{
          /*this.med._id = value._id;
          this.med.name = value.name;
          this.med.actions = value.actions;
          this.med.age = value.age;
          this.med.category = value.category;
          this.med.contraindications = value.contraindications;
          this.med.dose = value.dose;
          this.med.indications = value.indications;
          this.med.notes = value.notes;
          this.med.sideEffects = value.sideEffects;
          */
          this.medications.push(value[0])
          if (!value){
            this.msg = "No medications found in study deck";
          }
        },
        error: function(error: any){
          console.log("Error: " + error);
        }
      });
  };
  console.log(this.medications)
  };

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  public showMed(): any{
    return this.medications[this.j]
  }

  public getMedName(): any{
    return this.medications[this.j].name;
  }

  public checkDeck(): boolean{
    if (this.deck.length >= 1) {
      return true;
    };
    return false;
  }

  public nextMed(): void{    
    if(this.j === this.medications.length - 1){
      this.j = 0;
    }else{
      this.j += 1;
    }
  }

  public previousMed(): void{
    if(this.j === 0){
      this.j = this.medications.length - 1;
    }else{
      this.j -= 1;
    }
  };

  public flipCard(): void{
    document.getElementById("flip_card_front")?.addEventListener("click", (e) =>{
      e.preventDefault();

      let x = document.getElementById("side_2");
      let y = document.getElementById("side_1");
      if(x && y){
        x.className = "flip flip_side_1";
        y.className = "flip flip_side_2";
      };
    });

    document.getElementById("flip_card_back")?.addEventListener("click", (e) =>{
      e.preventDefault();

      let x = document.getElementById("side_2");
      let y = document.getElementById("side_1");
      if(x && y){
        x.className = "flip";
        y.className = "flip";
      }
    });
    }

}
