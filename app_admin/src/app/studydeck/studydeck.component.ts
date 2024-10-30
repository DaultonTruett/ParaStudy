import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from'@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule}  from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


import { Medication } from '../models/medication';
import { User } from '../models/user';
import { MedicationDataService } from '../services/medication-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-studydeck',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule,
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

  quizMedications: Medication[] = [];

  quizQuestionData: {
      name: string,
      age: string,
      indication: string,
      mu: string
      formControl: number
      question: string,
      choices: string[],
      answer: string,
      userChoice: string
  }[] = []

  quizQuestionAnswers = new Map<number, string>;
  displayQuizResults: {
    userChoice: string,
    answer: any
  }[] = []
  

  public quizForm!: FormGroup;
  submitted = false;
  result = 0;

  i: number = 0;
  j: number = 0;

  public constructor(
    private authService: AuthenticationService,
    private medicationDataService: MedicationDataService,
    private userDataService: UserDataService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(){
    this.user = this.authService.getCurrentUser();
    this.deck = this.user.study_deck;

    if(this.deck.length > 0){
      this.deckEmpty = false;
      this.getStudyMeds();
    }

    this.quizForm = this.formBuilder.group({
      0: ['', Validators.required],
      1: ['', Validators.required],
      2: ['', Validators.required],
      3: ['', Validators.required],
      4: ['', Validators.required],
      5: ['', Validators.required],
      6: ['', Validators.required],
      7: ['', Validators.required],
      8: ['', Validators.required],
      9: ['', Validators.required]
    })



    this.getQuizMeds();
    console.log('quiz meds:', this.quizMedications);
  }

  public getQuizMeds(){
    this.medicationDataService.getMedications()
      .subscribe({
        next: (value: Medication[]) => {
          this.msg = value.length + ' meds returned'
          if(value.length > 0){
            
            let i = 0;
            // Push data returned from DB to an array 
            value.forEach( (item) => {
              this.quizMedications.push(item);

              // Push med doses from each item into an array for multiple choice quiz options
              Object.entries(item.indications_dose).forEach( ([k, v]) => {

                this.quizQuestionAnswers.set(i, String(v));

                if(i < 10){

                  let tmp = Math.floor(Math.random() * 10) / 10;
                  while(tmp == 0 || tmp.toString() == String(v)){
                    tmp = Math.floor(Math.random() * 10) / 10;
                  };

                  this.quizQuestionData.push({
                    name: item.name,
                    age: item.age,
                    indication: k,
                    mu: item.mu,
                    formControl: i,

                    choices: [
                      String(v),
                      Math.floor(1 + Math.random() * 5).toString() + " - " +  (Math.floor(10 + Math.random() * 10).toString()),
                      Math.floor(10 + Math.random() * 10).toString() + " - " +  (Math.floor(20 + Math.random() * 20).toString()),
                      Math.floor(1 + Math.random() * 300).toString(),
                      tmp.toString()
                    ],
                    question: "What is the " + item.age + " dose of " + item.name + " for " + k + "?",
                    answer: String(v),
                    userChoice: ''

                  });
                  i += 1;
              }
              });

            });

            // randomize each answer option in the array of multiple choice options so the correct answers isn't the same choice option
            this.quizQuestionData.forEach( (array) => {
              for(let i = array.choices.length - 1; i > 0; i--){
                let j = Math.floor(Math.random() * (i + 1));
                [array.choices[i], array.choices[j]] = [array.choices[j], array.choices[i]]
              };
            });

          }else{
            this.msg = 'No medications found.';
          };
          console.log(this.msg);
        },
        error: function(error: any){
          console.log('Error: ' + error);
        },
      });
  
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

  
  public quizSubmit(){
    //if(this.quizForm.valid){
      this.submitted = true;

      for(let i = 0; i < 10; i++){
        if(this.quizForm.value[i] == this.quizQuestionAnswers.get(i)){
          this.result += 1
        }
        let data = this.quizQuestionData.at(i)
        data!.userChoice = this.quizForm.value[i]
      }

      document.getElementById('title_top')!.scrollIntoView();
      
  
    //}
  
    /*
    this.userDataService.addQuizResult(this.user, this.result)
    .subscribe({
      next: (value: any) => {
        console.log(value)
      },
      error: (error: any) => {
        console.log("error: ", error)
      }
    });
    */


  }; 

  public closeQuizResults(){
    this.router.navigate([''])
  }

  get values(){
    return this.quizForm.controls;
  }


  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  public showQuizMed(): any {
    return this.quizMedications[this.i];
  }

  public nextQuizMed(): void{    
    if(this.i < 9){
      this.i += 1;
    }
  }

  public previousQuizMed(): void{
    if(this.i > 0){
      this.i -= 1;
    }
  };

  public showMed(): any{
    return this.flashCards[this.j]
  }

  public getMedName(): any{
    return this.flashCards[this.j].name;
  }

  public nextMed(): void{    
    if(this.j === this.flashCards.length - 1){
      this.j = 0;
    }else{
      this.j += 1;
    }
  }

  public previousMed(): void{
    if(this.j === 0){
      this.j = this.flashCards.length - 1;
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


/*
                this.quizQuestionAnswerChoices.set(i, [String(v)]);

                // Push additional random values into each array for a multiple choice question
                let arr = this.quizQuestionAnswerChoices.get(i);

                arr?.push( (Math.floor(1 + Math.random() * 5).toString()) + " - " +  (Math.floor(5 + Math.random() * 10).toString()))
                arr?.push( (Math.floor(1 + Math.random() * 15).toString()) + " - " +  (Math.floor(15 + Math.random() * 20).toString()))
                arr?.push(Math.floor(1 + Math.random() * 300).toString());

                this.quizQuestionAnswerChoices.forEach( (array) => {
                  for(let i = array.length - 1; i > 0; i--){
                    let j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]]
                  };
                });


                  public getQuestionAnswerChoices(){
                    return this.quizQuestionAnswerChoices.get(this.i);
                  }

*/